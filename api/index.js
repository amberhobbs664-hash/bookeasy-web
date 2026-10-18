// BookEasy API — Express app factory.
// Used by server.js (local), Vercel serverless (exported handler), and tests.
const express = require('express');
const db = require('../lib/db');
const auth = require('../lib/auth');
const sms = require('../lib/sms');
const S = require('../lib/slots');

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled', 'noshow'];

function asyncH(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
function err(status, message) { const e = new Error(message); e.status = status; return e; }
function isDemo() { return process.env.DEMO_MODE === 'true'; }

// Public-safe subset of the business data (no customer phones, no full appointment list)
function publicData(data) {
  const b = data.business;
  return {
    exists: true, type: data.type, icon: data.icon,
    business: { name: b.name, phone: b.phone, address: b.address, about: b.about, hours: b.hours, holidays: b.holidays || [] },
    services: data.services.filter(s => s.active).map(s => ({ id: s.id, name: s.name, price: s.price, duration: s.duration, cat: s.cat })),
    staff: data.staff.filter(s => s.active).map(s => ({ id: s.id, name: s.name, role: s.role, services: s.services, daysOff: s.daysOff || [] })),
    reviews: data.reviews.slice(-24).reverse().map(r => {
      const a = data.appointments.find(x => x.id === r.appointmentId);
      const c = a && data.customers.find(x => x.id === a.customerId);
      return { rating: r.rating, comment: r.comment, name: c ? String(c.name).split(' ')[0] : '' };
    }),
  };
}

function fmtDate(ds) { const d = S.parseDS(ds); return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(); }
function fmtTime(min) { let h = Math.floor(min / 60); const m = min % 60, ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + String(m).padStart(2, '0') + ' ' + ap; }
function svcName(data, id) { const s = data.services.find(x => x.id === id); return s ? (s.name.en || s.name) : ''; }

async function notifyCustomer(data, booking, kind, lang) {
  const c = data.customers.find(x => x.id === booking.customerId);
  if (!c) return;
  const a = {
    name: c.name, biz: data.business.name, date: fmtDate(booking.date), time: fmtTime(booking.start),
    service: svcName(data, booking.serviceId), ref: booking.ref,
  };
  const tpl = sms.MSG[kind] || sms.MSG.booked;
  try { await sms.sendSMS(c.phone, tpl(a, lang || 'en')); }
  catch (e) { console.error('SMS failed:', e.message); }
}

function validateBookingInput(data, { serviceId, staffId, date, start }) {
  const svc = data.services.find(s => s.id === serviceId && s.active);
  if (!svc) throw err(400, 'bad-service');
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw err(400, 'bad-date');
  if (date < S.todayStr() || date > S.addDays(S.todayStr(), 60)) throw err(400, 'date-out-of-range');
  if (!Number.isInteger(start)) throw err(400, 'bad-time');
  let stId = staffId;
  if (staffId === 'any') {
    const slots = S.getSlots(data, date, serviceId, 'any');
    const m = slots.find(s => s.start === start);
    if (!m) throw err(409, 'slot-taken');
    stId = m.staffId;
  } else {
    const st = data.staff.find(s => s.id === staffId && s.active);
    if (!st || !st.services.includes(serviceId)) throw err(400, 'bad-staff');
    if (!S.slotFree(data, date, start, serviceId, staffId)) throw err(409, 'slot-taken');
  }
  return { svc, stId };
}

async function createApp() {
  await db.init();
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

  /* ---------- setup (first run only) ---------- */
  app.post('/api/setup', asyncH(async (req, res) => {
    if (await db.getData()) throw err(409, 'already-setup');
    const { data, adminPassword } = req.body || {};
    if (!data || !data.business || !Array.isArray(data.services) || !Array.isArray(data.staff)) throw err(400, 'bad-data');
    await auth.setAdminPassword(adminPassword);
    data.appointments = data.appointments || [];
    data.customers = data.customers || [];
    data.reviews = data.reviews || [];
    data.seq = data.seq || 100;
    await db.setData(data);
    const token = await auth.createSession('admin', null, 7 * 24 * 3600);
    res.json({ ok: true, token });
  }));

  /* ---------- admin auth ---------- */
  const adminAuth = asyncH(async (req, res, next) => {
    const tok = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const s = await auth.getSession(tok);
    if (!s || s.kind !== 'admin') throw err(401, 'unauthorized');
    next();
  });
  app.post('/api/admin/login', asyncH(async (req, res) => {
    const ok = await auth.verifyAdminPassword(req.body && req.body.password);
    if (!ok) throw err(401, 'wrong-password');
    const token = await auth.createSession('admin', null, 7 * 24 * 3600);
    res.json({ token });
  }));
  app.post('/api/admin/logout', adminAuth, asyncH(async (req, res) => {
    const tok = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    await auth.destroySession(tok);
    res.json({ ok: true });
  }));

  /* ---------- admin data ---------- */
  app.get('/api/admin/data', adminAuth, asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    res.json({ data, demo: isDemo() });
  }));
  app.put('/api/admin/data', adminAuth, asyncH(async (req, res) => {
    const { data } = req.body || {};
    if (!data || !data.business || !Array.isArray(data.services) || !Array.isArray(data.staff)) throw err(400, 'bad-data');
    await db.setData(data);
    res.json({ ok: true });
  }));
  app.delete('/api/admin/reset', adminAuth, asyncH(async (req, res) => {
    await db.clearAll();
    res.json({ ok: true });
  }));

  /* ---------- admin appointments ---------- */
  app.post('/api/admin/appointments', adminAuth, asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    const { serviceId, staffId, date, start, name, phone, notes } = req.body || {};
    if (!name || !S.validPhone(phone)) throw err(400, 'bad-customer');
    const { svc, stId } = validateBookingInput(data, { serviceId, staffId, date, start });
    const cust = S.findOrCreateCustomer(data, String(name).trim(), phone);
    const booking = {
      id: S.uid('apt'), ref: S.newRef(data), customerId: cust.id, serviceId: svc.id, staffId: stId,
      date, start, end: start + svc.duration + (data.business.bufferMin || 0),
      status: 'confirmed', notes: String(notes || ''), createdAt: S.todayStr(),
    };
    data.appointments.push(booking);
    await db.setData(data);
    notifyCustomer(data, booking, 'booked', 'en');
    res.json({ booking });
  }));

  app.patch('/api/admin/appointments/:id', adminAuth, asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    const a = data.appointments.find(x => x.id === req.params.id);
    if (!a) throw err(404, 'not-found');
    const { status, date, start } = req.body || {};
    let smsKind = null;
    if (status !== undefined) {
      if (!STATUSES.includes(status)) throw err(400, 'bad-status');
      if (a.status !== status) {
        a.status = status;
        if (status === 'confirmed') smsKind = 'confirmed';
        if (status === 'cancelled') smsKind = 'cancelled';
      }
    }
    if (date !== undefined && start !== undefined) {
      if (!S.slotFree(data, date, start, a.serviceId, a.staffId, a.id)) throw err(409, 'slot-taken');
      const svc = data.services.find(s => s.id === a.serviceId);
      a.date = date; a.start = start;
      a.end = start + (svc ? svc.duration : 30) + (data.business.bufferMin || 0);
      smsKind = 'rescheduled';
    }
    await db.setData(data);
    if (smsKind) notifyCustomer(data, a, smsKind, 'en');
    res.json({ booking: a });
  }));

  app.delete('/api/admin/appointments/:id', adminAuth, asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    data.appointments = data.appointments.filter(x => x.id !== req.params.id);
    await db.setData(data);
    res.json({ ok: true });
  }));

  app.post('/api/admin/sms', adminAuth, asyncH(async (req, res) => {
    const { phone, message } = req.body || {};
    if (!S.validPhone(phone) || !message) throw err(400, 'bad-sms');
    await sms.sendSMS(auth.normPhone(phone), String(message).slice(0, 1000));
    res.json({ ok: true });
  }));
  app.get('/api/admin/sms-log', adminAuth, asyncH(async (req, res) => {
    const r = await db.getPool().query('SELECT phone, message, provider, status, created_at FROM sms_log ORDER BY id DESC LIMIT 100');
    res.json({ log: r.rows });
  }));

  /* ---------- public ---------- */
  app.get('/api/public/data', asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) return res.json({ exists: false, demo: isDemo() });
    const pub = publicData(data); pub.demo = isDemo();
    res.json(pub);
  }));
  /* ---------- demo mode: public reset (only when DEMO_MODE=true) ---------- */
  app.post('/api/demo/reset', asyncH(async (req, res) => {
    if (!isDemo()) throw err(403, 'demo-disabled');
    await db.clearAll();
    res.json({ ok: true });
  }));
  app.get('/api/public/slots', asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    const { serviceId, staffId, date } = req.query;
    res.json({ slots: S.getSlots(data, date, serviceId, staffId || 'any') });
  }));
  app.post('/api/public/book', asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    const { serviceId, staffId, date, start, name, phone, notes, lang } = req.body || {};
    if (!name || !S.validPhone(phone)) throw err(400, 'bad-customer');
    const { svc, stId } = validateBookingInput(data, { serviceId, staffId, date, start });
    const cust = S.findOrCreateCustomer(data, String(name).trim(), phone);
    const booking = {
      id: S.uid('apt'), ref: S.newRef(data), customerId: cust.id, serviceId: svc.id, staffId: stId,
      date, start, end: start + svc.duration + (data.business.bufferMin || 0),
      status: 'pending', notes: String(notes || ''), createdAt: S.todayStr(),
    };
    data.appointments.push(booking);
    await db.setData(data);
    notifyCustomer(data, booking, 'booked', lang === 'si' ? 'si' : 'en');
    res.json({ booking, customer: { name: cust.name, phone: cust.phone } });
  }));
  app.post('/api/public/review', asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    const { appointmentId, phone, rating, comment } = req.body || {};
    const a = data.appointments.find(x => x.id === appointmentId);
    if (!a || a.status !== 'completed') throw err(400, 'bad-appointment');
    const c = data.customers.find(x => x.id === a.customerId);
    if (!c || auth.normPhone(c.phone) !== auth.normPhone(phone)) throw err(403, 'not-yours');
    if (data.reviews.some(r => r.appointmentId === appointmentId)) throw err(409, 'already-reviewed');
    const r = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));
    data.reviews.push({ id: S.uid('rev'), appointmentId, rating: r, comment: { en: String(comment || ''), si: String(comment || '') }, createdAt: S.todayStr() });
    await db.setData(data);
    res.json({ ok: true });
  }));

  /* ---------- customer OTP auth ---------- */
  app.post('/api/otp/request', asyncH(async (req, res) => {
    const { phone, lang } = req.body || {};
    try {
      const code = await auth.requestOTP(phone);
      try { await sms.sendSMS(auth.normPhone(phone), sms.MSG.otp(code, lang === 'si' ? 'si' : 'en')); }
      catch (e) { console.error('OTP SMS failed:', e.message); }
      res.json({ ok: true, dev: (process.env.SMS_PROVIDER || 'console') === 'console' });
    } catch (e) { throw err(e.status || 500, e.message || 'otp-failed'); }
  }));
  app.post('/api/otp/verify', asyncH(async (req, res) => {
    const { phone, code } = req.body || {};
    try {
      const token = await auth.verifyOTP(phone, code);
      res.json({ token, phone: auth.normPhone(phone) });
    } catch (e) { throw err(e.status || 500, e.message || 'verify-failed'); }
  }));

  const custAuth = asyncH(async (req, res, next) => {
    const tok = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const s = await auth.getSession(tok);
    if (!s || s.kind !== 'customer') throw err(401, 'unauthorized');
    req.phone = s.ref_id;
    next();
  });
  function myBookings(data, phone) {
    return data.appointments
      .filter(a => { const c = data.customers.find(x => x.id === a.customerId); return c && auth.normPhone(c.phone) === phone; })
      .map(a => {
        const s = data.services.find(x => x.id === a.serviceId) || {};
        const st = data.staff.find(x => x.id === a.staffId) || {};
        return { id: a.id, ref: a.ref, date: a.date, start: a.start, status: a.status, service: s.name || '', staff: st.name || '', price: s.price || 0, serviceId: a.serviceId, staffId: a.staffId, reviewed: data.reviews.some(r => r.appointmentId === a.id) };
      })
      .sort((a, b) => (b.date + String(b.start).padStart(4, '0')).localeCompare(a.date + String(a.start).padStart(4, '0')));
  }
  app.get('/api/me/bookings', custAuth, asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    res.json({ bookings: myBookings(data, req.phone) });
  }));
  app.post('/api/me/bookings/:id/cancel', custAuth, asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    const a = data.appointments.find(x => x.id === req.params.id);
    if (!a) throw err(404, 'not-found');
    const c = data.customers.find(x => x.id === a.customerId);
    if (!c || auth.normPhone(c.phone) !== req.phone) throw err(403, 'not-yours');
    if (!['pending', 'confirmed'].includes(a.status) || a.date < S.todayStr()) throw err(400, 'cannot-cancel');
    a.status = 'cancelled';
    await db.setData(data);
    notifyCustomer(data, a, 'cancelled', 'en');
    res.json({ ok: true });
  }));
  app.post('/api/me/bookings/:id/reschedule', custAuth, asyncH(async (req, res) => {
    const data = await db.getData();
    if (!data) throw err(404, 'no-business');
    const a = data.appointments.find(x => x.id === req.params.id);
    if (!a) throw err(404, 'not-found');
    const c = data.customers.find(x => x.id === a.customerId);
    if (!c || auth.normPhone(c.phone) !== req.phone) throw err(403, 'not-yours');
    if (!['pending', 'confirmed'].includes(a.status) || a.date < S.todayStr()) throw err(400, 'cannot-reschedule');
    const { date, start } = req.body || {};
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < S.todayStr() || date > S.addDays(S.todayStr(), 60)) throw err(400, 'bad-date');
    if (!S.slotFree(data, date, start, a.serviceId, a.staffId, a.id)) throw err(409, 'slot-taken');
    const svc = data.services.find(s => s.id === a.serviceId);
    a.date = date; a.start = start;
    a.end = start + (svc ? svc.duration : 30) + (data.business.bufferMin || 0);
    a.status = 'pending';
    await db.setData(data);
    notifyCustomer(data, a, 'rescheduled', 'en');
    res.json({ ok: true, booking: a });
  }));

  /* ---------- errors ---------- */
  // eslint-disable-next-line no-unused-vars
  app.use((e, req, res, next) => {
    console.error('API error:', e.message);
    res.status(e.status || 500).json({ error: e.message || 'server-error' });
  });

  return app;
}

// Vercel serverless: cache the app between invocations
let appPromise = null;
function handler(req, res) {
  if (!appPromise) appPromise = createApp();
  appPromise.then(app => app(req, res)).catch(e => {
    console.error('Init failed:', e);
    res.statusCode = 500; res.end('Server init failed');
  });
}

module.exports = handler;
module.exports.createApp = createApp;
module.exports.handler = handler;
