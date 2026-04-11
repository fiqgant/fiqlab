import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { MermaidDiagram } from "@/components/blog/MermaidDiagram";
import { rehypeMermaid } from "@/lib/rehype-mermaid";

type FigureProps = React.HTMLAttributes<HTMLElement> & {
  "data-rehype-pretty-code-figure"?: string;
};

type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  "data-language"?: string;
};

function hasDataLanguageProp(props: unknown): props is PreProps {
  return typeof props === "object" && props !== null && "data-language" in props;
}

const components = {
  MermaidDiagram,
  // rehype-pretty-code wraps code blocks in <figure data-rehype-pretty-code-figure>
  figure: ({ children, ...props }: FigureProps) => {
    if (!("data-rehype-pretty-code-figure" in props)) {
      return <figure {...props}>{children}</figure>;
    }

    const kids = React.Children.toArray(children);

    // pre always has data-language; caption is whatever element is NOT the pre
    const preEl = kids.find(
      (k) =>
        React.isValidElement(k) &&
        hasDataLanguageProp(k.props)
    ) as React.ReactElement<PreProps> | undefined;

    const captionEl = kids.find((k) => k !== preEl) as
      | React.ReactElement<{ children?: React.ReactNode }>
      | undefined;

    const lang = preEl?.props["data-language"] || "";
    const filename = captionEl?.props?.children != null
      ? String(captionEl.props.children)
      : undefined;

    return (
      <CodeBlock filename={filename} language={lang}>
        {preEl}
      </CodeBlock>
    );
  },
  // Style the <pre> rendered inside CodeBlock
  pre: ({ children, ...props }: PreProps) => (
    <pre
      className="p-4 text-sm leading-relaxed font-mono overflow-x-auto"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code (not inside a code block)
    if (!className) {
      return (
        <code
          className="text-teal-500 bg-teal-500/10 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  h2: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id} className="text-2xl font-bold mt-10 mb-4 scroll-mt-24" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={id} className="text-xl font-bold mt-8 mb-3 scroll-mt-24" {...props}>
      {children}
    </h3>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 py-1 my-6 bg-blue-500/5 rounded-r-xl italic text-[#0A0A0A]/70 dark:text-[#FAFAFA]/70"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="rounded-xl my-6 w-full object-cover shadow-lg"
      loading="lazy"
      {...props}
    />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 rounded-xl glass">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left font-semibold text-blue-500 border-b border-white/10" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 border-b border-white/5" {...props}>
      {children}
    </td>
  ),
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="mdx-content space-y-4 text-[#0A0A0A]/80 dark:text-[#FAFAFA]/80 leading-relaxed">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeMermaid,
              rehypeSlug,
              [rehypePrettyCode, {
                theme: "github-dark",
                keepBackground: false,
                filterMetaString: (meta: string) => meta.replace(/\bfilename=/, "title="),
              }],
            ],
          },
        }}
      />
    </div>
  );
}
