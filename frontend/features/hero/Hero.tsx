import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { siteConfig } from "@/config/site";

import { AnimatedGradient } from "./AnimatedGradient";
import { ParticleField } from "./ParticleField";

export function Hero(): ReactNode {
  return (
    <section className="relative isolate overflow-hidden">
      <AnimatedGradient />
      <ParticleField />
      <SectionContainer className="flex flex-col items-center gap-6 py-24 text-center sm:gap-8 sm:py-32 lg:py-40">
        <p className="text-muted text-sm font-medium tracking-wide uppercase">
          {siteConfig.tagline}
        </p>
        <h1 className="text-foreground max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="text-muted max-w-xl text-lg sm:text-xl">{siteConfig.mission}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="/playground" variant="primary" size="lg" className="w-full sm:w-auto">
            Talk to My AI
          </Button>
          <Button href="/projects" variant="secondary" size="lg" className="w-full sm:w-auto">
            Explore Projects
          </Button>
        </div>
      </SectionContainer>
    </section>
  );
}
