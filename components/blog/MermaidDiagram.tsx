"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

function initMermaid(dark: boolean) {
  mermaid.initialize({
    startOnLoad: false,
    theme: dark ? "dark" : "neutral",
    themeVariables: { fontFamily: "inherit", background: "transparent" },
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
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        initMermaid(resolvedTheme === "dark");
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
  }, [code, resolvedTheme]);

  if (error) {
    return (
      <div className="my-6 rounded-sm border border-red-500/30 bg-red-500/5 p-4">
        <p className="text-xs text-red-400 font-serif">{error}</p>
        <pre className="mt-2 text-xs text-ink/70 overflow-x-auto">{code}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 w-full h-40 rounded-sm glass animate-pulse" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 w-full overflow-x-auto rounded-sm glass p-4 flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
