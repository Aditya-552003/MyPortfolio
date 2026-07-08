import type { ComponentType, ReactNode, SVGProps } from "react";

import { cn } from "@/lib/utils/cn";

export interface IconListProps {
  items: readonly string[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
}

/** Shared renderer behind `ChallengesList`, `LessonsList`, and the Features/Future-improvements lists. */
export function IconList({ items, icon: Icon, iconClassName }: IconListProps): ReactNode {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="text-muted flex items-start gap-2.5 text-sm">
          <Icon className={cn("text-primary mt-0.5 size-4 shrink-0", iconClassName)} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
