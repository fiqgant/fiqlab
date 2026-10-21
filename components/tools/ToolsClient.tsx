"use client";

import { useState } from "react";
import {
  Code2, Brain, Globe, Database, Cloud, Cpu, Terminal, FileCode,
  FileType, FileCode2, Binary, Flame, Target, Eye, LineChart, Layers,
  Box, Triangle, Atom, Zap, Coffee, Hexagon, Activity, Table,
  Container, GitBranch, Server, CircuitBoard, Wifi, Radio, Laptop,
  Smartphone, Watch, Headphones, Layers3, LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { skillSections, toolIconMap, type SkillLevel } from "@/data/tools";

const iconComponents: Record<string, LucideIcon> = {
  Code2, Brain, Globe, Database, Cloud, Cpu, Terminal, FileCode,
  FileType, FileCode2, Binary, Flame, Target, Eye, LineChart, Layers,
  Box, Triangle, Atom, Zap, Coffee, Hexagon, Activity, Layers3, Table,
  Container, GitBranch, Server, CircuitBoard, Wifi, Radio, Laptop,
  Smartphone, Watch, Headphones,
};

const levelConfig: Record<SkillLevel, {
  label: string;
  dot: string;
  glow: string;
  iconColor: string;
  border: string;
}> = {
  expert: {
    label: "Expert",
    dot: "bg-accent",
    glow: "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3)",
    iconColor: "text-accent",
    border: "hover:border-accent/50",
  },
  proficient: {
    label: "Proficient",
    dot: "bg-accent",
    glow: "0 0 20px rgba(20,184,166,0.6), 0 0 40px rgba(20,184,166,0.3)",
    iconColor: "text-accent",
    border: "hover:border-accent/50",
  },
  familiar: {
    label: "Familiar",
    dot: "bg-accent",
    glow: "0 0 20px rgba(14,165,233,0.6), 0 0 40px rgba(14,165,233,0.3)",
    iconColor: "text-accent",
    border: "hover:border-accent/50",
  },
};

function ToolIcon({ name, level, iconName, url }: { name: string; level: SkillLevel; iconName: string; url?: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconComponents[iconName] || Box;
  const cfg = levelConfig[level];

  const content = (
    <>
      {/* Glow layer */}
      <div
        className="absolute inset-0 rounded-sm transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: cfg.glow,
        }}
      />

      {/* Icon */}
      <div
        className={cn(
          "relative w-14 h-14 rounded-sm flex items-center justify-center",
          "bg-ink/5 transition-all duration-300",
          hovered && "bg-ink/10"
        )}
      >
        <Icon
          className={cn(
            "w-7 h-7 transition-all duration-300",
            hovered ? cfg.iconColor : "text-ink/70"
          )}
        />

        {/* Inner glow on icon */}
        {hovered && (
          <div
            className="absolute inset-0 rounded-sm pointer-events-none"
            style={{ boxShadow: `inset 0 0 12px ${cfg.glow.split(",")[0].replace("0 0 20px ", "")}` }}
          />
        )}
      </div>

      {/* Name */}
      <span className="text-xs font-medium text-center leading-tight text-ink/70 group-hover:text-ink/95 transition-colors duration-300">
        {name}
      </span>

      {/* Level dot */}
      <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
    </>
  );

  const Wrapper = url ? "a" : "div";

  return (
    <Wrapper
      {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative flex flex-col items-center gap-3 p-5 rounded-sm border border-ink/10 bg-ink/5 transition-all duration-300 hover:scale-105",
        url
          ? "cursor-pointer hover:bg-ink/10"
          : "cursor-default",
        cfg.border
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </Wrapper>
  );
}

export function ToolsClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const section = skillSections[activeTab];

  const categories = section.categories;
  const filteredTools = (activeCategory
    ? categories.filter((c) => c.category === activeCategory)
    : categories
  ).flatMap((c) => c.tools.map((t) => ({ ...t, category: c.category })));

  const totalTools = section.categories.reduce((n, c) => n + c.tools.length, 0);
  const expertCount = section.categories.reduce(
    (n, c) => n + c.tools.filter((t) => t.level === "expert").length, 0
  );
  const profCount = section.categories.reduce(
    (n, c) => n + c.tools.filter((t) => t.level === "proficient").length, 0
  );

  return (
    <>
      {/* Section tabs */}
      <div className="flex justify-center gap-2 mb-12">
        {skillSections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActiveTab(i); setActiveCategory(null); }}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
              activeTab === i
                ? `bg-gradient-to-r ${s.color} text-ink shadow-lg shadow-blue-500/20`
                : "glass text-ink/70 hover:text-ink"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Total Tools", value: totalTools },
          { label: "Expert",      value: expertCount },
          { label: "Proficient",  value: profCount },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-sm p-5 text-center">
            <p className="text-3xl font-bold gradient-text">{stat.value}</p>
            <p className="text-xs text-ink/70 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200",
            activeCategory === null
              ? "border-accent/60 text-accent bg-accent/10"
              : "border-ink/10 text-ink/70 hover:border-ink/30 hover:text-ink/80"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200",
              activeCategory === cat.category
                ? "border-accent/60 text-accent bg-accent/10"
                : "border-ink/10 text-ink/70 hover:border-ink/30 hover:text-ink/80"
            )}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Icon grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filteredTools.map((tool) => (
          <ToolIcon
            key={tool.name}
            name={tool.name}
            level={tool.level}
            iconName={toolIconMap[tool.name] || "Box"}
            url={tool.url}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-ink/10">
        {Object.entries(levelConfig).map(([, cfg]) => (
          <div key={cfg.label} className="flex items-center gap-2">
            <span className={cn("w-2 h-2 rounded-full", cfg.dot)} />
            <span className="text-xs text-ink/70">{cfg.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
