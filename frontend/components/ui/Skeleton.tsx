import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...rest }: SkeletonProps): ReactNode {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-surface animate-pulse rounded-[var(--radius-md)] motion-reduce:animate-none",
        className,
      )}
      {...rest}
    />
  );
}
