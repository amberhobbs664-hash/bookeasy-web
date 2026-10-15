// API integration tests against in-memory Postgres (pg-mem).
// Run: npm test   (needs devDependencies installed)
process.env.SMS_PROVIDER = 'console';

const { newDb } = require('pg-mem');
const db = require('../lib/db');
const auth = require('../lib/auth');
const { createApp } = require('../api/index');

const mem = newDb();
const { Pool } = mem.adapters.createPg();
db.setPool(new Pool());

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

let base, adminTok, custTok, bookingId;
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

(async () => {
  const app = await createApp();
  const srv = app.listen(0);
  await new Promise(r => srv.on('listening', r));
  base = 'http://127.0.0.1:' + srv.address().port;

  // health
  let r = await req('/api/health');
  ok('health', r.status === 200 && r.j.ok);

  // setup
  r = await req('/api/setup', { method: 'POST', body: { data: blob, adminPassword: 'admin123' } });
  ok('setup', r.status === 200 && r.j.token, 'token issued');
  adminTok = r.j.token;
  r = await req('/api/setup', { method: 'POST', body: { data: blob, adminPassword: 'x' } });
  ok('setup-twice-409', r.status === 409);

  // admin login
  r = await req('/api/admin/login', { method: 'POST', body: { password: 'wrong' } });
  ok('admin-login-wrong-401', r.status === 401);
  r = await req('/api/admin/login', { method: 'POST', body: { password: 'admin123' } });
  ok('admin-login-ok', r.status === 200 && r.j.token);
  const A = { headers: { Authorization: 'Bearer ' + r.j.token } };

  // admin data roundtrip
  r = await req('/api/admin/data', A);
  ok('admin-data', r.status === 200 && r.j.data.business.name === 'Test Salon');

  // public data (no customer phones leaked)
  r = await req('/api/public/data');
  ok('public-data', r.status === 200 && r.j.exists && r.j.services.length === 1);
  ok('public-no-customers', !('customers' in r.j) && !('appointments' in r.j));

  // slots
  const ds = addDays(1);
  r = await req(`/api/public/slots?serviceId=svc1&staffId=any&date=${ds}`);
  ok('slots', r.status === 200 && r.j.slots.length > 5, r.j.slots.length + ' slots');
  const slot = r.j.slots[0].start;

  // public booking
  r = await req('/api/public/book', { method: 'POST', body: { serviceId: 'svc1', staffId: 'any', date: ds, start: slot, name: 'Kamala', phone: '0771112223', notes: '', lang: 'si' } });
  ok('public-book', r.status === 200 && /^BK-/.test(r.j.booking.ref), 'ref ' + (r.j.booking && r.j.booking.ref));
  bookingId = r.j.booking.id;
  ok('book-pending', r.j.booking.status === 'pending');

  // double-book same slot -> 409
  r = await req('/api/public/book', { method: 'POST', body: { serviceId: 'svc1', staffId: 'any', date: ds, start: slot, name: 'Other', phone: '0779998887', lang: 'en' } });
  ok('double-book-409', r.status === 409, r.j.error);

  // bad phone -> 400
  r = await req('/api/public/book', { method: 'POST', body: { serviceId: 'svc1', staffId: 'any', date: ds, start: slot + 60, name: 'X', phone: '123', lang: 'en' } });
  ok('bad-phone-400', r.status === 400);

  // OTP flow (console provider; grab code via auth.requestOTP direct call pattern)
  const code = await auth.requestOTP('0771112223');
  r = await req('/api/otp/verify', { method: 'POST', body: { phone: '0771112223', code: '000000' } });
  ok('otp-wrong-400', r.status === 400);
  r = await req('/api/otp/verify', { method: 'POST', body: { phone: '0771112223', code } });
  ok('otp-verify-ok', r.status === 200 && r.j.token, 'customer token');
  custTok = r.j.token;
  const C = { headers: { Authorization: 'Bearer ' + custTok } };

  // my bookings
  r = await req('/api/me/bookings', C);
  ok('me-bookings', r.status === 200 && r.j.bookings.length === 1 && r.j.bookings[0].serviceId === 'svc1');

  // customer reschedule
  const ds2 = addDays(2);
  const s2 = await req(`/api/public/slots?serviceId=svc1&staffId=stf1&date=${ds2}`);
  ok('slots-day2', s2.j.slots.length > 0);
  r = await req('/api/me/bookings/' + bookingId + '/reschedule', { method: 'POST', headers: C.headers, body: { date: ds2, start: s2.j.slots[0].start } });
  ok('cust-reschedule', r.status === 200 && r.j.booking.date === ds2);

  // admin: confirm booking (SMS logged to console provider)
  r = await req('/api/admin/appointments/' + bookingId, { method: 'PATCH', headers: A.headers, body: { status: 'confirmed' } });
  ok('admin-confirm', r.status === 200 && r.j.booking.status === 'confirmed');

  // admin quick book
  const s3 = await req(`/api/public/slots?serviceId=svc1&staffId=stf1&date=${ds2}`);
  r = await req('/api/admin/appointments', { method: 'POST', headers: A.headers, body: { serviceId: 'svc1', staffId: 'stf1', date: ds2, start: s3.j.slots[0].start, name: 'Walkin', phone: '0772223334', notes: '' } });
  ok('admin-quickbook', r.status === 200 && r.j.booking.status === 'confirmed');
  const qbId = r.j.booking.id;

  // admin delete
  r = await req('/api/admin/appointments/' + qbId, { method: 'DELETE', headers: A.headers });
  ok('admin-delete', r.status === 200);

  // sms log has entries
  r = await req('/api/admin/sms-log', A);
  ok('sms-log', r.status === 200 && r.j.log.length >= 3, r.j.log.length + ' entries');

  // review flow: complete the booking then review
  await req('/api/admin/appointments/' + bookingId, { method: 'PATCH', headers: A.headers, body: { status: 'completed' } });
  r = await req('/api/public/review', { method: 'POST', body: { appointmentId: bookingId, phone: '0771112223', rating: 5, comment: 'Great!' } });
  ok('review-ok', r.status === 200);
  r = await req('/api/public/review', { method: 'POST', body: { appointmentId: bookingId, phone: '0771112223', rating: 5, comment: 'Again' } });
  ok('review-dup-409', r.status === 409);

  // customer cancel of another customer's booking -> 403
  const code2 = await auth.requestOTP('0779998887');
  const v2 = await req('/api/otp/verify', { method: 'POST', body: { phone: '0779998887', code: code2 } });
  r = await req('/api/me/bookings/' + bookingId + '/cancel', { method: 'POST', headers: { Authorization: 'Bearer ' + v2.j.token } });
  ok('cancel-not-yours-403', r.status === 403);

  // unauthorized admin access
  r = await req('/api/admin/data');
  ok('admin-noauth-401', r.status === 401);

  console.log(results.join('\n'));
  console.log('ALL API TESTS PASSED');
  srv.close();
  process.exit(0);
})().catch(e => { console.error('TEST CRASH:', e); process.exit(1); });
