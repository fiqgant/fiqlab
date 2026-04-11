"use client";

import dynamic from "next/dynamic";

const MapboxMap = dynamic(() => import("./MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl glass animate-pulse" />
  ),
});

interface MapboxMapClientProps {
  fullWidth?: boolean;
}

export function MapboxMapClient({ fullWidth = false }: MapboxMapClientProps) {
  return <MapboxMap fullWidth={fullWidth} />;
}
