import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { ParticipantForm } from "@/lib/types";

type VerifyBody = {
  participant: ParticipantForm;
  payment: {
    orderId: string;
    paymentId: string;
    signature: string;
    amountPaise: number;
    currency: string;
  };
};

function bad(msg: string, status = 400) {
  return new NextResponse(msg, { status });
}

export async function POST(req: Request) {
  let body: VerifyBody;
  try {
    body = (await req.json()) as VerifyBody;
  } catch {
    return bad("Invalid JSON.");
  }

  const p = body?.participant;
  const pay = body?.payment;
  if (!p || !pay) return bad("Missing payload.");
  if (!pay.orderId || !pay.paymentId || !pay.signature)
    return bad("Missing payment fields.");

  const ok = verifyRazorpaySignature({
    orderId: pay.orderId,
    paymentId: pay.paymentId,
    signature: pay.signature,
  });
  if (!ok) return bad("Payment signature mismatch.", 401);

  try {
    const db = supabaseAdmin();
    const { error } = await db.from("participants").insert({
      full_name: p.fullName,
      age: p.age,
      phone: p.phone,
      email: p.email,
      instagram: p.instagram ?? null,
      experience_level: p.experienceLevel,
      need_rental_shoes: p.needRentalShoes,
      emergency_contact_name: p.emergencyName,
      emergency_contact_number: p.emergencyPhone,
      risk_acknowledged: p.riskAck,
      payment_status: "paid",
      razorpay_order_id: pay.orderId,
      razorpay_payment_id: pay.paymentId,
      amount_paise: Math.round(Number(pay.amountPaise || 0)),
      currency: pay.currency || "INR",
    });
    if (error) return bad("Failed to save registration.", 500);

    return NextResponse.json({ ok: true });
  } catch {
    return bad("Failed to save registration.", 500);
  }
}

