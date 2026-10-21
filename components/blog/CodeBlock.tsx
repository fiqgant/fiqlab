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

  const lang = language === "plaintext" ? "text" : language || "text";

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
    <div className="relative group my-6 rounded-sm overflow-hidden border border-ink/10 bg-paper-2">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-ink/10 bg-ink/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-ink/40" />
          {filename ? (
            <span className="text-xs text-ink/60 font-mono">{filename}</span>
          ) : (
            <span className="text-xs text-ink/40 font-mono uppercase">{lang}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs transition-all duration-200",
            copied
              ? "bg-accent/20 text-accent"
              : "bg-ink/5 text-ink/50 hover:bg-ink/10 hover:text-ink"
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

      <div className="overflow-x-auto text-ink">
        {children}
      </div>
    </div>
  );
}
