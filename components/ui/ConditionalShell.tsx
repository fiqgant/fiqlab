"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTerminalMode, setIsTerminalMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fiqlab-mode");
    setIsTerminalMode(stored !== "ui");
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "fiqlab-mode") {
        setIsTerminalMode(e.newValue !== "ui");
      }
    };
    window.addEventListener("storage", handler);
    const interval = setInterval(() => {
      const stored = localStorage.getItem("fiqlab-mode");
      setIsTerminalMode(stored !== "ui");
    }, 200);
    return () => {
      window.removeEventListener("storage", handler);
      clearInterval(interval);
    };
  }, []);

  const showShell = (mounted && pathname !== "/") || isTerminalMode === false;
  const isTerminal = mounted && pathname === "/" && isTerminalMode;

  return (
    <>
      {showShell && <Navbar />}
      <main className={isTerminal ? "h-screen" : "flex-1"}>{children}</main>
    </>
  );
}
