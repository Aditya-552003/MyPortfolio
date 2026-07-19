"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

export interface AudioVisualizerProps {
  analyser: AnalyserNode | null;
  active: boolean;
  className?: string;
}

const BAR_COUNT = 24;

/** Real-time waveform from a Web Audio AnalyserNode; static bars when reduced-motion. */
export function AudioVisualizer({ analyser, active, className }: AudioVisualizerProps): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const barWidth = width / (BAR_COUNT * 1.6);
      const gap = barWidth * 0.6;
      for (let i = 0; i < BAR_COUNT; i++) {
        const x = i * (barWidth + gap) + gap;
        const h = height * 0.25;
        ctx.fillStyle = "color-mix(in srgb, var(--primary) 45%, transparent)";
        ctx.fillRect(x, (height - h) / 2, barWidth, h);
      }
    };

    if (!active || !analyser || reducedMotion) {
      drawStatic();
      return;
    }

    const data = new Uint8Array(analyser.frequencyBinCount);

    const frame = () => {
      analyser.getByteFrequencyData(data);
      ctx.clearRect(0, 0, width, height);
      const barWidth = width / (BAR_COUNT * 1.6);
      const gap = barWidth * 0.6;
      for (let i = 0; i < BAR_COUNT; i++) {
        const sample = data[Math.floor((i / BAR_COUNT) * data.length)] ?? 0;
        const h = Math.max(height * 0.12, (sample / 255) * height * 0.9);
        const x = i * (barWidth + gap) + gap;
        ctx.fillStyle = "var(--primary)";
        ctx.fillRect(x, (height - h) / 2, barWidth, h);
      }
      rafRef.current = window.requestAnimationFrame(frame);
    };

    rafRef.current = window.requestAnimationFrame(frame);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [active, analyser, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={active ? "Live audio waveform" : "Audio visualizer idle"}
      className={cn("h-16 w-full rounded-[var(--radius-md)]", className)}
    />
  );
}
