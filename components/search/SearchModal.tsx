"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, FileText, BookOpen, FolderKanban, X, ArrowRight } from "lucide-react";
import { useSearchStore } from "@/lib/store/search";
import { cn } from "@/lib/utils";

interface SearchItem {
  type: "blog" | "publication" | "project";
  slug?: string;
  id?: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  date?: string;
  year?: number;
}

const typeConfig = {
  blog: { icon: FileText, label: "Blog", color: "text-blue-500", href: (s: SearchItem) => `/blog/${s.slug}` },
  publication: { icon: BookOpen, label: "Publication", color: "text-teal-500", href: (s: SearchItem) => `/publications#${s.id}` },
  project: { icon: FolderKanban, label: "Project", color: "text-green-500", href: (s: SearchItem) => `/portfolio#${s.id}` },
};

export function SearchModal() {
  const { isOpen, close } = useSearchStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load search data
  useEffect(() => {
    if (!isOpen) return;

    const load = async () => {
      const [blogRes, pubData, projData] = await Promise.all([
        fetch("/api/search").then((r) => r.json()).catch(() => []),
        import("@/data/publications").then((m) => m.publications),
        import("@/data/portfolio").then((m) => m.projects),
      ]);

      const items: SearchItem[] = [
        ...blogRes.map((b: SearchItem) => ({ ...b, type: "blog" as const })),
        ...pubData.map((p) => ({
          type: "publication" as const,
          id: p.id,
          title: p.title,
          excerpt: p.abstract,
          tags: p.tags,
          year: p.year,
        })),
        ...projData.map((p) => ({
          type: "project" as const,
          id: p.id,
          title: p.title,
          excerpt: p.description,
          tags: p.tech,
          year: p.year,
        })),
      ];
      setAllItems(items);
    };

    load();
  }, [isOpen]);

  // Focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Fuse search
  useEffect(() => {
    if (!query.trim()) {
      setResults(allItems.slice(0, 8));
      return;
    }
    const fuse = new Fuse(allItems, {
      keys: ["title", "excerpt", "tags"],
      threshold: 0.4,
      includeScore: true,
    });
    const res = fuse.search(query).slice(0, 8).map((r) => r.item);
    setResults(res);
    setSelectedIndex(0);
  }, [query, allItems]);

  const navigate = useCallback(
    (item: SearchItem) => {
      const cfg = typeConfig[item.type];
      router.push(cfg.href(item));
      close();
    },
    [router, close]
  );

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[selectedIndex]) {
        navigate(results[selectedIndex]);
      }
    },
    [close, results, selectedIndex, navigate]
  );

  if (!isOpen) return null;

  const grouped = results.reduce(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<string, SearchItem[]>
  );

  const flatResults = results;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={close}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl glass rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search posts, publications, projects..."
            className="flex-1 bg-transparent text-base outline-none placeholder:text-[#0A0A0A]/40 dark:placeholder:text-[#FAFAFA]/40"
            aria-label="Search"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-1 text-[10px] font-mono glass rounded-lg">ESC</kbd>
        </div>

        {/* Results */}
        {results.length === 0 && query ? (
          <div className="p-8 text-center text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
            No results for &ldquo;{query}&rdquo;
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {(["blog", "publication", "project"] as const).map((type) => {
              const items = grouped[type];
              if (!items?.length) return null;
              const cfg = typeConfig[type];

              return (
                <div key={type} className="mb-1">
                  <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40">
                    {cfg.label}
                  </div>
                  {items.map((item) => {
                    const flatIdx = flatResults.indexOf(item);
                    const isSelected = flatIdx === selectedIndex;

                    return (
                      <button
                        key={`${item.type}-${item.slug || item.id}`}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setSelectedIndex(flatIdx)}
                        className={cn(
                          "w-full px-4 py-3 flex items-start gap-3 transition-all duration-150 text-left",
                          isSelected && "bg-white/5"
                        )}
                      >
                        <cfg.icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", cfg.color)} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          {item.excerpt && (
                            <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 line-clamp-1 mt-0.5">
                              {item.excerpt}
                            </p>
                          )}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-500"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-blue-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[10px] text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40">
          <span>
            <kbd className="font-mono">↑↓</kbd> navigate
          </span>
          <span>
            <kbd className="font-mono">↵</kbd> open
          </span>
          <span>
            <kbd className="font-mono">esc</kbd> close
          </span>
          <span className="ml-auto">{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
