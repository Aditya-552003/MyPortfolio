"use client";

import type { ReactNode } from "react";

import { StreamingText } from "@/features/playground/chat/StreamingText";
import { cn } from "@/lib/utils/cn";

export interface TranscriptViewProps {
  transcript: string;
  reply: string;
  isStreaming: boolean;
  className?: string;
}

export function TranscriptView({
  transcript,
  reply,
  isStreaming,
  className,
}: TranscriptViewProps): ReactNode {
  if (!transcript && !reply) {
    return (
      <p className={cn("text-muted text-sm", className)}>
        Tap the mic, ask a question about Aditya&apos;s work, and hear a grounded answer.
      </p>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} aria-live="polite">
      {transcript ? (
        <div>
          <p className="text-muted mb-1 text-xs font-medium tracking-wide uppercase">You said</p>
          <p className="text-foreground text-sm">{transcript}</p>
        </div>
      ) : null}
      {reply ? (
        <div>
          <p className="text-muted mb-1 text-xs font-medium tracking-wide uppercase">Answer</p>
          <p className="text-foreground text-sm leading-relaxed">
            <StreamingText text={reply} isStreaming={isStreaming} />
          </p>
        </div>
      ) : null}
    </div>
  );
}
