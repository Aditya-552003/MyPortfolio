"use client";

import { Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";

import { useTheme } from "@/lib/hooks/useTheme";

export function ThemeToggle(): ReactNode {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="text-foreground hover:bg-surface inline-flex size-10 items-center justify-center rounded-full transition-colors duration-[var(--duration-fast)]"
    >
      {isDark ? <Moon className="size-5" aria-hidden /> : <Sun className="size-5" aria-hidden />}
    </button>
  );
}
