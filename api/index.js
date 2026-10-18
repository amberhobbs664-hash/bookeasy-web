// BookEasy API — Express app factory (multi-tenant).
// Used by server.js (local), Vercel serverless (exported handler), and tests.
const express = require('express');
const db = require('../lib/db');
const auth = require('../lib/auth');
const sms = require('../lib/sms');
const S = require('../lib/slots');

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled', 'noshow'];
const MAX_TENANTS = 200;

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

async function notifyCustomer(tid, data, booking, kind, lang) {
  const c = data.customers.find(x => x.id === booking.customerId);
  if (!c) return;
  const a = {
    name: c.name, biz: data.business.name, date: fmtDate(booking.date), time: fmtTime(booking.start),
    service: svcName(data, booking.serviceId), ref: booking.ref,
  };
  const tpl = sms.MSG[kind] || sms.MSG.booked;
  try { await sms.sendSMS(c.phone, tpl(a, lang || 'en'), tid); }
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

// Resolve the tenant for this request: from /s/:slug, or the single tenant
// when exactly one exists on a non-demo deployment (backward compatible).
// Null tenant = no store at this path (landing / setup shows).
async function resolveTenant(req, res, next) {
  let slug = req.params.slug || null;
  if (!slug) {
    const n = await db.countTenants();
    if (n === 1 && !isDemo()) slug = (await db.listTenants())[0].id;
    else { req.tenant = null; return next(); }
  } else if (!await db.tenantExists(slug)) {
    throw err(404, 'unknown-tenant');
  }
  req.tenant = slug ? { id: slug } : null;
  next();
}
const tidOf = (req) => (req.tenant ? req.tenant.id : null);

async function createApp() {
  await db.init();
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

  /* ---------- tenant creation ---------- */
  // Allowed on first run (zero tenants) or whenever DEMO_MODE=true.
  app.post('/api/tenants', asyncH(async (req, res) => {
    const n = await db.countTenants();
    if (n > 0 && !isDemo()) throw err(403, 'tenants-disabled');
    if (n >= MAX_TENANTS) throw err(429, 'too-many-tenants');
    const { data, adminPassword, slug } = req.body || {};
    if (!data || !data.business || !Array.isArray(data.services) || !Array.isArray(data.staff)) throw err(400, 'bad-data');
    const nameStr = data.business.name && data.business.name.en ? data.business.name.en : data.business.name;
    let finalSlug = /^[a-z0-9-]{3,40}$/.test(slug || '') ? String(slug) : db.slugify(nameStr);
    finalSlug = await db.uniqueSlug(db.getPool(), finalSlug);
    await db.createTenant(finalSlug);
    await auth.setAdminPassword(adminPassword, finalSlug);
    data.appointments = data.appointments || [];
    data.customers = data.customers || [];
    data.reviews = data.reviews || [];
    data.seq = data.seq || 100;
    await db.setData(finalSlug, data);
    const token = await auth.createSession('admin', null, 7 * 24 * 3600, finalSlug);
    res.json({ ok: true, slug: finalSlug, token });
  }));

  /* ---------- tenant-scoped API (mounted at /api and /s/:slug/api) ---------- */
  const api = express.Router({ mergeParams: true });
  api.use(asyncH(resolveTenant));

  const adminAuth = asyncH(async (req, res, next) => {
    const tok = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const s = await auth.getSession(tok);
    if (!s || s.kind !== 'admin' || !req.tenant || s.tenant_id !== req.tenant.id) throw err(401, 'unauthorized');
    next();
  });
  const custAuth = asyncH(async (req, res, next) => {
    const tok = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const s = await auth.getSession(tok);
    if (!s || s.kind !== 'customer' || !req.tenant || s.tenant_id !== req.tenant.id) throw err(401, 'unauthorized');
    req.phone = s.ref_id;
    next();
  });

  api.post('/admin/login', asyncH(async (req, res) => {
    const tid = tidOf(req);
    const ok = await auth.verifyAdminPassword(req.body && req.body.password, tid);
    if (!ok) throw err(401, 'wrong-password');
    const token = await auth.createSession('admin', null, 7 * 24 * 3600, tid);
    res.json({ token });
  }));
  api.post('/admin/logout', adminAuth, asyncH(async (req, res) => {
    const tok = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    await auth.destroySession(tok);
    res.json({ ok: true });
  }));

  /* ---------- admin data ---------- */
  api.get('/admin/data', adminAuth, asyncH(async (req, res) => {
    const data = await db.getData(tidOf(req));
    if (!data) throw err(404, 'no-business');
    res.json({ data, demo: isDemo() });
  }));
  api.put('/admin/data', adminAuth, asyncH(async (req, res) => {
    const { data } = req.body || {};
    if (!data || !data.business || !Array.isArray(data.services) || !Array.isArray(data.staff)) throw err(400, 'bad-data');
    await db.setData(tidOf(req), data);
    res.json({ ok: true });
  }));
  api.delete('/admin/reset', adminAuth, asyncH(async (req, res) => {
    await db.deleteTenant(tidOf(req));
    res.json({ ok: true });
  }));

  /* ---------- admin appointments ---------- */
  api.post('/admin/appointments', adminAuth, asyncH(async (req, res) => {
    const tid = tidOf(req);
    const data = await db.getData(tid);
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
    await db.setData(tid, data);
    notifyCustomer(tid, data, booking, 'booked', 'en');
    res.json({ booking });
  }));

  api.patch('/admin/appointments/:id', adminAuth, asyncH(async (req, res) => {
    const tid = tidOf(req);
    const data = await db.getData(tid);
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
    await db.setData(tid, data);
    if (smsKind) notifyCustomer(tid, data, a, smsKind, 'en');
    res.json({ booking: a });
  }));

  api.delete('/admin/appointments/:id', adminAuth, asyncH(async (req, res) => {
    const tid = tidOf(req);
    const data = await db.getData(tid);
    if (!data) throw err(404, 'no-business');
    data.appointments = data.appointments.filter(x => x.id !== req.params.id);
    await db.setData(tid, data);
    res.json({ ok: true });
  }));

  api.post('/admin/sms', adminAuth, asyncH(async (req, res) => {
    const { phone, message } = req.body || {};
    if (!S.validPhone(phone) || !message) throw err(400, 'bad-sms');
    await sms.sendSMS(auth.normPhone(phone), String(message).slice(0, 1000), tidOf(req));
    res.json({ ok: true });
  }));
  api.get('/admin/sms-log', adminAuth, asyncH(async (req, res) => {
    const r = await db.getPool().query(
      'SELECT phone, message, provider, status, created_at FROM sms_log WHERE tenant_id=$1 ORDER BY id DESC LIMIT 100',
      [tidOf(req)]
    );
    res.json({ log: r.rows });
  }));

  /* ---------- public ---------- */
  api.get('/public/data', asyncH(async (req, res) => {
    const data = await db.getData(tidOf(req));
    if (!data) return res.json({ exists: false, demo: isDemo() });
    const pub = publicData(data); pub.demo = isDemo();
    res.json(pub);
  }));
  /* demo mode: public reset of THIS tenant (only when DEMO_MODE=true) */
  api.post('/demo/reset', asyncH(async (req, res) => {
    if (!isDemo()) throw err(403, 'demo-disabled');
    if (!req.tenant) throw err(404, 'no-business');
    await db.deleteTenant(req.tenant.id);
    res.json({ ok: true });
  }));
  api.get('/public/slots', asyncH(async (req, res) => {
    const data = await db.getData(tidOf(req));
    if (!data) throw err(404, 'no-business');
    const { serviceId, staffId, date } = req.query;
    res.json({ slots: S.getSlots(data, date, serviceId, staffId || 'any') });
  }));
  api.post('/public/book', asyncH(async (req, res) => {
    const tid = tidOf(req);
    const data = await db.getData(tid);
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
    await db.setData(tid, data);
    notifyCustomer(tid, data, booking, 'booked', lang === 'si' ? 'si' : 'en');
    res.json({ booking, customer: { name: cust.name, phone: cust.phone } });
  }));
  api.post('/public/review', asyncH(async (req, res) => {
    const tid = tidOf(req);
    const data = await db.getData(tid);
    if (!data) throw err(404, 'no-business');
    const { appointmentId, phone, rating, comment } = req.body || {};
    const a = data.appointments.find(x => x.id === appointmentId);
    if (!a || a.status !== 'completed') throw err(400, 'bad-appointment');
    const c = data.customers.find(x => x.id === a.customerId);
    if (!c || auth.normPhone(c.phone) !== auth.normPhone(phone)) throw err(403, 'not-yours');
    if (data.reviews.some(r => r.appointmentId === appointmentId)) throw err(409, 'already-reviewed');
    const r = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));
    data.reviews.push({ id: S.uid('rev'), appointmentId, rating: r, comment: { en: String(comment || ''), si: String(comment || '') }, createdAt: S.todayStr() });
    await db.setData(tid, data);
    res.json({ ok: true });
  }));

  /* ---------- customer OTP auth ---------- */
  api.post('/otp/request', asyncH(async (req, res) => {
    const tid = tidOf(req);
    const { phone, lang } = req.body || {};
    try {
      const code = await auth.requestOTP(phone, tid);
      try { await sms.sendSMS(auth.normPhone(phone), sms.MSG.otp(code, lang === 'si' ? 'si' : 'en'), tid); }
      catch (e) { console.error('OTP SMS failed:', e.message); }
      res.json({ ok: true, dev: (process.env.SMS_PROVIDER || 'console') === 'console' });
    } catch (e) { throw err(e.status || 500, e.message || 'otp-failed'); }
  }));
  api.post('/otp/verify', asyncH(async (req, res) => {
    const tid = tidOf(req);
    const { phone, code } = req.body || {};
    try {
      const token = await auth.verifyOTP(phone, code, tid);
      res.json({ token, phone: auth.normPhone(phone) });
    } catch (e) { throw err(e.status || 500, e.message || 'verify-failed'); }
  }));

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
  api.get('/me/bookings', custAuth, asyncH(async (req, res) => {
    const data = await db.getData(tidOf(req));
    if (!data) throw err(404, 'no-business');
    res.json({ bookings: myBookings(data, req.phone) });
  }));
  api.post('/me/bookings/:id/cancel', custAuth, asyncH(async (req, res) => {
    const tid = tidOf(req);
    const data = await db.getData(tid);
    if (!data) throw err(404, 'no-business');
    const a = data.appointments.find(x => x.id === req.params.id);
    if (!a) throw err(404, 'not-found');
    const c = data.customers.find(x => x.id === a.customerId);
    if (!c || auth.normPhone(c.phone) !== req.phone) throw err(403, 'not-yours');
    if (!['pending', 'confirmed'].includes(a.status) || a.date < S.todayStr()) throw err(400, 'cannot-cancel');
    a.status = 'cancelled';
    await db.setData(tid, data);
    notifyCustomer(tid, data, a, 'cancelled', 'en');
    res.json({ ok: true });
  }));
  api.post('/me/bookings/:id/reschedule', custAuth, asyncH(async (req, res) => {
    const tid = tidOf(req);
    const data = await db.getData(tid);
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
    await db.setData(tid, data);
    notifyCustomer(tid, data, a, 'rescheduled', 'en');
    res.json({ ok: true, booking: a });
  }));

  app.use('/s/:slug/api', api);
  app.use('/api', api);

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
