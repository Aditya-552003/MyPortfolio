"use client";

import { Mic, Square } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export interface MicButtonProps {
  isRecording: boolean;
  disabled?: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function MicButton({ isRecording, disabled, onStart, onStop }: MicButtonProps): ReactNode {
  return (
    <Button
      type="button"
      variant="icon"
      size="icon"
      disabled={disabled}
      aria-pressed={isRecording}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
      onClick={isRecording ? onStop : onStart}
      className={cn(
        "border-border bg-surface text-foreground relative size-16 border",
        isRecording && "border-error text-error",
      )}
    >
      {isRecording ? (
        <>
          <span
            aria-hidden
            className="bg-error/20 absolute inset-0 animate-ping rounded-full motion-reduce:animate-none"
          />
          <Square className="relative size-5 fill-current" aria-hidden />
        </>
      ) : (
        <Mic className="size-6" aria-hidden />
      )}
    </Button>
  );
}
