"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { useRef } from "react";

const serifFont = Playfair_Display({
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export function BackgroundTypography(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top-Left Watermark Typography */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y1 }}
        className={`${serifFont.className} text-foreground/[0.035] dark:text-foreground/[0.045] absolute top-6 left-4 text-[12vw] leading-none font-black tracking-tighter sm:top-8 sm:left-6 sm:text-[14vw] md:text-[15vw]`}
      >
        AI
      </motion.div>

      {/* Bottom-Right Watermark Typography */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y2 }}
        className={`${serifFont.className} text-foreground/[0.025] dark:text-foreground/[0.035] absolute -right-4 -bottom-6 text-[10vw] leading-none font-black tracking-tighter sm:text-[12vw] md:text-[14vw]`}
      >
        CREATE
      </motion.div>
    </div>
  );
}
