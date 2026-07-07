import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { skills } from "@/content/skills";
import type { SkillCategory } from "@/content/types";

import { SkillPill } from "./SkillPill";

const CATEGORY_ORDER: readonly SkillCategory[] = [
  "Programming",
  "Machine Learning & Deep Learning",
  "Natural Language Processing",
  "AI Systems",
  "Backend Engineering",
  "Frontend Engineering",
  "DevOps & Cloud",
];

export function SkillsMatrix(): ReactNode {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {CATEGORY_ORDER.map((category, index) => {
        const categorySkills = skills.filter((skill) => skill.category === category);
        if (categorySkills.length === 0) return null;

        return (
          <Reveal key={category} delayMs={index * 75}>
            <h2 className="text-primary text-sm font-semibold tracking-wide uppercase">
              {category}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <SkillPill key={skill.name} skill={skill} />
              ))}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
