import Link from "next/link";
import { Calendar, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";

const categoryConfig: Record<Project["category"], { label: string; color: string }> = {
  research: { label: "Research", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  webapp: { label: "Web App", color: "bg-teal-500/10 text-teal-500 border-teal-500/20" },
  embedded: { label: "Embedded", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  tool: { label: "Tool", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
};

export function ProjectCard({ project }: { project: Project }) {
  const cfg = categoryConfig[project.category];

  return (
    <article
      id={project.id}
      className="glass-hover hover-glow flex flex-col h-full p-6 group"
    >
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

      <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 leading-relaxed mb-4 flex-1">
        {project.longDescription || project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60"
          >
            {tech}
          </span>
        ))}
      </div>

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
