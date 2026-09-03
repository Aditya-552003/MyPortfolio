"use client";

import React, { useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useTheme } from "@/lib/hooks/useTheme";

const ease = [0.16, 1, 0.3, 1] as const;

// Define the type for individual logo props
export interface Logo {
  src: string;
  alt: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
  invertOnDark?: boolean;
}

// Define the props for the main component
export interface MarqueeLogoScrollerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  logos: Logo[];
  speed?: "normal" | "slow" | "fast";
  defaultOpen?: boolean;
}

/**
 * A responsive, self-contained, and infinitely scrolling marquee component.
 * Clicking the header seamlessly morphs the marquee into a static brick wall grid using hardware-accelerated CSS Grid transitions.
 */
const MarqueeLogoScroller = React.forwardRef<
  HTMLDivElement,
  MarqueeLogoScrollerProps
>(
  (
    {
      title,
      description,
      logos,
      speed = "normal",
      defaultOpen = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Map speed prop to animation duration
    const durationMap = {
      normal: "40s",
      slow: "80s",
      fast: "15s",
    };
    const animationDuration = durationMap[speed];

    return (
      <>
        {/* The @keyframes for the marquee animation */}
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn(
            "w-full bg-background text-foreground rounded-xl border border-border/80 overflow-hidden shadow-xs transition-all duration-300",
            className
          )}
          {...props}
        >
          {/* Header Section (Clickable toggle) */}
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-4 md:p-5 lg:p-6 cursor-pointer select-none group/header transition-colors duration-200"
            role="button"
            aria-expanded={isOpen}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
              }
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr_auto] gap-3 lg:gap-6 pb-3 md:pb-4 border-b border-border/60 items-center">
              <div className="flex items-center gap-3">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-balance group-hover/header:text-primary transition-colors">
                  {title}
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-background text-foreground border border-border/80 shadow-xs">
                  <Layers className="size-3 text-primary" />
                  {logos.length} skills
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground self-start lg:justify-self-end text-balance">
                {description}
              </p>
              <div className="hidden lg:flex items-center justify-end pl-2">
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <ChevronDown className="size-4 text-primary" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Marquee Section (Smoothly collapses via hardware-accelerated CSS Grid) */}
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full overflow-hidden",
              isOpen
                ? "grid-rows-[0fr] opacity-0 pointer-events-none"
                : "grid-rows-[1fr] opacity-100"
            )}
            style={{
              maskImage: isOpen
                ? "none"
                : "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className="flex w-max items-center gap-3 py-3 pr-3 hover:[animation-play-state:paused] transition-all duration-300 ease-in-out"
                style={{
                  animation: `marquee ${animationDuration} linear infinite`,
                  animationPlayState: isOpen ? "paused" : "running",
                }}
              >
                {/* Render logos twice to create a seamless loop */}
                {[...logos, ...logos].map((logo, index) => (
                  <div
                    key={index}
                    title={logo.alt}
                    className="group relative h-16 w-36 shrink-0 flex flex-col items-center justify-center rounded-lg bg-background border border-border/70 hover:border-primary/40 overflow-hidden p-2 cursor-pointer shadow-xs hover:shadow-sm"
                  >
                    {/* Gradient background revealed on hover (Lighter pastel tint) */}
                    <div
                      style={
                        {
                          "--from": logo.gradient.from,
                          "--via": logo.gradient.via,
                          "--to": logo.gradient.to,
                        } as React.CSSProperties
                      }
                      className="absolute inset-0 scale-150 opacity-0 transition-all duration-500 ease-out group-hover:opacity-30 group-hover:scale-100 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)]"
                    />
                    {/* Logo Image */}
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={cn(
                        "relative h-7 w-auto object-contain transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-105 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]",
                        logo.invertOnDark && isDark && "brightness-0 invert"
                      )}
                    />
                    {/* Full Name revealed on hover */}
                    <span className="absolute bottom-1 text-[11px] font-bold text-foreground tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1.5 group-hover:translate-y-0 text-center px-1.5 truncate max-w-full">
                      {logo.alt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Brick Wall Grid Dropdown (Smoothly expands via hardware-accelerated CSS Grid) */}
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full overflow-hidden bg-background",
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0 pointer-events-none"
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="p-4 md:p-5 lg:p-6 pt-1 md:pt-1 lg:pt-1">
                {/* Brick Wall Layout */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {logos.map((logo) => (
                    <div
                      key={logo.alt}
                      title={logo.alt}
                      className="group relative flex items-center gap-2.5 h-11 px-4 rounded-lg bg-background border border-border/80 hover:border-primary/50 overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 text-foreground"
                    >
                      {/* Gradient background revealed on hover (Lighter pastel tint) */}
                      <div
                        style={
                          {
                            "--from": logo.gradient.from,
                            "--via": logo.gradient.via,
                            "--to": logo.gradient.to,
                          } as React.CSSProperties
                        }
                        className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300 bg-gradient-to-r from-[var(--from)] via-[var(--via)] to-[var(--to)]"
                      />
                      {/* Brick Logo */}
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={cn(
                          "relative z-10 h-5 w-auto object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110",
                          logo.invertOnDark && isDark && "brightness-0 invert"
                        )}
                      />
                      {/* Brick Title */}
                      <span className="relative z-10 text-xs sm:text-sm font-semibold text-foreground transition-colors duration-200">
                        {logo.alt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
);

MarqueeLogoScroller.displayName = "MarqueeLogoScroller";

export { MarqueeLogoScroller };
