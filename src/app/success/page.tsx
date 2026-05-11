import Link from "next/link";
import { MotionDiv } from "@/components/motion";
import { RouteLines } from "@/components/route-lines";

export default function SuccessPage() {
  return (
    <div className="tibc-texture flex min-h-[100svh] flex-col">
      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 py-16 sm:px-8">
        <RouteLines className="pointer-events-none absolute -top-10 right-[-40px] h-[520px] w-[360px] opacity-40" />
        <RouteLines className="pointer-events-none absolute -bottom-16 left-[-40px] h-[480px] w-[340px] rotate-180 opacity-30" />

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/35 p-7 text-center shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:p-10"
        >
          <div className="mx-auto mb-5 h-2 w-24 rounded-full bg-tibc-orange/80" />
          <h1 className="font-display text-6xl leading-[0.9] text-tibc-chalk sm:text-7xl">
            You’re in.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-tibc-chalk-dim">
            See you on the wall.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="group inline-flex h-12 items-center justify-center rounded-full bg-tibc-orange px-7 text-sm font-semibold tracking-wide text-black transition hover:translate-y-[-1px] hover:bg-[#ff7a1c] active:translate-y-[0px]"
            >
              Back to Home
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
          <div className="mt-6 font-mono text-xs text-tibc-chalk-dim">
            gravity’s so boring :)
          </div>
        </MotionDiv>
      </main>
    </div>
  );
}

