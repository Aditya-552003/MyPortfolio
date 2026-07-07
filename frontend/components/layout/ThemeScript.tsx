import Script from "next/script";
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
    // The no-before-interactive-script-outside-document rule only accounts for the
    // Pages Router; the App Router docs explicitly require this script to live in
    // app/layout.tsx: https://nextjs.org/docs/app/api-reference/components/script
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="theme-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  );
}
