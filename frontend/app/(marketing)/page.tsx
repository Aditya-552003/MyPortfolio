import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.tagline,
};

export default function HomePage(): ReactNode {
  return (
    <SectionContainer className="flex flex-col items-center gap-8 py-24 text-center sm:py-32">
      <Badge variant="primary">Sprint 0 — Foundations</Badge>
      <h1 className="text-foreground max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="text-muted max-w-xl text-lg">{siteConfig.mission}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/playground" variant="primary" size="lg">
          Talk to My AI
        </Button>
        <Button href="/projects" variant="secondary" size="lg">
          Explore Projects
        </Button>
      </div>

      <Card variant="glass" hover="lift" className="mt-8 w-full max-w-2xl p-6 text-left">
        <p className="text-muted text-sm">
          The design system, layout shell, and CI pipeline are live. Hero, content sections, and AI
          demos ship in the sprints that follow.
        </p>
      </Card>
    </SectionContainer>
  );
}
