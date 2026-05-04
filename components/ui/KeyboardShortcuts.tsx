"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/lib/store/search";

const TAGS_TO_IGNORE = new Set(["INPUT", "TEXTAREA", "SELECT"]);

export function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      const isMac = typeof navigator !== "undefined" && navigator.platform.includes("Mac");

      // Cmd+K for search works everywhere, even in input fields
      if ((isMac ? e.metaKey : e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useSearchStore.getState().open();
        return;
      }

      if (TAGS_TO_IGNORE.has((e.target as HTMLElement).tagName)) return;
      if (typeof window !== "undefined" && window.location.pathname === "/") return;

      if (!(isMac ? e.metaKey : e.ctrlKey)) return;
      if (e.altKey) return;

      const key = e.key.toLowerCase();

      if (key === "b") {
        e.preventDefault();
        router.push("/blog");
      }

      if (key === "t") {
        e.preventDefault();
        router.push("/");
      }

      if (key === "a") {
        e.preventDefault();
        router.push("/about");
      }

      if (key === "c") {
        e.preventDefault();
        router.push("/contact");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
