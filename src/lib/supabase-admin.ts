import { createClient } from "@supabase/supabase-js";
import { mustGetEnv } from "@/lib/env";

function decodeJwtPayload(token: string): { role?: string } | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const json = Buffer.from(parts[1], "base64url").toString("utf8");
    return JSON.parse(json) as { role?: string };
  } catch {
    return null;
  }
}

export function supabaseAdmin() {
  const url = mustGetEnv("SUPABASE_URL");
  const serviceRole = mustGetEnv("SUPABASE_SERVICE_ROLE_KEY");
  const payload = decodeJwtPayload(serviceRole);
  if (payload?.role === "anon" || payload?.role === "authenticated") {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY must be the service_role secret from Supabase Dashboard → Settings → API (not the anon public key).",
    );
  }
  return createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

