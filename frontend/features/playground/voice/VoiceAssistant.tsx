"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { useVoice } from "@/lib/hooks/useVoice";

import { AudioVisualizer } from "./AudioVisualizer";
import { MicButton } from "./MicButton";
import { TranscriptView } from "./TranscriptView";

function phaseLabel(phase: ReturnType<typeof useVoice>["phase"]): string {
  switch (phase) {
    case "recording":
      return "Listening… tap stop when you're done";
    case "transcribing":
      return "Transcribing your question…";
    case "thinking":
      return "Thinking with grounded context…";
    case "speaking":
      return "Speaking the answer…";
    case "text-only":
      return "Voice unavailable — text reply below";
    default:
      return "Ready when you are";
  }
}

export function VoiceAssistant(): ReactNode {
  const {
    phase,
    transcript,
    reply,
    error,
    textOnlyFallback,
    analyserNode,
    startRecording,
    stopRecording,
    reset,
  } = useVoice();

  const busy = phase === "transcribing" || phase === "thinking" || phase === "speaking";
  const isRecording = phase === "recording";

  return (
    <div className="border-border bg-surface flex flex-col gap-6 rounded-[var(--radius-lg)] border p-6">
      <div>
        <h2 className="text-foreground text-lg font-semibold">Voice Assistant</h2>
        <p className="text-muted mt-1 text-sm">
          Speak a question about Aditya&apos;s projects or skills. Audio goes through STT → RAG chat
          → TTS, with a text-only fallback if voice services are down.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <MicButton
          isRecording={isRecording}
          disabled={busy}
          onStart={() => void startRecording()}
          onStop={stopRecording}
        />
        <p className="text-muted text-sm" aria-live="polite">
          {phaseLabel(phase)}
        </p>
        <AudioVisualizer
          analyser={analyserNode}
          active={isRecording}
          className="bg-background/60 max-w-md"
        />
      </div>

      {error ? (
        <p role="alert" className="text-error text-sm">
          {error}
        </p>
      ) : null}

      {textOnlyFallback && !reply ? (
        <p className="text-muted text-sm">
          Switch to the Chat tab to continue with text, or try the mic again in a moment.
        </p>
      ) : null}

      <TranscriptView
        transcript={transcript}
        reply={reply}
        isStreaming={phase === "thinking"}
        className="border-border bg-background/40 rounded-[var(--radius-md)] border p-4"
      />

      {(transcript || reply || error) && phase !== "recording" ? (
        <div>
          <Button type="button" variant="secondary" size="sm" onClick={reset}>
            Ask another question
          </Button>
        </div>
      ) : null}
    </div>
  );
}
