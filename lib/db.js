// Postgres access — multi-tenant. Each store is a tenant (slug).
// In tests a pg-mem pool can be injected via setPool().
const { Pool } = require('pg');

let pool = null;
function setPool(p) { pool = p; }
function getPool() {
  if (pool) return pool;
  const cs = process.env.DATABASE_URL;
  if (!cs) throw new Error('DATABASE_URL is not set');
  pool = new Pool({ connectionString: cs, ssl: { rejectUnauthorized: false } });
  return pool;
}

const TABLES = [
  ['tenants', 'CREATE TABLE tenants (id TEXT PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT now())'],
  ['app_state', 'CREATE TABLE app_state (tenant_id TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now())'],
  ['admins', 'CREATE TABLE admins (id SERIAL PRIMARY KEY, tenant_id TEXT NOT NULL, pass_hash TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT now(), UNIQUE (tenant_id))'],
  ['otps', 'CREATE TABLE otps (id SERIAL PRIMARY KEY, tenant_id TEXT NOT NULL, phone TEXT NOT NULL, code_hash TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL, attempts INT DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now())'],
  ['sessions', 'CREATE TABLE sessions (token TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, kind TEXT NOT NULL, ref_id TEXT, expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ DEFAULT now())'],
  ['sms_log', 'CREATE TABLE sms_log (id SERIAL PRIMARY KEY, tenant_id TEXT NOT NULL, phone TEXT NOT NULL, message TEXT NOT NULL, provider TEXT NOT NULL, status TEXT NOT NULL, error TEXT, created_at TIMESTAMPTZ DEFAULT now())'],
];
const INDEXES = [
  'CREATE INDEX IF NOT EXISTS idx_otps_tenant_phone ON otps(tenant_id, phone)',
  'CREATE INDEX IF NOT EXISTS idx_sms_tenant ON sms_log(tenant_id)',
];

async function tableExists(p, name) {
  const r = await p.query('SELECT 1 FROM information_schema.tables WHERE table_name=$1', [name]);
  return r.rows.length > 0;
}

function slugify(s) {
  return String(s || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'store';
}

async function hasColumn(p, table, col) {
  try { await p.query(`SELECT ${col} FROM ${table} LIMIT 0`); return true; }
  catch (e) { return false; }
}
async function addCol(p, table, def) {
  try { await p.query(`ALTER TABLE ${table} ADD COLUMN ${def}`); }
  catch (e) { if (!/already exists|duplicate/i.test(e.message)) throw e; }
}
async function uniqueSlug(p, base) {
  let slug = base, i = 2;
  while ((await p.query('SELECT 1 FROM tenants WHERE id=$1', [slug])).rows.length)
    slug = base + '-' + (i++);
  return slug;
}

// Migrate pre-multi-tenant installs: backfill tenant_id on every table,
// re-key app_state from (id INT) to (tenant_id TEXT). Idempotent.
async function migrate(p) {
  let needOwner = false;
  for (const t of ['app_state', 'admins', 'otps', 'sessions', 'sms_log']) {
    try { if ((await p.query(`SELECT 1 FROM ${t} LIMIT 1`)).rows.length) { needOwner = true; break; } }
    catch (e) { /* table missing — ignore */ }
  }
  let slug = null;
  if (needOwner) {
    const t0 = await p.query('SELECT id FROM tenants LIMIT 1');
    if (t0.rows.length) slug = t0.rows[0].id;
    else {
      slug = 'store';
      try {
        const r = await p.query('SELECT data FROM app_state LIMIT 1');
        const nm = r.rows.length && r.rows[0].data && r.rows[0].data.business && r.rows[0].data.business.name;
        if (nm) slug = slugify(nm);
      } catch (e) {}
      slug = await uniqueSlug(p, slug);
      await p.query('INSERT INTO tenants (id) VALUES ($1)', [slug]);
    }
  }
  await addCol(p, 'app_state', 'tenant_id TEXT');
  if (slug) await p.query('UPDATE app_state SET tenant_id=$1 WHERE tenant_id IS NULL', [slug]);
  if (await hasColumn(p, 'app_state', 'id')) {
    try { await p.query('ALTER TABLE app_state DROP CONSTRAINT app_state_pkey'); } catch (e) {}
    try { await p.query('ALTER TABLE app_state ADD PRIMARY KEY (tenant_id)'); } catch (e) {}
    try { await p.query('ALTER TABLE app_state DROP COLUMN id'); } catch (e) {}
  }
  try { await p.query('ALTER TABLE app_state ALTER COLUMN tenant_id SET NOT NULL'); } catch (e) {}
  for (const t of ['admins', 'otps', 'sessions', 'sms_log']) {
    await addCol(p, t, 'tenant_id TEXT');
    if (slug) await p.query(`UPDATE ${t} SET tenant_id=$1 WHERE tenant_id IS NULL`, [slug]);
  }
}

async function init() {
  const p = getPool();
  // Create only missing tables (per-table existence check: pg-mem mishandles
  // CREATE TABLE IF NOT EXISTS when a legacy table already exists).
  for (const [name, stmt] of TABLES) {
    if (!await tableExists(p, name)) await p.query(stmt);
  }
  for (const idx of INDEXES) {
    try { await p.query(idx); } catch (e) { /* already exists */ }
  }
  await migrate(p);
}

/* ---------- tenants ---------- */
async function listTenants() {
  const r = await getPool().query('SELECT id, created_at FROM tenants ORDER BY created_at');
  return r.rows;
}
async function countTenants() {
  const r = await getPool().query('SELECT COUNT(*)::int AS c FROM tenants');
  return r.rows[0].c;
}
async function tenantExists(id) {
  const r = await getPool().query('SELECT 1 FROM tenants WHERE id=$1', [id]);
  return r.rows.length > 0;
}
async function createTenant(id) {
  await getPool().query('INSERT INTO tenants (id) VALUES ($1)', [id]);
}
async function deleteTenant(id) {
  const p = getPool();
  for (const t of ['sms_log', 'sessions', 'otps', 'admins', 'app_state'])
    await p.query(`DELETE FROM ${t} WHERE tenant_id=$1`, [id]);
  await p.query('DELETE FROM tenants WHERE id=$1', [id]);
}

/* ---------- tenant-scoped data ---------- */
async function getData(tenantId) {
  if (!tenantId) return null;
  const r = await getPool().query('SELECT data FROM app_state WHERE tenant_id=$1', [tenantId]);
  return r.rows.length ? r.rows[0].data : null;
}

async function setData(tenantId, data) {
  const p = getPool();
  const str = JSON.stringify(data);
  const r = await p.query('UPDATE app_state SET data=$2, updated_at=now() WHERE tenant_id=$1', [tenantId, str]);
  if (r.rowCount === 0)
    await p.query('INSERT INTO app_state (tenant_id, data, updated_at) VALUES ($1,$2,now())', [tenantId, str]);
}

module.exports = {
  getPool, setPool, init, slugify, uniqueSlug,
  listTenants, countTenants, tenantExists, createTenant, deleteTenant,
  getData, setData,
};
