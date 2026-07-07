import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { ProjectExplorer } from "@/features/projects";

const description =
  "Browse Aditya's AI engineering projects, filterable by category: AI, ML, NLP, Web, Vision, Search, and Voice.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage(): ReactNode {
  return (
    <SectionContainer className="flex flex-col gap-8 py-16 sm:py-24">
      <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
        Project Explorer
      </h1>
      <ProjectExplorer />
    </SectionContainer>
  );
}
