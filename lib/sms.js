// Pluggable SMS sender. Providers: console | twilio | webhook
// Every send is recorded in sms_log (best effort).
const db = require('./db');

async function logSms(tenantId, phone, message, provider, status, error) {
  try {
    await db.getPool().query(
      'INSERT INTO sms_log (tenant_id, phone, message, provider, status, error) VALUES ($1,$2,$3,$4,$5,$6)',
      [tenantId || null, phone, message, provider, status, error || null]
    );
  } catch (e) { /* logging must never break the flow */ }
}

async function sendViaTwilio(phone, message) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const tok = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !tok || !from) throw new Error('Twilio env vars missing');
  const body = new URLSearchParams({ To: phone, From: from, Body: message });
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(sid + ':' + tok).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  if (!r.ok) throw new Error('Twilio HTTP ' + r.status + ': ' + (await r.text()).slice(0, 200));
}

async function sendViaWebhook(phone, message) {
  const url = process.env.SMS_WEBHOOK_URL;
  const key = process.env.SMS_WEBHOOK_KEY;
  if (!url) throw new Error('SMS_WEBHOOK_URL not set');
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(key ? { 'Authorization': 'Bearer ' + key } : {}) },
    body: JSON.stringify({ to: phone, message }),
  });
  if (!r.ok) throw new Error('Webhook HTTP ' + r.status + ': ' + (await r.text()).slice(0, 200));
}

async function sendSMS(phone, message, tenantId) {
  const provider = (process.env.SMS_PROVIDER || 'console').toLowerCase();
  try {
    if (provider === 'console') {
      console.log(`[SMS:${provider}] to ${phone}: ${message}`);
    } else if (provider === 'twilio') {
      await sendViaTwilio(phone, message);
    } else if (provider === 'webhook') {
      await sendViaWebhook(phone, message);
    } else {
      throw new Error('Unknown SMS_PROVIDER: ' + provider);
    }
    await logSms(tenantId, phone, message, provider, 'sent');
    return { ok: true, provider };
  } catch (e) {
    await logSms(tenantId, phone, message, provider, 'failed', e.message);
    throw e;
  }
}

// Short bilingual templates
const MSG = {
  otp: (code, lang) => lang === 'si'
    ? `BookEasy: ඔබේ OTP කේතය ${code} යි. මිනිත්තු 5ක් වලංගුයි.`
    : `BookEasy: your OTP code is ${code}. Valid for 5 minutes.`,
  booked: (a, lang) => lang === 'si'
    ? `BookEasy: ආයුබෝවන් ${a.name}, ${a.biz} හි ඔබේ හමුවීම තහවුරුයි: ${a.date} ${a.time} (${a.service}). අංකය: ${a.ref}`
    : `BookEasy: Hi ${a.name}, your appointment at ${a.biz} is confirmed: ${a.date} at ${a.time} (${a.service}). Ref: ${a.ref}`,
  confirmed: (a, lang) => lang === 'si'
    ? `BookEasy: ${a.biz} හි ඔබේ හමුවීම (${a.date} ${a.time}) තහවුරු කළා. අංකය: ${a.ref}`
    : `BookEasy: your appointment at ${a.biz} (${a.date} at ${a.time}) is confirmed. Ref: ${a.ref}`,
  cancelled: (a, lang) => lang === 'si'
    ? `BookEasy: ${a.biz} හි ඔබේ හමුවීම (${a.date} ${a.time}) අවලංගු කළා. අංකය: ${a.ref}`
    : `BookEasy: your appointment at ${a.biz} (${a.date} at ${a.time}) was cancelled. Ref: ${a.ref}`,
  rescheduled: (a, lang) => lang === 'si'
    ? `BookEasy: ඔබේ හමුවීම නැවත යොදන ලදී: ${a.date} ${a.time}. අංකය: ${a.ref}`
    : `BookEasy: your appointment was rescheduled to ${a.date} at ${a.time}. Ref: ${a.ref}`,
};

module.exports = { sendSMS, MSG };
