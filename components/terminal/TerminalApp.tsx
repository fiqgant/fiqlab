"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { personal } from "@/data/personal";
import { cwdString } from "./VirtualFileSystem";
import {
  createInitialState,
  processCommand,
  autocomplete,
  type TerminalLine,
  type TerminalState,
} from "./CommandProcessor";
import { useTerminalHistory } from "./useTerminalHistory";
import type { BlogPost } from "@/lib/blog";
import { useSearchStore } from "@/lib/store/search";
import { SearchModal } from "@/components/search/SearchModal";

interface Props {
  posts: BlogPost[];
  onToggleMode?: () => void;
}

const SHORTCUTS = [
  { key: "b", label: "Blog", route: "/blog" },
  { key: "a", label: "About", route: "/about" },
  { key: "c", label: "Contact", route: "/contact" },
];

export function TerminalApp({ posts, onToggleMode }: Props) {
  const router = useRouter();
  const [state, setState] = useState<TerminalState>(() => createInitialState(posts));
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(false);
  const { push, navigate } = useTerminalHistory();

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && navigator.platform.includes("Mac"));
  }, []);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      const isMac = typeof navigator !== "undefined" && navigator.platform.includes("Mac");
      if (!((isMac && e.metaKey) || (!isMac && e.ctrlKey))) return;

      const el = e.target as HTMLElement;
      if (el instanceof HTMLInputElement && el === inputRef.current) {
        // Allow shortcuts even when terminal input is focused
      } else if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();
      const shortcut = SHORTCUTS.find((s) => s.key === key);
      if (shortcut) {
        e.preventDefault();
        router.push(shortcut.route);
      }

      if (key === "k") {
        e.preventDefault();
        useSearchStore.getState().open();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router, inputRef]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.lines]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const submit = useCallback(
    (cmd: string) => {
      push(cmd);
      const result = processCommand(state, cmd);

      setState((prev) => {
        const newLines = result.shouldClear ? [] : [...prev.lines, ...result.lines];
        return {
          ...prev,
          lines: newLines,
          cwd: result.newCwd !== undefined ? result.newCwd : prev.cwd,
        };
      });

      setInput("");
    },
    [state, push]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        submit(input);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setInput(navigate("up", input));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setInput(navigate("down", input));
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        submit("clear");
      } else if (e.key === "Tab") {
        e.preventDefault();
        const completed = autocomplete(state, input);
        if (completed) setInput(completed);
      }
    },
    [input, submit, navigate, state]
  );

  const prompt = `[${personal.name.toLowerCase().replace(/\s+/g, "")}@fiqlab ${cwdString(state.cwd)}]$`;

  return (
    <div
      className="relative w-full h-screen flex flex-col font-mono text-sm select-text cursor-text bg-black/20 backdrop-blur-sm"
      onClick={focusInput}
    >
      <div className="relative flex items-center gap-2 px-4 py-2.5 border-b border-[#00d4ff]/20 bg-[#000a14]/60 backdrop-blur-sm shrink-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,212,255,0.015)_1px,rgba(0,212,255,0.015)_2px)] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_6px_rgba(255,95,86,0.5)]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_rgba(255,189,46,0.5)]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_6px_rgba(39,201,63,0.5)]" />
        </div>

        <span className="relative z-10 ml-1 text-xs font-semibold tracking-wider text-[#00d4ff] uppercase text-glow">
          <span className="text-[#0077cc]">⌘</span> <span className="hidden sm:inline">fiqlab — terminal</span><span className="sm:hidden">fiqlab</span>
        </span>

        <span className="relative z-10 hidden md:flex items-center gap-1 text-[9px] text-[#0077cc] font-mono">
          <span className="w-1 h-1 rounded-full bg-[#27c93f] animate-pulse" />
          online
        </span>

        <div className="relative z-10 ml-auto flex items-center gap-1.5 shrink-0 overflow-visible">
          {SHORTCUTS.map((s) => (
            <button
              key={s.key}
              onClick={(e) => { e.stopPropagation(); router.push(s.route); }}
              className="relative z-20 flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold tracking-wide border border-[#00d4ff]/40 bg-[#00d4ff]/8 text-[#00d4ff] rounded-sm hover:bg-[#00d4ff]/30 hover:border-[#00d4ff] transition-all duration-200 whitespace-nowrap"
              title={`Go to ${s.label}`}
            >
              <kbd className="text-[10px] px-1 py-0.5 bg-[#00d4ff]/15 border border-[#00d4ff]/30 rounded-sm text-[#00d4ff] font-bold">{isMac ? "⌘" : "⌃"}{s.key}</kbd>
              <span>{s.label}</span>
            </button>
          ))}
          <button
            onClick={(e) => { e.stopPropagation(); useSearchStore.getState().open(); }}
            className="relative z-20 flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold tracking-wide border border-[#00d4ff]/40 bg-[#00d4ff]/8 text-[#00d4ff] rounded-sm hover:bg-[#00d4ff]/30 hover:border-[#00d4ff] transition-all duration-200 whitespace-nowrap"
            title="Search"
          >
            <kbd className="text-[10px] px-1 py-0.5 bg-[#00d4ff]/15 border border-[#00d4ff]/30 rounded-sm text-[#00d4ff] font-bold">{isMac ? "⌘" : "⌃"}k</kbd>
            <span>Search</span>
          </button>
          {onToggleMode && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggleMode(); }}
              className="relative z-20 flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold tracking-wide border border-[#00d4ff]/30 bg-[#00d4ff]/5 text-[#00d4ff] rounded-sm hover:bg-[#00d4ff]/30 hover:border-[#00d4ff] transition-all duration-200 whitespace-nowrap"
            >
              <kbd className="text-[10px] px-1 py-0.5 bg-[#00d4ff]/15 border border-[#00d4ff]/30 rounded-sm text-[#00d4ff] font-bold">▹</kbd>
              <span>UI</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0.5 scrollbar-thin scrollbar-thumb-[#00d4ff]/20 scrollbar-track-transparent">
        {state.lines.map((line) => (
          <TerminalLineView key={line.id} line={line} />
        ))}

        <div className="flex items-center gap-2 pt-1">
          <span className="text-[#00d4ff] whitespace-nowrap shrink-0">{prompt}</span>
          <span className="text-[#0077cc]">
            {input}
            <span className="inline-block w-2 h-4 bg-[#00d4ff] animate-pulse align-middle ml-0.5" />
          </span>
        </div>

        <div ref={bottomRef} />
      </div>

      <input
        ref={inputRef}
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        aria-label="terminal input"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />

      <SearchModal />
    </div>
  );
}

function TerminalLineView({ line }: { line: TerminalLine }) {
  const base = "leading-5 whitespace-pre-wrap break-words";
  switch (line.type) {
    case "input":
      return <p className={`${base} text-[#00d4ff]`}>{line.text}</p>;
    case "error":
      return <p className={`${base} text-[#ff5f56]`}>{line.text}</p>;
    case "system":
      return <p className={`${base} text-white`}>{line.text}</p>;
    default:
      return <p className={`${base} text-[#0077cc]`}>{line.text || "\u00a0"}</p>;
  }
}
