"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { publications, type PublicationSource } from "@/data/publications";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { DEFAULT_PAGE_SIZE, getTotalPages, slicePageItems, type PageSize } from "@/lib/pagination";
import type { ScholarCache } from "@/lib/scholar";
import { cn } from "@/lib/utils";
import { PublicationCard } from "./PublicationCard";

type PublicationsClientProps = {
  initialData: ScholarCache | null;
};

type ApiPublicationsResponse = ScholarCache | {
  articles: [];
  profile: null;
  lastUpdated: null;
};

function normalizeYear(year: string | number | undefined) {
  return year ? String(year) : "Unknown";
}

function getPublicationGroups(items: PublicationSource[]) {
  const years = Array.from(new Set(items.map((item) => normalizeYear(item.year)))).sort((a, b) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;
    return Number(b) - Number(a);
  });

  return years.map((year) => ({
    year,
    publications: items.filter((item) => normalizeYear(item.year) === year),
  }));
}

export function PublicationsClient({ initialData }: PublicationsClientProps) {
  const [data, setData] = useState<ScholarCache | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(initialData?.lastUpdated ?? null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(DEFAULT_PAGE_SIZE);

  const scholarData = data && data.articles.length > 0 && data.profile ? data : null;
  const allPublications = useMemo<PublicationSource[]>(
    () => scholarData ? scholarData.articles : publications,
    [scholarData],
  );

  const totalPages = useMemo(
    () => getTotalPages(allPublications.length, pageSize),
    [allPublications.length, pageSize],
  );

  const visiblePublications = useMemo(
    () => slicePageItems(allPublications, currentPage, pageSize),
    [allPublications, currentPage, pageSize],
  );

  const publicationGroups = useMemo(
    () => getPublicationGroups(visiblePublications),
    [visiblePublications],
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const totalCitations = scholarData
    ? scholarData.profile.citedBy.all
    : publications.reduce((sum, publication) => sum + (publication.citations || 0), 0);

  const handleSync = async () => {
    setLoading(true);

    try {
      const refreshResponse = await fetch("/api/publications/refresh", {
        method: "POST",
      });
      const refreshData = await refreshResponse.json() as { success?: boolean; message?: string };

      if (!refreshResponse.ok || !refreshData.success) {
        throw new Error(refreshData.message || "Failed to sync publications.");
      }

      const publicationsResponse = await fetch("/api/publications", {
        method: "GET",
        cache: "no-store",
      });
      const publicationsData = await publicationsResponse.json() as ApiPublicationsResponse;

      if (!publicationsResponse.ok) {
        throw new Error("Failed to load synced publications.");
      }

      if (publicationsData.profile) {
        setData(publicationsData);
        setLastUpdated(publicationsData.lastUpdated);
        toast.success(`Publications synced! Found ${publicationsData.articles.length} articles`);
      } else {
        setData(null);
        setLastUpdated(null);
        toast.success("Publications synced! Found 0 articles");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to sync: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-32">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-500 mb-3">Research</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Publications</h1>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">
          {allPublications.length} publications · {totalCitations}+ total citations
        </p>

        {process.env.NEXT_PUBLIC_SHOW_SYNC === "true" && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleSync}
              disabled={loading}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-semibold transition-all duration-300",
                "border border-white/10 hover:scale-[1.02] hover:border-blue-500/20",
                "disabled:cursor-not-allowed disabled:opacity-70"
              )}
            >
              <RefreshCw className={cn("w-4 h-4 text-blue-500", loading && "animate-spin")} />
              {loading ? "Syncing from Google Scholar..." : "Sync from Google Scholar"}
            </button>

            {lastUpdated && (
              <p className="text-xs text-[#0A0A0A]/45 dark:text-[#FAFAFA]/45">
                Last synced: {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="glass rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 text-center">
        {scholarData ? (
          <>
            <div>
              <p className="text-2xl font-bold gradient-text">{scholarData.articles.length}</p>
              <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">Publications</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{scholarData.profile.citedBy.all}</p>
              <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">Citations</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{scholarData.profile.hIndex.all}</p>
              <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">H-Index</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{scholarData.profile.i10Index.all}</p>
              <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">i10-Index</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-2xl font-bold gradient-text">{publications.length}</p>
              <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">Publications</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{totalCitations}</p>
              <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">Citations</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">8</p>
              <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">H-Index</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">Manual</p>
              <p className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-0.5">Data Source</p>
            </div>
          </>
        )}
      </div>

      <div className="space-y-6">
        <PaginationControls
          totalItems={allPublications.length}
          currentPage={currentPage}
          pageSize={pageSize}
          itemLabel="publications"
          onPageChange={setCurrentPage}
          onPageSizeChange={(nextPageSize) => {
            setPageSize(nextPageSize);
            setCurrentPage(1);
          }}
        />

        <div className="space-y-10">
        {publicationGroups.map((group) => (
          <section key={group.year}>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xl font-bold gradient-text">{group.year}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
              <span className="text-xs text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40">
                {group.publications.length} paper{group.publications.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-4">
              {group.publications.map((publication) => (
                <PublicationCard
                  key={"citationId" in publication ? publication.citationId : publication.id}
                  pub={publication}
                />
              ))}
            </div>
          </section>
        ))}
        </div>
      </div>
    </div>
  );
}
