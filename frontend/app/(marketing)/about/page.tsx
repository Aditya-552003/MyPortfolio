import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AboutSection } from "@/features/about";

const description =
  "Aditya's career journey, mission, and values — the engineer behind the AI systems in this portfolio.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
};

export default function AboutPage(): ReactNode {
  return <AboutSection />;
}
