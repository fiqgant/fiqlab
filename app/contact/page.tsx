import type { Metadata } from "next";
import { Mail, MapPin, Github, Linkedin, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { personal } from "@/data/personal";
import { ContactForm } from "@/components/contact/ContactForm";
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-12">
        <p className="text-xs font-serif uppercase tracking-widest text-ink mb-3">
          {"// CONTACT"}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text font-serif">Get_In_Touch</h1>
        <p className="text-sm font-serif text-muted max-w-xl mx-auto">
          Open to research collaborations, academic partnerships, and speaking engagements.
        </p>
      </div>

      <div className="border border-ink/15 bg-paper-2 p-6 sm:p-8">
        <h2 className="font-bold font-serif text-ink mb-6">{"// SEND_MESSAGE"}</h2>
        <ContactForm />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div className="border border-ink/15 bg-paper-2 p-5 space-y-3">
          <h3 className="text-xs font-serif text-ink">{"// REACH_OUT"}</h3>
          {contactLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-7 h-7 border border-ink/15 bg-ink/5 flex items-center justify-center flex-shrink-0 group-hover:border-ink/40 transition-colors">
                <link.icon className="w-3 h-3 text-muted group-hover:text-ink transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-serif text-muted">{link.label}</p>
                <p className="text-xs font-serif text-muted group-hover:text-ink transition-colors truncate">
                  {link.value}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-6">
          <div className="border border-ink/15 bg-paper-2 p-5">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-ink" />
              <span className="text-xs font-serif text-ink">{"// LOCATION"}</span>
            </div>
            <p className="text-xs font-serif text-muted ml-6 leading-relaxed">
              {personal.institution}<br />
              {personal.location}
            </p>
          </div>

          <div className="border border-ink/15 bg-paper-2 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-ink" />
              <span className="text-xs font-serif text-ink">{"// OFFICE_HOURS"}</span>
            </div>
            <div className="space-y-2 text-xs font-serif ml-6">
              <div className="flex justify-between gap-2">
                <span className="text-muted">Mon – Wed</span>
                <span className="text-ink/70">09:00 – 12:00</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted">Thursday</span>
                <span className="text-ink/70">13:00 – 15:00</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted">Friday</span>
                <span className="text-ink/70">By appointment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
