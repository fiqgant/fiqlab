import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SearchModal } from "@/components/search/SearchModal";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://taufiqurrahman.ac.id",
  ),
  title: {
    default: "Taufiqurrahman — Researcher",
    template: "%s | Taufiqurrahman",
  },
  description:
    "Personal academic website of Taufiqurrahman — Assistant Professor specializing in Computer Vision, YOLO object detection, Deep Learning, and IoT systems.",
  keywords: [
    "Taufiqurrahman",
    "Computer Vision",
    "YOLO",
    "Deep Learning",
    "IoT",
    "AI Research",
    "Object Detection",
    "Machine Learning",
  ],
  authors: [{ name: "Taufiqurrahman" }],
  creator: "Taufiqurrahman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Taufiqurrahman",
    title: "Taufiqurrahman — Researcher",
    description:
      "Assistant Professor specializing in Computer Vision, YOLO, Deep Learning, and IoT systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taufiqurrahman — Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taufiqurrahman — Researcher",
    description:
      "Assistant Professor specializing in Computer Vision, YOLO, Deep Learning, and IoT.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <SearchModal />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
