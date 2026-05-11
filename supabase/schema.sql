-- Run this in Supabase SQL Editor.

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  full_name text not null,
  age integer not null,
  phone text not null,
  email text not null,
  instagram text,

  experience_level text not null,
  need_rental_shoes text not null,

  emergency_contact_name text not null,
  emergency_contact_number text not null,
  risk_acknowledged boolean not null default false,

  payment_status text not null default 'pending',
  razorpay_order_id text,
  razorpay_payment_id text,
  amount_paise integer,
  currency text default 'INR'
);

create index if not exists participants_created_at_idx on public.participants (created_at desc);
create index if not exists participants_experience_level_idx on public.participants (experience_level);
create index if not exists participants_payment_status_idx on public.participants (payment_status);

-- If inserts fail with "row-level security" and you are NOT using the service_role key
-- on the server, fix .env.local: use Settings → API → service_role (secret).
-- The service_role JWT bypasses RLS. The anon key does not.

