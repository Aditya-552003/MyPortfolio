import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { SkillsMatrix } from "@/features/skills";

const description =
  "A grouped, scannable breakdown of Aditya's technical skills — programming, ML/DL, NLP, AI systems, backend, frontend, and DevOps — with proficiency levels.";

export const metadata: Metadata = {
  title: "Skills",
  description,
  alternates: { canonical: "/skills" },
};

export default function SkillsPage(): ReactNode {
  return (
    <SectionContainer className="flex flex-col gap-8 py-16 sm:py-24">
      <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">Skills</h1>
      <SkillsMatrix />
    </SectionContainer>
  );
}
