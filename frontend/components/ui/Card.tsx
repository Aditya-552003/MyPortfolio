import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const cardVariants = cva(
  "rounded-[var(--radius-lg)] transition-all duration-[var(--duration-base)]",
  {
    variants: {
      variant: {
        standard: "bg-surface border border-border",
        glass:
          "border border-[var(--glass-border)] bg-[var(--glass-surface)] backdrop-blur-[var(--glass-blur)] supports-[not(backdrop-filter:blur(1px))]:bg-background",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]",
        glow: "hover:border-primary/60 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)]",
      },
    },
    defaultVariants: {
      variant: "standard",
      hover: "none",
    },
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  children: ReactNode;
}

export function Card({ children, className, variant, hover, ...rest }: CardProps): ReactNode {
  return (
    <div className={cn(cardVariants({ variant, hover }), className)} {...rest}>
      {children}
    </div>
  );
}
