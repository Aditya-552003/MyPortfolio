import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "border-border bg-surface text-muted",
        primary: "border-primary/30 bg-primary/10 text-primary",
        accent: "border-accent/30 bg-accent/10 text-accent",
        warning: "border-warning/30 bg-warning/10 text-warning",
        error: "border-error/30 bg-error/10 text-error",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: ReactNode;
}

export function Badge({ children, className, variant, ...rest }: BadgeProps): ReactNode {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...rest}>
      {children}
    </span>
  );
}
