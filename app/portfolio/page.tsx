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
      <div className="text-center mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-white mb-3">
          {"// WORK"}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text font-mono">Portfolio</h1>
        <p className="text-sm font-mono text-[#0077cc] max-w-xl mx-auto">
          Research systems, open-source tools, and AI-powered applications.
        </p>
      </div>

      <PortfolioClient initialData={githubCache} />

      {featured.length > 0 && !githubCache && (
        <section className="mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-white mb-6">
            {"// FEATURED_PROJECTS"}
          </h2>
          <PaginatedProjectGrid projects={featured} />
        </section>
      )}

      {rest.length > 0 && !githubCache && (
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-white mb-6">
            {"// OTHER_PROJECTS"}
          </h2>
          <PaginatedProjectGrid
            projects={rest}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          />
        </section>
      )}

      {githubCache && (featured.length > 0 || rest.length > 0) && (
        <details className="border border-[#00d4ff]/15 bg-[#000510] p-6 sm:p-8">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
            <div>
                <p className="text-xs font-mono uppercase tracking-widest text-white mb-2">
                  {"// MANUAL_ARCHIVE"}
                </p>
              <h2 className="text-2xl font-bold font-mono text-[#00d4ff]">Other_Projects</h2>
            </div>
            <span className="text-xs font-mono text-[#0077cc]">expand_archive()</span>
          </summary>

          <div className="mt-8 space-y-12">
            {featured.length > 0 && (
              <section>
                <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-6">
                  {"// FEATURED_PROJECTS"}
                </h3>
                <PaginatedProjectGrid projects={featured} />
              </section>
            )}

            {rest.length > 0 && (
              <section>
                <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-6">
                  {"// OTHER_PROJECTS"}
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
