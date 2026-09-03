"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollLinkedCardsProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A scroll-linked animation component for project cards.
 * Tying card translation directly to the user's viewport scroll progress.
 * As the user scrolls down into view, cards smoothly slide in from the left at a slow, fluid pace.
 */
export function ScrollLinkedCards({ children, className }: ScrollLinkedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "center 50%"],
  });

  // Add smooth spring physics for a slow, silky luxury scroll feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 22,
    restDelta: 0.001,
  });

  // Map scroll progress to horizontal translation (-180px -> 0px)
  const x = useTransform(smoothProgress, [0, 1], [-180, 0]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
}
