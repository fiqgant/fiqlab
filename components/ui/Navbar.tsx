"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useSearchStore } from "@/lib/store/search";
import { cn } from "@/lib/utils";

const SearchModal = dynamic(
  () => import("@/components/search/SearchModal").then((m) => m.SearchModal),
  { ssr: false },
);

const navLinks = [
  { href: "/", label: "~" },
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
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono backdrop-blur-md",
            scrolled
              ? "bg-[#000a14]/60 border-b border-[#00d4ff]/20 shadow-[0_0_20px_rgba(0,212,255,0.05)]"
              : "bg-[#000a14]/30 border-b border-[#00d4ff]/10"
          )}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" onClick={() => localStorage.setItem("fiqlab-mode", "ui")}>
              <span className="text-[#00d4ff] font-bold text-sm tracking-wider group-hover:text-glow transition-all">
                <span className="text-[#0077cc]">[</span>
                <span className="text-white">fiq</span>
                <span className="text-[#00d4ff]">@lab</span>
                <span className="text-[#0077cc]">]</span>
                <span className="text-[#0077cc]">$</span>
                <span className="animate-blink ml-1 text-[#00d4ff]">▋</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-mono transition-all duration-200",
                    pathname === link.href
                      ? "text-[#00d4ff] text-glow"
                      : "text-[#0077cc] hover:text-[#00d4ff]"
                  )}
                >
                  {pathname === link.href && (
                    <span className="mr-1 text-white">›</span>
                  )}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => openSearch()}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-[#00d4ff]/20 text-[#0077cc] hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-all duration-200 bg-transparent"
                aria-label="Search"
              >
                <Search className="w-3 h-3" />
                <span className="hidden sm:block">search</span>
                <kbd
                  aria-hidden="true"
                  className="hidden sm:flex items-center px-1 text-[10px] text-[#0077cc] border border-[#00d4ff]/15 font-mono"
                >
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden p-2 border border-[#00d4ff]/20 text-[#0077cc] hover:text-[#00d4ff] transition-colors"
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
        <div className="fixed inset-0 z-40 md:hidden font-mono">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-14 left-0 right-0 bg-[#000a14]/70 backdrop-blur-lg border-b border-[#00d4ff]/20 p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-mono transition-all duration-200",
                  pathname === link.href
                    ? "text-[#00d4ff] border-l-2 border-[#00d4ff] pl-3 text-glow"
                    : "text-[#0077cc] hover:text-[#00d4ff] border-l-2 border-transparent pl-3"
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
