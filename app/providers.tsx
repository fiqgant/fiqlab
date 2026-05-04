"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <KeyboardShortcuts />
      {children}
    </NextThemesProvider>
  );
}
