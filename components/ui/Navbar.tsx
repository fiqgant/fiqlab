"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { useSearchStore } from "@/lib/store/search";
import { cn } from "@/lib/utils";

const SearchModal = dynamic(
  () => import("@/components/search/SearchModal").then((m) => m.SearchModal),
  { ssr: false },
);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/publications", label: "Publications" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/contact", label: "Contact" },
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

  // Keyboard shortcut
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-white/10 shadow-lg shadow-black/10"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <BrandMark
                idPrefix="navbar-brand"
                className="w-9 h-9 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-bold text-sm gradient-text">
                Taufiqurrahman
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                    pathname === link.href
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70 hover:text-[#0A0A0A] dark:hover:text-[#FAFAFA]"
                  )}
                >
                  {pathname === link.href && (
                    <span className="absolute inset-0 rounded-lg bg-blue-500/10" />
                  )}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={openSearch}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-[#0A0A0A] dark:hover:text-[#FAFAFA] transition-all duration-200 hover:scale-[1.02]"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:block text-xs">Search</span>
                <kbd
                  aria-hidden="true"
                  className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-white/10 rounded border border-white/10 font-mono"
                >
                  ⌘K
                </kbd>
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden p-2 rounded-lg glass"
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-16 left-0 right-0 glass border-t border-white/10 p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-blue-500/15 text-blue-500"
                    : "hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {isSearchOpen ? <SearchModal /> : null}
    </>
  );
}
