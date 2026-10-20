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
        "border border-ink/15 bg-paper-2 p-5 sm:p-6 group hover:border-ink/40 transition-colors duration-200",
        compact ? "" : "scroll-mt-24"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center w-16 h-7 border border-ink/30 text-ink text-xs font-serif font-bold bg-ink/5">
            {pub.year}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-start gap-1.5 text-ink/80 hover:text-ink transition-colors duration-200"
            >
              <h3 className="font-semibold font-serif text-sm sm:text-base leading-snug">
                {pub.title}
              </h3>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          ) : (
            <h3 className="font-semibold font-serif text-sm sm:text-base leading-snug text-ink/80">
              {pub.title}
            </h3>
          )}

          <p className="text-xs font-serif text-muted mt-1.5">
            {authors.map((author, i) => (
              <span key={i}>
                <span className={author === "Taufiqurrahman" ? "font-semibold text-ink" : ""}>
                  {author}
                </span>
                {i < authors.length - 1 && ", "}
              </span>
            ))}
          </p>

          <p className="text-xs font-serif italic text-muted mt-0.5">
            {journal}
          </p>

          {!compact && description && (
            <p className="text-xs font-serif text-muted mt-3 leading-relaxed line-clamp-3">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {tags.slice(0, compact ? 3 : 5).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-serif font-medium text-ink border border-ink/25 bg-ink/5"
              >
                [{tag}]
              </span>
            ))}
            {citations !== undefined && (
              <span className="ml-auto flex items-center gap-1 text-[10px] font-serif text-muted">
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
