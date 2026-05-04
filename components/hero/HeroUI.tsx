"use client";

import { useState } from "react";
import { Github, Linkedin, BookOpen, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { personal } from "@/data/personal";

interface Props {
  onToggleMode: () => void;
}

export function HeroUI({ onToggleMode }: Props) {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center px-6 select-none">
      <div className="flex items-center gap-2 fixed bottom-4 right-4 z-20">
        <button
          onClick={() => setMinimized(!minimized)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-[#00d4ff]/30 text-[#00d4ff]/70 hover:text-[#00d4ff] hover:border-[#00d4ff]/60 bg-black/60 backdrop-blur-sm transition-all duration-200 rounded-sm"
          title={minimized ? "Expand" : "Minimize"}
        >
          {minimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          <span>{minimized ? "expand" : "minimize"}</span>
        </button>
        <button
          onClick={onToggleMode}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-[#00d4ff]/30 text-[#00d4ff]/70 hover:text-[#00d4ff] hover:border-[#00d4ff]/60 bg-black/60 backdrop-blur-sm transition-all duration-200 rounded-sm"
        >
          <span>&gt;_</span>
          <span>terminal</span>
        </button>
      </div>

      {minimized ? (
        <div className="absolute bottom-16 right-4 z-20 flex items-center gap-3 px-4 py-2 border border-[#00d4ff]/30 bg-black/60 backdrop-blur-sm rounded-sm">
          <span className="text-[#00d4ff] font-mono text-sm font-bold">{personal.name}</span>
          <span className="text-[#0077cc] font-mono text-xs">{personal.role}</span>
        </div>
      ) : (
        <div className="max-w-2xl w-full space-y-8 text-center relative">
          <div className="absolute -inset-12 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/5 -z-10" />
          <div className="space-y-3">
            <p className="text-[#0077cc] text-sm font-mono tracking-widest uppercase">
              ~ {personal.location}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold font-mono text-[#00d4ff] text-glow">
              {personal.name}
            </h1>
            <p className="text-lg font-mono text-[#0077cc]">
              {personal.role}
            </p>
            <p className="text-sm font-mono text-[#0077cc]/80">
              {personal.institution}
            </p>
          </div>

          <p className="text-sm sm:text-base font-mono text-[#00d4ff]/70 leading-relaxed max-w-xl mx-auto">
            {personal.longBio}
          </p>

          <div className="grid grid-cols-4 gap-4">
            {personal.stats.map((s) => (
              <div
                key={s.label}
                className="border border-[#00d4ff]/20 bg-black/40 backdrop-blur-sm p-3 space-y-1"
              >
                <p className="text-xl font-bold font-mono text-[#00d4ff] text-glow">{s.value}</p>
                <p className="text-[10px] font-mono text-[#0077cc] uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <SocialLink href={personal.github} label="GitHub">
              <Github size={16} />
              <span>GitHub</span>
            </SocialLink>
            <SocialLink href={personal.linkedin} label="LinkedIn">
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </SocialLink>
            <SocialLink href={personal.googleScholar} label="Scholar">
              <BookOpen size={16} />
              <span>Scholar</span>
            </SocialLink>
            <SocialLink href={personal.sintaUrl} label="SINTA">
              <ExternalLink size={16} />
              <span>SINTA</span>
            </SocialLink>
          </div>
        </div>
      )}
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#00d4ff]/30 text-[#00d4ff]/70 hover:text-[#00d4ff] hover:border-[#00d4ff]/60 bg-black/40 backdrop-blur-sm transition-all duration-200"
    >
      {children}
    </a>
  );
}
