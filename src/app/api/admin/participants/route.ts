import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { mustGetEnv } from "@/lib/env";

function unauthorized() {
  return new NextResponse("Unauthorized", { status: 401 });
}

export async function GET(req: Request) {
  const pass = req.headers.get("x-admin-password") || "";
  if (!pass || pass !== mustGetEnv("ADMIN_PASSWORD")) return unauthorized();

  const url = new URL(req.url);
  const level = url.searchParams.get("level");

  const db = supabaseAdmin();
  let q = db
    .from("participants")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000);

  if (level && level !== "all") {
    q = q.eq("experience_level", level);
  }

  const { data, error } = await q;
  if (error) return new NextResponse("Failed to load participants.", { status: 500 });

  return NextResponse.json({ participants: data ?? [] });
}

