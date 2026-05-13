import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type {
  ExperienceLevel,
  NeedShoes,
  ParticipantForm,
} from "@/lib/types";

const PRICE_PAISE = 2500 * 100;

function badJson(
  message: string,
  status: number,
  extras?: { details?: string; code?: string; hint?: string },
) {
  return NextResponse.json(
    { error: message, ...extras },
    { status },
  );
}

function validatePayload(p: ParticipantForm): string | null {
  if (!p.fullName?.trim()) return "Full Name is required.";
  if (!p.age || p.age < 6 || p.age > 90) return "Please enter a valid Age.";
  if (!p.phone?.trim()) return "Phone Number is required.";
  if (!p.email?.trim() || !p.email.includes("@"))
    return "Email Address is required.";
  if (!p.emergencyName?.trim())
    return "Emergency Contact Name is required.";
  if (!p.emergencyPhone?.trim())
    return "Emergency Contact Number is required.";
  if (!p.riskAck) return "Please acknowledge the risk checkbox.";
  const levels: ExperienceLevel[] = [
    "First Timer",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];
  if (!levels.includes(p.experienceLevel)) return "Invalid experience level.";
  if (p.needRentalShoes !== "Yes" && p.needRentalShoes !== "No")
    return "Invalid rental shoes choice.";
  return null;
}

export async function POST(req: Request) {
  let body: { participant?: ParticipantForm };
  try {
    body = (await req.json()) as { participant?: ParticipantForm };
  } catch {
    return badJson("Invalid JSON.", 400);
  }

  const p = body?.participant;
  if (!p) return badJson("Missing participant.", 400);

  const msg = validatePayload(p);
  if (msg) return badJson(msg, 400);

  try {
    const db = supabaseAdmin();
    const { error } = await db.from("participants").insert({
      full_name: p.fullName.trim(),
      age: p.age,
      phone: p.phone.trim(),
      email: p.email.trim(),
      instagram: p.instagram?.trim() || null,
      experience_level: p.experienceLevel,
      need_rental_shoes: p.needRentalShoes as NeedShoes,
      emergency_contact_name: p.emergencyName.trim(),
      emergency_contact_number: p.emergencyPhone.trim(),
      risk_acknowledged: p.riskAck,
      payment_status: "pending_manual_payment",
      amount_paise: PRICE_PAISE,
      currency: "INR",
    });
    if (error) {
      console.error("[register/mock] Supabase insert failed:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return badJson("Failed to save registration.", 500, {
        details: error.message,
        code: error.code,
        hint: error.hint ?? undefined,
      });
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (e) {
    console.error("[register/mock] Unexpected:", e);
    return badJson("Failed to save registration.", 500, {
      details: e instanceof Error ? e.message : String(e),
    });
  }
}
