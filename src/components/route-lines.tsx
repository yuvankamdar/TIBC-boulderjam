import * as React from "react";

export function RouteLines({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M154 18c-26 24-58 32-86 56-24 21-34 53-19 79 16 28 54 19 61 49 7 29-26 37-46 55-28 26-27 64 8 84 40 24 92-20 114 18 19 33-22 52-35 79"
        stroke="rgba(255,106,0,0.55)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3.5 10"
      />
      <path
        d="M76 30c-10 34 4 56 26 74 22 18 52 27 53 58 1 27-24 32-43 46-27 20-39 55-19 80 18 22 52 18 70 33 29 24 6 55-8 77"
        stroke="rgba(244,242,238,0.20)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 9"
      />
      <g opacity="0.9">
        {[
          { cx: 154, cy: 18 },
          { cx: 78, cy: 118 },
          { cx: 112, cy: 214 },
          { cx: 60, cy: 302 },
          { cx: 150, cy: 360 },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="6.8"
            fill="rgba(255,106,0,0.18)"
            stroke="rgba(255,106,0,0.85)"
            strokeWidth="1.4"
          />
        ))}
      </g>
    </svg>
  );
}

