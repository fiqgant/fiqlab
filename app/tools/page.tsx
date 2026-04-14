import type { Metadata } from "next";
import { ToolsClient } from "@/components/tools/ToolsClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tools & Skills",
  description: "Hardware and software I use in research and development.",
  path: "/tools",
  keywords: ["research tools", "software skills", "hardware stack"],
});

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-32">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-3">Stack</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Tools & Skills</h1>
        <p className="text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 max-w-xl mx-auto">
          Hardware and software I use in research and development.
        </p>
      </div>

      <ToolsClient />
    </div>
  );
}
