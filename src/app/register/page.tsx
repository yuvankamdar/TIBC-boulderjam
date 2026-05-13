"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MotionDiv } from "@/components/motion";
import { RouteLines } from "@/components/route-lines";
import type { ExperienceLevel, NeedShoes, ParticipantForm } from "@/lib/types";

const PRICE_RUPEES = 2500;

const levels: ExperienceLevel[] = [
  "First Timer",
  "Beginner",
  "Intermediate",
  "Advanced",
];

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs tracking-widest text-tibc-chalk-dim">{children}</div>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder,
  inputMode,
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      className="h-12 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-sm text-tibc-chalk outline-none ring-0 placeholder:text-white/35 focus:border-tibc-orange/55"
    />
  );
}

function toFormPayload(state: any): ParticipantForm {
  const age = Number(state.age);
  return {
    fullName: String(state.fullName || "").trim(),
    age: Number.isFinite(age) ? age : 0,
    phone: String(state.phone || "").trim(),
    email: String(state.email || "").trim(),
    instagram: String(state.instagram || "").trim() || undefined,
    experienceLevel: state.experienceLevel as ExperienceLevel,
    needRentalShoes: state.needRentalShoes as NeedShoes,
    emergencyName: String(state.emergencyName || "").trim(),
    emergencyPhone: String(state.emergencyPhone || "").trim(),
    riskAck: Boolean(state.riskAck),
  };
}

async function readApiErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const j = JSON.parse(text) as {
      error?: string;
      details?: string;
      hint?: string;
    };
    const parts = [j.error, j.details, j.hint].filter(Boolean);
    if (parts.length) return parts.join(" — ");
  } catch {
    /* not JSON */
  }
  return text || "Registration failed.";
}

function validate(payload: ParticipantForm) {
  if (!payload.fullName) return "Full Name is required.";
  if (!payload.age || payload.age < 6 || payload.age > 90)
    return "Please enter a valid Age.";
  if (!payload.phone) return "Phone Number is required.";
  if (!payload.email || !payload.email.includes("@"))
    return "Email Address is required.";
  if (!payload.emergencyName) return "Emergency Contact Name is required.";
  if (!payload.emergencyPhone)
    return "Emergency Contact Number is required.";
  if (!payload.riskAck) return "Please acknowledge the risk checkbox.";
  return null;
}

export default function RegisterPage() {
  const router = useRouter();
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [state, setState] = React.useState({
    fullName: "",
    age: "",
    phone: "",
    email: "",
    instagram: "",
    experienceLevel: "First Timer" as ExperienceLevel,
    needRentalShoes: "Yes" as NeedShoes,
    emergencyName: "",
    emergencyPhone: "",
    riskAck: false,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = toFormPayload(state);
    const msg = validate(payload);
    if (msg) {
      setError(msg);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/register/mock", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ participant: payload }),
      });
      if (!res.ok) {
        throw new Error(await readApiErrorMessage(res));
      }
      router.push(`/payment?name=${encodeURIComponent(payload.fullName)}`);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div className="tibc-texture flex min-h-[100svh] flex-col">
      <header className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8 sm:pt-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-2xl text-tibc-chalk">
            BOULDER JAM
          </Link>
          <Link
            href="/"
            className="text-xs tracking-widest text-tibc-chalk-dim hover:text-tibc-chalk"
          >
            BACK
          </Link>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
        <RouteLines className="pointer-events-none absolute -top-12 right-[-48px] h-[380px] w-[260px] opacity-50 sm:h-[520px] sm:w-[360px]" />

        <div className="grid gap-10 sm:grid-cols-[1.15fr_0.85fr] sm:gap-12">
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h1 className="font-display text-5xl leading-[0.92] text-tibc-chalk sm:text-6xl">
              Register for
              <br />
              Boulder Jam
            </h1>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-tibc-chalk-dim sm:text-lg">
              Movement, community, and three straight days on the wall. Fill this
              out to register, then complete payment via QR.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel>FULL NAME</FieldLabel>
                  <Input
                    value={state.fullName}
                    onChange={(v) => setState((s) => ({ ...s, fullName: v }))}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>AGE</FieldLabel>
                  <Input
                    value={state.age}
                    onChange={(v) => setState((s) => ({ ...s, age: v }))}
                    placeholder="18"
                    type="number"
                    inputMode="numeric"
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>PHONE NUMBER</FieldLabel>
                  <Input
                    value={state.phone}
                    onChange={(v) => setState((s) => ({ ...s, phone: v }))}
                    placeholder="+91…"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>EMAIL ADDRESS</FieldLabel>
                  <Input
                    value={state.email}
                    onChange={(v) => setState((s) => ({ ...s, email: v }))}
                    placeholder="you@domain.com"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <FieldLabel>INSTAGRAM HANDLE (OPTIONAL)</FieldLabel>
                  <Input
                    value={state.instagram}
                    onChange={(v) => setState((s) => ({ ...s, instagram: v }))}
                    placeholder="@handle"
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>CLIMBING EXPERIENCE LEVEL</FieldLabel>
                  <select
                    value={state.experienceLevel}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        experienceLevel: e.target.value as ExperienceLevel,
                      }))
                    }
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-sm text-tibc-chalk outline-none focus:border-tibc-orange/55"
                  >
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <FieldLabel>NEED RENTAL SHOES?</FieldLabel>
                  <div className="grid grid-cols-2 gap-3">
                    {(["Yes", "No"] as NeedShoes[]).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() =>
                          setState((s) => ({ ...s, needRentalShoes: v }))
                        }
                        className={cn(
                          "h-12 rounded-xl border px-4 text-sm transition",
                          state.needRentalShoes === v
                            ? "border-tibc-orange/60 bg-tibc-orange/15 text-tibc-orange"
                            : "border-white/10 bg-black/35 text-tibc-chalk",
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldLabel>EMERGENCY CONTACT NAME</FieldLabel>
                  <Input
                    value={state.emergencyName}
                    onChange={(v) =>
                      setState((s) => ({ ...s, emergencyName: v }))
                    }
                    placeholder="Contact name"
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>EMERGENCY CONTACT NUMBER</FieldLabel>
                  <Input
                    value={state.emergencyPhone}
                    onChange={(v) =>
                      setState((s) => ({ ...s, emergencyPhone: v }))
                    }
                    placeholder="+91…"
                    inputMode="tel"
                    autoComplete="off"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/35 p-4 text-sm text-tibc-chalk">
                <input
                  type="checkbox"
                  checked={state.riskAck}
                  onChange={(e) =>
                    setState((s) => ({ ...s, riskAck: e.target.checked }))
                  }
                  className="mt-0.5 h-4 w-4 accent-[#ff6a00]"
                />
                <span className="leading-snug text-tibc-chalk-dim">
                  I understand climbing involves physical risk.
                </span>
              </label>

              {error ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={busy}
                className={cn(
                  "group inline-flex h-12 w-full items-center justify-center rounded-full bg-tibc-orange px-6 text-sm font-semibold tracking-wide text-black shadow-[0_0_0_1px_rgba(0,0,0,0.55),0_14px_40px_rgba(255,106,0,0.20)] transition",
                  busy
                    ? "opacity-70"
                    : "hover:translate-y-[-1px] hover:bg-[#ff7a1c] active:translate-y-[0px]",
                )}
              >
                {busy ? "Saving…" : "Proceed to Payment"}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </form>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
            className="relative"
          >
            <div className="sticky top-6 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <div className="relative">
                  <Image
                    src="/assets/boulder-jam-poster.png"
                    alt="Poster"
                    width={900}
                    height={1200}
                    className="h-auto w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_2px,transparent_7px)]" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="text-xs tracking-widest text-tibc-chalk-dim">
                  PRICING
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <div className="font-display text-3xl text-tibc-chalk">
                    Boulder Jam Pass
                  </div>
                  <div className="font-mono text-xl text-tibc-orange">
                    ₹{PRICE_RUPEES}
                  </div>
                </div>
                <div className="mt-3 text-sm leading-relaxed text-tibc-chalk-dim">
                  Three days of climbing. Bring your friends. Make new ones.
                </div>
              </div>

              <div className="text-xs leading-snug text-tibc-chalk-dim">
                By registering, you confirm the info above is correct. If you get
                stuck, DM us and we’ll sort it.
              </div>
            </div>
          </MotionDiv>
        </div>
      </main>
    </div>
  );
}

