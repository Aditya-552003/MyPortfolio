"use client";

import { useCallback, useRef, useState } from "react";

import { ApiError, apiPostBlob, apiUpload } from "@/lib/api";

export type VoicePhase =
  | "idle"
  | "recording"
  | "transcribing"
  | "thinking"
  | "speaking"
  | "text-only";

export interface VoiceTurn {
  transcript: string;
  reply: string;
}

export interface UseVoiceResult {
  phase: VoicePhase;
  transcript: string;
  reply: string;
  error: string | null;
  textOnlyFallback: boolean;
  analyserNode: AnalyserNode | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  reset: () => void;
}

interface SttResponse {
  transcript: string;
}

interface ChatStreamPayload {
  token?: string;
  error?: string;
  done?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const CHAT_TIMEOUT_MS = 15_000;

function parseSseEvents(buffer: string): { events: ChatStreamPayload[]; rest: string } {
  const parts = buffer.split("\n\n");
  const rest = parts.pop() ?? "";
  const events: ChatStreamPayload[] = [];

  for (const part of parts) {
    const line = part.trim();
    if (!line.startsWith("data:")) continue;
    const jsonText = line.slice("data:".length).trim();
    if (!jsonText) continue;
    try {
      events.push(JSON.parse(jsonText) as ChatStreamPayload);
    } catch {
      // Ignore malformed frames.
    }
  }

  return { events, rest };
}

async function streamChatReply(
  message: string,
  onToken: (token: string) => void,
): Promise<string> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: [] }),
      signal: controller.signal,
    });

    if (!response.ok || !response.body) {
      const body: unknown = await response.json().catch(() => null);
      const apiMessage =
        body && typeof body === "object" && "error" in body
          ? (body as { error: { message: string } }).error.message
          : null;
      throw new Error(apiMessage ?? "Chat is temporarily unavailable.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let content = "";

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const { events, rest } = parseSseEvents(buffer);
      buffer = rest;
      for (const event of events) {
        if (event.error) throw new Error(event.error);
        if (event.token) {
          content += event.token;
          onToken(event.token);
        }
      }
    }

    return content;
  } finally {
    window.clearTimeout(timeout);
  }
}

/** Full voice round-trip: mic → STT → RAG chat → TTS, with text-only fallback. */
export function useVoice(): UseVoiceResult {
  const [phase, setPhase] = useState<VoicePhase>("idle");
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [textOnlyFallback, setTextOnlyFallback] = useState(false);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const cleanupMedia = useCallback(() => {
    mediaRecorderRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    void audioContextRef.current?.close();
    audioContextRef.current = null;
    setAnalyserNode(null);
  }, []);

  const reset = useCallback(() => {
    audioElementRef.current?.pause();
    audioElementRef.current = null;
    cleanupMedia();
    setPhase("idle");
    setTranscript("");
    setReply("");
    setError(null);
    setTextOnlyFallback(false);
  }, [cleanupMedia]);

  const runRoundTrip = useCallback(
    async (audioBlob: Blob) => {
      setPhase("transcribing");
      setError(null);
      setTextOnlyFallback(false);

      let spokenQuestion = "";
      try {
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");
        const stt = await apiUpload<SttResponse>("/api/voice/stt", formData);
        spokenQuestion = stt.transcript.trim();
        if (!spokenQuestion) {
          throw new Error("No speech detected — try again.");
        }
        setTranscript(spokenQuestion);
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Speech recognition failed.";
        setError(message);
        setTextOnlyFallback(true);
        setPhase("text-only");
        return;
      }

      setPhase("thinking");
      let answer = "";
      try {
        answer = await streamChatReply(spokenQuestion, (token) => {
          setReply((current) => current + token);
        });
        if (!answer.trim()) {
          throw new Error("No reply was generated.");
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Chat is temporarily unavailable.";
        setError(message);
        setPhase("text-only");
        setTextOnlyFallback(true);
        return;
      }

      setPhase("speaking");
      try {
        const blob = await apiPostBlob("/api/voice/tts", { text: answer });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioElementRef.current = audio;
        audio.onended = () => {
          URL.revokeObjectURL(url);
          setPhase("idle");
        };
        await audio.play();
      } catch {
        // TTS is optional — keep the streamed text reply visible.
        setTextOnlyFallback(true);
        setPhase("text-only");
        setError("Voice playback unavailable — showing text reply instead.");
      }
    },
    [],
  );

  const startRecording = useCallback(async () => {
    setError(null);
    setTranscript("");
    setReply("");
    setTextOnlyFallback(false);
    chunksRef.current = [];

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("This browser doesn't support microphone recording.");
      setTextOnlyFallback(true);
      setPhase("text-only");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      setAnalyserNode(analyser);

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        cleanupMedia();
        void runRoundTrip(blob);
      };

      recorder.start();
      setPhase("recording");
    } catch {
      cleanupMedia();
      setError("Microphone access was denied or unavailable.");
      setTextOnlyFallback(true);
      setPhase("text-only");
    }
  }, [cleanupMedia, runRoundTrip]);

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  }, []);

  return {
    phase,
    transcript,
    reply,
    error,
    textOnlyFallback,
    analyserNode,
    startRecording,
    stopRecording,
    reset,
  };
}
