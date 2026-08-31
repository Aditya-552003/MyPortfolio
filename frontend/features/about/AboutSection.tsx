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
      className="relative z-10 w-full h-full min-h-screen flex flex-col justify-center bg-background text-foreground py-12 sm:py-16 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden select-none"
    >
      {/* LAYER 1: Subtle Decorative Background Typography */}
      <BackgroundTypography />

      {/* LAYER 2: Main Editorial Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Editorial Header + Typewriter Paragraph */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-6 sm:gap-8">
            {/* TOP EDITORIAL INTRO BAR WITH ANIMATED ROLE SWITCHER IN FRONT OF 'ABOUT ME' */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 w-full"
            >
              {/* ABOUT ME + ANIMATED ROLE SWITCHER IN FRONT */}
              <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary shrink-0">
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
            className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end w-full lg:translate-x-8 xl:translate-x-12"
          >
            <SandMorph />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
