// Postgres access. In tests a pg-mem pool can be injected via setPool().
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

const SCHEMA = `
CREATE TABLE IF NOT EXISTS app_state (
  id INT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  pass_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS otps (
  id SERIAL PRIMARY KEY,
  phone TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_otps_phone ON otps(phone);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  ref_id TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS sms_log (
  id SERIAL PRIMARY KEY,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);`;

async function init() { await getPool().query(SCHEMA); }

async function getData() {
  const r = await getPool().query('SELECT data FROM app_state WHERE id=1');
  return r.rows.length ? r.rows[0].data : null;
}

async function setData(data) {
  await getPool().query(
    `INSERT INTO app_state (id, data, updated_at) VALUES (1, $1, now())
     ON CONFLICT (id) DO UPDATE SET data=$1, updated_at=now()`,
    [JSON.stringify(data)]
  );
}

async function clearAll() {
  const p = getPool();
  await p.query('DELETE FROM app_state');
  await p.query('DELETE FROM admins');
  await p.query('DELETE FROM otps');
  await p.query('DELETE FROM sessions');
  await p.query('DELETE FROM sms_log');
}

module.exports = { getPool, setPool, init, getData, setData, clearAll };
