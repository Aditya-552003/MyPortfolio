"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";

interface LogoConfig {
  name: string;
  src: string;
}

const LOGOS: LogoConfig[] = [
  { name: "PYTHON", src: "/logo/python.svg" },
  { name: "SHAREPOINT", src: "/logo/icons8-microsoft-sharepoint-2025-500.svg" },
  { name: "REACT", src: "/logo/react.svg" },
  { name: "HUGGING FACE", src: "/logo/huggingface-sandmorph.svg" },
  { name: "PYTORCH", src: "/logo/pytorch.svg" },
  { name: "TENSORFLOW", src: "/logo/icons8-tensorflow.svg" },
  { name: "GITHUB", src: "/logo/github.svg" },
];

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  baseOpacity: number;
  speed: number;
  noiseSeed: number;
}

export function SandMorph(): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Animation Refs
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const logoPointsRef = useRef<Record<string, Point[]>>({});
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });
  const animStateRef = useRef({
    logoIndex: 0,
    phase: "form" as "form" | "hold" | "dissolve",
    phaseTimer: 0,
    lastTime: performance.now(),
  });

  // Pre-extract target points from SVG images
  const preloadLogos = useCallback(async () => {
    const pointsMap: Record<string, Point[]> = {};

    const loadPromises = LOGOS.map(
      (logo) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = logo.src;
          img.onload = () => {
            const size = 160;
            const offscreen = document.createElement("canvas");
            offscreen.width = size;
            offscreen.height = size;
            const ctx = offscreen.getContext("2d");

            if (!ctx) {
              resolve();
              return;
            }

            ctx.clearRect(0, 0, size, size);
            // Draw logo centered with padding
            ctx.drawImage(img, 12, 12, size - 24, size - 24);
            const imageData = ctx.getImageData(0, 0, size, size);
            const data = imageData.data;
            const rawPoints: Point[] = [];

            // Grid sampling for visible pixels
            const step = 2;
            for (let y = 0; y < size; y += step) {
              for (let x = 0; x < size; x += step) {
                const idx = (y * size + x) * 4;
                const alpha = data[idx + 3] ?? 0;

                // Threshold visible pixels
                if (alpha > 45) {
                  // Normalize coordinates centered at (0,0) from -1 to 1
                  const nx = (x - size / 2) / (size / 2 - 12);
                  const ny = (y - size / 2) / (size / 2 - 12);
                  rawPoints.push({ x: nx, y: ny });
                }
              }
            }

            // Shuffle target points for organic particle distribution
            for (let i = rawPoints.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = rawPoints[i];
              if (temp && rawPoints[j]) {
                rawPoints[i] = rawPoints[j];
                rawPoints[j] = temp;
              }
            }

            pointsMap[logo.name] = rawPoints;
            resolve();
          };
          img.onerror = () => {
            resolve();
          };
        })
    );

    await Promise.all(loadPromises);
    logoPointsRef.current = pointsMap;
  }, []);

  useEffect(() => {
    let isCancelled = false;

    preloadLogos().then(() => {
      if (isCancelled) return;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Determine responsive particle count
      const width = container.clientWidth || 360;
      const particleCount = width > 640 ? 7000 : 3000;

      // Initialize Particles
      const particles: Particle[] = [];
      const firstLogoName = LOGOS[0]?.name ?? "PYTHON";
      const initialPoints = logoPointsRef.current[firstLogoName] ?? [];

      for (let i = 0; i < particleCount; i++) {
        // Random initial scattered position inside canvas
        const rx = (Math.random() - 0.5) * 2;
        const ry = (Math.random() - 0.5) * 2;
        const pt = initialPoints.length > 0 ? initialPoints[i % initialPoints.length] : { x: rx, y: ry };

        particles.push({
          x: rx,
          y: ry,
          vx: (Math.random() - 0.5) * 0.01,
          vy: (Math.random() - 0.5) * 0.01,
          targetX: pt?.x ?? rx,
          targetY: pt?.y ?? ry,
          size: Math.random() * 0.9 + 0.7, // Fine sand grain (0.7px to 1.6px)
          baseOpacity: Math.random() * 0.45 + 0.45,
          speed: Math.random() * 0.4 + 0.8,
          noiseSeed: Math.random() * 1000,
        });
      }

      particlesRef.current = particles;

      // Animation Loop
      const render = (time: number) => {
        const delta = Math.min((time - animStateRef.current.lastTime) / 1000, 0.1);
        animStateRef.current.lastTime = time;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = container.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
          canvas.width = w * dpr;
          canvas.height = h * dpr;
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, w, h);

        const centerX = w / 2;
        const centerY = h / 2;
        const logoScale = Math.min(w, h) * 0.38; // Scaled logo boundary

        // Dynamic theme color resolution
        const computedStyle = getComputedStyle(canvas);
        const fgColor = computedStyle.getPropertyValue("--color-foreground") || "#EDE8D0";

        // State Machine Timings
        if (!shouldReduceMotion) {
          animStateRef.current.phaseTimer += delta;

          const { phase, phaseTimer, logoIndex } = animStateRef.current;

          // PHASE 1: FORM (1.6s)
          if (phase === "form" && phaseTimer > 1.6) {
            animStateRef.current.phase = "hold";
            animStateRef.current.phaseTimer = 0;
          }
          // PHASE 2: HOLD (2.4s)
          else if (phase === "hold" && phaseTimer > 2.4) {
            animStateRef.current.phase = "dissolve";
            animStateRef.current.phaseTimer = 0;

            // Transition to Next Logo targets during dissolve!
            const nextIndex = (logoIndex + 1) % LOGOS.length;
            animStateRef.current.logoIndex = nextIndex;
            const nextLogoName = LOGOS[nextIndex]?.name ?? "PYTHON";
            const nextPoints = logoPointsRef.current[nextLogoName] ?? [];

            // Re-assign particle target coordinates
            const currentParticles = particlesRef.current;
            for (let i = 0; i < currentParticles.length; i++) {
              const p = currentParticles[i];
              if (!p) continue;
              const npt = nextPoints.length > 0 ? nextPoints[i % nextPoints.length] : { x: p.x, y: p.y };
              if (npt) {
                p.targetX = npt.x;
                p.targetY = npt.y;
              }
            }
          }
          // PHASE 3: DISSOLVE (1.8s) -> back to FORM
          else if (phase === "dissolve" && phaseTimer > 1.8) {
            animStateRef.current.phase = "form";
            animStateRef.current.phaseTimer = 0;
          }
        }

        const currentPhase = animStateRef.current.phase;
        const mouse = mouseRef.current;

        // Particle Physics Update & Render
        const currentParticles = particlesRef.current;
        for (let i = 0; i < currentParticles.length; i++) {
          const p = currentParticles[i];
          if (!p) continue;

          // Convert normalized target coordinates to canvas pixel space
          const tx = centerX + p.targetX * logoScale;
          const ty = centerY + p.targetY * logoScale;
          const px = centerX + p.x * logoScale;
          const py = centerY + p.y * logoScale;

          let spring = 0.07 * p.speed;
          let friction = 0.84;
          let noise = 0.25;

          // Adjust physics based on morphing phase
          if (currentPhase === "dissolve") {
            spring = 0.012; // Weak attraction during dissolve
            friction = 0.92;
            noise = 0.85; // Organic sand turbulence
            p.vy += 0.008 * delta; // Micro sand gravity
          } else if (currentPhase === "hold") {
            spring = 0.1 * p.speed;
            noise = 0.15; // Micro-jiggle
          }

          // Attraction force
          const dx = tx - px;
          const dy = ty - py;

          p.vx = p.vx * friction + (dx * spring + (Math.random() - 0.5) * noise) * 0.05;
          p.vy = p.vy * friction + (dy * spring + (Math.random() - 0.5) * noise) * 0.05;

          // Mouse Repulsion
          if (mouse.active) {
            const mdx = px - mouse.x;
            const mdy = py - mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            const maxRadius = 75;

            if (mdist < maxRadius && mdist > 0) {
              const force = (1 - mdist / maxRadius) * 2.2;
              p.vx += (mdx / mdist) * force * 0.1;
              p.vy += (mdy / mdist) * force * 0.1;
            }
          }

          // Update position
          p.x += (p.vx * delta * 60) / logoScale;
          p.y += (p.vy * delta * 60) / logoScale;

          // Render Particle
          const drawX = centerX + p.x * logoScale;
          const drawY = centerY + p.y * logoScale;

          // Micro flickering for granular sand look
          const flicker = 0.85 + Math.sin(time * 0.005 + p.noiseSeed) * 0.15;
          ctx.fillStyle = fgColor;
          ctx.globalAlpha = Math.max(0.1, Math.min(1, p.baseOpacity * flicker));

          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        animationFrameRef.current = requestAnimationFrame(render);
      };

      animationFrameRef.current = requestAnimationFrame(render);
    });

    return () => {
      isCancelled = true;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [preloadLogos, shouldReduceMotion]);

  // Pointer interaction handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current = { x: -9999, y: -9999, active: false };
  };

  return (
    <div className="flex flex-col items-center justify-center lg:items-end w-full max-w-md mx-auto lg:mr-0 lg:ml-auto select-none py-2">
      {/* CANVAS CONTAINER */}
      <div
        ref={containerRef}
        className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] flex items-center justify-center cursor-pointer"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="w-full h-full touch-none"
        />
      </div>
    </div>
  );
}
