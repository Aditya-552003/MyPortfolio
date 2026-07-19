import dynamic from "next/dynamic";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { Skeleton } from "@/components/ui/Skeleton";

const PlaygroundHub = dynamic(
  () => import("@/features/playground/PlaygroundHub").then((m) => ({ default: m.PlaygroundHub })),
  {
    loading: () => (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-[32rem] w-full rounded-[var(--radius-lg)]" />
      </div>
    ),
  },
);

const description =
  "Chat or speak with a RAG assistant grounded in Aditya's real work, run live emotion detection with his EmoSens ensemble, try semantic search over his skills and projects, and walk through how the RAG pipeline works.";

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
