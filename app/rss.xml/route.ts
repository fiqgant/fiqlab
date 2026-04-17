import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, defaultDescription, siteName } from "@/lib/seo";

export async function GET() {
  const posts = await getAllPosts();
  const now = new Date().toISOString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteName}</title>
    <description>${defaultDescription}</description>
    <link>${absoluteUrl("/")}</link>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>FiqLab RSS Generator</generator>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <content:encoded><![CDATA[${post.excerpt}]]></content:encoded>
      ${post.frontmatter.tags?.map((tag) => `<category>${tag}</category>`).join("") || ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}