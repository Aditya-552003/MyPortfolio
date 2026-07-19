"use client";

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api";

export interface HealthServices {
  chat: boolean;
  emotion: boolean;
  search: boolean;
  voice: boolean;
}

export interface HealthResponse {
  status: "ok" | "degraded";
  services: HealthServices;
  mode?: "full" | "low_memory";
}

/** Polls `/api/health` so the UI can show AI service readiness. */
export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => apiFetch<HealthResponse>("/api/health"),
    refetchInterval: 30_000,
    retry: 1,
    staleTime: 10_000,
  });
}
