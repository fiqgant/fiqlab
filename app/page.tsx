import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, ExternalLink } from "lucide-react";
import { personal } from "@/data/personal";
import { publications, type Publication } from "@/data/publications";
import { getAllPosts } from "@/lib/blog";
import { readScholarCache } from "@/lib/scholar";
import { BlogCard } from "@/components/blog/BlogCard";
import { PublicationCard } from "@/components/publications/PublicationCard";
import { HeroBackgroundClient } from "@/components/hero/HeroBackgroundClient";
import {
  absoluteUrl,
  createPageMetadata,
  defaultDescription,
  defaultTitle,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: defaultTitle,
  openGraphTitle: `${defaultTitle} | FiqLab`,
  absoluteTitle: true,
  description: defaultDescription,
  path: "/",
  keywords: [
    personal.institution,
    "research portfolio",
    "academic website",
    "computer vision researcher",
  ],
});

export default async function HomePage() {
  const posts = await getAllPosts();
  const scholarCache = await readScholarCache();
  const featuredPosts = posts.filter((p) => p.frontmatter.featured).slice(0, 3);
  const recentPosts = featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 3);
  const featuredPubs: Publication[] = scholarCache?.articles.length
    ? [...scholarCache.articles]
        .sort((a, b) => b.citedBy - a.citedBy)
        .slice(0, 3)
        .map((article, index) => ({
          id: article.citationId || `scholar-featured-${index}`,
          title: article.title,
          authors: article.authors.split(", ").filter(Boolean),
          journal: article.publication,
          year: Number(article.year) || new Date().getFullYear(),
          url: article.link,
          abstract: "",
          tags: ["Google Scholar"],
          citations: article.citedBy,
        }))
    : publications.filter((p) => p.featured).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: personal.name,
        url: absoluteUrl("/"),
        image: absoluteUrl("/opengraph-image"),
        description: personal.longBio.replace(/\n/g, " "),
        jobTitle: personal.role,
        worksFor: {
          "@type": "Organization",
          name: personal.institution,
        },
        email: `mailto:${personal.email}`,
        sameAs: [
          personal.github,
          personal.linkedin,
          personal.googleScholar,
          personal.sintaUrl,
        ],
        knowsAbout: personal.researchInterests.map((interest) => interest.title),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: "FiqLab",
        description: defaultDescription,
        inLanguage: "en",
        publisher: {
          "@id": absoluteUrl("/#person"),
        },
      },
    ],
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-screen flex flex-col items-center justify-center py-32 px-4 overflow-hidden">
        <HeroBackgroundClient />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Open to Research Collaboration
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 gradient-text">
            {personal.shortName}
          </h1>

          <p className="text-base sm:text-lg text-[#FAFAFA]/60 mb-6">
            {personal.role}
          </p>

          <p className="text-sm text-[#FAFAFA]/50 max-w-lg mx-auto leading-relaxed mb-10">
            {personal.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white text-sm font-medium"
            >
              <BookOpen className="w-4 h-4" />
              Publications
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass text-sm font-medium"
            >
              <Code2 className="w-4 h-4" />
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass text-sm font-medium"
            >
              Contact
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PUBLICATIONS ────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-500 mb-2">
              Research
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Publications</h2>
          </div>
          <Link
            href="/publications"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-blue-700 visited:text-blue-700 dark:text-blue-400 dark:visited:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {featuredPubs.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} compact />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/publications"
            className="inline-flex items-center gap-1 text-sm text-blue-700 visited:text-blue-700 dark:text-blue-400 dark:visited:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View all publications <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── FEATURED BLOG POSTS ──────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-2">
                Writing
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold">Latest Posts</h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-blue-700 visited:text-blue-700 dark:text-blue-400 dark:visited:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Read all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ─── CTA SECTION ──────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="glass rounded-3xl p-10 sm:p-14 hover-glow">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let&apos;s Collaborate
          </h2>
          <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mb-8 max-w-lg mx-auto">
            Interested in research collaboration, speaking engagements, or academic partnerships?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03] transition-all duration-300"
            >
              Get in Touch
            </Link>
            <Link
              href={personal.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl glass font-semibold hover:scale-[1.03] transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              Google Scholar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
