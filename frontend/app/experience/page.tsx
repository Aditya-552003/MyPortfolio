import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { CertificationsList } from "@/features/certifications";
import { EducationTimeline, ExperienceTimeline } from "@/features/experience";
import { GitHubStats } from "@/features/github";

const description = "Aditya's experience, education, certifications, and live GitHub activity.";

export const metadata: Metadata = {
  title: "Experience",
  description,
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage(): ReactNode {
  return (
    <SectionContainer className="flex flex-col gap-16 py-16 sm:py-24">
      <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
        Experience
      </h1>

      <section aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="text-foreground text-2xl font-bold tracking-tight">
          Work &amp; open source
        </h2>
        <div className="mt-6">
          <ExperienceTimeline />
        </div>
      </section>

      <section aria-labelledby="education-heading">
        <h2 id="education-heading" className="text-foreground text-2xl font-bold tracking-tight">
          Education
        </h2>
        <div className="mt-6">
          <EducationTimeline />
        </div>
      </section>

      <section aria-labelledby="certifications-heading">
        <h2
          id="certifications-heading"
          className="text-foreground text-2xl font-bold tracking-tight"
        >
          Certifications
        </h2>
        <div className="mt-6">
          <CertificationsList />
        </div>
      </section>

      <section aria-labelledby="github-heading">
        <h2 id="github-heading" className="text-foreground text-2xl font-bold tracking-tight">
          GitHub activity
        </h2>
        <div className="mt-6">
          <GitHubStats />
        </div>
      </section>
    </SectionContainer>
  );
}
