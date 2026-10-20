import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "Consolas", "monospace"],
      },
      colors: {
        paper: { DEFAULT: "rgb(var(--paper) / <alpha-value>)", 2: "rgb(var(--paper-2) / <alpha-value>)" },
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: { DEFAULT: "rgb(var(--accent) / <alpha-value>)", blue: "rgb(var(--accent) / <alpha-value>)" },
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            "--tw-prose-body": "rgb(var(--ink))",
            "--tw-prose-headings": "rgb(var(--ink))",
            "--tw-prose-links": "rgb(var(--accent))",
            "--tw-prose-bold": "rgb(var(--ink))",
            "--tw-prose-quotes": "rgb(var(--muted))",
            "--tw-prose-quote-borders": "rgb(var(--ink) / 0.2)",
            "--tw-prose-code": "rgb(var(--ink))",
            "--tw-prose-hr": "rgb(var(--ink) / 0.15)",
            "--tw-prose-th-borders": "rgb(var(--ink) / 0.3)",
            "--tw-prose-td-borders": "rgb(var(--ink) / 0.12)",
            fontFamily: "var(--font-serif), Georgia, serif",
            lineHeight: "1.7",
            "h1, h2, h3, h4": { fontWeight: "600" },
            code: {
              fontFamily: "var(--font-mono), monospace",
              fontWeight: "400",
              backgroundColor: "rgb(var(--paper-2))",
              padding: "0.15em 0.35em",
              borderRadius: "2px",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              backgroundColor: "rgb(var(--paper-2))",
              color: "rgb(var(--ink))",
              borderRadius: "0",
              border: "1px solid rgb(var(--ink) / 0.12)",
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
