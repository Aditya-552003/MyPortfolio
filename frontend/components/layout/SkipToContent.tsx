import type { ReactNode } from "react";

export function SkipToContent(): ReactNode {
  return (
    <a
      href="#main-content"
      className="focus-visible:bg-primary focus-visible:text-on-primary sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-[var(--radius-md)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium"
    >
      Skip to content
    </a>
  );
}
