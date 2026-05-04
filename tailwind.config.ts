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
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Cascadia Code",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        background: {
          DEFAULT: "#000000",
          dark: "#000000",
        },
        foreground: {
          DEFAULT: "#00d4ff",
          dark: "#00d4ff",
        },
        terminal: {
          green: "#00d4ff",
          dim: "#0077cc",
          dark: "#000000",
          amber: "#ffb000",
          card: "#000510",
        },
        accent: {
          blue: "#00d4ff",
          teal: "#0088dd",
        },
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #00d4ff, #0088dd)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
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
            color: "#00d4ff",
            fontFamily: "JetBrains Mono, monospace",
            a: {
              color: "#00d4ff",
              "&:hover": { color: "#ffffff" },
            },
            "h1, h2, h3, h4": {
              color: "#00d4ff",
              fontWeight: "700",
              fontFamily: "JetBrains Mono, monospace",
            },
            code: {
              color: "#ffffff",
              backgroundColor: "rgba(255, 176, 0, 0.08)",
              borderRadius: "0",
              padding: "0.2em 0.4em",
              border: "1px solid rgba(255, 176, 0, 0.2)",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              backgroundColor: "#000d02",
              borderRadius: "0",
              border: "1px solid rgba(0, 212, 255, 0.2)",
            },
            strong: { color: "#00d4ff" },
            blockquote: {
              borderLeftColor: "#00d4ff",
              color: "#0077cc",
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
