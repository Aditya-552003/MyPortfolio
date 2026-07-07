import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";

const description = "Career journey, mission, and values — arriving in Sprint 2.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
};

export default function AboutPage(): ReactNode {
  return <ComingSoon eyebrow="About" title="About Aditya" description={description} />;
}
