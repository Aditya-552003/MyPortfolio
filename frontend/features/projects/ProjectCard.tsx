import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/content/types";

import { CATEGORY_ICONS } from "./categoryIcons";
import { getProjectVisual } from "./projectVisuals";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): ReactNode {
  const Icon = CATEGORY_ICONS[project.categories[0] ?? "AI"];
  const visual = getProjectVisual(project.slug);

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <Card variant="standard" hover="glow" className="h-full overflow-hidden p-0">
        <div
          className="relative flex aspect-video items-center justify-center"
          style={{
            backgroundImage: visual.backgroundImage,
            backgroundColor: "var(--surface)",
          }}
        >
          <Icon className="text-foreground/70 relative size-10" aria-hidden />
        </div>
        <div className="p-6">
          <h3 className="text-foreground font-semibold">{project.title}</h3>
          <p className="text-muted mt-1 text-sm">{project.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.categories.map((category) => (
              <Badge key={category} variant="neutral">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
