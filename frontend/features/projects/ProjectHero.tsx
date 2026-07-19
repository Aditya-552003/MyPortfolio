import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/icons/BrandIcons";
import type { Project } from "@/content/types";

import { CATEGORY_ICONS } from "./categoryIcons";
import { getProjectVisual } from "./projectVisuals";

export interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps): ReactNode {
  const Icon = CATEGORY_ICONS[project.categories[0] ?? "AI"];
  const visual = getProjectVisual(project.slug);

  return (
    <div className="border-border overflow-hidden rounded-[var(--radius-lg)] border">
      <div
        className="relative flex aspect-[3/1] min-h-40 items-center justify-center overflow-hidden"
        style={{
          backgroundImage: visual.backgroundImage,
          backgroundColor: "var(--surface)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative flex flex-col items-center gap-3 px-4 text-center">
          <Icon className="text-foreground/80 size-14 drop-shadow-sm sm:size-16" aria-hidden />
          <span className="text-muted text-xs font-medium tracking-[0.18em] uppercase">
            {visual.label}
          </span>
        </div>
      </div>
      <div className="border-border bg-surface flex flex-col gap-4 border-t p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-1.5">
            {project.categories.map((category) => (
              <Badge key={category} variant="neutral">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-foreground mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-muted mt-1 max-w-xl">{project.tagline}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <GithubIcon className="size-4" aria-hidden />
            View code
          </Button>
          {project.liveDemoUrl ? (
            <Button
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              <ExternalLink className="size-4" aria-hidden />
              Live demo
            </Button>
          ) : (
            <Button variant="primary" disabled aria-disabled title="Live demo coming soon">
              Live demo — coming soon
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
