import type { Metadata } from "next";
import Link from "next/link";
import { Github, ExternalLink, Calendar } from "lucide-react";
import { PortfolioClient } from "@/components/portfolio/PortfolioClient";
import { projects } from "@/data/portfolio";
import { readGitHubCache } from "@/lib/github";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Research projects and software tools by Taufiqurrahman — Computer Vision, IoT, and AI systems.",
};

const categoryConfig: Record<string, { label: string; color: string }> = {
  research: { label: "Research", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  webapp: { label: "Web App", color: "bg-teal-500/10 text-teal-500 border-teal-500/20" },
  embedded: { label: "Embedded", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  tool: { label: "Tool", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
};

export default async function PortfolioPage() {
  const githubCache = await readGitHubCache();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-3">Work</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Portfolio</h1>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 max-w-xl mx-auto">
          Research systems, open-source tools, and AI-powered applications.
        </p>
      </div>

      <PortfolioClient initialData={githubCache} />

      {/* Featured */}
      {featured.length > 0 && !githubCache && (
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-6">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Rest */}
      {rest.length > 0 && !githubCache && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-6">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {githubCache && (featured.length > 0 || rest.length > 0) && (
        <details className="glass rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-2">
                Manual Archive
              </p>
              <h2 className="text-2xl font-bold">Other Projects</h2>
            </div>
            <span className="text-sm text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
              Expand manual portfolio
            </span>
          </summary>

          <div className="mt-8 space-y-12">
            {featured.length > 0 && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-6">
                  Featured Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featured.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            )}

            {rest.length > 0 && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-6">
                  Other Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </details>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cfg = categoryConfig[project.category];

  return (
    <article
      id={project.id}
      className="glass-hover flex flex-col h-full p-6 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.color} mb-2`}>
            {cfg.label}
          </span>
          <h3 className="font-bold text-base group-hover:text-blue-500 transition-colors duration-200">
            {project.title}
          </h3>
        </div>
        <span className="flex items-center gap-1 text-xs text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 flex-shrink-0">
          <Calendar className="w-3 h-3" />
          {project.year}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 leading-relaxed mb-4 flex-1">
        {project.longDescription || project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-2">
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs font-medium hover:scale-105 hover:text-blue-500 transition-all duration-200"
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </Link>
        )}
        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/20 text-xs font-medium text-blue-500 hover:scale-105 transition-all duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Demo
          </Link>
        )}
      </div>
    </article>
  );
}
