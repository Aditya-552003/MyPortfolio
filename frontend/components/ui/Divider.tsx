import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  orientation = "horizontal",
  className,
  ...rest
}: DividerProps): ReactNode {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "border-border",
        orientation === "horizontal" ? "w-full border-t" : "h-full border-l",
        className,
      )}
      {...rest}
    />
  );
}
