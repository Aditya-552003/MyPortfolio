"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...rest }: TabsPrimitive.TabsListProps): ReactNode {
  return (
    <TabsPrimitive.List
      className={cn(
        "border-border bg-surface inline-flex items-center gap-1 rounded-[var(--radius-md)] border p-1",
        className,
      )}
      {...rest}
    />
  );
}

export function TabsTrigger({ className, ...rest }: TabsPrimitive.TabsTriggerProps): ReactNode {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "text-muted rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
        "hover:text-foreground",
        "data-[state=active]:bg-primary data-[state=active]:text-on-primary",
        className,
      )}
      {...rest}
    />
  );
}

export const TabsContent = TabsPrimitive.Content;
