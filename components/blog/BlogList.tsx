"use client";

import { useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPost[];
  allTags: string[];
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.frontmatter.tags?.includes(activeTag))
    : posts;

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium glass border transition-colors cursor-pointer ${
              activeTag === null
                ? "border-blue-500/60 text-blue-500 bg-blue-500/10"
                : "border-white/10 text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-blue-500 hover:border-blue-500/30"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium glass border transition-colors cursor-pointer ${
                activeTag === tag
                  ? "border-blue-500/60 text-blue-500 bg-blue-500/10"
                  : "border-white/10 text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-blue-500 hover:border-blue-500/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
            No posts found for <span className="text-blue-500">#{activeTag}</span>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
