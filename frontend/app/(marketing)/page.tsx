import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { AboutTeaser } from "@/features/about";
import { Hero } from "@/features/hero";
import { PlaygroundTeaser } from "@/features/playground";
import { ProjectsPreview } from "@/features/projects";
import { SkillsHighlight } from "@/features/skills";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.tagline,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage(): ReactNode {
  return (
    <>
      <Hero />

      <SectionContainer className="flex flex-col gap-16 py-16 sm:gap-20 sm:py-24">
        <section aria-labelledby="about-teaser-heading">
          <h2 id="about-teaser-heading" className="sr-only">
            About
          </h2>
          <AboutTeaser />
        </section>

        <section aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-foreground text-2xl font-bold tracking-tight">
            What I bring
          </h2>
          <div className="mt-6">
            <SkillsHighlight />
          </div>
        </section>

        <section aria-labelledby="playground-teaser-heading">
          <h2 id="playground-teaser-heading" className="sr-only">
            AI Playground
          </h2>
          <PlaygroundTeaser />
        </section>

        <section aria-labelledby="projects-heading">
          <div className="flex items-center justify-between">
            <h2 id="projects-heading" className="text-foreground text-2xl font-bold tracking-tight">
              Featured projects
            </h2>
            <Link
              href="/projects"
              aria-label="View all projects"
              className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              View all
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-6">
            <ProjectsPreview />
          </div>
        </section>
      </SectionContainer>
    </>
  );
}
