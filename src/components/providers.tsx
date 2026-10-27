"use client";

import { ThemeProvider } from "next-themes";
import { CommandPalette } from "@/components/ui/command-palette";

/**
 * Root client-side providers wrapper.
 * Centralizes all context providers to keep the root layout a server component.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
      <CommandPalette />
    </ThemeProvider>
  );
}
