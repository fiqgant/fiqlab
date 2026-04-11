"use client";

import dynamic from "next/dynamic";

const HeroBackground = dynamic(
  () => import("./HeroBackground").then((m) => m.HeroBackground),
  { ssr: false }
);

export function HeroBackgroundClient() {
  return <HeroBackground />;
}
