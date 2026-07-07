import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/content/types";

import { CATEGORY_ICONS } from "./categoryIcons";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): ReactNode {
  const Icon = CATEGORY_ICONS[project.categories[0] ?? "AI"];

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <Card variant="standard" hover="glow" className="h-full overflow-hidden p-0">
        <div
          className="flex aspect-video items-center justify-center"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--primary) 25%, transparent), transparent 65%), radial-gradient(circle at 75% 70%, color-mix(in srgb, var(--secondary) 25%, transparent), transparent 65%)",
            backgroundColor: "var(--surface)",
          }}
        >
          <Icon className="text-muted size-10" aria-hidden />
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
