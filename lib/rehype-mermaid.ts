import { visit } from "unist-util-visit";
import type { Root, Element, Text } from "hast";

function getTextContent(node: Element): string {
  let text = "";
  const walk = (n: unknown) => {
    const el = n as { type?: string; value?: string; children?: unknown[] };
    if (el.type === "text") {
      text += el.value ?? "";
    } else if (Array.isArray(el.children)) {
      el.children.forEach(walk);
    }
  };
  walk(node);
  return text;
}

/**
 * Rehype plugin that runs BEFORE rehype-pretty-code.
 * Finds `pre > code.language-mermaid` blocks and replaces them with
 * an mdxJsxFlowElement so MermaidDiagram gets rendered client-side.
 */
export function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (
        node.tagName !== "pre" ||
        !parent ||
        index === null ||
        index === undefined
      )
        return;

      const codeNode = node.children[0] as Element | undefined;
      if (!codeNode || codeNode.type !== "element" || codeNode.tagName !== "code")
        return;

      const classes = (codeNode.properties?.className ?? []) as string[];
      if (!classes.includes("language-mermaid")) return;

      const code = getTextContent(codeNode);

      // Replace the pre node with an MDX JSX element
      (parent.children as unknown[])[index] = {
        type: "mdxJsxFlowElement",
        name: "MermaidDiagram",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "code",
            value: code,
          },
        ],
        children: [],
        data: { _mdxExplicitJsx: true },
      };
    });
  };
}
