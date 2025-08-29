import React from "react";

export default function BrandLoader({ size = 48 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        className="animate-spin"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="url(#brand-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="90 60"
        />
        <defs>
          <linearGradient id="brand-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" /> {/* emerald-400 */}
            <stop offset="1" stopColor="#22d3ee" /> {/* cyan-400 */}
          </linearGradient>
        </defs>
      </svg>
      <span className="ml-3 text-emerald-400 font-bold text-lg"></span>
    </div>
  );
}