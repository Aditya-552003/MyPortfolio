import { Cloud, Code2, Sparkles } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { skillHighlights } from "@/content/skills";

const ICONS: readonly ComponentType<SVGProps<SVGSVGElement>>[] = [Sparkles, Code2, Cloud];

export function SkillsHighlight(): ReactNode {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {skillHighlights.map((skill, index) => {
        const Icon = ICONS[index % ICONS.length] ?? Sparkles;
        return (
          <Reveal key={skill.name} delayMs={index * 75}>
            <Card variant="standard" hover="lift" className="h-full p-6">
              <Icon className="text-primary size-6" aria-hidden />
              <h3 className="text-foreground mt-3 font-semibold">{skill.name}</h3>
              <p className="text-muted mt-1 text-sm">{skill.description}</p>
              <Badge variant="primary" className="mt-4">
                {skill.proficiency}
              </Badge>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
