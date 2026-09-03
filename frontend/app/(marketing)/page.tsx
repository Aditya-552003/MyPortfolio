import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroAboutTransition } from "@/features/hero";
import { CertificationsList } from "@/features/certifications";
import { ExperienceTimeline } from "@/features/experience";
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
      <HeroAboutTransition />

      <SectionContainer className="flex flex-col gap-16 py-16 sm:gap-20 sm:py-24">
        {/* Section 1: My Projects */}
        <section aria-labelledby="projects-heading">
          <div className="flex items-center justify-between">
            <h2
              id="projects-heading"
              className="text-primary shrink-0 text-[11px] font-bold tracking-[0.25em] uppercase sm:text-xs"
            >
              MY PROJECTS
            </h2>
            <Link
              href="/projects"
              aria-label="View all projects"
              className="text-primary inline-flex items-center gap-1 text-xs font-bold tracking-[0.15em] uppercase hover:underline"
            >
              View all
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 sm:mt-12">
            <ProjectsPreview />
          </div>
        </section>

        {/* Section 2: Skills & Technical Expertise */}
        <section aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="sr-only">
            Core Skills
          </h2>
          <div>
            <SkillsHighlight />
          </div>
        </section>

        {/* Section 3: Work & Experience (Interactive Pinned Path) */}
        <section aria-labelledby="experience-heading">
          <ScrollReveal delay={0} distance={30}>
            <div className="border-border/60 flex items-center justify-between border-b pb-3">
              <h2
                id="experience-heading"
                className="text-primary shrink-0 text-[11px] font-bold tracking-[0.25em] uppercase sm:text-xs"
              >
                WORK &amp; EXPERIENCE
              </h2>
              <Link
                href="/experience"
                aria-label="View full experience"
                className="text-primary inline-flex items-center gap-1 text-xs font-bold tracking-[0.15em] uppercase hover:underline"
              >
                View all
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
            <div className="mt-2">
              <ExperienceTimeline />
            </div>
          </ScrollReveal>
        </section>

        {/* Section 4: Achievements & Certifications */}
        <section aria-labelledby="certifications-heading">
          <ScrollReveal delay={0} distance={30}>
            <div className="border-border/60 flex items-center justify-between border-b pb-3">
              <h2
                id="certifications-heading"
                className="text-primary shrink-0 text-[11px] font-bold tracking-[0.25em] uppercase sm:text-xs"
              >
                ACHIEVEMENTS &amp; CERTIFICATIONS
              </h2>
            </div>
            <div className="mt-6">
              <CertificationsList />
            </div>
          </ScrollReveal>
        </section>

        {/* Section 4: AI Playground */}
        <section aria-labelledby="playground-teaser-heading">
          <h2 id="playground-teaser-heading" className="sr-only">
            AI Playground
          </h2>
          <PlaygroundTeaser />
        </section>
      </SectionContainer>
    </>
  );
}
