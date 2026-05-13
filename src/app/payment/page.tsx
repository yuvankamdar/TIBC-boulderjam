"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MotionDiv } from "@/components/motion";
import { RouteLines } from "@/components/route-lines";

const WHATSAPP_NUMBER = "917208758422";

function buildWhatsAppUrl(name: string) {
  const msg = name
    ? `Hi, I'm ${name} and I've registered and paid for The BoulderJam!`
    : `Hi, I've registered and paid for The BoulderJam!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function PaymentPage() {
  const [clicked, setClicked] = React.useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const whatsappUrl = buildWhatsAppUrl(name);

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
            HOME
          </Link>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
        <RouteLines className="pointer-events-none absolute -top-12 right-[-48px] h-[520px] w-[360px] opacity-35" />
        <RouteLines className="pointer-events-none absolute -bottom-16 left-[-40px] h-[480px] w-[340px] rotate-180 opacity-25" />

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/35 p-7 text-center shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:p-10"
        >
          <div className="mx-auto mb-5 h-2 w-24 rounded-full bg-tibc-orange/80" />
          <h1 className="font-display text-6xl leading-[0.9] text-tibc-chalk sm:text-7xl">
            You’re almost in.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-tibc-chalk-dim">
            Scan the QR code below to complete your payment.
          </p>

          <div className="mt-8">
            <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="relative w-full" style={{ aspectRatio: "758 / 1165" }}>
                <Image
                  src="/qr-code.png"
                  alt="Payment QR code"
                  fill
                  sizes="(max-width: 640px) 80vw, 320px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="mt-4 text-sm tracking-wide text-tibc-chalk">
              Boulder Jam Pass — <span className="text-tibc-orange">₹2500</span>
            </div>
          </div>

          <div className="mt-6 text-sm leading-relaxed text-tibc-chalk-dim">
            After payment, send a screenshot on WhatsApp to confirm your spot.
          </div>

          <div className="mt-7">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setClicked(true)}
              className="group inline-flex h-12 w-full items-center justify-center rounded-full bg-tibc-orange px-6 text-sm font-semibold tracking-wide text-black shadow-[0_0_0_1px_rgba(0,0,0,0.55),0_14px_40px_rgba(255,106,0,0.20)] transition hover:translate-y-[-1px] hover:bg-[#ff7a1c] active:translate-y-[0px]"
            >
              Send Screenshot on WhatsApp
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>

            {clicked ? (
              <div className="mt-4 text-xs leading-snug text-tibc-chalk-dim">
                Your registration has been saved. Payment confirmation will be
                verified manually.
              </div>
            ) : null}
          </div>

        </MotionDiv>
      </main>
    </div>
  );
}

