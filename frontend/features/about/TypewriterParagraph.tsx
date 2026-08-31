"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface Part {
  text: string;
  highlight?: boolean;
}

const PARAGRAPH_PARTS: Part[] = [
  { text: "I’m an " },
  { text: "AI/ML", highlight: true },
  { text: " Engineer and Creative Developer passionate about building intelligent, scalable, and real-world solutions. My experience spans " },
  { text: "AI/ML", highlight: true },
  { text: ", " },
  { text: "NLP", highlight: true },
  { text: ", " },
  { text: "Generative AI", highlight: true },
  { text: ", " },
  { text: "RAG", highlight: true },
  { text: ", " },
  { text: "Python", highlight: true },
  { text: ", and enterprise development, including custom " },
  { text: "SharePoint", highlight: true },
  { text: " platforms, " },
  { text: "Azure", highlight: true },
  { text: "-integrated solutions, document management systems, and workflow-driven portals. I enjoy turning complex ideas into practical applications while continuously exploring emerging technologies." },
];

const TOTAL_CHARS = PARAGRAPH_PARTS.reduce((sum, p) => sum + p.text.length, 0);

export function TypewriterParagraph(): ReactNode {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCharIndex(TOTAL_CHARS);
      return;
    }

    if (!isInView) return;

    // Typing interval (~14ms per character for ultra-fluid typing)
    const interval = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= TOTAL_CHARS) {
          clearInterval(interval);
          return TOTAL_CHARS;
        }
        return prev + 1;
      });
    }, 14);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  // Render typed characters up to charIndex with keyword highlights
  let currentCount = 0;
  const renderedElements: ReactNode[] = [];

  for (let i = 0; i < PARAGRAPH_PARTS.length; i++) {
    const part = PARAGRAPH_PARTS[i];
    if (!part) continue;

    if (currentCount >= charIndex) break;

    const remaining = charIndex - currentCount;
    const slice = part.text.slice(0, remaining);
    currentCount += part.text.length;

    if (part.highlight) {
      renderedElements.push(
        <span key={i} className="text-foreground font-semibold border-b border-primary/40">
          {slice}
        </span>
      );
    } else {
      renderedElements.push(<span key={i}>{slice}</span>);
    }
  }

  const isTypingDone = charIndex >= TOTAL_CHARS;

  return (
    <p
      ref={containerRef}
      className="text-base sm:text-base md:text-lg lg:text-[1.1rem] text-foreground/85 leading-relaxed sm:leading-relaxed max-w-3xl font-normal min-h-[110px]"
    >
      {renderedElements}
      {!isTypingDone && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block text-primary font-semibold ml-0.5 select-none"
          aria-hidden="true"
        >
          |
        </motion.span>
      )}
    </p>
  );
}
