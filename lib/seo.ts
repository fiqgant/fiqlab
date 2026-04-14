import type { Metadata } from "next";
import { personal } from "@/data/personal";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fiqlab.vercel.app";
export const siteName = "FiqLab";
export const defaultTitle = `${personal.name} — ${personal.role}`;
export const defaultDescription =
  "FiqLab is the personal academic website of Taufiqurrahman featuring research publications, AI projects, and blog articles on Computer Vision, Deep Learning, YOLO, and IoT systems.";
export const defaultKeywords = [
  "FiqLab",
  "Taufiqurrahman",
  "Computer Vision",
  "YOLO",
  "Deep Learning",
  "IoT",
  "AI Research",
  "Object Detection",
  "Machine Learning",
];

interface PageMetadataOptions {
  title: Metadata["title"];
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  images?: string[];
  absoluteTitle?: boolean;
  openGraphTitle?: string;
  publishedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
  images = ["/opengraph-image"],
  absoluteTitle = false,
  openGraphTitle,
  publishedTime,
  tags,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedOpenGraphTitle =
    openGraphTitle ??
    (typeof title === "string" ? `${title} | ${siteName}` : defaultTitle);
  const resolvedImages = images.map((url) => ({
    url: url.startsWith("http") ? url : absoluteUrl(url),
    width: 1200,
    height: 630,
    alt: resolvedOpenGraphTitle,
  }));

  return {
    title:
      absoluteTitle && typeof title === "string" ? { absolute: title } : title,
    description,
    keywords: [...new Set([...defaultKeywords, ...keywords])],
    alternates: {
      canonical,
    },
    authors: [
      {
        name: personal.name,
        url: absoluteUrl("/about"),
      },
    ],
    creator: personal.name,
    publisher: siteName,
    category: "technology",
    openGraph: {
      type,
      locale: "en_US",
      url: canonical,
      siteName,
      title: resolvedOpenGraphTitle,
      description,
      images: resolvedImages,
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags?.length ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOpenGraphTitle,
      description,
      images: resolvedImages.map((image) => image.url),
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
