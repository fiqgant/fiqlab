"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  filename?: string;
  language?: string;
}

export function CodeBlock({ children, filename, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const lang = language || "text";

  const getCodeText = (): string => {
    if (typeof children === "string") return children;
    const traverse = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(traverse).join("");
      if (node && typeof node === "object" && "props" in (node as object)) {
        const el = node as React.ReactElement<{ children?: React.ReactNode }>;
        return traverse(el.props.children);
      }
      return "";
    };
    return traverse(children);
  };

  const handleCopy = async () => {
    const text = getCodeText();
    await navigator.clipboard.writeText(text.trim());
    setCopied(true);
    toast.success("Code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-white/40" />
          {filename ? (
            <span className="text-xs text-white/60 font-mono">{filename}</span>
          ) : (
            <span className="text-xs text-white/40 font-mono uppercase">{lang}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all duration-200",
            copied
              ? "bg-green-500/20 text-green-400"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto text-[#e6edf3]">
        {children}
      </div>
    </div>
  );
}
