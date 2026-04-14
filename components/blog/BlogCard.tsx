import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { frontmatter, slug, excerpt, readingTimeText } = post;

  return (
    <Link href={`/blog/${slug}`} className="group block h-full rounded-2xl hover-glow">
      <article className="h-full glass-hover overflow-hidden">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/20">
          {frontmatter.thumbnail ? (
            <Image
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 opacity-60 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {frontmatter.title[0]}
                </span>
              </div>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category badge */}
            {frontmatter.category && (
              <div className="absolute top-3 left-3">
                <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold text-white bg-black/70 border border-white/10 shadow-sm">
                  {frontmatter.category}
                </span>
              </div>
            )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-100 text-sky-800 border border-sky-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
              {frontmatter.tags.length > 3 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70">
                  +{frontmatter.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-blue-500 transition-colors duration-200 line-clamp-2">
            {frontmatter.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 line-clamp-2 leading-relaxed mb-4">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTimeText}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
