"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

import { apiPost } from "@/lib/api";

export interface SearchPayload {
  query: string;
}

export interface SearchResult {
  title: string;
  type: string;
  score: number;
  url: string;
}

export interface SearchResponse {
  results: SearchResult[];
}

/** Stub — the `/api/search` backend endpoint lands in Sprint 4 (S4-4). */
export function useSemanticSearch(): UseMutationResult<SearchResponse, Error, SearchPayload> {
  return useMutation({
    mutationFn: (payload: SearchPayload) =>
      apiPost<SearchResponse, SearchPayload>("/api/search", payload),
  });
}
