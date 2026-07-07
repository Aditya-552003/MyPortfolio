import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/content/types";

export interface FeaturedProjectCardProps {
  project: Project;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps): ReactNode {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <Card variant="standard" hover="lift" className="h-full p-6">
        <h3 className="text-foreground font-semibold">{project.title}</h3>
        <p className="text-muted mt-1 text-sm">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.categories.map((category) => (
            <Badge key={category} variant="neutral">
              {category}
            </Badge>
          ))}
        </div>
      </Card>
    </Link>
  );
}
