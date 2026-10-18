// API integration tests against in-memory Postgres (pg-mem). Multi-tenant.
// Run: npm test   (needs devDependencies installed)
process.env.SMS_PROVIDER = 'console';

const { newDb } = require('pg-mem');
const db = require('../lib/db');
const auth = require('../lib/auth');
const { createApp } = require('../api/index');

function pad(n) { return String(n).padStart(2, '0'); }
function dstr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function addDays(n) { const d = new Date(); d.setDate(d.getDate() + n); return dstr(d); }

const blob = {
  v: 1, type: 'salon', icon: '💈', seq: 100,
  business: {
    name: 'Test Salon', phone: '0771234567', address: 'Colombo',
    about: { en: 'test', si: 'පරීක්ෂණ' }, bufferMin: 0, holidays: [],
    hours: { 0: { closed: true }, 1: { open: 540, close: 1020 }, 2: { open: 540, close: 1020 }, 3: { open: 540, close: 1020 }, 4: { open: 540, close: 1020 }, 5: { open: 540, close: 1020 }, 6: { open: 540, close: 1020 } },
  },
  services: [{ id: 'svc1', name: { en: 'Cut', si: 'කැපීම' }, price: 1000, duration: 30, cat: { en: 'Hair', si: 'කෙස්' }, active: true }],
  staff: [{ id: 'stf1', name: 'Nimal', role: { en: 'Barber', si: 'බාබර්' }, phone: '', services: ['svc1'], daysOff: [], active: true }],
  customers: [], appointments: [], reviews: [],
};

let base, bookingId;
const results = [];
function ok(name, cond, extra) {
  results.push((cond ? 'PASS' : 'FAIL') + ' ' + name + (extra ? ' — ' + extra : ''));
  if (!cond) { console.error(results.join('\n')); process.exit(1); }
}
async function req(path, opts = {}) {
  const r = await fetch(base + path, {
    method: opts.method || 'GET',
    headers: Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {}),
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  return { status: r.status, j };
}

/* Phase 0: migrate a legacy single-tenant DB */
async function testMigration() {
  const mem2 = newDb();
  const { Pool: Pool2 } = mem2.adapters.createPg();
  const p2 = new Pool2();
  await p2.query('CREATE TABLE app_state (id INT PRIMARY KEY DEFAULT 1, data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now())');
  await p2.query('CREATE TABLE admins (id SERIAL PRIMARY KEY, pass_hash TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT now())');
  await p2.query('CREATE TABLE otps (id SERIAL PRIMARY KEY, phone TEXT NOT NULL, code_hash TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL, attempts INT DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now())');
  await p2.query('CREATE TABLE sessions (token TEXT PRIMARY KEY, kind TEXT NOT NULL, ref_id TEXT, expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ DEFAULT now())');
  await p2.query('CREATE TABLE sms_log (id SERIAL PRIMARY KEY, phone TEXT NOT NULL, message TEXT NOT NULL, provider TEXT NOT NULL, status TEXT NOT NULL, error TEXT, created_at TIMESTAMPTZ DEFAULT now())');
  await p2.query('INSERT INTO app_state (id, data) VALUES (1, $1)', [JSON.stringify(blob)]);
  await p2.query("INSERT INTO admins (pass_hash) VALUES ('legacyhash')");
  await p2.query("INSERT INTO sms_log (phone, message, provider, status) VALUES ('0771','hi','console','sent')");
  db.setPool(p2);
  await db.init();
  const tenants = await db.listTenants();
  ok('migrate-tenant', tenants.length === 1 && tenants[0].id === 'test-salon', tenants.map(t => t.id).join(','));
  const data = await db.getData('test-salon');
  ok('migrate-data', data && data.business.name === 'Test Salon');
  const ac = await p2.query('SELECT COUNT(*)::int c FROM admins WHERE tenant_id=$1', ['test-salon']);
  ok('migrate-admins', ac.rows[0].c === 1);
  const sc = await p2.query('SELECT COUNT(*)::int c FROM sms_log WHERE tenant_id=$1', ['test-salon']);
  ok('migrate-smslog', sc.rows[0].c === 1);
  // setData roundtrip works on migrated schema
  data.seq = 101;
  await db.setData('test-salon', data);
  ok('migrate-setdata', (await db.getData('test-salon')).seq === 101);
  // idempotent
  await db.init();
  ok('migrate-idempotent', (await db.listTenants()).length === 1);
}

(async () => {
  await testMigration();

  // fresh DB for the app tests
  const mem = newDb();
  const { Pool } = mem.adapters.createPg();
  db.setPool(new Pool());

  const app = await createApp();
  const srv = app.listen(0);
  await new Promise(r => srv.on('listening', r));
  base = 'http://127.0.0.1:' + srv.address().port;

  // health
  let r = await req('/api/health');
  ok('health', r.status === 200 && r.j.ok);

  // no tenants yet -> public/data reports missing
  r = await req('/api/public/data');
  ok('no-tenant-yet', r.status === 200 && r.j.exists === false);

  // create first tenant
  r = await req('/api/tenants', { method: 'POST', body: { data: blob, adminPassword: 'admin123' } });
  ok('tenant-create', r.status === 200 && r.j.slug === 'test-salon' && r.j.token, 'slug ' + r.j.slug);
  const slugA = r.j.slug;
  const T = (p) => '/s/' + slugA + p;
  const A = { headers: { Authorization: 'Bearer ' + r.j.token } };

  // second tenant blocked when not in demo mode
  r = await req('/api/tenants', { method: 'POST', body: { data: blob, adminPassword: 'x' } });
  ok('tenants-second-blocked-403', r.status === 403);

  // unknown slug -> 404
  r = await req('/s/nope/api/public/data');
  ok('unknown-slug-404', r.status === 404);

  // admin login
  r = await req(T('/api/admin/login'), { method: 'POST', body: { password: 'wrong' } });
  ok('admin-login-wrong-401', r.status === 401);
  r = await req(T('/api/admin/login'), { method: 'POST', body: { password: 'admin123' } });
  ok('admin-login-ok', r.status === 200 && r.j.token);

  // admin data roundtrip
  r = await req(T('/api/admin/data'), A);
  ok('admin-data', r.status === 200 && r.j.data.business.name === 'Test Salon');

  // public data (no customer phones leaked); also works unprefixed (single tenant)
  r = await req(T('/api/public/data'));
  ok('public-data', r.status === 200 && r.j.exists && r.j.services.length === 1);
  ok('public-no-customers', !('customers' in r.j) && !('appointments' in r.j));
  r = await req('/api/public/data');
  ok('public-data-unprefixed', r.status === 200 && r.j.exists && r.j.business.name === 'Test Salon');

  // slots
  const ds = addDays(1);
  r = await req(T(`/api/public/slots?serviceId=svc1&staffId=any&date=${ds}`));
  ok('slots', r.status === 200 && r.j.slots.length > 5, r.j.slots.length + ' slots');
  const slot = r.j.slots[0].start;

  // public booking
  r = await req(T('/api/public/book'), { method: 'POST', body: { serviceId: 'svc1', staffId: 'any', date: ds, start: slot, name: 'Kamala', phone: '0771112223', notes: '', lang: 'si' } });
  ok('public-book', r.status === 200 && /^BK-/.test(r.j.booking.ref), 'ref ' + (r.j.booking && r.j.booking.ref));
  bookingId = r.j.booking.id;
  ok('book-pending', r.j.booking.status === 'pending');

  // double-book same slot -> 409
  r = await req(T('/api/public/book'), { method: 'POST', body: { serviceId: 'svc1', staffId: 'any', date: ds, start: slot, name: 'Other', phone: '0779998887', lang: 'en' } });
  ok('double-book-409', r.status === 409, r.j.error);

  // bad phone -> 400
  r = await req(T('/api/public/book'), { method: 'POST', body: { serviceId: 'svc1', staffId: 'any', date: ds, start: slot + 60, name: 'X', phone: '123', lang: 'en' } });
  ok('bad-phone-400', r.status === 400);

  // OTP flow
  const code = await auth.requestOTP('0771112223', slugA);
  r = await req(T('/api/otp/verify'), { method: 'POST', body: { phone: '0771112223', code: '000000' } });
  ok('otp-wrong-400', r.status === 400);
  r = await req(T('/api/otp/verify'), { method: 'POST', body: { phone: '0771112223', code } });
  ok('otp-verify-ok', r.status === 200 && r.j.token, 'customer token');
  const C = { headers: { Authorization: 'Bearer ' + r.j.token } };

  // my bookings
  r = await req(T('/api/me/bookings'), C);
  ok('me-bookings', r.status === 200 && r.j.bookings.length === 1 && r.j.bookings[0].serviceId === 'svc1');

  // customer reschedule
  const ds2 = addDays(2);
  const s2 = await req(T(`/api/public/slots?serviceId=svc1&staffId=stf1&date=${ds2}`));
  ok('slots-day2', s2.j.slots.length > 0);
  r = await req(T('/api/me/bookings/' + bookingId + '/reschedule'), { method: 'POST', headers: C.headers, body: { date: ds2, start: s2.j.slots[0].start } });
  ok('cust-reschedule', r.status === 200 && r.j.booking.date === ds2);

  // admin: confirm booking (SMS logged to console provider)
  r = await req(T('/api/admin/appointments/' + bookingId), { method: 'PATCH', headers: A.headers, body: { status: 'confirmed' } });
  ok('admin-confirm', r.status === 200 && r.j.booking.status === 'confirmed');

  // admin quick book
  const s3 = await req(T(`/api/public/slots?serviceId=svc1&staffId=stf1&date=${ds2}`));
  r = await req(T('/api/admin/appointments'), { method: 'POST', headers: A.headers, body: { serviceId: 'svc1', staffId: 'stf1', date: ds2, start: s3.j.slots[0].start, name: 'Walkin', phone: '0772223334', notes: '' } });
  ok('admin-quickbook', r.status === 200 && r.j.booking.status === 'confirmed');
  const qbId = r.j.booking.id;

  // admin delete
  r = await req(T('/api/admin/appointments/' + qbId), { method: 'DELETE', headers: A.headers });
  ok('admin-delete', r.status === 200);

  // sms log has entries
  r = await req(T('/api/admin/sms-log'), A);
  ok('sms-log', r.status === 200 && r.j.log.length >= 3, r.j.log.length + ' entries');

  // review flow: complete the booking then review
  await req(T('/api/admin/appointments/' + bookingId), { method: 'PATCH', headers: A.headers, body: { status: 'completed' } });
  r = await req(T('/api/public/review'), { method: 'POST', body: { appointmentId: bookingId, phone: '0771112223', rating: 5, comment: 'Great!' } });
  ok('review-ok', r.status === 200);
  r = await req(T('/api/public/review'), { method: 'POST', body: { appointmentId: bookingId, phone: '0771112223', rating: 5, comment: 'Again' } });
  ok('review-dup-409', r.status === 409);

  // customer cancel of another customer's booking -> 403
  const code2 = await auth.requestOTP('0779998887', slugA);
  const v2 = await req(T('/api/otp/verify'), { method: 'POST', body: { phone: '0779998887', code: code2 } });
  r = await req(T('/api/me/bookings/' + bookingId + '/cancel'), { method: 'POST', headers: { Authorization: 'Bearer ' + v2.j.token } });
  ok('cancel-not-yours-403', r.status === 403);

  // unauthorized admin access
  r = await req(T('/api/admin/data'));
  ok('admin-noauth-401', r.status === 401);

  /* ---------- multi-tenant (demo mode) ---------- */
  // demo reset blocked when DEMO_MODE is not set
  delete process.env.DEMO_MODE;
  r = await req(T('/api/demo/reset'), { method: 'POST' });
  ok('demo-reset-blocked-403', r.status === 403);
  r = await req(T('/api/public/data'));
  ok('demo-flag-false', r.j.demo === false);

  process.env.DEMO_MODE = 'true';
  // second tenant allowed in demo mode
  const blobB = JSON.parse(JSON.stringify(blob));
  blobB.business.name = 'Second Store';
  r = await req('/api/tenants', { method: 'POST', body: { data: blobB, adminPassword: 'password2' } });
  ok('tenant-b-created', r.status === 200 && r.j.slug === 'second-store', 'slug ' + r.j.slug);
  const slugB = r.j.slug;
  const TB = (p) => '/s/' + slugB + p;
  const AB = { headers: { Authorization: 'Bearer ' + r.j.token } };

  // isolation: B sees only its own store
  r = await req(TB('/api/public/data'));
  ok('tenant-isolation', r.status === 200 && r.j.exists && r.j.business.name === 'Second Store');
  // A's admin token rejected on B
  r = await req(TB('/api/admin/data'), A);
  ok('cross-tenant-admin-401', r.status === 401);
  // A's customer token rejected on B
  r = await req(TB('/api/me/bookings'), C);
  ok('cross-tenant-cust-401', r.status === 401);
  // OTP issued in A is not valid in B
  const codeA = await auth.requestOTP('0771112223', slugA);
  r = await req(TB('/api/otp/verify'), { method: 'POST', body: { phone: '0771112223', code: codeA } });
  ok('otp-cross-tenant-400', r.status === 400);
  // B admin works on B
  r = await req(TB('/api/admin/data'), AB);
  ok('tenant-b-admin-ok', r.status === 200 && r.j.data.business.name === 'Second Store');

  // demo reset deletes ONLY tenant B
  r = await req(TB('/api/demo/reset'), { method: 'POST' });
  ok('demo-reset-b-ok', r.status === 200 && r.j.ok);
  r = await req(TB('/api/public/data'));
  ok('demo-reset-b-gone', r.status === 404);
  r = await req(T('/api/public/data'));
  ok('tenant-a-survives', r.status === 200 && r.j.exists && r.j.business.name === 'Test Salon');

  // demo flag visible on tenant pages
  ok('demo-flag-true', r.j.demo === true);
  // unprefixed public/data on demo with tenants -> landing (no tenant resolved)
  r = await req('/api/public/data');
  ok('demo-landing-nodata', r.status === 200 && r.j.exists === false && r.j.demo === true);

  // reset A as well; slug freed and reusable
  r = await req(T('/api/demo/reset'), { method: 'POST' });
  ok('demo-reset-ok', r.status === 200 && r.j.ok);
  r = await req('/api/tenants', { method: 'POST', body: { data: blob, adminPassword: 'secret123' } });
  ok('demo-setup-after-reset', r.status === 200 && r.j.slug === 'test-salon' && r.j.token);
  delete process.env.DEMO_MODE;

  console.log(results.join('\n'));
  console.log('ALL API TESTS PASSED');
  srv.close();
  process.exit(0);
})().catch(e => { console.error('TEST CRASH:', e); process.exit(1); });
