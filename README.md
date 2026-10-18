# BookEasy Web — Appointment System (Sinhala + English)

Full-stack appointment system for salons, barber shops, lawyers and doctors.
Postgres database · real SMS notifications · customer registration via phone + OTP · bilingual UI.

## Architecture

```
public/index.html   → frontend (single file, Sinhala/English toggle)
api/index.js        → Express API (also the Vercel serverless function)
lib/db.js           → Postgres (Neon) — app data, OTPs, sessions, SMS log
lib/auth.js         → admin password (bcrypt), customer OTP, sessions
lib/sms.js          → pluggable SMS: console | twilio | webhook
lib/slots.js        → slot-availability engine (server-side validation)
server.js           → local dev server
```

One business per deployment. The first visitor runs the setup wizard
(business type, details, hours, admin password) — data is stored in Postgres.

## Deploy to Koyeb (recommended — free, no credit card, zero friction)

### 1. Database — Neon (free)
1. Sign up at https://neon.tech → create a project & database.
2. Copy the connection string (starts with `postgresql://`).
   (Alternative: Koyeb also offers a free managed PostgreSQL database —
   create it in the Koyeb dashboard and use its connection string.)

### 2. Deploy on Koyeb
1. https://koyeb.com → Sign up with GitHub (no credit card needed for the free tier).
2. **Create Service → GitHub** → select the `bookeasy-web` repo → branch `main`.
3. Instance type: **Free** (eNano, 512 MB RAM — enough for this app).
4. Environment variables:
   ```
   DATABASE_URL=postgresql://...   (your Neon string)
   SMS_PROVIDER=console
   ```
5. Deploy. Koyeb gives you a `https://your-app.koyeb.app` URL —
   open it and run the **setup wizard** (business type, hours, admin password).

> Notes: the free instance may scale to zero after ~1 hour of no traffic and
> take a few seconds to wake on the next visit. The database (Neon) keeps all
> data safe regardless. Any `git push` to `main` redeploys automatically.

### Alternative: Render (free tier, but may ask for a card)
Render's web hosting is free, but new accounts are sometimes asked for a credit
card during signup. If that happens, use Koyeb above. If you get past signup:
**New → Web Service** → connect the repo → plan **Free** → env vars
`DATABASE_URL` (Neon — do NOT create the database on Render) and `SMS_PROVIDER=console`.

### Alternative: Vercel (if you prefer)
Vercel's login requires SMS verification, which is not enabled for Sri Lanka.
If you still want Vercel, email **registration@vercel.com** from your signup email
and ask them to manually verify your account (their own recommended path).

### 4. SMS (real messages to customers)
Pick a provider and set the env vars in your host's dashboard (Koyeb → Service → Environment):

| Provider | `SMS_PROVIDER` | Extra env vars |
|---|---|---|
| Testing (logs only) | `console` | — |
| Twilio | `twilio` | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` |
| Any HTTP gateway (Textware.lk, eSMS, Dialog Ideamart…) | `webhook` | `SMS_WEBHOOK_URL`, `SMS_WEBHOOK_KEY` (optional) |

The `webhook` provider POSTs JSON `{ "to": "<phone>", "message": "<text>" }`
to your URL — point it at your gateway's API (or a tiny adapter).
SMS is sent on: booking confirmation, admin confirm/cancel/reschedule, and OTP codes.
Every send is recorded in **Reports → SMS log** in the manage panel.

> SMS gateways charge per message. `console` mode prints to the server logs —
> perfect for testing before you buy credit.

## Demo mode (let anyone try it)

Deploy a **second copy** of the app with its own database and set `DEMO_MODE=true`
(env var). The demo site shows a DEMO badge and a public "🔄 Reset demo" button —
any visitor can run the setup wizard, create their own store, try booking + admin,
then reset everything back to a blank slate for the next person.

- `POST /api/demo/reset` wipes all data — it returns **403** unless `DEMO_MODE=true`,
  so your production deployment is never affected.
- Keep `SMS_PROVIDER=console` on the demo (no real SMS sent).

**Roar AI:** My applications → New application → same GitHub repo → new database →
env vars `DEMO_MODE=true`, `SMS_PROVIDER=console`.

## Customer registration
Customers register with their **phone number + SMS OTP code** (no passwords).
After login they can see their bookings, reschedule, cancel, and leave reviews.
Admin uses the password set during setup (Manage → 🔐 login).

## Local development
```bash
npm install
cp .env.example .env   # fill in DATABASE_URL
npm start              # http://localhost:3000
npm test               # API tests (in-memory Postgres, no real DB needed)
```

## API overview
- `POST /api/setup` — first-run setup `{data, adminPassword}`
- `POST /api/admin/login` → `{token}`
- `GET/PUT /api/admin/data` — full business data (admin)
- `POST/PATCH/DELETE /api/admin/appointments…` — bookings (SMS on change)
- `GET /api/public/data`, `GET /api/public/slots`, `POST /api/public/book`, `POST /api/public/review`
- `POST /api/otp/request`, `POST /api/otp/verify` → customer token
- `GET /api/me/bookings`, `POST /api/me/bookings/:id/cancel|reschedule`

---

## 🇱🇰 සිංහලෙන් — Deploy කරන ආකාරය

1. **Database:** https://neon.tech වෙත ගොස් නොමිලේ account එකක් හදා database එකක් හදන්න. Connection string එක copy කරගන්න.
2. **GitHub:** මෙම `bookeasy-web` folder එක GitHub repo එකකට push කරන්න.
3. **Koyeb:** https://koyeb.com → GitHub වලින් Sign up (credit card ඕනෙ නැහැ) → **Create Service → GitHub** → `bookeasy-web` repo එක තෝරන්න → Instance type **Free**.
   Environment variables වල `DATABASE_URL` (Neon string එක) සහ `SMS_PROVIDER=console` දාන්න → **Deploy**. Deploy වුණාම `*.koyeb.app` public URL එකක් ලැබෙනවා.
   (Vercel එකේ phone verification ලංකාවට නැහැ, Render අලුත් accounts වලට card එකක් අහනවා — ඒ නිසා දැන් Koyeb නිර්දේශ කරන්නේ.)
4. URL එක open කර setup wizard එකෙන් ව්‍යාපාරය හදන්න.
5. **SMS:** ඇත්ත SMS යවන්න නම් SMS provider කෙනෙක් ඕනෙ (Twilio / Textware.lk / Dialog).
   Koyeb env vars වල `SMS_PROVIDER=twilio` (හෝ `webhook`) දමා අදාළ keys දාන්න.
   මුලින් test කරන්න `SMS_PROVIDER=console` තියන්න — SMS server logs වල පෙන්වයි.

**Customer registration:** දුරකථන අංකය + SMS OTP කේතයෙන් login වේ.
**Admin:** setup එකේදී දුන්නු password එකෙන් `/admin` පිටුවෙන් login වේ.

## 🇱🇰 ඩෙමෝ එකක් හදන ආකාරය

ඕනෙම කෙනෙකුට setup කරලා බලන්න පුළුවන් demo site එකක් හදන්න:
1. **Roar AI:** My applications → New application → අලුත් database එකක් සමඟ (production DB එකෙන් වෙන්ව)
2. Env vars: `DEMO_MODE=true`, `SMS_PROVIDER=console`
3. Demo site එකේ DEMO badge එකක් + **"🔄 Reset demo"** බොත්තමක් පෙන්වයි — කවුරුහරි setup කර, booking/admin try කර, reset කර අලුතෙන් පටන් ගන්න පුළුවන්.
4. `DEMO_MODE=true` නැති production site එකේ reset endpoint එක 403 — Glamour Salon data එකට අත වදින්නෙ නැහැ.
