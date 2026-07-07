import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function PlaygroundTeaser(): ReactNode {
  return (
    <Reveal>
      <Card
        variant="glass"
        hover="lift"
        className="flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-4">
          <span className="bg-primary/10 text-primary rounded-full p-3">
            <Sparkles className="size-6" aria-hidden />
          </span>
          <div>
            <h2 className="text-foreground text-xl font-bold tracking-tight">AI Playground</h2>
            <p className="text-muted mt-1 max-w-md">
              Chat with a RAG assistant grounded in my work, or run live emotion detection and
              semantic search demos.
            </p>
          </div>
        </div>
        <Button href="/playground" variant="primary" className="w-full shrink-0 sm:w-auto">
          Try it now
        </Button>
      </Card>
    </Reveal>
  );
}
