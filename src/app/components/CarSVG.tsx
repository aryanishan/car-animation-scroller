import React from "react";

interface CarSVGProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Top-down SVG illustration of an orange supercar.
 * Fully transparent background — no white box artifacts.
 */
export default function CarSVG({ className, style }: CarSVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 160"
      className={className}
      style={{ display: "block", ...style }}
      aria-label="Orange supercar top-down view"
    >
      {/* ── Drop shadow filter ──────────────────────────────── */}
      <defs>
        <filter id="carShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="8"
            floodColor="rgba(0,0,0,0.55)"
          />
        </filter>
        <radialGradient id="bodyGrad" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#D45F00" />
        </radialGradient>
        <radialGradient id="glassGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#4a5568" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0.95" />
        </radialGradient>
      </defs>

      <g filter="url(#carShadow)">
        {/* ── Main body ──────────────────────────────────────── */}
        {/* Outer body shape — wide center, tapered nose & tail */}
        <ellipse
          cx="170"
          cy="80"
          rx="158"
          ry="62"
          fill="url(#bodyGrad)"
        />

        {/* Body side cutouts / sculpting (darker orange) */}
        <ellipse cx="170" cy="35" rx="90" ry="10" fill="#C85A00" opacity="0.45" />
        <ellipse cx="170" cy="125" rx="90" ry="10" fill="#C85A00" opacity="0.45" />

        {/* ── Windshield / cockpit glass ────────────────────── */}
        <ellipse cx="165" cy="80" rx="72" ry="42" fill="url(#glassGrad)" />

        {/* Cockpit highlight */}
        <ellipse
          cx="155"
          cy="72"
          rx="38"
          ry="22"
          fill="white"
          opacity="0.06"
        />

        {/* Center spine / ridge */}
        <rect x="90" y="76" width="160" height="8" rx="4" fill="#1a1a1a" opacity="0.3" />

        {/* ── Front air-intake vents (nose) ─────────────────── */}
        <rect x="10" y="65" width="18" height="10" rx="3" fill="#1a1a1a" opacity="0.75" />
        <rect x="10" y="85" width="18" height="10" rx="3" fill="#1a1a1a" opacity="0.75" />

        {/* ── Rear diffuser vents (tail) ─────────────────────── */}
        <rect x="312" y="62" width="14" height="10" rx="2" fill="#1a1a1a" opacity="0.65" />
        <rect x="312" y="77" width="14" height="10" rx="2" fill="#1a1a1a" opacity="0.65" />
        <rect x="312" y="88" width="14" height="10" rx="2" fill="#1a1a1a" opacity="0.65" />

        {/* ── Side air inlets / vents ───────────────────────── */}
        {/* Left side */}
        <rect x="110" y="18" width="55" height="8" rx="3" fill="#1a1a1a" opacity="0.5" />
        <rect x="175" y="18" width="35" height="8" rx="3" fill="#1a1a1a" opacity="0.4" />
        {/* Right side */}
        <rect x="110" y="134" width="55" height="8" rx="3" fill="#1a1a1a" opacity="0.5" />
        <rect x="175" y="134" width="35" height="8" rx="3" fill="#1a1a1a" opacity="0.4" />

        {/* ── Wheels ────────────────────────────────────────── */}
        {/* Front-left */}
        <ellipse cx="68" cy="27" rx="20" ry="16" fill="#222" />
        <ellipse cx="68" cy="27" rx="12" ry="10" fill="#444" />
        <ellipse cx="68" cy="27" rx="5" ry="4" fill="#888" />

        {/* Front-right */}
        <ellipse cx="68" cy="133" rx="20" ry="16" fill="#222" />
        <ellipse cx="68" cy="133" rx="12" ry="10" fill="#444" />
        <ellipse cx="68" cy="133" rx="5" ry="4" fill="#888" />

        {/* Rear-left */}
        <ellipse cx="270" cy="27" rx="22" ry="18" fill="#222" />
        <ellipse cx="270" cy="27" rx="13" ry="11" fill="#444" />
        <ellipse cx="270" cy="27" rx="5" ry="4" fill="#888" />

        {/* Rear-right */}
        <ellipse cx="270" cy="133" rx="22" ry="18" fill="#222" />
        <ellipse cx="270" cy="133" rx="13" ry="11" fill="#444" />
        <ellipse cx="270" cy="133" rx="5" ry="4" fill="#888" />

        {/* ── Headlights (front) ───────────────────────────── */}
        <ellipse cx="28" cy="62" rx="14" ry="7" fill="#FFE080" opacity="0.9" />
        <ellipse cx="28" cy="98" rx="14" ry="7" fill="#FFE080" opacity="0.9" />

        {/* Headlight glow */}
        <ellipse cx="22" cy="62" rx="8" ry="4" fill="white" opacity="0.5" />
        <ellipse cx="22" cy="98" rx="8" ry="4" fill="white" opacity="0.5" />

        {/* ── Tail lights (rear) ───────────────────────────── */}
        <ellipse cx="316" cy="63" rx="10" ry="6" fill="#FF2222" opacity="0.85" />
        <ellipse cx="316" cy="97" rx="10" ry="6" fill="#FF2222" opacity="0.85" />

        {/* ── Racing stripes ────────────────────────────────── */}
        <rect
          x="85"
          y="72"
          width="180"
          height="7"
          rx="2"
          fill="#1a1a1a"
          opacity="0.18"
        />
        <rect
          x="85"
          y="81"
          width="180"
          height="7"
          rx="2"
          fill="#1a1a1a"
          opacity="0.18"
        />

        {/* ── Body accent lines ─────────────────────────────── */}
        {/* Left accent */}
        <path
          d="M 40 45 Q 120 28 240 32 Q 290 33 320 48"
          stroke="#C85500"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
        {/* Right accent */}
        <path
          d="M 40 115 Q 120 132 240 128 Q 290 127 320 112"
          stroke="#C85500"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
