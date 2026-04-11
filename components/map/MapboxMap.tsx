"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { personal } from "@/data/personal";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function MapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const rotationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [personal.locationCoords.lng, personal.locationCoords.lat],
      zoom: 10,
      pitch: 60,
      bearing: 0,
      antialias: true,
      interactive: true,
    });

    map.on("load", () => {
      const layers = map.getStyle().layers;
      let labelLayerId: string | undefined;
      for (const layer of layers) {
        if (layer.type === "symbol" && (layer.layout as { "text-field"?: unknown })["text-field"]) {
          labelLayerId = layer.id;
          break;
        }
      }

      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 12,
          paint: {
            "fill-extrusion-color": "#1a1a2e",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15, 0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15, 0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.8,
          },
        },
        labelLayerId
      );

      new mapboxgl.Marker({ color: "#3B82F6" })
        .setLngLat([personal.locationCoords.lng, personal.locationCoords.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="font-family:inherit;padding:4px 8px">
              <strong style="color:#3B82F6">${personal.shortName}</strong><br/>
              <small>${personal.institution}</small>
            </div>`
          )
        )
        .addTo(map);

      let isUserInteracting = false;
      let bearing = 0;

      const rotate = () => {
        if (!isUserInteracting) {
          bearing = (bearing + 0.15) % 360;
          map.setBearing(bearing);
        }
        rotationRef.current = requestAnimationFrame(rotate);
      };

      rotationRef.current = requestAnimationFrame(rotate);

      map.on("mousedown", () => { isUserInteracting = true; });
      map.on("mouseup", () => {
        isUserInteracting = false;
        bearing = map.getBearing();
      });
      map.on("touchstart", () => { isUserInteracting = true; });
      map.on("touchend", () => {
        isUserInteracting = false;
        bearing = map.getBearing();
      });
    });

    mapRef.current = map;

    return () => {
      if (rotationRef.current) cancelAnimationFrame(rotationRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-64 rounded-2xl glass flex items-center justify-center">
        <p className="text-sm text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
          Add <code className="text-blue-500">NEXT_PUBLIC_MAPBOX_TOKEN</code> to enable 3D map
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-xl">
      <div ref={mapContainer} className="absolute inset-0" />
      {/* Glass overlay label */}
      <div className="absolute bottom-4 left-4 glass px-3 py-2 rounded-xl text-xs pointer-events-none">
        <p className="font-semibold text-blue-500">{personal.shortName}</p>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">
          {personal.institution} · {personal.location}
        </p>
      </div>
    </div>
  );
}
