import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { PlaygroundHub } from "@/features/playground";

const description =
  "Chat with a RAG assistant grounded in Aditya's real work, run live emotion detection with his EmoSens ensemble, and try semantic search over his skills and projects.";

export const metadata: Metadata = {
  title: "Playground",
  description,
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage(): ReactNode {
  return (
    <SectionContainer className="flex flex-col gap-8 py-16 sm:py-24">
      <div>
        <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
          AI Playground
        </h1>
        <p className="text-muted mt-3 max-w-2xl">{description}</p>
      </div>
      <PlaygroundHub />
    </SectionContainer>
  );
}
