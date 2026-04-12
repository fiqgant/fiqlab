import { ExternalLink, Quote } from "lucide-react";
import { isManualPublication, type PublicationSource } from "@/data/publications";
import { cn } from "@/lib/utils";

interface PublicationCardProps {
  pub: PublicationSource;
  compact?: boolean;
}

export function PublicationCard({ pub, compact = false }: PublicationCardProps) {
  const isManual = isManualPublication(pub);
  const authors = isManual ? pub.authors : pub.authors.split(", ").filter(Boolean);
  const href = isManual ? (pub.doi ? `https://doi.org/${pub.doi}` : pub.url) : pub.link;
  const journal = isManual ? pub.journal : pub.publication;
  const citations = isManual ? pub.citations : pub.citedBy;
  const description = isManual ? pub.abstract : undefined;
  const tags = isManual ? pub.tags : [];
  const elementId = isManual ? pub.id : pub.citationId;

  return (
    <article
      id={elementId}
      className={cn(
        "glass-hover hover-glow p-5 sm:p-6 group",
        compact ? "" : "scroll-mt-24"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Year badge */}
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center w-16 h-7 rounded-lg bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-blue-500 text-xs font-bold border border-blue-500/20">
            {pub.year}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-start gap-1.5"
            >
              <h3 className="font-semibold text-sm sm:text-base leading-snug group-hover/link:text-blue-500 transition-colors duration-200">
                {pub.title}
              </h3>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-0 group-hover/link:opacity-100 text-blue-500 transition-opacity" />
            </a>
          ) : (
            <h3 className="font-semibold text-sm sm:text-base leading-snug">{pub.title}</h3>
          )}

          {/* Authors */}
          <p className="text-sm text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70 mt-1.5">
            {authors.map((author, i) => (
              <span key={i}>
                <span className={author === "Taufiqurrahman" ? "font-semibold text-blue-500" : ""}>
                  {author}
                </span>
                {i < authors.length - 1 && ", "}
              </span>
            ))}
          </p>

          {/* Journal */}
          <p className="text-sm italic text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mt-0.5">
            {journal}
          </p>

          {/* Abstract (if not compact) */}
          {!compact && description && (
            <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mt-3 leading-relaxed line-clamp-3">
              {description}
            </p>
          )}

          {/* Tags + Citations */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {tags.slice(0, compact ? 3 : 5).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-teal-500/10 text-teal-500 border border-teal-500/20"
              >
                {tag}
              </span>
            ))}
            {citations !== undefined && (
              <span className="ml-auto flex items-center gap-1 text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
                <Quote className="w-3 h-3" />
                {citations} citations
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
