"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { AboutSection } from "@/features/about";
import { Hero } from "./Hero";

export function HeroAboutTransition(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Stage 1: Traits, labels & arrows fade out fast (0.00 -> 0.18)
  const traitsOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const traitsY = useTransform(scrollYProgress, [0, 0.18], [0, -40]);

  // Stage 2: Portrait cutout fades out completely before zoom begins (0.05 -> 0.22)
  const portraitOpacity = useTransform(scrollYProgress, [0.05, 0.22], [1, 0]);

  // Stage 3: Camera zooms INTO THE COUNTER / HOLE OF LETTER "D" IN "ADITYA"
  // Transform origin: 33.5% 49% hits the inner space / counter of letter "D" in "ADITYA"
  const cameraScale = useTransform(scrollYProgress, [0.15, 0.75], [1, 65]);

  // Stage 4: Portal reveal of About Section emerging from inside the expanded counter (0.35 -> 0.78)
  const clipProgress = useTransform(scrollYProgress, [0.35, 0.78], [0, 160]);

  return (
    <div ref={containerRef} className="relative w-full h-[280vh]">
      {/* Sticky viewport camera container pinning frame 0 instantly */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[var(--background)]">
        {/* Layer 1: Hero Section with camera zoom target centered on 'D' counter */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            scale: cameraScale,
            transformOrigin: "33.5% 49%",
          }}
        >
          <Hero
            traitsOpacity={traitsOpacity}
            traitsY={traitsY}
            portraitOpacity={portraitOpacity}
          />
        </motion.div>

        {/* Layer 2: About Section emerging from inside the expanded counter of letter 'D' */}
        <motion.div
          className="absolute inset-0 w-full h-full z-20 pointer-events-auto bg-[var(--background)] overflow-y-auto"
          style={{
            clipPath: useTransform(
              clipProgress,
              (v) => `circle(${v}% at 33.5% 49%)`
            ),
          }}
        >
          <AboutSection />
        </motion.div>
      </div>
    </div>
  );
}
