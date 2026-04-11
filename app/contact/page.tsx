import type { Metadata } from "next";
import { Mail, MapPin, Github, Linkedin, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { personal } from "@/data/personal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${personal.name} for research collaboration.`,
};

const contactLinks = [
  { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
  { icon: Github, label: "GitHub", value: "fiqgant", href: personal.github },
  { icon: Linkedin, label: "LinkedIn", value: "View profile", href: personal.linkedin },
  { icon: BookOpen, label: "Google Scholar", value: "View profile", href: personal.googleScholar },
];

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-32">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-3">Contact</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Get In Touch</h1>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 max-w-xl mx-auto">
          Open to research collaborations, academic partnerships, and speaking engagements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact info */}
        <aside className="lg:col-span-2 space-y-4">
          {/* Location */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold">Location</span>
            </div>
            <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 ml-6">
              {personal.institution}<br />
              {personal.department}<br />
              {personal.location}
            </p>
          </div>

          {/* Links */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-3">
              Reach Out
            </h3>
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/10 transition-colors">
                  <link.icon className="w-3.5 h-3.5 text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 group-hover:text-blue-500 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40">{link.label}</p>
                  <p className="text-sm font-medium group-hover:text-blue-500 transition-colors truncate">
                    {link.value}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Office hours */}
          <div className="glass rounded-2xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-3">
              Office Hours
            </h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">Monday – Wednesday</span>
                <span className="font-medium">09:00 – 12:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">Thursday</span>
                <span className="font-medium">13:00 – 15:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">Friday</span>
                <span className="font-medium">By appointment</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Contact form */}
        <div className="lg:col-span-3">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-bold text-lg mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
