"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

function initMermaid() {
  if (initialized) return;
  initialized = true;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    darkMode: true,
    themeVariables: {
      primaryColor: "#3B82F6",
      primaryTextColor: "#FAFAFA",
      primaryBorderColor: "#3B82F6",
      lineColor: "#14B8A6",
      secondaryColor: "#1e293b",
      tertiaryColor: "#0f172a",
      background: "transparent",
      mainBkg: "#1e293b",
      nodeBorder: "#3B82F6",
      clusterBkg: "#0f172a",
      titleColor: "#FAFAFA",
      edgeLabelBackground: "#1e293b",
      fontFamily: "inherit",
    },
    flowchart: { curve: "basis", htmlLabels: true },
    sequence: { actorFontFamily: "inherit", messageFontFamily: "inherit" },
  });
}

let idCounter = 0;

interface MermaidDiagramProps {
  code: string;
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const idRef = useRef(`mermaid-${++idCounter}`);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        initMermaid();
        const { svg: rendered } = await mermaid.render(idRef.current, code.trim());
        if (!cancelled) {
          setSvg(rendered);
          setError("");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
          setSvg("");
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [code]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
        <p className="text-xs text-red-400 font-mono">{error}</p>
        <pre className="mt-2 text-xs text-[#FAFAFA]/40 overflow-x-auto">{code}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 w-full h-40 rounded-xl glass animate-pulse" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 w-full overflow-x-auto rounded-xl glass p-4 flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
