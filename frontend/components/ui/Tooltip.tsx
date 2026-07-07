"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
  className,
  sideOffset = 6,
  ...rest
}: TooltipPrimitive.TooltipContentProps): ReactNode {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "border-border bg-surface text-foreground z-50 rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs shadow-[var(--shadow-md)] backdrop-blur-[var(--glass-blur)]",
          className,
        )}
        {...rest}
      />
    </TooltipPrimitive.Portal>
  );
}

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
}

/** Convenience wrapper for the common case of a single trigger + label. */
export function Tooltip({ children, content }: TooltipProps): ReactNode {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipRoot>
  );
}
