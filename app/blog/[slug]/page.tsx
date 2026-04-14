import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, Tag } from "lucide-react";
import { MDXContent } from "@/components/blog/MDXContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.frontmatter.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    images: post.frontmatter.thumbnail
      ? [post.frontmatter.thumbnail]
      : ["/opengraph-image"],
    publishedTime: post.frontmatter.date,
    tags: post.frontmatter.tags,
    keywords: [
      ...(post.frontmatter.tags || []),
      post.frontmatter.category || "Blog",
      "technical article",
    ],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: url,
    headline: post.frontmatter.title,
    description: post.excerpt,
    datePublished: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: "Taufiqurrahman",
    },
    publisher: {
      "@type": "Organization",
      name: "FiqLab",
      url: absoluteUrl("/"),
    },
    image: post.frontmatter.thumbnail || absoluteUrl("/opengraph-image"),
    url,
    keywords: post.frontmatter.tags?.join(", "),
  };

  return (
    <>
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
          {/* Main content */}
          <div className="min-w-0">
            {/* Header */}
            <header className="mb-10">
              {/* Thumbnail */}
              {post.frontmatter.thumbnail && (
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={post.frontmatter.thumbnail}
                    alt={post.frontmatter.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              {/* Tags */}
              {post.frontmatter.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-balance">
                {post.frontmatter.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.frontmatter.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTimeText}
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <ShareButtons url={url} title={post.frontmatter.title} excerpt={post.excerpt} />
              </div>
            </header>

            {/* MDX Content */}
            <article className="prose-glass max-w-none">
              <MDXContent source={post.content} />
            </article>

            {/* Footer share */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <ShareButtons url={url} title={post.frontmatter.title} excerpt={post.excerpt} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </>
  );
}
