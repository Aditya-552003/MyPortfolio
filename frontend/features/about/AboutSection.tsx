"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { BackgroundTypography } from "./BackgroundTypography";
import { RoleSwitcher } from "./RoleSwitcher";
import { SandMorph } from "./SandMorph";
import { TypewriterParagraph } from "./TypewriterParagraph";

export function AboutSection(): ReactNode {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="About Aditya"
      className="bg-background text-foreground relative z-10 flex h-full min-h-screen w-full flex-col justify-center overflow-hidden px-6 py-12 select-none sm:px-12 sm:py-16 md:px-16 lg:px-24"
    >
      {/* LAYER 1: Subtle Decorative Background Typography */}
      <BackgroundTypography />

      {/* LAYER 2: Main Editorial Layout */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT COLUMN: Editorial Header + Typewriter Paragraph */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-7 xl:col-span-7">
            {/* TOP EDITORIAL INTRO BAR WITH ANIMATED ROLE SWITCHER IN FRONT OF 'ABOUT ME' */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-wrap items-center justify-between gap-4 sm:gap-6"
            >
              {/* ABOUT ME + ANIMATED ROLE SWITCHER IN FRONT */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                <span className="text-primary shrink-0 text-[11px] font-bold tracking-[0.25em] uppercase sm:text-xs">
                  ABOUT ME
                </span>
                <RoleSwitcher />
              </div>
            </motion.div>

            {/* TYPEWRITER ANIMATED ABOUT PARAGRAPH WITH KEYWORD HIGHLIGHTING */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1 sm:pt-2"
            >
              <TypewriterParagraph />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Sand Particle Technology Logo Morphing Canvas */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full items-center justify-center lg:col-span-5 lg:translate-x-8 lg:justify-end xl:col-span-5 xl:translate-x-12"
          >
            <SandMorph />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
