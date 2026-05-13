# TIBC Boulder Jam microsite

Modern, mobile-first event microsite (Next.js App Router + Tailwind + Framer Motion) with Supabase-backed registrations and a QR + WhatsApp manual payment flow.

## Routes

- **Landing**: `/`
- **Registration**: `/register`
- **Success**: `/success`
- **Admin**: `/admin` (password protected via env)

## Setup

1) **Create Supabase table**

Run:

- `supabase/schema.sql`

2) **Env vars**

Copy `.env.example` → `.env.local` and fill:

- **Supabase**: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- **Admin**: `ADMIN_PASSWORD`

3) **Run**

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- **Payment flow**: user registers → server inserts participant (`pending_manual_payment`) → user pays via QR → confirms via WhatsApp.
- **Admin export**: filtered table can be exported as CSV.

## Registration save fails (“Failed to save registration”)

The form calls `POST /api/register/mock`, which inserts into `public.participants` using the **service role** key.

1. **Run `supabase/schema.sql`** in the Supabase SQL editor so the table exists.
2. **`SUPABASE_SERVICE_ROLE_KEY`** must be the **service_role** secret from **Dashboard → Settings → API**. If you paste the **anon** “public” key instead, inserts are blocked by RLS; the app now detects that and shows a clearer error.
3. After changing `.env.local`, **restart** `npm run dev` so Next.js reloads env.
4. If it still fails, the UI now shows Supabase’s message (e.g. missing table, wrong column). Check the terminal for `[register/mock] Supabase insert failed:` logs.
