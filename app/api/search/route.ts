import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getAllPosts();
  const data = posts.map((p) => ({
    type: "blog",
    slug: p.slug,
    title: p.frontmatter.title,
    excerpt: p.excerpt,
    tags: p.frontmatter.tags || [],
    date: p.frontmatter.date,
  }));
  return NextResponse.json(data);
}
