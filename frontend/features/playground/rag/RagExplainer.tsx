"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Database,
  Layers,
  Search,
  Sparkles,
  FileText,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

interface RagStep {
  id: string;
  title: string;
  summary: string;
  detail: string;
  icon: typeof FileText;
}

const STEPS: RagStep[] = [
  {
    id: "ingest",
    title: "Ingest",
    summary: "Load real portfolio content",
    detail:
      "About copy, project write-ups, and the skills catalog are loaded from source files — the same content you see on this site, not a generic web crawl.",
    icon: FileText,
  },
  {
    id: "chunk",
    title: "Chunk",
    summary: "Split into coherent sections",
    detail:
      "Content is split on markdown headings so each chunk stays about one topic (a project pipeline, a skill group, a mission statement) instead of arbitrary character windows.",
    icon: Layers,
  },
  {
    id: "embed",
    title: "Embed",
    summary: "Turn text into vectors",
    detail:
      "Each chunk is embedded with Sentence Transformers and saved to disk once. At request time the app loads those vectors — it does not re-embed the whole corpus on every question.",
    icon: Database,
  },
  {
    id: "retrieve",
    title: "Retrieve",
    summary: "Find the closest matches",
    detail:
      "Your question is embedded the same way, then ranked against the stored chunks with cosine similarity. Only the top matches are passed forward as context.",
    icon: Search,
  },
  {
    id: "generate",
    title: "Generate",
    summary: "Answer from retrieved context",
    detail:
      "Gemini writes a reply grounded in those chunks, with rules that block invented employers, degrees, or off-topic tangents. The chat stream you see is that grounded answer.",
    icon: Sparkles,
  },
];

const AUTO_PLAY_MS = 4000;

/** Interactive walkthrough of the portfolio RAG pipeline (Ingest → Generate). */
export function RagExplainer(): ReactNode {
  const [stepIndex, setStepIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const reducedMotion = useReducedMotion();
  const step: RagStep = STEPS[stepIndex] ?? STEPS[0]!;
  const Icon = step.icon;

  useEffect(() => {
    if (!autoPlay || reducedMotion) return;
    const id = window.setInterval(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, AUTO_PLAY_MS);
    return () => window.clearInterval(id);
  }, [autoPlay, reducedMotion]);

  function goTo(index: number): void {
    setStepIndex(index);
    setAutoPlay(false);
  }

  return (
    <div className="border-border bg-surface flex flex-col gap-6 rounded-[var(--radius-lg)] border p-6">
      <div>
        <h2 className="text-foreground text-lg font-semibold">How the RAG chatbot works</h2>
        <p className="text-muted mt-1 text-sm">
          A five-step look at the pipeline behind Chat with Portfolio — same flow the backend runs
          for every question.
        </p>
      </div>

      <ol className="flex flex-wrap gap-2" aria-label="RAG pipeline steps">
        {STEPS.map((item, index) => {
          const StepIcon = item.icon;
          const selected = index === stepIndex;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-current={selected ? "step" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 rounded-[var(--radius-md)] border px-3 py-2 text-sm transition-colors duration-[var(--duration-fast)]",
                  selected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted hover:border-primary/40 hover:text-foreground",
                )}
              >
                <StepIcon className="size-4" aria-hidden />
                <span>
                  {index + 1}. {item.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div
        key={step.id}
        className="border-border bg-background/40 rounded-[var(--radius-md)] border p-5 transition-opacity duration-[var(--duration-slow)]"
      >
        <div className="flex items-start gap-4">
          <div className="bg-primary/15 text-primary flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-md)]">
            <Icon className="size-6" aria-hidden />
          </div>
          <div>
            <p className="text-muted text-xs font-medium tracking-wide uppercase">
              Step {stepIndex + 1} of {STEPS.length}
            </p>
            <h3 className="text-foreground mt-1 text-xl font-semibold">{step.title}</h3>
            <p className="text-primary mt-1 text-sm font-medium">{step.summary}</p>
            <p className="text-muted mt-3 text-sm leading-relaxed">{step.detail}</p>
          </div>
        </div>

        {!reducedMotion ? (
          <div className="mt-5 flex items-center gap-1" aria-hidden>
            {STEPS.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-[var(--duration-base)]",
                  index <= stepIndex ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => goTo((stepIndex - 1 + STEPS.length) % STEPS.length)}
          aria-label="Previous step"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Back
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => goTo((stepIndex + 1) % STEPS.length)}
          aria-label="Next step"
        >
          Next
          <ChevronRight className="size-4" aria-hidden />
        </Button>
        {!reducedMotion ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setAutoPlay((value) => !value)}
            aria-pressed={autoPlay}
          >
            {autoPlay ? (
              <>
                <Pause className="size-4" aria-hidden /> Pause
              </>
            ) : (
              <>
                <Play className="size-4" aria-hidden /> Auto-play
              </>
            )}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
