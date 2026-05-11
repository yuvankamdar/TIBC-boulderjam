import Razorpay from "razorpay";
import crypto from "crypto";
import { mustGetEnv } from "@/lib/env";

export function razorpayClient() {
  return new Razorpay({
    key_id: mustGetEnv("RAZORPAY_KEY_ID"),
    key_secret: mustGetEnv("RAZORPAY_KEY_SECRET"),
  });
}

export function verifyRazorpaySignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const secret = mustGetEnv("RAZORPAY_KEY_SECRET");
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(params.signature, "utf8"),
  );
}

