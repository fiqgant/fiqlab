"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroBackground = dynamic(
  () => import("./HeroBackground").then((m) => m.HeroBackground),
  { ssr: false }
);

export function HeroBackgroundClient() {
  const [showEnhancedBackground, setShowEnhancedBackground] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deviceMemory = Number(
      "deviceMemory" in navigator
        ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
        : 8,
    );
    const isCapableDevice =
      window.innerWidth >= 1024 &&
      navigator.hardwareConcurrency >= 4 &&
      deviceMemory >= 4;

    if (prefersReducedMotion || !isCapableDevice) {
      return;
    }

    const enable = () => setShowEnhancedBackground(true);
    const timeoutId = window.setTimeout(enable, 5000);

    const onFirstInteraction = () => {
      window.clearTimeout(timeoutId);
      enable();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true, passive: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_38%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.04),rgba(10,10,10,0.22))] dark:bg-[linear-gradient(180deg,rgba(10,10,10,0.28),rgba(10,10,10,0.52))]" />
      {showEnhancedBackground ? <HeroBackground /> : null}
    </>
  );
}
