import { personal } from "@/data/personal";
import {
  buildVirtualFS,
  cwdString,
  getDir,
  getNode,
  resolvePath,
  type VFSDir,
  type VFSNode,
} from "./VirtualFileSystem";
import type { BlogPost } from "@/lib/blog";
import { useSearchStore } from "@/lib/store/search";

export interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "system";
  text: string;
}

export interface TerminalState {
  lines: TerminalLine[];
  cwd: string[];
  fs: VFSDir;
  posts: BlogPost[];
}

let lineId = 0;
const nextId = () => ++lineId;

function out(text: string): TerminalLine {
  return { id: nextId(), type: "output", text };
}

function err(text: string): TerminalLine {
  return { id: nextId(), type: "error", text };
}

function inp(text: string): TerminalLine {
  return { id: nextId(), type: "input", text };
}

const HELP_TEXT = `
AVAILABLE COMMANDS:

  help              this help message
  whoami            display user info
  pwd               print working directory
  ls [path]         list directory contents
  cd <dir>          change directory
  cat <file>        display file contents
  clear             clear terminal
  open <page|url|slug>  open internal page, external link, or blog post
  grep <term>       search file names & content
  blog              list, read, or search blog posts
  search <term>     open global search modal with pre-filled query

BLOG COMMANDS:
  blog              list all blog posts
  blog read <slug>  read a specific post
  blog search <q>   search blog posts by title/tag

NAVIGATION:
  ↑ / ↓            command history
  Tab               (not supported yet)

FILESYSTEM:
  ~                 home directory
  ~/about.txt       personal info
  ~/contact.txt     contact details
  ~/tools.txt       skills & tools
  ~/blog/           blog posts
  ~/publications/   research publications
`;

function cmdHelp(): TerminalLine[] {
  return HELP_TEXT.trimStart().split("\n").map(out);
}

function cmdWhoami(): TerminalLine[] {
  return [
    out(`${personal.name} <${personal.email}>`),
    out(`${personal.role} @ ${personal.institution}`),
    out(`${personal.location}`),
    out(personal.bio),
  ];
}

function cmdPwd(cwd: string[]): TerminalLine[] {
  return [out(cwdString(cwd))];
}

function cmdLs(state: TerminalState, args: string[]): TerminalLine[] {
  const showHidden = args.includes("-a") || args.includes("-la") || args.includes("-al");
  const pathArg = args.find((a) => !a.startsWith("-"));

  let targetCwd = state.cwd;
  if (pathArg) {
    const resolved = resolvePath(state.fs, state.cwd, pathArg);
    if (resolved === null) {
      const node = getNode(state.fs, state.cwd, pathArg);
      if (!node || node.type !== "dir") {
        return [err(`ls: ${pathArg}: No such directory`)];
      }
    } else {
      targetCwd = resolved;
    }
  }

  const dir = getDir(state.fs, targetCwd);
  if (!dir) return [err("ls: cannot access directory")];

  const entries = Object.values(dir.children)
    .filter((n) => showHidden || !n.name.startsWith("."))
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  if (entries.length === 0) return [out("(empty)")];

  const formatted = entries
    .map((n) => (n.type === "dir" ? `${n.name}/` : n.name))
    .join("  ");

  return [out(formatted)];
}

function cmdCd(state: TerminalState, args: string[]): { newCwd: string[]; lines: TerminalLine[] } {
  const target = args[0];

  if (!target || target === "~") {
    return { newCwd: [], lines: [] };
  }

  const resolved = resolvePath(state.fs, state.cwd, target);
  if (resolved === null) {
    const node = getNode(state.fs, state.cwd, target);
    if (node && node.type === "file") {
      return { newCwd: state.cwd, lines: [err(`cd: ${target}: Not a directory`)] };
    }
    return { newCwd: state.cwd, lines: [err(`cd: ${target}: No such file or directory`)] };
  }

  return { newCwd: resolved, lines: [] };
}

function cmdCat(state: TerminalState, args: string[]): TerminalLine[] {
  if (!args[0]) return [err("cat: missing file operand")];

  let node: VFSNode | null = null;

  if (args[0].includes("/")) {
    const parts = args[0].split("/");
    const fileName = parts.pop()!;
    const dirParts = parts.join("/");
    const resolved = resolvePath(state.fs, state.cwd, dirParts || ".");
    if (resolved !== null) {
      const dir = getDir(state.fs, resolved);
      node = dir?.children[fileName] ?? null;
    }
  } else {
    node = getNode(state.fs, state.cwd, args[0]);
  }

  if (!node) return [err(`cat: ${args[0]}: No such file`)];
  if (node.type === "dir") return [err(`cat: ${args[0]}: Is a directory`)];

  return node.content.split("\n").map(out);
}

function cmdGrep(state: TerminalState, args: string[]): TerminalLine[] {
  const term = args[0];
  if (!term) return [err("grep: missing search term")];

  const lowerTerm = term.toLowerCase();
  const results: TerminalLine[] = [];

  function searchDir(dirNode: VFSDir, path: string) {
    for (const [name, child] of Object.entries(dirNode.children)) {
      const childPath = path ? `${path}/${name}` : name;
      if (child.type === "dir") {
        searchDir(child, childPath);
      } else {
        if (
          name.toLowerCase().includes(lowerTerm) ||
          child.content.toLowerCase().includes(lowerTerm)
        ) {
          results.push(out(`~/${childPath}`));
          const matchingLines = child.content
            .split("\n")
            .filter((l) => l.toLowerCase().includes(lowerTerm))
            .slice(0, 3);
          matchingLines.forEach((l) => results.push(out(`  ${l.trim()}`)));
        }
      }
    }
  }

  searchDir(state.fs, "");

  if (results.length === 0) return [out(`grep: no matches for '${term}'`)];
  return [out(`grep results for '${term}':`), ...results];
}

function cmdSearch(args: string[]): TerminalLine[] {
  const term = args.join(" ");
  if (!term) return [err("search: missing search term. Example: search machine learning")];

  if (typeof window !== "undefined") {
    useSearchStore.getState().open(term);
  }

  return [out(`opening search for '${term}' ...`)];
}

function cmdOpen(state: TerminalState, args: string[]): TerminalLine[] {
  const url = args[0];
  if (!url) return [err("open: missing url")];

  const validLinks: Record<string, string> = {
    github: personal.github,
    linkedin: personal.linkedin,
    scholar: personal.googleScholar,
    sinta: personal.sintaUrl,
  };

  if (validLinks[url.toLowerCase()]) {
    const resolved = validLinks[url.toLowerCase()];
    if (typeof window !== "undefined") {
      window.open(resolved, "_blank", "noopener,noreferrer");
    }
    return [out(`opening ${resolved} ...`)];
  }

  if (url.startsWith("http")) {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    return [out(`opening ${url} ...`)];
  }

  if (url.startsWith("/")) {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
    return [out(`navigating to ${url} ...`)];
  }

  const internalPages: Record<string, string> = {
    about: "/about",
    contact: "/contact",
    tools: "/tools",
    portfolio: "/portfolio",
    publications: "/publications",
  };

  if (internalPages[url.toLowerCase()]) {
    const route = internalPages[url.toLowerCase()];
    if (typeof window !== "undefined") {
      window.location.href = route;
    }
    return [out(`navigating to ${route} ...`)];
  }

  const slug = url.replace(/\.txt$/, "");
  const post = state.posts.find((p) => p.slug === slug);
  if (post) {
    const route = `/blog/${post.slug}`;
    if (typeof window !== "undefined") {
      window.location.href = route;
    }
    return [out(`opening ${route} ...`)];
  }

  return [err(`open: unknown target '${url}'. Try: about, contact, tools, portfolio, publications, github, linkedin, scholar, sinta, or a blog post slug.`)];
}

function cmdBlog(state: TerminalState, args: string[]): TerminalLine[] {
  const subcmd = args[0]?.toLowerCase();

  if (!subcmd) {
    const lines: TerminalLine[] = [out(`BLOG POSTS (${state.posts.length}):\n`)];
    state.posts.forEach((p, i) => {
      const tags = (p.frontmatter.tags ?? []).slice(0, 2).join(", ");
      lines.push(out(`  ${(i + 1).toString().padStart(2)}. ${p.frontmatter.title.padEnd(50).slice(0, 50)}`));
      lines.push(out(`       ${p.frontmatter.date.padEnd(12)}  ${p.readingTimeText.padEnd(8)}  ${tags}`));
    });
    lines.push(out(`\nUsage: blog read <slug>  |  blog search <term>`));
    return lines;
  }

  if (subcmd === "read") {
    const slug = args[1];
    if (!slug) return [err("blog read: missing slug. Example: blog read my-post-slug")];
    const post = state.posts.find((p) => p.slug === slug);
    if (!post) return [err(`blog read: '${slug}' not found. Use 'blog' to list all posts.`)];
    const lines: TerminalLine[] = [
      out(``),
      out(`${post.frontmatter.title}`),
      out(`${"═".repeat(60)}`),
      out(`${post.frontmatter.date}  ·  ${post.readingTimeText}`),
      out(`Tags: ${(post.frontmatter.tags ?? []).join(", ")}`),
      out(`URL: /blog/${post.slug}`),
      out(``),
      ...post.excerpt.split("\n").map((l) => out(`  ${l.trim()}`)),
      out(``),
      out(`Open: open /blog/${post.slug}`),
    ];
    return lines;
  }

  if (subcmd === "search") {
    const term = args.slice(1).join(" ").toLowerCase();
    if (!term) return [err("blog search: missing search term")];
    const results = state.posts.filter(
      (p) =>
        p.frontmatter.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        (p.frontmatter.tags ?? []).some((t) => t.toLowerCase().includes(term))
    );
    if (results.length === 0) return [out(`blog search: no matches for '${term}'`)];
    const lines: TerminalLine[] = [out(`Found ${results.length} post(s) for '${term}':\n`)];
    results.forEach((p) => {
      lines.push(out(`  ${p.frontmatter.title}`));
      lines.push(out(`    ${p.frontmatter.date}  ·  ${p.readingTimeText}  ·  /blog/${p.slug}`));
    });
    return lines;
  }

  return [err(`blog: unknown subcommand '${subcmd}'. Use: blog, blog read <slug>, blog search <term>`)];
}

export interface ProcessResult {
  lines: TerminalLine[];
  newCwd?: string[];
  shouldClear?: boolean;
}

export function processCommand(state: TerminalState, raw: string): ProcessResult {
  const trimmed = raw.trim();
  const echoLine = inp(`[${personal.name.toLowerCase().replace(/\s+/g, "")}@fiqlab ${cwdString(state.cwd)}]$ ${trimmed}`);

  if (!trimmed) {
    return { lines: [echoLine] };
  }

  const [cmd, ...args] = trimmed.split(/\s+/);

  switch (cmd.toLowerCase()) {
    case "help":
      return { lines: [echoLine, ...cmdHelp()] };

    case "whoami":
      return { lines: [echoLine, ...cmdWhoami()] };

    case "pwd":
      return { lines: [echoLine, ...cmdPwd(state.cwd)] };

    case "ls":
      return { lines: [echoLine, ...cmdLs(state, args)] };

    case "cd": {
      const { newCwd, lines } = cmdCd(state, args);
      return { lines: [echoLine, ...lines], newCwd };
    }

    case "cat":
      return { lines: [echoLine, ...cmdCat(state, args)] };

    case "grep":
      return { lines: [echoLine, ...cmdGrep(state, args)] };

    case "open":
      return { lines: [echoLine, ...cmdOpen(state, args)] };

    case "blog":
      return { lines: [echoLine, ...cmdBlog(state, args)] };

    case "search":
      return { lines: [echoLine, ...cmdSearch(args)] };

    case "clear":
      return { lines: [], shouldClear: true };

    case "exit":
    case "quit":
      return { lines: [echoLine, out("You can't escape. This is your lab.")] };

    default:
      return {
        lines: [
          echoLine,
          err(`${cmd}: command not found. Type 'help' for available commands.`),
        ],
      };
  }
}

export function createInitialState(posts: BlogPost[]): TerminalState {
  const fs = buildVirtualFS(posts);
  const welcome: TerminalLine[] = [
    { id: nextId(), type: "system", text: `FiqLab Terminal v1.0.0` },
    { id: nextId(), type: "system", text: `${personal.name} @ ${personal.institution}` },
    { id: nextId(), type: "system", text: `Type 'help' for available commands.` },
    { id: nextId(), type: "system", text: `` },
  ];
  return { lines: welcome, cwd: [], fs, posts };
}

export function autocomplete(state: TerminalState, input: string): string | null {
  const trimmed = input;
  const spaceIdx = trimmed.indexOf(" ");
  const isFirstWord = spaceIdx === -1;

  if (isFirstWord) {
    const cmd = trimmed.trim().toLowerCase();
    if (!cmd) return null;
    const commands = ["help", "whoami", "pwd", "ls", "cd", "cat", "clear", "open", "grep", "blog", "search", "exit", "quit"];
    const matches = commands.filter((c) => c.startsWith(cmd));
    if (matches.length === 1) return matches[0];
    return null;
  }

  const cmd = trimmed.slice(0, spaceIdx).toLowerCase();
  const partial = trimmed.slice(spaceIdx + 1);

  if (cmd === "cd") {
    const parts = partial.split("/");
    const partialDir = parts.length > 1 ? parts.slice(0, -1).join("/") : "";
    const partialName = parts[parts.length - 1];

    const searchPath = partialDir ? [...state.cwd, ...partialDir.split("/").filter(Boolean)] : state.cwd;
    const dir = getDir(state.fs, searchPath);
    if (!dir) return null;

    const matches = Object.keys(dir.children).filter(
      (n) => !n.startsWith(".") && n.toLowerCase().startsWith(partialName.toLowerCase())
    );
    if (matches.length === 1) {
      const isDir = dir.children[matches[0]].type === "dir";
      return `${cmd} ${partialDir}${partialDir && "/"}/${matches[0]}${isDir ? "/" : ""}`;
    }
    return null;
  }

  if (cmd === "cat") {
    const parts = partial.split("/");
    const partialDir = parts.length > 1 ? parts.slice(0, -1).join("/") : "";
    const partialName = parts[parts.length - 1];

    const searchPath = partialDir ? [...state.cwd, ...partialDir.split("/").filter(Boolean)] : state.cwd;
    const dir = getDir(state.fs, searchPath);
    if (!dir) return null;

    const matches = Object.keys(dir.children).filter(
      (n) => !n.startsWith(".") && n.toLowerCase().startsWith(partialName.toLowerCase()) && dir.children[n].type === "file"
    );
    if (matches.length === 1) return `${cmd} ${partialDir}${partialDir && "/"}/${matches[0]}`;
    return null;
  }

  if (cmd === "ls") {
    if (!partial) return null;
    const parts = partial.split("/");
    const partialName = parts[parts.length - 1];
    const partialDir = parts.length > 1 ? parts.slice(0, -1).join("/") : "";

    const searchPath = partialDir ? [...state.cwd, ...partialDir.split("/").filter(Boolean)] : state.cwd;
    const dir = getDir(state.fs, searchPath);
    if (!dir) return null;

    const matches = Object.keys(dir.children).filter(
      (n) => !n.startsWith(".") && n.toLowerCase().startsWith(partialName.toLowerCase()) && dir.children[n].type === "dir"
    );
    if (matches.length === 1) return `${cmd} ${partialDir}${partialDir && "/"}/${matches[0]}/`;
    return null;
  }

  if (cmd === "blog" && partial.trim()) {
    const subparts = partial.trim().split(/\s+/);
    const subcmd = subparts[0].toLowerCase();

    if (subcmd === "read" && subparts.length >= 2) {
      const slugPartial = subparts.slice(1).join(" ").toLowerCase();
      const matches = state.posts.filter((p) => p.slug.toLowerCase().startsWith(slugPartial));
      if (matches.length === 1) return `blog read ${matches[0].slug}`;
      return null;
    }

    if (subcmd === "read" && subparts.length === 1) {
      return partial + state.posts[0]?.slug;
    }

    return null;
  }

  if (cmd === "open") {
    const known = ["github", "linkedin", "scholar", "sinta"];
    const pages = ["about", "contact", "tools", "portfolio", "publications"];
    const partial = trimmed.slice(spaceIdx + 1).toLowerCase();
    if (!partial.startsWith("http")) {
      const linkMatches = known.filter((k) => k.startsWith(partial));
      if (linkMatches.length === 1) return `${cmd} ${linkMatches[0]}`;

      const pageMatches = pages.filter((p) => p.startsWith(partial));
      if (pageMatches.length === 1) return `${cmd} ${pageMatches[0]}`;

      const slugMatches = state.posts.filter((p) => p.slug.toLowerCase().startsWith(partial));
      if (slugMatches.length === 1) return `${cmd} ${slugMatches[0].slug}`;

      if (linkMatches.length > 0 || pageMatches.length > 0 || slugMatches.length > 0) return null;
    }
    return null;
  }

  return null;
}
