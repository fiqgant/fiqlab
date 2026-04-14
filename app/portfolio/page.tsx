import type { Metadata } from "next";
import { PortfolioClient } from "@/components/portfolio/PortfolioClient";
import { PaginatedProjectGrid } from "@/components/portfolio/PaginatedProjectGrid";
import { projects } from "@/data/portfolio";
import { readGitHubCache } from "@/lib/github";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Research projects and software tools by Taufiqurrahman covering Computer Vision, IoT, and AI systems.",
  path: "/portfolio",
  keywords: ["AI projects", "software portfolio", "computer vision projects"],
});

export default async function PortfolioPage() {
  const githubCache = await readGitHubCache();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-3">Work</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Portfolio</h1>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 max-w-xl mx-auto">
          Research systems, open-source tools, and AI-powered applications.
        </p>
      </div>

      <PortfolioClient initialData={githubCache} />

      {/* Featured */}
      {featured.length > 0 && !githubCache && (
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-6">
            Featured Projects
          </h2>
          <PaginatedProjectGrid projects={featured} />
        </section>
      )}

      {/* Rest */}
      {rest.length > 0 && !githubCache && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-6">
            Other Projects
          </h2>
          <PaginatedProjectGrid
            projects={rest}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          />
        </section>
      )}

      {githubCache && (featured.length > 0 || rest.length > 0) && (
        <details className="glass rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-2">
                Manual Archive
              </p>
              <h2 className="text-2xl font-bold">Other Projects</h2>
            </div>
            <span className="text-sm text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
              Expand manual portfolio
            </span>
          </summary>

          <div className="mt-8 space-y-12">
            {featured.length > 0 && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-6">
                  Featured Projects
                </h3>
                <PaginatedProjectGrid projects={featured} />
              </section>
            )}

            {rest.length > 0 && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40 mb-6">
                  Other Projects
                </h3>
                <PaginatedProjectGrid
                  projects={rest}
                  gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                />
              </section>
            )}
          </div>
        </details>
      )}
    </div>
  );
}
