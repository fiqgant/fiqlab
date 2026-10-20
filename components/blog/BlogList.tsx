"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { PaginationControls } from "@/components/ui/PaginationControls";
import type { BlogPost } from "@/lib/blog";
import { DEFAULT_PAGE_SIZE, getTotalPages, slicePageItems, type PageSize } from "@/lib/pagination";

interface BlogListProps {
  posts: BlogPost[];
  allTags: string[];
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(DEFAULT_PAGE_SIZE);

  const filtered = useMemo(
    () => activeTag
      ? posts.filter((post) => post.frontmatter.tags?.includes(activeTag))
      : posts,
    [activeTag, posts],
  );

  const totalPages = useMemo(
    () => getTotalPages(filtered.length, pageSize),
    [filtered.length, pageSize],
  );

  const visiblePosts = useMemo(
    () => slicePageItems(filtered, currentPage, pageSize),
    [filtered, currentPage, pageSize],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium glass border transition-colors cursor-pointer ${
              activeTag === null
                ? "border-accent/60 text-accent bg-accent/10"
                : "border-ink/10 text-ink/60 hover:text-accent hover:border-accent/30"
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
                  ? "border-accent/60 text-accent bg-accent/10"
                  : "border-ink/10 text-ink/60 hover:text-accent hover:border-accent/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-ink/50">
            No posts found for <span className="text-accent">#{activeTag}</span>.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <PaginationControls
            totalItems={filtered.length}
            currentPage={currentPage}
            pageSize={pageSize}
            itemLabel="posts"
            onPageChange={setCurrentPage}
            onPageSizeChange={(nextPageSize) => {
              setPageSize(nextPageSize);
              setCurrentPage(1);
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
