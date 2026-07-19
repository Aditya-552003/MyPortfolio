"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

import { emotionApiPost } from "@/lib/api";

export interface EmotionPayload {
  text: string;
}

export interface EmotionPrediction {
  label: string;
  confidence: number;
}

export interface EmotionResponse {
  emotions: EmotionPrediction[];
}

/** Calls `/api/emotion` on the main API (local) or HF Space (hybrid production). */
export function useEmotion(): UseMutationResult<EmotionResponse, Error, EmotionPayload> {
  return useMutation({
    mutationFn: (payload: EmotionPayload) =>
      emotionApiPost<EmotionResponse, EmotionPayload>("/api/emotion", payload),
  });
}
