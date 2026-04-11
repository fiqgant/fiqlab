import type { Metadata } from "next";
import {
  Code2,
  Brain,
  Globe,
  Database,
  Cloud,
  Cpu,
  Terminal,
  FileCode,
  FileType,
  FileCode2,
  Binary,
  Flame,
  Target,
  Eye,
  LineChart,
  Layers,
  Box,
  Triangle,
  Atom,
  Zap,
  Coffee,
  Hexagon,
  Activity,
  Table,
  Container,
  GitBranch,
  Server,
  CircuitBoard,
  Wifi,
  Radio,
  Laptop,
  Smartphone,
  Watch,
  Headphones,
  Layers3,
} from "lucide-react";
import { skillSections, toolIconMap } from "@/data/tools";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tools & Skills",
  description: "Hardware and software I use in research and development.",
};

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, Brain, Globe, Database, Cloud, Cpu, Terminal, FileCode, FileType,
  FileCode2, Binary, Flame, Target, Eye, LineChart, Layers, Box, Triangle,
  Atom, Zap, Coffee, Hexagon, Activity, Layers3, Table, Container, GitBranch,
  Server, CircuitBoard, Wifi, Radio, Laptop, Smartphone, Watch, Headphones,
};

const levelConfig = {
  expert: { label: "Expert", color: "bg-blue-500", width: "w-full" },
  proficient: { label: "Proficient", color: "bg-teal-500", width: "w-3/4" },
  familiar: { label: "Familiar", color: "bg-green-500", width: "w-1/2" },
};

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-32">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-3">Stack</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Tools & Skills</h1>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 max-w-xl mx-auto">
          Hardware and software I use in research and development.
        </p>
      </div>

      {skillSections.map((section) => (
        <section key={section.id} className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("w-1 h-8 rounded-full bg-gradient-to-b", section.color)} />
            <h2 className="text-2xl font-bold">{section.label}</h2>
          </div>
          <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mb-8 ml-4">
            {section.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {section.categories.flatMap((cat) =>
              cat.tools.map((tool) => {
                const iconName = toolIconMap[tool.name] || "Box";
                const Icon = iconComponents[iconName] || Box;
                const lvl = levelConfig[tool.level];

                return (
                  <div
                    key={tool.name}
                    className="glass-hover flex flex-col items-center text-center p-4 gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70" />
                    </div>
                    <span className="text-sm font-medium text-[#0A0A0A]/80 dark:text-[#FAFAFA]/80 leading-tight">
                      {tool.name}
                    </span>
                    <span className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                      tool.level === "expert" && "text-blue-500 bg-blue-500/10",
                      tool.level === "proficient" && "text-teal-500 bg-teal-500/10",
                      tool.level === "familiar" && "text-green-500 bg-green-500/10",
                    )}>
                      {lvl.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
        {Object.entries(levelConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={cn("w-3 h-1.5 rounded-full", cfg.color)} />
            <span className="text-xs text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">{cfg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
