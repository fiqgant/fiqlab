import type { Metadata } from "next";
import { Mail, MapPin, Github, Linkedin, BookOpen } from "lucide-react";
import Link from "next/link";
import { personal } from "@/data/personal";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapboxMapClient } from "@/components/map/MapboxMapClient";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: `Contact ${personal.name} for research collaboration, academic partnerships, and speaking engagements.`,
  path: "/contact",
  keywords: ["contact researcher", "research collaboration", "academic partnership"],
});

const contactLinks = [
  { icon: Mail,     label: "Email",          value: personal.email,  href: `mailto:${personal.email}` },
  { icon: Github,   label: "GitHub",         value: "fiqgant",       href: personal.github },
  { icon: Linkedin, label: "LinkedIn",       value: "View profile",  href: personal.linkedin },
  { icon: BookOpen, label: "Google Scholar", value: "View profile",  href: personal.googleScholar },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${personal.name}`,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "Person",
      name: personal.name,
      email: personal.email,
      telephone: personal.phone,
      address: personal.address,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-3">Contact</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Get In Touch</h1>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 max-w-xl mx-auto">
          Open to research collaborations, academic partnerships, and speaking engagements.
        </p>
      </div>

      {/* Main grid — Map left, Info + Form right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

        {/* ── Map ── */}
        <div className="rounded-3xl overflow-hidden shadow-2xl min-h-[480px] lg:h-full">
          <MapboxMapClient fullWidth />
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-4">
          {/* Location */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold">Location</span>
            </div>
            <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 ml-6">
              {personal.institution}<br />
              {personal.department}<br />
              {personal.location}
            </p>
          </div>

          {/* Links + Office hours side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40">
                Reach Out
              </h3>
              {contactLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-lg glass flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/10 transition-colors">
                    <link.icon className="w-3 h-3 text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40">{link.label}</p>
                    <p className="text-xs font-medium group-hover:text-blue-500 transition-colors truncate">
                      {link.value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-3">
                Office Hours
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <span className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">Mon – Wed</span>
                  <span className="font-medium">09:00 – 12:00</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">Thursday</span>
                  <span className="font-medium">13:00 – 15:00</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">Friday</span>
                  <span className="font-medium">By appointment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Send a Message form — grows to fill remaining height */}
          <div className="glass rounded-2xl p-6 flex-1">
            <h2 className="font-bold text-lg mb-5">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
