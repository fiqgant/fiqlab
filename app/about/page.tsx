import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Mail, Github, Linkedin, BookOpen, GraduationCap, Briefcase, Globe } from "lucide-react";
import { personal } from "@/data/personal";
import { MapboxMapClient } from "@/components/map/MapboxMapClient";

export const metadata: Metadata = {
  title: "About",
  description: `About ${personal.name}, ${personal.role}.`,
};

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
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-32">
      <div className="mb-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-3">
          About
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
          {personal.shortName}
        </h1>
        <p className="text-lg text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">
          {personal.role}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 space-y-5">
          <div className="glass rounded-2xl p-5 space-y-3">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-xl">
              <span className="text-3xl font-bold text-white">T</span>
            </div>
            <div className="text-center">
              <h2 className="font-bold text-base">{personal.name}</h2>
              <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mt-0.5">
                {personal.role}
              </p>
              <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-1 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" />
                {personal.location}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <Link
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-xs text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-blue-500 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-blue-500" />
                {personal.email}
              </Link>
              <Link
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-blue-500 transition-colors"
              >
                <Github className="w-3.5 h-3.5 flex-shrink-0" />
                fiqgant
              </Link>
              <Link
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-blue-500 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 flex-shrink-0" />
                LinkedIn
              </Link>
              <Link
                href={personal.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-blue-500 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                Google Scholar
              </Link>
              <Link
                href={personal.sintaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-blue-500 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                SINTA ({personal.sintaId})
              </Link>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-4">
              Academic Stats
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {personal.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 rounded-xl p-3 text-center"
                >
                  <p className="text-xl font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <MapboxMapClient />
        </aside>

        <div className="lg:col-span-2 space-y-8">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4 gradient-text">Biography</h2>
            <p className="text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70 leading-relaxed whitespace-pre-line">
              {personal.longBio}
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="flex items-center gap-2 font-bold text-lg mb-5">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              Education
            </h2>
            <div className="space-y-5">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="relative pl-5 border-l-2 border-blue-500/30"
                >
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <p className="font-semibold text-sm">{edu.degree}</p>
                  <p className="text-sm text-blue-500 mt-0.5">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">
                    {edu.year}
                  </p>
                  <p className="text-xs text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mt-1">
                    {edu.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="flex items-center gap-2 font-bold text-lg mb-5">
              <Briefcase className="w-5 h-5 text-teal-500" />
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-5 border-l-2 border-teal-500/30"
                >
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <p className="font-semibold text-sm">{exp.title}</p>
                  <p className="text-sm text-teal-500 mt-0.5">{exp.org}</p>
                  <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">
                    {exp.period}
                  </p>
                  <p className="text-xs text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mt-1">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-5 gradient-text">
              Research Interests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personal.researchInterests.map((r) => (
                <div
                  key={r.title}
                  className={`p-4 rounded-xl bg-gradient-to-br ${r.gradient} bg-opacity-10 border border-white/10`}
                >
                  <p className="font-semibold text-sm text-[#0A0A0A] dark:text-white">
                    {r.title}
                  </p>
                  <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 mt-1 leading-relaxed">
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
