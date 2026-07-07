"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { cn } from "@/lib/utils/cn";

import { Badge } from "./Badge";

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  children: ReactNode;
}

export function Timeline({ children, className, ...rest }: TimelineProps): ReactNode {
  return (
    <ol className={cn("flex flex-col", className)} {...rest}>
      {children}
    </ol>
  );
}

export interface TimelineItemProps {
  title: string;
  subtitle?: string;
  dateRange: string;
  tags?: readonly string[];
  isPlaceholder?: boolean;
  children?: ReactNode;
  /** Stagger delay in milliseconds for the scroll-reveal. */
  delayMs?: number;
}

export function TimelineItem({
  title,
  subtitle,
  dateRange,
  tags,
  isPlaceholder,
  children,
  delayMs = 0,
}: TimelineItemProps): ReactNode {
  const { ref, isVisible } = useScrollReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "border-border relative border-l-2 py-1 pb-8 pl-6 last:border-l-transparent last:pb-0",
        "transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)]",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <span className="bg-primary ring-background absolute top-1 -left-[7px] size-3 rounded-full ring-4" />
      <p className="text-muted text-xs font-medium tracking-wide uppercase">{dateRange}</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h3 className="text-foreground font-semibold">{title}</h3>
        {isPlaceholder ? <Badge variant="warning">Sample data</Badge> : null}
      </div>
      {subtitle ? <p className="text-muted text-sm">{subtitle}</p> : null}
      {children ? <div className="text-muted mt-2 text-sm">{children}</div> : null}
      {tags && tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
    </li>
  );
}
