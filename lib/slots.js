// Pure slot-availability logic (shared by API endpoints). Mirrors the frontend engine.
function pad(n) { return String(n).padStart(2, '0'); }
function dstr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function parseDS(ds) { return new Date(ds + 'T12:00:00'); }
function todayStr() { return dstr(new Date()); }
function addDays(ds, n) { const d = parseDS(ds); d.setDate(d.getDate() + n); return dstr(d); }

function bizHoursFor(data, ds) {
  const b = data.business;
  if ((b.holidays || []).some(h => h.date === ds)) return null;
  const h = b.hours[parseDS(ds).getDay()];
  if (!h || h.closed) return null;
  return h;
}
function overlaps(aS, aE, bS, bE) { return aS < bE && bS < aE; }
function staffBusy(data, staffId, ds, ignoreId) {
  return data.appointments
    .filter(a => a.staffId === staffId && a.date === ds && a.status !== 'cancelled' && a.id !== ignoreId)
    .map(a => [a.start, a.end]);
}
function getSlots(data, ds, serviceId, staffId, ignoreId, nowOverride) {
  const svc = data.services.find(s => s.id === serviceId && s.active);
  if (!svc) return [];
  const h = bizHoursFor(data, ds);
  if (!h) return [];
  const dur = svc.duration + (data.business.bufferMin || 0);
  const step = 15, out = [], seen = {};
  const now = nowOverride || new Date();
  const isToday = ds === todayStr();
  const lead = now.getHours() * 60 + now.getMinutes() + 30;
  const list = staffId === 'any'
    ? data.staff.filter(s => s.active && s.services.includes(serviceId))
    : data.staff.filter(s => s.id === staffId && s.active);
  for (const st of list) {
    if ((st.daysOff || []).includes(ds)) continue;
    const busy = staffBusy(data, st.id, ds, ignoreId);
    for (let s = h.open; s + dur <= h.close; s += step) {
      if (isToday && s < lead) continue;
      const e = s + dur;
      if (busy.some(b => overlaps(s, e, b[0], b[1]))) continue;
      if (staffId === 'any' && seen[s]) continue;
      seen[s] = 1;
      out.push({ start: s, staffId: st.id });
    }
  }
  return out.sort((a, b) => a.start - b.start);
}
function slotFree(data, ds, start, serviceId, staffId, ignoreId) {
  return getSlots(data, ds, serviceId, staffId, ignoreId).some(s => s.start === start && (staffId === 'any' || s.staffId === staffId));
}
function validPhone(p) { const d = String(p).replace(/\D/g, ''); return d.length >= 9 && d.length <= 12; }
function uid(p) { return (p || 'id') + '_' + Math.random().toString(36).slice(2, 10); }
function newRef(data) {
  data.seq = (data.seq || 100) + 1;
  return 'BK-' + data.seq.toString(36).toUpperCase().padStart(4, '0') + Math.random().toString(36).slice(2, 4).toUpperCase();
}
function findOrCreateCustomer(data, name, phone) {
  const ph = String(phone).replace(/\D/g, '');
  let c = data.customers.find(c => c.phone.replace(/\D/g, '') === ph);
  if (!c) { c = { id: uid('cus'), name, phone, notes: '', createdAt: todayStr() }; data.customers.push(c); }
  else if (name && c.name !== name) { c.name = name; }
  return c;
}

module.exports = { pad, dstr, parseDS, todayStr, addDays, bizHoursFor, getSlots, slotFree, validPhone, uid, newRef, findOrCreateCustomer };
