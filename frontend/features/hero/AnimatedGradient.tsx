import type { ReactNode } from "react";

/**
 * Slow, subtle Primary→Secondary gradient drift behind the hero (PRD §18).
 * Pure CSS animation — the global `prefers-reduced-motion` rule in
 * styles/globals.css freezes it automatically, no JS branching needed.
 */
export function AnimatedGradient(): ReactNode {
  return (
    <div
      aria-hidden
      className="animate-gradient-drift absolute inset-0 -z-10"
      style={{
        backgroundImage: [
          "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--primary) 30%, transparent), transparent 60%)",
          "radial-gradient(circle at 80% 75%, color-mix(in srgb, var(--secondary) 30%, transparent), transparent 60%)",
          "var(--background)",
        ].join(", "),
        backgroundSize: "200% 200%",
      }}
    />
  );
}
