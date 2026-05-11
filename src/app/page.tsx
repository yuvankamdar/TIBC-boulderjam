import Link from "next/link";
import Image from "next/image";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion";
import { RouteLines } from "@/components/route-lines";

export default function Home() {
  return (
    <div className="tibc-texture flex flex-1 flex-col">
      <main className="relative flex flex-1 flex-col">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div className="absolute inset-0">
            <RouteLines className="absolute -top-10 right-[-40px] h-[380px] w-[260px] opacity-70 sm:h-[520px] sm:w-[360px]" />
            <RouteLines className="absolute -bottom-16 left-[-40px] h-[340px] w-[240px] rotate-180 opacity-40 sm:h-[480px] sm:w-[340px]" />
          </div>

          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
            <div className="grid items-start gap-10 sm:grid-cols-[1.05fr_0.95fr] sm:gap-12">
              <div className="order-2 sm:order-1">
                <MotionH1
                  className="font-display text-[56px] leading-[0.92] tracking-[0.02em] text-tibc-chalk sm:text-[86px] md:text-[104px]"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  BOULDER
                  <br />
                  JAM
                </MotionH1>

                <MotionP
                  className="mt-5 max-w-md text-lg leading-relaxed text-tibc-chalk-dim sm:text-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                >
                  <span className="text-tibc-chalk">May 18–20</span>
                  <span className="mx-3 text-tibc-orange">•</span>
                  gravity’s so boring :)
                </MotionP>

                <MotionDiv
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
                >
                  <Link
                    href="/register"
                    className="group inline-flex h-12 items-center justify-center rounded-full bg-tibc-orange px-6 text-sm font-semibold tracking-wide text-black shadow-[0_0_0_1px_rgba(0,0,0,0.55),0_14px_40px_rgba(255,106,0,0.20)] transition hover:translate-y-[-1px] hover:bg-[#ff7a1c] active:translate-y-[0px] sm:h-12"
                  >
                    Register Now
                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                  <div className="text-xs leading-snug text-tibc-chalk-dim">
                    Rental shoes included.
                  </div>
                </MotionDiv>
              </div>

              <MotionDiv
                className="order-1 sm:order-2"
                initial={{ opacity: 0, y: 10, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="relative mx-auto w-full max-w-[420px]">
                  <div className="absolute -inset-3 rounded-[26px] border border-white/10 bg-black/30 shadow-[0_40px_120px_rgba(0,0,0,0.65)]" />
                  <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
                    <Image
                      src="/assets/boulder-jam-poster.png"
                      alt="TIBC Boulder Jam poster"
                      width={900}
                      height={1200}
                      priority
                      className="h-auto w-full select-none object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_2px,transparent_7px)]" />
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="pricing-heading"
          className="relative mx-auto w-full max-w-6xl px-5 sm:px-8"
        >
          <MotionDiv
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="border-t border-white/10 py-10 sm:py-12"
          >
            <div className="relative overflow-hidden rounded-2xl border border-tibc-orange/25 bg-black/40 px-6 py-8 sm:px-10 sm:py-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/5 bg-tibc-orange/5" />
              <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-md">
                  <p
                    id="pricing-heading"
                    className="text-xs tracking-[0.2em] text-tibc-chalk-dim"
                  >
                    BOULDER JAM PASS
                  </p>
                  <p className="mt-3 font-display text-3xl leading-tight text-tibc-chalk sm:text-4xl">
                    Three days on the wall.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-tibc-chalk-dim sm:text-base">
                    One pass. Rental shoes included.
                  </p>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 sm:justify-end">
                  <span
                    className="font-mono text-2xl text-tibc-chalk-dim line-through decoration-tibc-orange/55 decoration-2 sm:text-3xl"
                    aria-label="Previously Rs 6,600"
                  >
                    Rs&nbsp;6,600
                  </span>
                  <span className="font-display text-5xl leading-none text-tibc-orange sm:text-7xl">
                    Rs&nbsp;2,500
                  </span>
                </div>
              </div>
            </div>
          </MotionDiv>
        </section>

        <section id="details" className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
          <div className="grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-[0.9fr_1.1fr] sm:gap-12 sm:pt-14">
            <MotionDiv
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs tracking-widest text-tibc-chalk-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-tibc-orange" />
                THREE DAYS • ONE PASS
              </div>
              <h2 className="font-display mt-4 text-5xl leading-[0.92] text-tibc-chalk sm:text-6xl">
                3 days.
                <br />
                One pass.
              </h2>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
              className="relative"
            >
              <p className="max-w-prose text-lg leading-relaxed text-tibc-chalk-dim sm:text-xl">
                Three days of nonstop climbing for less than two day passes.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-tibc-chalk">
                  first-timer friendly
                </span>
                <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-tibc-chalk">
                  community + chaos (good kind)
                </span>
                <span className="rounded-full border border-tibc-orange/35 bg-black/30 px-4 py-2 text-sm text-tibc-orange">
                  ₹2500 pass
                </span>
              </div>

              <div className="pointer-events-none absolute -right-4 top-0 hidden h-44 w-44 rounded-full border border-tibc-orange/30 bg-tibc-orange/10 blur-[1px] sm:block" />
            </MotionDiv>
          </div>
        </section>

        <footer className="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8">
          <div className="flex items-center justify-between border-t border-white/10 pt-8 text-sm text-tibc-chalk-dim">
            <div className="tracking-wide">The Indian Bouldering Company</div>
            <div className="hidden sm:block font-mono text-xs">
              gravity’s so boring :)
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
