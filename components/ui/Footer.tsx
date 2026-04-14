import Link from "next/link";
import { Github, Linkedin, Mail, BookOpen } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { personal } from "@/data/personal";

const socialLinks = [
  { href: personal.github, icon: Github, label: "GitHub" },
  { href: personal.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${personal.email}`, icon: Mail, label: "Email" },
  { href: personal.googleScholar, icon: BookOpen, label: "Scholar" },
];

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/publications", label: "Publications" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      {/* Gradient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="sr-only">Footer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BrandMark idPrefix="footer-brand" className="w-9 h-9" />
              <span className="font-bold gradient-text">Taufiqurrahman</span>
            </div>
            <p className="text-sm text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70 leading-relaxed max-w-xs">
              {personal.role}
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                    className="p-2 glass rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/10 text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70 hover:text-blue-500"
                 >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#0A0A0A]/75 dark:text-[#FAFAFA]/75">
              Navigation
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70 hover:text-blue-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#0A0A0A]/75 dark:text-[#FAFAFA]/75">
              Research Focus
            </h3>
            <ul className="space-y-2">
              {personal.researchInterests.map((r) => (
                <li key={r.title} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-teal-500" />
                  <span className="text-sm text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70">
                    {r.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#0A0A0A]/65 dark:text-[#FAFAFA]/65">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="text-xs text-[#0A0A0A]/65 dark:text-[#FAFAFA]/65">
            Built with Next.js · Tailwind CSS · HeroUI
          </p>
        </div>
      </div>
    </footer>
  );
}
