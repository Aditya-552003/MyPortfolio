import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";

export const metadata: Metadata = { title: "Project" };

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps): Promise<ReactNode> {
  const { slug } = await params;

  return (
    <ComingSoon
      eyebrow="Project"
      title={`Project: ${slug}`}
      description="Full project deep-dive — arriving in Sprint 3."
    />
  );
}
