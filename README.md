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

## Deploy to Render (recommended — no phone verification needed)

### 1. Database — Neon (free)
1. Sign up at https://neon.tech → create a project & database.
2. Copy the connection string (starts with `postgresql://`).

### 2. Push this folder to GitHub
```bash
cd bookeasy-web
git init && git add . && git commit -m "BookEasy web"
# create a repo on github.com and:
git remote add origin <your-repo-url> && git push -u origin main
```

### 3. Deploy with one click (Blueprint)
1. https://render.com → Sign up with GitHub → **New → Blueprint** → select your repo.
2. When asked, paste your Neon `DATABASE_URL`. (`SMS_PROVIDER` stays `console` for testing.)
3. **Apply** → Render builds and gives you a public URL like `https://bookeasy.onrender.com`.
4. Open the URL → run the setup wizard. Done!

> Note: Vercel's signup asks for phone verification which is **not available for
> Sri Lankan numbers** (known issue). Render has no such step, and the app runs
> identically there (`npm start`).

### Alternative: Vercel (if you prefer)
Vercel's login requires SMS verification, which is not enabled for Sri Lanka.
If you still want Vercel, email **registration@vercel.com** from your signup email
and ask them to manually verify your account (their own recommended path).

### 4. SMS (real messages to customers)
Pick a provider and set env vars in Vercel → Settings → Environment Variables:

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
3. **Render:** https://render.com → GitHub වලින් Sign up → **New → Blueprint** → repo එක තෝරන්න.
   `DATABASE_URL` (Neon string එක) paste කර **Apply** කරන්න. Deploy වුණාම public URL එකක් ලැබෙනවා.
   (Vercel එකේ phone verification ලංකාවට නැති නිසා Render නිර්දේශ කරන්නේ.)
4. URL එක open කර setup wizard එකෙන් ව්‍යාපාරය හදන්න.
5. **SMS:** ඇත්ත SMS යවන්න නම් SMS provider කෙනෙක් ඕනෙ (Twilio / Textware.lk / Dialog).
   Vercel env vars වල `SMS_PROVIDER=twilio` (හෝ `webhook`) දමා අදාළ keys දාන්න.
   මුලින් test කරන්න `SMS_PROVIDER=console` තියන්න — SMS server logs වල පෙන්වයි.

**Customer registration:** දුරකථන අංකය + SMS OTP කේතයෙන් login වේ.
**Admin:** setup එකේදී දුන්නු password එකෙන් Manage panel එකට login වේ.
