import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  style?: CSSProperties;
  idPrefix?: string;
}

export function BrandMark({
  className,
  style,
  idPrefix = "brand-mark",
}: BrandMarkProps) {
  const shellGradientId = `${idPrefix}-shell`;
  const panelGradientId = `${idPrefix}-panel`;
  const monogramGradientId = `${idPrefix}-monogram`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      style={style}
    >
      <defs>
        <linearGradient id={shellGradientId} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
        <linearGradient id={panelGradientId} x1="12" y1="10" x2="50" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F1B2D" />
          <stop offset="1" stopColor="#081018" />
        </linearGradient>
        <linearGradient id={monogramGradientId} x1="21" y1="16" x2="42" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#DBEAFE" />
          <stop offset="1" stopColor="#99F6E4" />
        </linearGradient>
      </defs>

      <rect x="4" y="4" width="56" height="56" rx="18" fill={`url(#${shellGradientId})`} />
      <rect x="7" y="7" width="50" height="50" rx="15" fill={`url(#${panelGradientId})`} />
      <rect x="7.5" y="7.5" width="49" height="49" rx="14.5" stroke="rgba(255,255,255,0.14)" />

      <circle cx="18" cy="18" r="11" fill="#3B82F6" opacity="0.18" />
      <circle cx="49" cy="46" r="12" fill="#14B8A6" opacity="0.18" />

      <path
        d="M18 18.5C18 16.8431 19.3431 15.5 21 15.5H43C44.6569 15.5 46 16.8431 46 18.5V20.5C46 22.1569 44.6569 23.5 43 23.5H36V45C36 46.6569 34.6569 48 33 48H31C29.3431 48 28 46.6569 28 45V23.5H21C19.3431 23.5 18 22.1569 18 20.5V18.5Z"
        fill={`url(#${monogramGradientId})`}
      />
      <path
        d="M21.5 18H42.5"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="42" y="11.5" width="7" height="3" rx="1.5" fill="#99F6E4" opacity="0.9" />
    </svg>
  );
}
