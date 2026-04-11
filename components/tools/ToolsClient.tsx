"use client";

import { useState, useRef, useEffect } from "react";
import {
  Code2, Brain, Globe, Database, Cloud, Cpu, Terminal, FileCode,
  FileType, FileCode2, Binary, Flame, Target, Eye, LineChart, Layers,
  Box, Triangle, Atom, Zap, Coffee, Hexagon, Activity, Table,
  Container, GitBranch, Server, CircuitBoard, Wifi, Radio, Laptop,
  Smartphone, Watch, Headphones, Layers3, LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { skillSections, toolIconMap, type SkillSection, type SkillLevel } from "@/data/tools";

const iconComponents: Record<string, LucideIcon> = {
  Code2, Brain, Globe, Database, Cloud, Cpu, Terminal, FileCode,
  FileType, FileCode2, Binary, Flame, Target, Eye, LineChart, Layers,
  Box, Triangle, Atom, Zap, Coffee, Hexagon, Activity, Layers3, Table,
  Container, GitBranch, Server, CircuitBoard, Wifi, Radio, Laptop,
  Smartphone, Watch, Headphones,
};

const levelConfig: Record<SkillLevel, { label: string; color: string; bar: string; pct: number }> = {
  expert:     { label: "Expert",     color: "text-blue-400",  bar: "from-blue-500 to-cyan-400",   pct: 100 },
  proficient: { label: "Proficient", color: "text-teal-400",  bar: "from-teal-500 to-green-400",  pct: 72  },
  familiar:   { label: "Familiar",   color: "text-green-400", bar: "from-green-500 to-lime-400",  pct: 44  },
};

function SkillBar({ level, visible }: { level: SkillLevel; visible: boolean }) {
  const cfg = levelConfig[level];
  return (
    <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out", cfg.bar)}
        style={{ width: visible ? `${cfg.pct}%` : "0%" }}
      />
    </div>
  );
}

function CategoryCard({ cat, sectionColor }: {
  cat: SkillSection["categories"][number];
  sectionColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const CatIcon = iconComponents[cat.icon] || Box;

  return (
    <div ref={ref} className="glass rounded-2xl overflow-hidden">
      {/* Category header */}
      <div className={cn("px-5 py-3 flex items-center gap-2.5 bg-gradient-to-r", cat.color, "bg-opacity-10")}>
        <div className="p-1.5 rounded-lg bg-white/10">
          <CatIcon className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold text-white">{cat.category}</span>
        <span className="ml-auto text-xs text-white/60">{cat.tools.length} tools</span>
      </div>

      {/* Tools list */}
      <div className="divide-y divide-white/5">
        {cat.tools.map((tool, i) => {
          const iconName = toolIconMap[tool.name] || "Box";
          const Icon = iconComponents[iconName] || Box;
          const lvl = levelConfig[tool.level];

          return (
            <div
              key={tool.name}
              className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors duration-150"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-[#FAFAFA]/60" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-[#FAFAFA]/90 truncate">{tool.name}</span>
                  <span className={cn("text-[10px] font-semibold ml-2 flex-shrink-0", lvl.color)}>
                    {lvl.label}
                  </span>
                </div>
                <SkillBar level={tool.level} visible={visible} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ToolsClient() {
  const [activeTab, setActiveTab] = useState(0);
  const section = skillSections[activeTab];

  const totalTools = section.categories.reduce((n, c) => n + c.tools.length, 0);
  const expertCount = section.categories.reduce(
    (n, c) => n + c.tools.filter((t) => t.level === "expert").length, 0
  );
  const profCount = section.categories.reduce(
    (n, c) => n + c.tools.filter((t) => t.level === "proficient").length, 0
  );

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-12">
        {skillSections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(i)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
              activeTab === i
                ? `bg-gradient-to-r ${s.color} text-white shadow-lg`
                : "glass text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-[#0A0A0A] dark:hover:text-[#FAFAFA]"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { label: "Total Tools", value: totalTools },
          { label: "Expert Level", value: expertCount },
          { label: "Proficient", value: profCount },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5 text-center">
            <p className="text-3xl font-bold gradient-text">{stat.value}</p>
            <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Section description */}
      <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mb-8 text-center">
        {section.description}
      </p>

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.categories.map((cat) => (
          <CategoryCard key={cat.category} cat={cat} sectionColor={section.color} />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/10">
        {Object.entries(levelConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={cn("w-8 h-1.5 rounded-full bg-gradient-to-r", cfg.bar)} />
            <span className="text-xs text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">{cfg.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
