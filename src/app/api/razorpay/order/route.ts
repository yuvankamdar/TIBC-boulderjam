import { NextResponse } from "next/server";
import { razorpayClient } from "@/lib/razorpay";
import { mustGetEnv } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { amountPaise?: number };
    const amountPaise = Number(body?.amountPaise);
    if (!Number.isFinite(amountPaise) || amountPaise <= 0) {
      return new NextResponse("Invalid amount.", { status: 400 });
    }

    const order = await razorpayClient().orders.create({
      amount: Math.round(amountPaise),
      currency: "INR",
      payment_capture: true,
      notes: { event: "TIBC Boulder Jam" },
    });

    return NextResponse.json({
      orderId: order.id,
      amountPaise: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || mustGetEnv("RAZORPAY_KEY_ID"),
    });
  } catch {
    return new NextResponse("Failed to create order.", { status: 500 });
  }
}

