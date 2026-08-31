import type { ReactNode } from "react";

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem("theme");
    var theme = stored === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (_error) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

/**
 * Blocking inline script that sets `data-theme` before first paint.
 * Prevents a flash of the wrong theme when a returning visitor has
 * chosen light mode (dark is the default per PRD §17).
 */
export function ThemeScript(): ReactNode {
  return (
    <script
      id="theme-init"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  );
}
