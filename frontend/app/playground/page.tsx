import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";

export const metadata: Metadata = { title: "Playground" };

export default function PlaygroundPage(): ReactNode {
  return (
    <ComingSoon
      eyebrow="Playground"
      title="AI Playground"
      description="Chat with Portfolio, Voice Assistant, Emotion Detection, and Semantic Search demos — arriving in Sprint 4."
    />
  );
}
