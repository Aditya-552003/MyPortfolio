"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface RoleItem {
  role: string;
  descriptor: string;
}

const DEFAULT_ROLE: RoleItem = {
  role: "AI/ML Engineer",
  descriptor: "ARTIFICIAL INTELLIGENCE",
};

const ROLES: RoleItem[] = [
  DEFAULT_ROLE,
  { role: "Creative Developer", descriptor: "CREATIVE TECHNOLOGY" },
  { role: "Freelancer", descriptor: "INDEPENDENT" },
  { role: "SharePoint Developer", descriptor: "ENTERPRISE" },
  { role: "Generative AI", descriptor: "INTELLIGENT SYSTEMS" },
];

export function RoleSwitcher(): ReactNode {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const currentRole: RoleItem = ROLES[index] ?? DEFAULT_ROLE;

  return (
    <div className="flex items-center gap-3 sm:gap-4 select-none">
      {/* 15. Thin Horizontal Line */}
      <div className="h-[1px] w-10 sm:w-16 md:w-20 bg-border/70 shrink-0" aria-hidden="true" />

      {/* 11 & 14. Animated Role + Secondary Descriptor */}
      <div className="relative flex items-center gap-2 sm:gap-3 overflow-hidden py-1 min-h-[32px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRole.role}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-2 sm:gap-3"
          >
            {/* Primary Changing Role */}
            <span className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-foreground whitespace-nowrap">
              {currentRole.role}
            </span>

            {/* 13. Slow Blinking Indicator Cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary font-normal text-sm sm:text-base inline-block -ml-1"
              aria-hidden="true"
            >
              |
            </motion.span>

            {/* Bullet Separator */}
            <span className="text-muted-foreground/40 text-xs sm:text-sm select-none">·</span>

            {/* 14. Secondary Role Descriptor */}
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-muted whitespace-nowrap opacity-75">
              {currentRole.descriptor}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
