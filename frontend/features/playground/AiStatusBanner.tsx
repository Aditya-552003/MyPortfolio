"use client";

import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { EMOTION_ENABLED } from "@/lib/api";
import { useHealth } from "@/lib/hooks/useHealth";
import { cn } from "@/lib/utils/cn";

const LABELS: Record<"chat" | "emotion" | "search" | "voice", string> = {
  chat: "Chat",
  emotion: "Emotion",
  search: "Search",
  voice: "Voice",
};

/** Compact readiness strip for AI-backed Playground demos. */
export function AiStatusBanner(): ReactNode {
  const health = useHealth();

  if (health.isPending) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (health.isError || !health.data) {
    return (
      <div
        role="status"
        className="border-error/40 bg-error/10 text-error rounded-[var(--radius-md)] border px-4 py-2.5 text-sm"
      >
        Backend unreachable — non-AI pages still work. Retry the demos in a moment.
      </div>
    );
  }

  const { status, services } = health.data;
  const serviceKeys = (Object.keys(LABELS) as Array<keyof typeof LABELS>).filter(
    (key) => EMOTION_ENABLED || key !== "emotion",
  );
  const offline = serviceKeys.filter((key) => !services[key]);

  return (
    <div
      role="status"
      className={cn(
        "rounded-[var(--radius-md)] border px-4 py-2.5 text-sm",
        status === "ok"
          ? "border-accent/40 bg-accent/10 text-foreground"
          : "border-warning/40 bg-warning/10 text-foreground",
      )}
    >
      {status === "ok" ? (
        <span>All AI services ready.</span>
      ) : (
        <span>
          Some AI services are unavailable
          {offline.length > 0 ? ` (${offline.map((key) => LABELS[key]).join(", ")})` : ""}. Demos
          will show a friendly fallback instead of crashing.
        </span>
      )}
    </div>
  );
}
