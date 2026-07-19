"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

import { emotionPredict } from "@/lib/api";

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

/** REST `/api/emotion` locally; external Spaces try emosense `/predict` or Gradio API. */
export function useEmotion(): UseMutationResult<EmotionResponse, Error, EmotionPayload> {
  return useMutation({
    mutationFn: (payload: EmotionPayload) => emotionPredict(payload.text),
  });
}
