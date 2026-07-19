import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-medium transition-colors duration-[var(--duration-fast)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:brightness-110 active:brightness-95",
        secondary:
          "bg-surface text-foreground border border-border hover:bg-border/60 active:bg-border/80",
        ghost: "bg-transparent text-foreground hover:bg-surface active:bg-border/40",
        icon: "bg-transparent text-foreground hover:bg-surface active:bg-border/40 rounded-full",
      },
      size: {
        sm: "h-9 px-3 text-sm min-h-11 min-w-11",
        md: "h-11 px-5 text-sm min-h-11",
        lg: "h-13 px-7 text-base min-h-11",
        icon: "h-11 w-11 min-h-11 min-w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface CommonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps): ReactNode {
  const { children, className, variant, size, loading, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} disabled={loading || buttonRest.disabled} {...buttonRest}>
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}
