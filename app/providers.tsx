"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <HeroUIProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(10,10,10,0.9)",
              backdropFilter: "blur(12px)",
              color: "#FAFAFA",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
            },
          }}
        />
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
