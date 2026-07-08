"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

import { apiPost } from "@/lib/api";

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

/** Stub — the `/api/emotion` backend endpoint lands in Sprint 4 (S4-3). */
export function useEmotion(): UseMutationResult<EmotionResponse, Error, EmotionPayload> {
  return useMutation({
    mutationFn: (payload: EmotionPayload) =>
      apiPost<EmotionResponse, EmotionPayload>("/api/emotion", payload),
  });
}
