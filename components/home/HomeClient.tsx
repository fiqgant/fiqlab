"use client";

import { HeroBackgroundClient } from "@/components/hero/HeroBackgroundClient";
import { TerminalApp } from "@/components/terminal/TerminalApp";
import { HeroUI } from "@/components/hero/HeroUI";
import { useModePreference } from "@/hooks/useModePreference";
import type { BlogPost } from "@/lib/blog";

interface Props {
  posts: BlogPost[];
}

export function HomeClient({ posts }: Props) {
  const { mode, toggle, mounted } = useModePreference();

  if (!mounted) return null;

  return (
    <div className="relative h-screen overflow-hidden">
      <HeroBackgroundClient />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 z-10">
        {mode === "terminal" ? (
          <TerminalApp posts={posts} onToggleMode={toggle} />
        ) : (
          <HeroUI onToggleMode={toggle} />
        )}
      </div>
    </div>
  );
}
