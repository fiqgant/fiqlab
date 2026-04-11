"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(): Heading[] {
  const elements = document.querySelectorAll("article h2, article h3");
  return Array.from(elements)
    .filter((el) => el.id)
    .map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName[1]),
    }));
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    setHeadings(extractHeadings());

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    document.querySelectorAll("article h2, article h3").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="glass rounded-2xl p-4 sticky top-24" aria-label="Table of contents">
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mb-3">
        <List className="w-3.5 h-3.5" />
        Contents
      </h4>
      <ul className="space-y-0.5">
        {headings.map((h, i) => (
          <li key={h.id || i}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn(
                "block py-1 text-xs leading-snug transition-all duration-200 rounded px-2",
                h.level === 3 && "ml-3",
                activeId === h.id
                  ? "text-blue-500 bg-blue-500/10 font-medium"
                  : "text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-[#0A0A0A] dark:hover:text-[#FAFAFA]"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
