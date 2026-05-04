import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { getAllPosts } from "@/lib/blog";
import { HomeClient } from "@/components/home/HomeClient";
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
        knowsAbout: personal.researchInterests.map((i) => i.title),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: "FiqLab",
        description: defaultDescription,
        inLanguage: "en",
        publisher: { "@id": absoluteUrl("/#person") },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient posts={posts} />
    </div>
  );
}
