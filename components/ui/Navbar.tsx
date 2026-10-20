"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSearchStore } from "@/lib/store/search";
import { cn } from "@/lib/utils";

const SearchModal = dynamic(
  () => import("@/components/search/SearchModal").then((m) => m.SearchModal),
  { ssr: false },
);

const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/publications", label: "papers" },
  { href: "/portfolio", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/tools", label: "tools" },
  { href: "/contact", label: "contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSearchOpen = useSearchStore((s) => s.isOpen);
  const openSearch = useSearchStore((s) => s.open);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openSearch]);

  return (
    <>
        <header
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-serif backdrop-blur-md",
            scrolled
              ? "bg-paper/90 border-b border-ink/15"
              : "bg-paper/70 border-b border-transparent"
          )}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-semibold text-base tracking-tight">
                fiqlab<span className="font-mono text-xs text-muted ml-1">.dev</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-serif transition-all duration-200",
                    pathname === link.href
                      ? "text-ink underline underline-offset-4 decoration-ink/40"
                      : "text-muted hover:text-ink"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 border border-ink/20 text-muted hover:text-ink hover:border-ink/50 transition-colors"
                aria-label="Toggle dark mode"
              >
                <Moon className="w-3.5 h-3.5 dark:hidden" />
                <Sun className="w-3.5 h-3.5 hidden dark:block" />
              </button>
              <button
                onClick={() => openSearch()}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-serif border border-ink/20 text-muted hover:text-ink hover:border-ink/50 transition-all duration-200 bg-transparent"
                aria-label="Search"
              >
                <Search className="w-3 h-3" />
                <span className="hidden sm:block">search</span>
                <kbd
                  aria-hidden="true"
                  className="hidden sm:flex items-center px-1 text-[10px] text-muted border border-ink/15 font-serif"
                >
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden p-2 border border-ink/20 text-muted hover:text-ink transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden font-serif">
          <div
            className="absolute inset-0 bg-paper/80"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-14 left-0 right-0 bg-paper-2/70 backdrop-blur-lg border-b border-ink/20 p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-serif transition-all duration-200",
                  pathname === link.href
                    ? "text-ink border-l-2 border-ink pl-3"
                    : "text-muted hover:text-ink border-l-2 border-transparent pl-3"
                )}
              >
                {pathname === link.href ? "> " : "  "}{link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {isSearchOpen ? <SearchModal /> : null}
    </>
  );
}
