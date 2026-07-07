"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { cn } from "@/lib/utils/cn";

export interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Stagger delay in milliseconds, e.g. `index * 75` for a list (PRD §18: 50–100ms). */
  delayMs?: number;
}

/** Fades + translates its children into view the first time they scroll on screen. */
export function Reveal({
  children,
  className,
  delayMs = 0,
  style,
  ...rest
}: RevealProps): ReactNode {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms`, ...style }}
      className={cn(
        "transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)]",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
