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
      colors: {
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#0A0A0A",
        },
        foreground: {
          DEFAULT: "#0A0A0A",
          dark: "#FAFAFA",
        },
        accent: {
          blue: "#3B82F6",
          teal: "#14B8A6",
        },
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #3B82F6, #14B8A6)",
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
            color: "inherit",
            a: {
              color: "#3B82F6",
              "&:hover": { color: "#14B8A6" },
            },
            "h1, h2, h3, h4": {
              color: "inherit",
              fontWeight: "700",
            },
            code: {
              color: "#14B8A6",
              backgroundColor: "rgba(20, 184, 166, 0.1)",
              borderRadius: "4px",
              padding: "0.2em 0.4em",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              backgroundColor: "#0d1117",
              borderRadius: "12px",
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
