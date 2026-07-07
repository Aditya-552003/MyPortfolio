"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const COLORS = ["--primary", "--secondary", "--accent"] as const;
const PARTICLE_DENSITY = 1 / 16000; // particles per pixel of canvas area
const MAX_PARTICLES = 70;

function createParticles(width: number, height: number, colors: readonly string[]): Particle[] {
  const count = Math.min(MAX_PARTICLES, Math.round(width * height * PARTICLE_DENSITY));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    radius: Math.random() * 1.5 + 0.5,
    color: colors[Math.floor(Math.random() * colors.length)] ?? "#ffffff",
  }));
}

/** Subtle, low-amplitude floating particle canvas behind the hero (PRD §18). */
export function ParticleField(): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const style = getComputedStyle(document.documentElement);
    const resolvedColors = COLORS.map((token) => style.getPropertyValue(token).trim() || "#ffffff");

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let isVisible = true;

    function resize(): void {
      if (!canvas || !container) return;
      const dpr = window.devicePixelRatio || 1;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.scale(dpr, dpr);
      particles = createParticles(width, height, resolvedColors);
    }

    function step(): void {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.35;
        ctx.fill();
      }
      if (isVisible) animationFrame = requestAnimationFrame(step);
    }

    function handleVisibilityChange(): void {
      isVisible = document.visibilityState === "visible";
      if (isVisible) animationFrame = requestAnimationFrame(step);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    animationFrame = requestAnimationFrame(step);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 -z-10" />;
}
