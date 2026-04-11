"use client";

import dynamic from "next/dynamic";

const MapboxMap = dynamic(() => import("./MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-72 rounded-2xl glass animate-pulse" />
  ),
});

export function MapboxMapClient() {
  return <MapboxMap />;
}
