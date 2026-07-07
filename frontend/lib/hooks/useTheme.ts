"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(STORAGE_KEY, theme);
  for (const listener of listeners) listener();
}

/**
 * Dark-mode-first theme state, persisted to localStorage.
 *
 * Reads via `useSyncExternalStore` so the server snapshot ("dark") is used
 * for the initial hydration pass — matching the inline blocking script in
 * the root layout that sets `data-theme` before first paint — and React
 * resyncs to the real client value immediately after, without a hydration
 * mismatch warning.
 */
export function useTheme(): {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
} {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => applyTheme(next), []);
  const toggleTheme = useCallback(() => {
    applyTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, []);

  return { theme, toggleTheme, setTheme };
}
