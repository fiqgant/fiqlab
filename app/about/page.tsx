import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Mail, Github, Linkedin, BookOpen, GraduationCap, Briefcase, Globe } from "lucide-react";
import { personal } from "@/data/personal";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: `About ${personal.name}, ${personal.role}, research background, academic profile, and areas of expertise.`,
  path: "/about",
  keywords: [personal.institution, "academic profile", "researcher biography"],
});

const education = [
  {
    degree: "M.Kom — Magister Komputer",
    institution: "Universitas Sumatera Utara",
    year: "2019 – 2021",
    detail: "Field: Computer Science",
  },
  {
    degree: "S.T. — Sarjana Teknik",
    institution: "Universitas Malikussaleh",
    year: "2014 – 2018",
    detail: "Field: Computer Science",
  },
];

const experience = [
  {
    title: "Researcher",
    org: "Politeknik Wilmar Bisnis Indonesia",
    period: "2021 – Present",
    desc: "Leading research in YOLO-based object detection and IoT integration.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: personal.name,
      alternateName: personal.shortName,
      description: personal.longBio.replace(/\n/g, " "),
      url: absoluteUrl("/about"),
      jobTitle: personal.role,
      worksFor: {
        "@type": "Organization",
        name: personal.institution,
      },
      alumniOf: education.map((item) => ({
        "@type": "CollegeOrUniversity",
        name: item.institution,
      })),
      sameAs: [
        personal.github,
        personal.linkedin,
        personal.googleScholar,
        personal.sintaUrl,
      ],
      knowsAbout: personal.researchInterests.map((item) => item.title),
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-16 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-white mb-3">
          {"// ABOUT"}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text font-mono">
          {personal.shortName}
        </h1>
        <p className="text-base font-mono text-[#0077cc]">
          {personal.role}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 space-y-5">
          <div className="border border-[#00d4ff]/15 bg-[#000510] p-5 space-y-3">
            <div className="w-20 h-20 mx-auto border border-[#00d4ff]/40 bg-[#00d4ff]/5 flex items-center justify-center">
              <span className="text-3xl font-bold font-mono text-[#00d4ff]">T</span>
            </div>
            <div className="text-center">
              <h2 className="font-bold font-mono text-base text-[#00d4ff]">{personal.name}</h2>
              <p className="text-xs font-mono text-[#0077cc] mt-0.5">{personal.role}</p>
              <p className="text-xs font-mono text-[#005599] mt-1 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" />
                {personal.location}
              </p>
            </div>

            <div className="pt-3 border-t border-[#00d4ff]/10 space-y-2">
              <Link
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-xs font-mono text-[#0077cc] hover:text-[#00d4ff] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-[#00d4ff]" />
                {personal.email}
              </Link>
              <Link
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-[#0077cc] hover:text-[#00d4ff] transition-colors"
              >
                <Github className="w-3.5 h-3.5 flex-shrink-0" />
                fiqgant
              </Link>
              <Link
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-[#0077cc] hover:text-[#00d4ff] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 flex-shrink-0" />
                LinkedIn
              </Link>
              <Link
                href={personal.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-[#0077cc] hover:text-[#00d4ff] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                Google Scholar
              </Link>
              <Link
                href={personal.sintaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-[#0077cc] hover:text-[#00d4ff] transition-colors"
              >
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                SINTA ({personal.sintaId})
              </Link>
            </div>
          </div>

          <div className="border border-[#00d4ff]/15 bg-[#000510] p-5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4">
              {"// ACADEMIC_STATS"}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {personal.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-[#00d4ff]/10 bg-[#00d4ff]/5 p-3 text-center"
                >
                  <p className="text-xl font-bold font-mono gradient-text">{stat.value}</p>
                  <p className="text-[10px] font-mono text-[#005599] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-2 space-y-8">
          <div className="border border-[#00d4ff]/15 bg-[#000510] p-6">
            <h2 className="font-bold font-mono text-white mb-4">{"// BIOGRAPHY"}</h2>
            <p className="text-sm font-mono text-[#0077cc] leading-relaxed whitespace-pre-line">
              {personal.longBio}
            </p>
          </div>

          <div className="border border-[#00d4ff]/15 bg-[#000510] p-6">
            <h2 className="flex items-center gap-2 font-bold font-mono text-white mb-5">
              <GraduationCap className="w-4 h-4" />
              {"// EDUCATION"}
            </h2>
            <div className="space-y-5">
              {education.map((edu, i) => (
                <div key={i} className="relative pl-5 border-l-2 border-[#00d4ff]/20">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-[#00d4ff]" />
                  <p className="font-semibold font-mono text-sm text-[#00d4ff]/80">{edu.degree}</p>
                  <p className="text-sm font-mono text-white mt-0.5">{edu.institution}</p>
                  <p className="text-xs font-mono text-[#005599] mt-0.5">{edu.year}</p>
                  <p className="text-xs font-mono text-[#0077cc] mt-1">{edu.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#00d4ff]/15 bg-[#000510] p-6">
            <h2 className="flex items-center gap-2 font-bold font-mono text-white mb-5">
              <Briefcase className="w-4 h-4" />
              {"// EXPERIENCE"}
            </h2>
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-5 border-l-2 border-[#00d4ff]/20">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-[#00d4ff]" />
                  <p className="font-semibold font-mono text-sm text-[#00d4ff]/80">{exp.title}</p>
                  <p className="text-sm font-mono text-white mt-0.5">{exp.org}</p>
                  <p className="text-xs font-mono text-[#005599] mt-0.5">{exp.period}</p>
                  <p className="text-xs font-mono text-[#0077cc] mt-1">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#00d4ff]/15 bg-[#000510] p-6">
            <h2 className="font-bold font-mono text-white mb-5">{"// RESEARCH_INTERESTS"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personal.researchInterests.map((r) => (
                <div
                  key={r.title}
                  className="p-4 border border-[#00d4ff]/10 bg-[#00d4ff]/5 hover:border-[#00d4ff]/30 transition-colors"
                >
                  <p className="font-semibold font-mono text-sm text-[#00d4ff]/80">{r.title}</p>
                  <p className="text-xs font-mono text-[#0077cc] mt-1 leading-relaxed">
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
