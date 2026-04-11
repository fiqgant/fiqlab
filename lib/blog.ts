import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { truncate } from "./utils";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  thumbnail?: string;
  tags?: string[];
  category?: string;
  readingTime?: string;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  excerpt: string;
  readingTimeText: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);

    // Auto-excerpt: strip MDX/markdown syntax
    const plainText = content
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .replace(/^\s*[-*+]\s/gm, "")
      .replace(/\n+/g, " ")
      .trim();

    const autoExcerpt = truncate(plainText, 150);
    const excerpt = (data.excerpt as string | undefined) || autoExcerpt;

    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
      excerpt,
      readingTimeText: rt.text,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  const plainText = content
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();

  const autoExcerpt = truncate(plainText, 150);
  const excerpt = (data.excerpt as string | undefined) || autoExcerpt;

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
    excerpt,
    readingTimeText: rt.text,
  };
}

export interface SearchablePost {
  type: "blog";
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
}
