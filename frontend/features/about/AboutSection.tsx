import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { about } from "@/content/about";

export function AboutSection(): ReactNode {
  return (
    <SectionContainer className="flex flex-col gap-16 py-16 sm:py-24">
      <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
        About Aditya
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-primary text-sm font-semibold tracking-wide uppercase">Intro</h2>
              <p className="text-foreground mt-2 text-lg">{about.intro}</p>
            </div>
            <div>
              <h2 className="text-primary text-sm font-semibold tracking-wide uppercase">
                Objective
              </h2>
              <p className="text-muted mt-2">{about.objective}</p>
            </div>
            <div>
              <h2 className="text-primary text-sm font-semibold tracking-wide uppercase">
                Current focus
              </h2>
              <p className="text-muted mt-2">{about.focus}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={75}>
          <Card variant="standard" className="h-full p-6">
            <h2 className="text-primary text-sm font-semibold tracking-wide uppercase">Values</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {about.values.map((value) => (
                <li key={value} className="text-muted text-sm">
                  {value}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>

      <div>
        <h2 className="text-foreground text-2xl font-bold tracking-tight">Journey</h2>
        <Timeline className="mt-6 max-w-2xl">
          {about.journey.map((milestone, index) => (
            <TimelineItem
              key={`${milestone.year}-${milestone.title}`}
              dateRange={milestone.year}
              title={milestone.title}
              delayMs={index * 75}
            >
              {milestone.description}
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </SectionContainer>
  );
}
