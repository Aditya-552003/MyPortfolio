import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage(): ReactNode {
  return (
    <ComingSoon
      eyebrow="Experience"
      title="Experience & Education"
      description="Internships, freelance work, open source, and education timelines — arriving in Sprint 2."
    />
  );
}
