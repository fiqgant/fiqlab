"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowUpDown,
  ExternalLink,
  GitFork,
  Github,
  RefreshCw,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import type { GitHubCache, GitHubRepo } from "@/lib/github";
import { cn } from "@/lib/utils";

type SortMode = "stars" | "recent";

interface PortfolioClientProps {
  initialData: GitHubCache | null;
}

interface GitHubApiResponse {
  repos: GitHubRepo[];
  profile: GitHubCache["profile"] | null;
  lastUpdated: string | null;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Shell: "#89e051",
  Dart: "#00B4AB",
};

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T | { message?: string };

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data && typeof data.message === "string"
        ? data.message
        : "Request failed";
    throw new Error(message);
  }

  return data as T;
}

export function PortfolioClient({ initialData }: PortfolioClientProps) {
  const [data, setData] = useState<GitHubCache | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("stars");

  const sortedRepos = useMemo(() => {
    if (!data) {
      return [];
    }

    return [...data.repos].sort((a, b) => {
      if (sortMode === "recent") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }

      return b.stars - a.stars || new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
    });
  }, [data, sortMode]);

  const totalStars = useMemo(
    () => data?.repos.reduce((sum, repo) => sum + repo.stars, 0) ?? 0,
    [data],
  );

  const topLanguage = useMemo(() => {
    if (!data) {
      return null;
    }

    const counts = data.repos.reduce<Record<string, number>>((acc, repo) => {
      if (!repo.language) {
        return acc;
      }

      acc[repo.language] = (acc[repo.language] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  }, [data]);

  const lastSynced = data?.lastUpdated
    ? formatDistanceToNow(new Date(data.lastUpdated), { addSuffix: true })
    : null;

  const handleRefresh = async () => {
    setLoading(true);

    try {
      const refreshResponse = await fetch("/api/github/refresh", { method: "POST" });
      const refreshData = await parseJsonResponse<{
        success: boolean;
        count: number;
        lastUpdated: string;
      }>(refreshResponse);

      const cacheResponse = await fetch("/api/github", { cache: "no-store" });
      const cacheData = await parseJsonResponse<GitHubApiResponse>(cacheResponse);

      if (!cacheData.profile || !cacheData.lastUpdated) {
        throw new Error("GitHub cache is empty after sync");
      }

      setData({
        repos: cacheData.repos,
        profile: cacheData.profile,
        lastUpdated: cacheData.lastUpdated,
      });

      toast.success(`GitHub synced! Found ${refreshData.count} repositories`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to sync: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8 mb-16">
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-2">
              GitHub
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {data ? "GitHub Repos" : "Sync GitHub Projects"}
            </h2>
            <p className="text-sm sm:text-base text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 max-w-2xl">
              {data
                ? "Refresh your public repositories on demand and showcase your latest open-source work."
                : "No GitHub cache yet. Sync once to fetch public repositories and replace the manual fallback with live repo cards."}
            </p>
          </div>

          {process.env.NEXT_PUBLIC_SHOW_SYNC === "true" && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/20 text-sm font-medium text-blue-500 hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100"
              >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                {loading ? "Syncing..." : "Sync from GitHub"}
              </button>

              {data && (
                <button
                  type="button"
                  onClick={() => setSortMode((current) => (current === "stars" ? "recent" : "stars"))}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium hover:scale-[1.02] transition-all duration-200"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Sort: {sortMode === "stars" ? "Stars" : "Recently updated"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
          <span>
            {lastSynced ? `Last synced: ${lastSynced}` : "Last synced: never"}
          </span>
          {data?.profile && (
            <Link
              href={data.profile.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              @{data.profile.login}
            </Link>
          )}
        </div>
      </div>

      {data && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Public repos" value={String(data.profile.publicRepos)} />
            <StatCard label="Total stars" value={String(totalStars)} />
            <StatCard label="Followers" value={String(data.profile.followers)} />
            <StatCard label="Top language" value={topLanguage ?? "—"} />
          </div>

          {sortedRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-6 text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">
              No public repositories found in the current cache.
            </div>
          )}
        </>
      )}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-2">
        {label}
      </p>
      <p className="text-2xl font-bold gradient-text">{value}</p>
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const languageColor = repo.language ? languageColors[repo.language] ?? "#94a3b8" : "#94a3b8";

  return (
    <article className="glass-hover hover-glow p-5 sm:p-6 group flex flex-col h-full">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: languageColor }}
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 truncate">
            {repo.language ?? "Unknown"}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
          {formatDistanceToNow(new Date(repo.updatedAt), { addSuffix: true })}
        </span>
      </div>

      <h3 className="font-bold text-base mb-2 group-hover:text-blue-500 transition-colors duration-200 line-clamp-2">
        {repo.name}
      </h3>

      <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 leading-relaxed mb-4 flex-1 line-clamp-4">
        {repo.description ?? "No description provided for this repository yet."}
      </p>

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 mt-auto pt-2">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" />
            {repo.stars}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GitFork className="w-3.5 h-3.5" />
            {repo.forks}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs font-medium hover:scale-105 hover:text-blue-500 transition-all duration-200"
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </Link>
          {repo.homepage && (
            <Link
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/20 text-xs font-medium text-blue-500 hover:scale-105 transition-all duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
