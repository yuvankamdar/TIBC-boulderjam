"use client";

import * as React from "react";
import Link from "next/link";
import { RouteLines } from "@/components/route-lines";
import type { ExperienceLevel } from "@/lib/types";

type ParticipantRow = {
  id: string;
  created_at: string;
  full_name: string;
  age: number;
  phone: string;
  email: string;
  instagram: string | null;
  experience_level: ExperienceLevel;
  need_rental_shoes: "Yes" | "No";
  emergency_contact_name: string;
  emergency_contact_number: string;
  risk_acknowledged: boolean;
  payment_status: string;
  amount_paise: number | null;
  currency: string | null;
};

const levels: Array<ExperienceLevel | "all"> = [
  "all",
  "First Timer",
  "Beginner",
  "Intermediate",
  "Advanced",
];

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function toCsv(rows: ParticipantRow[]) {
  const headers = [
    "created_at",
    "full_name",
    "age",
    "phone",
    "email",
    "instagram",
    "experience_level",
    "need_rental_shoes",
    "emergency_contact_name",
    "emergency_contact_number",
    "risk_acknowledged",
    "payment_status",
    "amount_paise",
    "currency",
  ];

  const escape = (v: any) => {
    const s = v === null || v === undefined ? "" : String(v);
    const needs = /[",\n]/.test(s);
    const inner = s.replaceAll('"', '""');
    return needs ? `"${inner}"` : inner;
  };

  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(
      headers
        .map((h) => escape((r as any)[h]))
        .join(","),
    );
  }
  return lines.join("\n");
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [password, setPassword] = React.useState("");
  const [authed, setAuthed] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [level, setLevel] = React.useState<(typeof levels)[number]>("all");
  const [q, setQ] = React.useState("");
  const [rows, setRows] = React.useState<ParticipantRow[]>([]);

  const load = React.useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const url = new URL("/api/admin/participants", window.location.origin);
      url.searchParams.set("level", level);
      const res = await fetch(url.toString(), {
        headers: { "x-admin-password": password },
      });
      if (res.status === 401) {
        setAuthed(false);
        throw new Error("Wrong password.");
      }
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as { participants: ParticipantRow[] };
      setRows(json.participants || []);
      setAuthed(true);
    } catch (e: any) {
      setError(e?.message || "Failed to load.");
    } finally {
      setBusy(false);
    }
  }, [level, password]);

  React.useEffect(() => {
    if (!authed) return;
    void load();
  }, [authed, load]);

  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) => {
      const hay = [
        r.full_name,
        r.phone,
        r.email,
        r.instagram ?? "",
        r.payment_status,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [rows, q]);

  return (
    <div className="tibc-texture min-h-[100svh]">
      <header className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8 sm:pt-10">
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl text-tibc-chalk">ADMIN</div>
          <Link
            href="/"
            className="text-xs tracking-widest text-tibc-chalk-dim hover:text-tibc-chalk"
          >
            HOME
          </Link>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
        <RouteLines className="pointer-events-none absolute -top-12 right-[-48px] h-[520px] w-[360px] opacity-35" />

        <div className="rounded-3xl border border-white/10 bg-black/35 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs tracking-widest text-tibc-chalk-dim">
                REGISTRATIONS
              </div>
              <div className="mt-2 font-display text-4xl leading-[0.9] text-tibc-chalk sm:text-5xl">
                Boulder Jam
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="space-y-2">
                <div className="text-xs tracking-widest text-tibc-chalk-dim">
                  PASSWORD
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-sm text-tibc-chalk outline-none placeholder:text-white/35 focus:border-tibc-orange/55 sm:w-56"
                />
              </div>

              <button
                onClick={load}
                disabled={busy || !password}
                className={cn(
                  "h-11 rounded-full bg-tibc-orange px-5 text-sm font-semibold tracking-wide text-black transition",
                  busy || !password
                    ? "opacity-70"
                    : "hover:translate-y-[-1px] hover:bg-[#ff7a1c] active:translate-y-[0px]",
                )}
              >
                {busy ? "Loading…" : authed ? "Refresh" : "Unlock"}
              </button>
            </div>
          </div>

          {error ? (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-[240px_1fr_170px] sm:items-end">
            <div className="space-y-2">
              <div className="text-xs tracking-widest text-tibc-chalk-dim">
                FILTER LEVEL
              </div>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-sm text-tibc-chalk outline-none focus:border-tibc-orange/55"
                disabled={!authed}
              >
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="text-xs tracking-widest text-tibc-chalk-dim">
                SEARCH
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name, phone, email, IG, payment…"
                className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-sm text-tibc-chalk outline-none placeholder:text-white/35 focus:border-tibc-orange/55"
                disabled={!authed}
              />
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <div className="text-xs tracking-widest text-tibc-chalk-dim">
                EXPORT
              </div>
              <button
                disabled={!authed}
                onClick={() =>
                  downloadCsv(
                    `tibc-boulder-jam-registrations-${new Date()
                      .toISOString()
                      .slice(0, 10)}.csv`,
                    toCsv(filtered),
                  )
                }
                className={cn(
                  "h-11 w-full rounded-full border border-white/10 bg-black/35 px-5 text-sm font-semibold tracking-wide text-tibc-chalk transition sm:w-auto",
                  authed
                    ? "hover:border-tibc-orange/40 hover:bg-black/45"
                    : "opacity-60",
                )}
              >
                Export CSV
              </button>
            </div>
          </div>

          <div className="mt-6 text-sm text-tibc-chalk-dim">
            Showing <span className="text-tibc-chalk">{filtered.length}</span>{" "}
            registrations.
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-[980px] w-full border-collapse text-left text-sm">
              <thead className="bg-black/45 text-xs tracking-widest text-tibc-chalk-dim">
                <tr>
                  <th className="px-4 py-3">TIME</th>
                  <th className="px-4 py-3">NAME</th>
                  <th className="px-4 py-3">LEVEL</th>
                  <th className="px-4 py-3">PHONE</th>
                  <th className="px-4 py-3">EMAIL</th>
                  <th className="px-4 py-3">PAYMENT</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-white/10 bg-black/20 hover:bg-black/30"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-tibc-chalk-dim">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-tibc-chalk">{r.full_name}</td>
                    <td className="px-4 py-3 text-tibc-chalk-dim">
                      {r.experience_level}
                    </td>
                    <td className="px-4 py-3 text-tibc-chalk-dim">{r.phone}</td>
                    <td className="px-4 py-3 text-tibc-chalk-dim">{r.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-3 py-1 text-xs",
                          r.payment_status === "paid"
                            ? "border-tibc-orange/40 bg-tibc-orange/10 text-tibc-orange"
                            : "border-white/10 bg-black/35 text-tibc-chalk-dim",
                        )}
                      >
                        {r.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}
                {!filtered.length ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-tibc-chalk-dim"
                    >
                      {authed
                        ? "No registrations found."
                        : "Enter password and click Unlock."}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

