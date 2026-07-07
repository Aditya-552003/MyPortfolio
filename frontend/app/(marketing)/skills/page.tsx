import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";

const description = "Grouped, scannable skills with proficiency signals — arriving in Sprint 2.";

export const metadata: Metadata = {
  title: "Skills",
  description,
  alternates: { canonical: "/skills" },
};

export default function SkillsPage(): ReactNode {
  return <ComingSoon eyebrow="Skills" title="Skills Matrix" description={description} />;
}
