import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { ProjectCategory } from "@/content/types";

export const ALL_CATEGORIES: readonly ProjectCategory[] = [
  "AI",
  "ML",
  "NLP",
  "Web",
  "Vision",
  "Search",
  "Voice",
];

export type CategoryFilterValue = "All" | ProjectCategory;

export interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps): ReactNode {
  const options: readonly CategoryFilterValue[] = ["All", ...ALL_CATEGORIES];

  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
              isActive
                ? "border-primary bg-primary text-on-primary"
                : "border-border bg-surface text-muted hover:text-foreground",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
