// OTP + session + admin password helpers
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('./db');

const OTP_TTL_MIN = 5;
const OTP_MAX_PER_HOUR = 5;

function normPhone(p) { return String(p || '').replace(/\D/g, ''); }

async function requestOTP(phone) {
  phone = normPhone(phone);
  if (phone.length < 9 || phone.length > 12) throw { status: 400, message: 'bad-phone' };
  const p = db.getPool();
  const recent = await p.query(
    "SELECT COUNT(*)::int AS c FROM otps WHERE phone=$1 AND created_at > now() - interval '1 hour'",
    [phone]
  );
  if (recent.rows[0].c >= OTP_MAX_PER_HOUR) throw { status: 429, message: 'too-many' };
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const hash = await bcrypt.hash(code, 8);
  await p.query('DELETE FROM otps WHERE phone=$1', [phone]);
  await p.query(
    "INSERT INTO otps (phone, code_hash, expires_at) VALUES ($1,$2, now() + ($3 || ' minutes')::interval)",
    [phone, hash, String(OTP_TTL_MIN)]
  );
  return code;
}

async function verifyOTP(phone, code) {
  phone = normPhone(phone);
  const p = db.getPool();
  const r = await p.query('SELECT * FROM otps WHERE phone=$1 ORDER BY id DESC LIMIT 1', [phone]);
  if (!r.rows.length) throw { status: 400, message: 'no-otp' };
  const row = r.rows[0];
  if (new Date(row.expires_at) < new Date()) { await p.query('DELETE FROM otps WHERE id=$1', [row.id]); throw { status: 400, message: 'expired' }; }
  if (row.attempts >= 3) { await p.query('DELETE FROM otps WHERE id=$1', [row.id]); throw { status: 400, message: 'locked' }; }
  const ok = await bcrypt.compare(String(code), row.code_hash);
  if (!ok) {
    await p.query('UPDATE otps SET attempts=attempts+1 WHERE id=$1', [row.id]);
    throw { status: 400, message: 'wrong-code' };
  }
  await p.query('DELETE FROM otps WHERE phone=$1', [phone]);
  return createSession('customer', phone, 30 * 24 * 3600);
}

async function createSession(kind, refId, ttlSec) {
  const token = crypto.randomBytes(32).toString('hex');
  await db.getPool().query(
    "INSERT INTO sessions (token, kind, ref_id, expires_at) VALUES ($1,$2,$3, now() + ($4 || ' seconds')::interval)",
    [token, kind, refId || null, String(ttlSec)]
  );
  return token;
}

async function getSession(token) {
  if (!token) return null;
  const r = await db.getPool().query('SELECT * FROM sessions WHERE token=$1 AND expires_at > now()', [token]);
  return r.rows.length ? r.rows[0] : null;
}

async function destroySession(token) {
  await db.getPool().query('DELETE FROM sessions WHERE token=$1', [token]);
}

async function setAdminPassword(password) {
  if (!password || password.length < 4) throw { status: 400, message: 'weak-password' };
  const hash = await bcrypt.hash(password, 10);
  const p = db.getPool();
  await p.query('DELETE FROM admins');
  await p.query('INSERT INTO admins (pass_hash) VALUES ($1)', [hash]);
}

async function verifyAdminPassword(password) {
  const r = await db.getPool().query('SELECT pass_hash FROM admins ORDER BY id DESC LIMIT 1');
  if (!r.rows.length) return false;
  return bcrypt.compare(String(password), r.rows[0].pass_hash);
}

module.exports = { normPhone, requestOTP, verifyOTP, createSession, getSession, destroySession, setAdminPassword, verifyAdminPassword };
