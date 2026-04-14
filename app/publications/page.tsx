import type { Metadata } from "next";
import { publications } from "@/data/publications";
import { PublicationsClient } from "@/components/publications/PublicationsClient";
import { personal } from "@/data/personal";
import { readScholarCache } from "@/lib/scholar";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Publications",
  description: `Academic publications by ${personal.name} in Computer Vision, Deep Learning, YOLO, and IoT.`,
  path: "/publications",
  keywords: ["scholarly articles", "google scholar", "research publications"],
});

export default async function PublicationsPage() {
  const cache = await readScholarCache();
  const sourcePublications = cache?.articles.length ? cache.articles : publications;

  const jsonLd = sourcePublications.map((pub) => ({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    author: Array.isArray(pub.authors)
      ? pub.authors.map((author) => ({ "@type": "Person", name: author }))
      : pub.authors.split(", ").filter(Boolean).map((author) => ({ "@type": "Person", name: author })),
    datePublished: `${pub.year}`,
    publisher: {
      "@type": "Organization",
      name: "journal" in pub ? pub.journal : pub.publication,
    },
    identifier: "doi" in pub && pub.doi ? `https://doi.org/${pub.doi}` : undefined,
    abstract: "abstract" in pub ? pub.abstract : undefined,
    keywords: "tags" in pub ? pub.tags.join(", ") : undefined,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PublicationsClient initialData={cache} />
    </>
  );
}
