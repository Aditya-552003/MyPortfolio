import type { ReactNode } from "react";

import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils/cn";
import type { Skill } from "@/content/types";

const PROFICIENCY_STYLES: Record<Skill["proficiency"], string> = {
  Core: "border-primary/30 bg-primary/10 text-primary",
  Proficient: "border-accent/30 bg-accent/10 text-accent",
  Working: "border-border bg-surface text-muted",
};

export interface SkillPillProps {
  skill: Skill;
}

export function SkillPill({ skill }: SkillPillProps): ReactNode {
  return (
    <Tooltip content={`${skill.proficiency} proficiency`}>
      <span
        tabIndex={0}
        className={cn(
          "inline-flex cursor-default items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium",
          "transition-transform duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]",
          PROFICIENCY_STYLES[skill.proficiency],
        )}
      >
        <span className="size-1.5 rounded-full bg-current" aria-hidden />
        {skill.name}
      </span>
    </Tooltip>
  );
}
