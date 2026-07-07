import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";

import { ProjectCard } from "./ProjectCard";

const FEATURED_COUNT = 3;

export function ProjectsPreview(): ReactNode {
  const featured = projects.slice(0, FEATURED_COUNT);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {featured.map((project, index) => (
        <Reveal key={project.slug} delayMs={index * 75} className="h-full">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
