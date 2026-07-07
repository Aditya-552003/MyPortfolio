import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";

const description = "Interactive, filterable project grid — arriving in Sprint 2.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage(): ReactNode {
  return <ComingSoon eyebrow="Projects" title="Project Explorer" description={description} />;
}
