import { personal } from "@/data/personal";
import { publications } from "@/data/publications";
import { skillSections } from "@/data/tools";
import type { BlogPost } from "@/lib/blog";

export interface VFSFile {
  type: "file";
  name: string;
  content: string;
}

export interface VFSDir {
  type: "dir";
  name: string;
  children: Record<string, VFSNode>;
}

export type VFSNode = VFSFile | VFSDir;

function file(name: string, content: string): VFSFile {
  return { type: "file", name, content };
}

function dir(name: string, children: Record<string, VFSNode>): VFSDir {
  return { type: "dir", name, children };
}

const aboutFile = file(
  "about.txt",
  `NAME:       ${personal.name}
ROLE:       ${personal.role}
INSTITUTION:${personal.institution}
LOCATION:   ${personal.location}
NIP:        ${personal.nip}
NIDN:       ${personal.nidn}

BIO:
  ${personal.longBio.split("\n").join("\n  ")}

RESEARCH INTERESTS:
${personal.researchInterests.map((i) => `  • ${i.title}\n    ${i.description}`).join("\n")}

STATS:
${personal.stats.map((s) => `  ${s.label.padEnd(20)} ${s.value}`).join("\n")}
`
);

const contactFile = file(
  "contact.txt",
  `EMAIL:     ${personal.email}
PHONE:     ${personal.phone}
ADDRESS:   ${personal.address}

LINKS:
  GitHub        ${personal.github}
  LinkedIn      ${personal.linkedin}
  Google Scholar ${personal.googleScholar}
  SINTA         ${personal.sintaUrl}
`
);

const toolsFile = file(
  "tools.txt",
  skillSections
    .map(
      (section) =>
        `══ ${section.label.toUpperCase()} ══\n` +
        section.categories
          .map(
            (cat) =>
              `  ┌─ ${cat.category}\n` +
              cat.tools
                .map((t) => `  │  ${t.name.padEnd(22)} [${t.level}]`)
                .join("\n")
          )
          .join("\n") +
        "\n"
    )
    .join("\n")
);

function buildPublicationsDir(): VFSDir {
  const children: Record<string, VFSNode> = {
    "README.txt": file(
      "README.txt",
      `PUBLICATIONS (${publications.length} entries)\n\nUse: ls publications/\n      cat publications/<id>.txt\n`
    ),
  };

  for (const pub of publications) {
    children[`${pub.id}.txt`] = file(
      `${pub.id}.txt`,
      `TITLE:    ${pub.title}
AUTHORS:  ${pub.authors.join(", ")}
JOURNAL:  ${pub.journal}
YEAR:     ${pub.year}
${pub.doi ? `DOI:      ${pub.doi}\n` : ""}${pub.url ? `URL:      ${pub.url}\n` : ""}TAGS:     ${pub.tags.join(", ")}
${pub.citations != null ? `CITED BY: ${pub.citations}\n` : ""}
ABSTRACT:
  ${pub.abstract}
`
    );
  }

  return dir("publications", children);
}

function buildBlogDir(posts: BlogPost[]): VFSDir {
  const children: Record<string, VFSNode> = {
    "README.txt": file(
      "README.txt",
      `BLOG (${posts.length} posts)\n\nUse: ls blog/\n      cat blog/<slug>.txt\n`
    ),
  };

  for (const post of posts) {
    children[`${post.slug}.txt`] = file(
      `${post.slug}.txt`,
      `TITLE:   ${post.frontmatter.title}
DATE:    ${post.frontmatter.date}
READ:    ${post.readingTimeText}
TAGS:    ${(post.frontmatter.tags ?? []).join(", ")}

EXCERPT:
  ${post.excerpt}

URL:     /blog/${post.slug}
`
    );
  }

  return dir("blog", children);
}

export function buildVirtualFS(posts: BlogPost[]): VFSDir {
  return dir("~", {
    "about.txt": aboutFile,
    "contact.txt": contactFile,
    "tools.txt": toolsFile,
    blog: buildBlogDir(posts),
    publications: buildPublicationsDir(),
  });
}

export function resolvePath(root: VFSDir, cwd: string[], target: string): string[] | null {
  const parts = target.startsWith("/") ? target.slice(1).split("/").filter(Boolean) : [...cwd, ...target.split("/").filter(Boolean)];

  const resolved: string[] = [];
  for (const part of parts) {
    if (part === "." || part === "") continue;
    if (part === "..") {
      if (resolved.length > 0) resolved.pop();
    } else {
      resolved.push(part);
    }
  }

  let node: VFSNode = root;
  for (const seg of resolved) {
    if (node.type !== "dir") return null;
    const child: VFSNode | undefined = node.children[seg];
    if (!child) return null;
    node = child;
  }
  if (node.type !== "dir") return null;

  return resolved;
}

export function getNode(root: VFSDir, cwd: string[], name: string): VFSNode | null {
  const dir = getDir(root, cwd);
  if (!dir) return null;
  return dir.children[name] ?? null;
}

export function getDir(root: VFSDir, cwd: string[]): VFSDir | null {
  let node: VFSNode = root;
  for (const seg of cwd) {
    if (node.type !== "dir") return null;
    const child: VFSNode | undefined = (node as VFSDir).children[seg];
    if (!child) return null;
    node = child;
  }
  return node.type === "dir" ? node : null;
}

export function cwdString(cwd: string[]): string {
  return cwd.length === 0 ? "~" : "~/" + cwd.join("/");
}
