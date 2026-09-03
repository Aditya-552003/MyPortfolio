import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
}

/** Consistent max-width + responsive padding wrapper matching About section grid alignment. */
export function SectionContainer({
  children,
  className,
  as: Component = "section",
  ...rest
}: SectionContainerProps): ReactNode {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-6 sm:px-12 md:px-16 lg:px-24", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
