import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { frontmatter, slug, excerpt, readingTimeText } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block h-full border border-ink/15 hover:border-ink/50 bg-paper-2 transition-colors duration-200"
    >
      <article className="h-full overflow-hidden flex flex-col">
        <div className="relative h-48 overflow-hidden bg-paper-2">
          {frontmatter.thumbnail ? (
            <Image
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold font-serif text-muted group-hover:text-muted transition-colors">
                {frontmatter.title[0]}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-paper-2 via-transparent to-transparent" />

          {frontmatter.category && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 text-[11px] font-serif font-semibold text-ink bg-paper/80 border border-[#ffb000]/30">
                {frontmatter.category}
              </span>
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-serif font-medium text-ink border border-ink/25 bg-ink/5"
                >
                  [{tag}]
                </span>
              ))}
              {frontmatter.tags.length > 3 && (
                <span className="px-2 py-0.5 text-[10px] font-serif text-muted">
                  +{frontmatter.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <h2 className="font-bold font-serif text-sm leading-snug mb-2 text-ink/80 group-hover:text-ink transition-colors duration-200 line-clamp-2">
            {frontmatter.title}
          </h2>

          <p className="text-xs font-serif text-muted line-clamp-2 leading-relaxed mb-4 flex-1">
            {excerpt}
          </p>

          <div className="flex items-center gap-4 text-[10px] font-serif text-muted group-hover:text-muted transition-colors">
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
