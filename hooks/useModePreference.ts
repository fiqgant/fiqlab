"use client";

import { useCallback, useEffect, useState } from "react";

export type SiteMode = "terminal" | "ui";

const STORAGE_KEY = "fiqlab-mode";

export function useModePreference() {
  const [mode, setModeState] = useState<SiteMode>("terminal");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as SiteMode | null;
    if (stored === "ui" || stored === "terminal") {
      setModeState(stored);
    }
    setMounted(true);
  }, []);

  const setMode = useCallback((next: SiteMode) => {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setMode(mode === "terminal" ? "ui" : "terminal");
  }, [mode, setMode]);

  return { mode, setMode, toggle, mounted };
}
