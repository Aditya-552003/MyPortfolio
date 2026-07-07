import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage(): ReactNode {
  return (
    <ComingSoon
      eyebrow="Projects"
      title="Project Explorer"
      description="Interactive, filterable project grid — arriving in Sprint 2."
    />
  );
}
