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
    <div className="flex items-center gap-3 select-none sm:gap-4">
      {/* 15. Thin Horizontal Line */}
      <div className="bg-border/70 h-[1px] w-10 shrink-0 sm:w-16 md:w-20" aria-hidden="true" />

      {/* 11 & 14. Animated Role + Secondary Descriptor */}
      <div className="relative flex min-h-[32px] items-center gap-2 overflow-hidden py-1 sm:gap-3">
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
            <span className="text-foreground text-sm font-semibold tracking-tight whitespace-nowrap sm:text-base md:text-lg">
              {currentRole.role}
            </span>

            {/* 13. Slow Blinking Indicator Cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary -ml-1 inline-block text-sm font-normal sm:text-base"
              aria-hidden="true"
            >
              |
            </motion.span>

            {/* Bullet Separator */}
            <span className="text-muted-foreground/40 text-xs select-none sm:text-sm">·</span>

            {/* 14. Secondary Role Descriptor */}
            <span className="text-muted font-mono text-[10px] tracking-[0.2em] whitespace-nowrap uppercase opacity-75 sm:text-xs">
              {currentRole.descriptor}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
