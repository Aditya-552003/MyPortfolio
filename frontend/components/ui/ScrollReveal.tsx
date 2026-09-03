"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
}

/**
 * A reusable scroll-triggered reveal animation wrapper.
 * Smoothly animates elements into view as the user scrolls down the page.
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 35,
  duration = 0.7,
  className,
  ...props
}: ScrollRevealProps) {
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
