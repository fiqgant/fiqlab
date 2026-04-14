import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog/BlogList";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Articles on Computer Vision, Deep Learning, IoT, and AI research by Taufiqurrahman.",
  path: "/blog",
  keywords: ["AI blog", "deep learning articles", "computer vision tutorials"],
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.frontmatter.tags || []))
  ).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-3">
          Writing
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Blog</h1>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 max-w-xl mx-auto">
          Insights on Computer Vision, Deep Learning, IoT, and the intersection of AI with the real world.
        </p>
      </div>

      <BlogList posts={posts} allTags={allTags} />
    </div>
  );
}
