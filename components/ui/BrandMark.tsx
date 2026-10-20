import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  style?: CSSProperties;
}

// Ink-on-paper "T" monogram; colours hardcoded because ImageResponse can't read CSS vars.
export function BrandMark({ className, style }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      style={style}
    >
      <rect x="2" y="2" width="60" height="60" rx="6" fill="#1C1C1E" />
      <path
        d="M17 16H47V23H36V48H28V23H17V16Z"
        fill="#FCFBF7"
      />
    </svg>
  );
}
