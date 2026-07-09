"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { ApiError } from "@/lib/api";
import { useEmotion } from "@/lib/hooks/useEmotion";

import { EmotionInput } from "./EmotionInput";
import { EmotionResultBars } from "./EmotionResultBars";

export function EmotionDemo(): ReactNode {
  const emotion = useEmotion();

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-sm">
        This runs Aditya&apos;s real EmoSens ensemble (fine-tuned RoBERTa + XGBoost) — the same
        model documented on the{" "}
        <Link href="/projects/emosens" className="text-primary underline underline-offset-4">
          EmoSens project page
        </Link>
        .
      </p>

      <EmotionInput onSubmit={(text) => emotion.mutate({ text })} isLoading={emotion.isPending} />

      {emotion.isError ? (
        <p role="alert" className="text-error text-sm">
          {emotion.error instanceof ApiError
            ? emotion.error.message
            : "Emotion detection is temporarily unavailable."}
        </p>
      ) : null}

      {emotion.isSuccess ? <EmotionResultBars emotions={emotion.data.emotions} /> : null}
    </div>
  );
}
