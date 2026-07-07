"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "./useReducedMotion";

export interface ScrollRevealOptions {
  /** Fraction of the element that must intersect before it reveals. */
  threshold?: number;
  /** Extends/shrinks the root's bounding box, in IntersectionObserver syntax. */
  rootMargin?: string;
}

export interface ScrollReveal<T extends HTMLElement> {
  ref: (node: T | null) => void;
  isVisible: boolean;
}

/**
 * Reveals an element (fade + translate, applied by the consumer) the first
 * time it scrolls into view. Honors `prefers-reduced-motion` by skipping the
 * observer entirely and reporting the final state immediately (PRD §18).
 */
export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: ScrollRevealOptions = {}): ScrollReveal<T> {
  const prefersReducedMotion = useReducedMotion();
  const [hasIntersected, setHasIntersected] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef = (node: T | null): void => {
    observerRef.current?.disconnect();

    if (!node || prefersReducedMotion) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasIntersected(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observerRef.current.observe(node);
  };

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return { ref: setRef, isVisible: hasIntersected || prefersReducedMotion };
}
