import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
}

/** Consistent max-width + responsive padding wrapper used by every page section. */
export function SectionContainer({
  children,
  className,
  as: Component = "section",
  ...rest
}: SectionContainerProps): ReactNode {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:max-w-[1600px]",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
