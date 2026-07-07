import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";
import { projects } from "@/content/projects";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);

  return {
    title: project?.title ?? "Project",
    description: project?.tagline ?? "Full project deep-dive — arriving in Sprint 3.",
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps): Promise<ReactNode> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);

  return (
    <ComingSoon
      eyebrow="Project"
      title={project?.title ?? `Project: ${slug}`}
      description={
        project
          ? `${project.tagline} Full deep-dive — arriving in Sprint 3.`
          : "Full project deep-dive — arriving in Sprint 3."
      }
    />
  );
}
