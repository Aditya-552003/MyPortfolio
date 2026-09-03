"use client";

import React, { useState, useRef, useEffect } from "react";
import { LazyMotion, domAnimation, m, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/lib/hooks/useTheme";
import { Calendar, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ShowcaseItem {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
  tags?: readonly string[];
}

export interface ProjectShowcaseProps {
  title?: string;
  items?: ShowcaseItem[];
  className?: string;
  imageShape?: "rectangle" | "circle";
}

const defaultItems: ShowcaseItem[] = [
  {
    title: "Secured 1st Prize in Built with Framework Hackathon",
    description: "Built innovative full-stack application under tight time constraints.",
    year: "2025",
    link: "#",
    image: "/achivements/hackathon.jpg",
  },
  {
    title: "IBM Data Science Professional Certificate",
    description: "Mastered data analysis, python, machine learning models, and data visualization.",
    year: "2025",
    link: "#",
    image: "/achivements/Coursera.jpg",
  },
  {
    title: "Decode Python with DSA",
    description:
      "Completed comprehensive data structures, algorithms, and problem solving in Python.",
    year: "2025",
    link: "#",
    image: "/achivements/PW.png",
  },
  {
    title: "Machine Learning Certificate",
    description: "Hands-on machine learning algorithms, model evaluation, and deployment.",
    year: "2025",
    link: "#",
    image: "/achivements/tutedude.jpg",
  },
];

interface TimelineCardItemProps {
  item: ShowcaseItem;
  index?: number;
  isDark: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function TimelineCardItem({
  item,
  index: _index,
  isDark,
  onMouseEnter,
  onMouseLeave,
}: TimelineCardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this individual card through the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "end 15%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Continuous Scroll-Driven Animations (Incoming -> Active -> Outgoing)
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.25]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.95]);
  const cardY = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -30]);
  const nodeScale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.85, 1.25, 1.25, 0.85]);

  return (
    <div
      ref={cardRef}
      className="group relative cursor-default"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Anchored Milestone Node Circle (Fixed position on line) */}
      <m.div
        style={{ scale: nodeScale }}
        className={cn(
          "absolute top-6 -left-[32px] z-20 flex size-7 items-center justify-center rounded-full border-2 shadow-md transition-colors duration-300 group-hover:rotate-12 sm:-left-[48px]",
          isDark
            ? "border-[#EDE8D0] bg-[#222222] text-[#EDE8D0] group-hover:bg-[#EDE8D0] group-hover:text-[#181818]"
            : "border-[#181818] bg-[#F5F1E3] text-[#181818] group-hover:bg-[#181818] group-hover:text-[#EDE8D0]",
        )}
      >
        <Briefcase className="size-3.5" />
      </m.div>

      {/* Experience Card Tile (Animates vertically on scroll) */}
      <m.div
        style={{ opacity, scale, y: cardY }}
        className={cn(
          "group/card relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl sm:p-8",
          isDark
            ? "border-white/15 bg-[#222222] text-[#EDE8D0] shadow-[0_12px_35px_rgba(0,0,0,0.4)] hover:border-white/40"
            : "border-[#181818]/15 bg-[#F5F1E3] text-[#181818] shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-[#181818]/40",
        )}
      >
        {/* Top Accent Line */}
        <div
          className={cn(
            "absolute top-0 right-0 left-0 h-1.5 transition-colors duration-300",
            isDark ? "bg-[#EDE8D0]/40" : "bg-[#181818]/40",
          )}
        />

        {/* Hover Shine Sweep Effect */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-30 -translate-x-full transition-transform duration-1000 ease-in-out group-hover/card:translate-x-full",
            isDark
              ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
              : "bg-gradient-to-r from-transparent via-black/5 to-transparent",
          )}
        />

        {/* Header Row: Title & Date Badge */}
        <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <h3
            className={cn(
              "text-xl leading-snug font-extrabold tracking-tight transition-colors duration-300 sm:text-2xl",
              isDark ? "text-[#EDE8D0]" : "text-[#181818]",
            )}
          >
            {item.title}
          </h3>

          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border px-3.5 py-1 font-mono text-xs font-bold tabular-nums shadow-2xs transition-colors duration-300 sm:self-auto",
              isDark
                ? "border-[#EDE8D0]/25 bg-[#EDE8D0]/10 text-[#EDE8D0]"
                : "border-[#181818]/25 bg-[#181818]/10 text-[#181818]",
            )}
          >
            <Calendar className="size-3.5" />
            {item.year}
          </span>
        </div>

        {/* Description */}
        <p
          className={cn(
            "mb-5 max-w-3xl text-xs leading-relaxed opacity-90 transition-colors duration-300 sm:text-sm",
            isDark ? "text-[#EDE8D0]/85" : "text-[#181818]/85",
          )}
        >
          {item.description}
        </p>

        {/* Skills / Tech Stack Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-current/10 pt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "inline-flex items-center rounded-full border px-3.5 py-1 text-[10px] font-bold shadow-2xs transition-all duration-300 hover:scale-105 sm:text-xs",
                  isDark
                    ? "border-[#EDE8D0]/25 bg-[#EDE8D0]/10 text-[#EDE8D0] hover:bg-[#EDE8D0]/20"
                    : "border-[#181818]/25 bg-[#181818]/10 text-[#181818] hover:bg-[#181818]/20",
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </m.div>
    </div>
  );
}

export function ProjectShowcase({
  title = "",
  items = defaultItems,
  className = "",
  imageShape = "circle",
}: ProjectShowcaseProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const showcaseItems = items && items.length > 0 ? items : defaultItems;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [containerRect, setContainerRect] = useState({ left: 0, top: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Smooth Scroll Progress for Vertical Progress Line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const progressPercent = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerRect({ left: rect.left, top: rect.top });
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`relative w-full px-0 ${title ? "py-4" : "py-0"} ${className}`}
      >
        {title && (
          <h2 className="text-muted-foreground mb-8 text-xs font-bold tracking-[0.25em] uppercase">
            {title}
          </h2>
        )}

        {/* Floating Mouse Cursor Image Preview */}
        <div
          className={`pointer-events-none fixed z-50 overflow-hidden ${
            imageShape === "circle" ? "rounded-full" : "rounded-xl shadow-2xl"
          }`}
          style={{
            left: containerRect.left,
            top: containerRect.top,
            transform: `translate3d(${smoothPosition.x + 20}px, ${
              smoothPosition.y - (imageShape === "circle" ? 50 : 100)
            }px, 0)`,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            transition:
              "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            className={`relative flex items-center justify-center overflow-hidden transition-all duration-300 ${
              imageShape === "circle"
                ? "border-border bg-background h-20 w-20 rounded-full border-2 shadow-xl sm:h-24 sm:w-24"
                : "border-border/50 bg-secondary h-[180px] w-[280px] rounded-xl border shadow-xl sm:h-[200px] sm:w-[320px]"
            }`}
          >
            {showcaseItems.map((item, index) => (
              <img
                key={item.title}
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className={`absolute inset-0 h-full w-full transition-all duration-300 ease-out ${
                  imageShape === "circle" ? "rounded-full object-cover" : "object-cover"
                }`}
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 1.05,
                }}
              />
            ))}
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-9 sm:pl-14">
          {/* Unified Vertical Progress Bar Track Container */}
          <div className="pointer-events-none absolute top-6 bottom-6 left-[15px] z-10 w-1.5 sm:left-[19px]">
            {/* Base Guide Line Track */}
            <div className="bg-border/40 dark:bg-border/30 border-border/20 absolute inset-0 w-full rounded-full border" />

            {/* Scroll-Synced Animated Progress Fill Line */}
            <m.div
              style={{ scaleY, transformOrigin: "top" }}
              className={cn(
                "absolute inset-0 w-full rounded-full transition-all duration-75",
                isDark
                  ? "bg-gradient-to-b from-[#EDE8D0] via-[#F5F1E3] to-[#EDE8D0] shadow-[0_0_14px_rgba(237,232,208,0.5)]"
                  : "bg-gradient-to-b from-[#181818] via-[#333333] to-[#181818] shadow-[0_0_14px_rgba(24,24,24,0.4)]",
              )}
            />

            {/* Glowing Laser Head Tip Indicator - 100% LOCKED TO PROGRESS FILL TIP */}
            <m.div
              style={{ top: progressPercent }}
              className={cn(
                "absolute left-1/2 z-20 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-transform duration-75",
                isDark
                  ? "border-[#181818] bg-[#EDE8D0] shadow-[0_0_16px_4px_rgba(237,232,208,0.9)]"
                  : "border-[#EDE8D0] bg-[#181818] shadow-[0_0_16px_4px_rgba(24,24,24,0.75)]",
              )}
            />
          </div>

          {/* Timeline Experience Cards with Scroll-Linked Incoming/Outgoing Animations */}
          <div className="space-y-10">
            {showcaseItems.map((item, index) => (
              <TimelineCardItem
                key={item.title}
                item={item}
                index={index}
                isDark={isDark}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

export default ProjectShowcase;
