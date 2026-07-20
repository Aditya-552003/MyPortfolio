"use client";

import { useQuery } from "@tanstack/react-query";

import {
  API_BASE_URL,
  EMOTION_API_BASE_URL,
  EMOTION_API_EXTERNAL,
  EMOTION_ENABLED,
  apiFetch,
} from "@/lib/api";

export interface HealthServices {
  chat: boolean;
  emotion: boolean;
  search: boolean;
  voice: boolean;
  mode?: "full" | "lite";
  emotion_external?: boolean;
}

export interface HealthResponse {
  status: "ok" | "degraded";
  services: HealthServices;
}

interface EmotionHealthBody {
  status?: string;
  model_loaded?: boolean;
  /** Present on main portfolio `/api/health` — not an emotion microservice response. */
  services?: unknown;
}

async function probeEmosenseHealth(): Promise<boolean> {
  try {
    const response = await fetch(EMOTION_API_BASE_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      return false;
    }
    const body = (await response.json()) as { status?: string };
    return body.status === "online";
  } catch {
    return false;
  }
}

async function probeGradioEmotion(): Promise<boolean> {
  try {
    const response = await fetch(`${EMOTION_API_BASE_URL}/gradio_api/call/predict_emotion`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ data: ["health check"] }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function fetchEmotionReady(): Promise<boolean> {
  if (EMOTION_API_EXTERNAL) {
    if (await probeEmosenseHealth()) {
      return true;
    }
  }

  try {
    const response = await fetch(`${EMOTION_API_BASE_URL}/api/health`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      const body = (await response.json()) as EmotionHealthBody;
      if (body.services === undefined) {
        return Boolean(body.model_loaded ?? body.status === "ok");
      }
    }
  } catch {
    // REST /api/health may be unavailable on external Spaces — try other probes.
  }

  if (await probeEmosenseHealth()) {
    return true;
  }

  return probeGradioEmotion();
}

/** Polls main `/api/health` and, in hybrid mode, the external emotion Space health. */
export function useHealth() {
  return useQuery({
    queryKey: ["health", API_BASE_URL, EMOTION_API_BASE_URL, EMOTION_ENABLED],
    queryFn: async (): Promise<HealthResponse> => {
      const main = await apiFetch<HealthResponse>("/api/health");
      const needsExternalEmotion =
        EMOTION_ENABLED && (EMOTION_API_EXTERNAL || Boolean(main.services.emotion_external));

      if (!EMOTION_ENABLED) {
        return {
          ...main,
          services: { ...main.services, emotion: true },
          status:
            main.services.chat && main.services.search && main.services.voice ? "ok" : "degraded",
        };
      }

      if (needsExternalEmotion) {
        if (main.services.emotion_external && !EMOTION_API_EXTERNAL) {
          return {
            ...main,
            services: { ...main.services, emotion: false },
            status: "degraded",
          };
        }

        const emotionReady = await fetchEmotionReady();
        return {
          ...main,
          services: { ...main.services, emotion: emotionReady },
          status:
            main.services.chat && main.services.search && main.services.voice && emotionReady
              ? "ok"
              : "degraded",
        };
      }

      return main;
    },
    refetchInterval: 30_000,
    retry: 1,
    staleTime: 10_000,
  });
}
