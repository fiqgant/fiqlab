"use client";

import dynamic from "next/dynamic";

const HeroBackground = dynamic(
  () => import("./HeroBackground").then((m) => m.HeroBackground),
  { ssr: false }
);

export function HeroBackgroundClient() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.1),transparent_38%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.02),rgba(10,10,10,0.08))] dark:bg-[linear-gradient(180deg,rgba(10,10,10,0.05),rgba(10,10,10,0.15))]" />
      <HeroBackground />
    </>
  );
}
