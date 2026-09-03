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
export interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
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
const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  (
    { title, description, logos, speed = "normal", defaultOpen = false, className, ...props },
    ref,
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
            "bg-background text-foreground border-border/80 w-full overflow-hidden rounded-xl border shadow-xs transition-all duration-300",
            className,
          )}
          {...props}
        >
          {/* Header Section (Clickable toggle) */}
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="group/header cursor-pointer p-4 transition-colors duration-200 select-none md:p-5 lg:p-6"
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
            <div className="border-border/60 grid grid-cols-1 items-center gap-3 border-b pb-3 md:pb-4 lg:grid-cols-[3fr_2fr_auto] lg:gap-6">
              <div className="flex items-center gap-3">
                <h2 className="group-hover/header:text-primary text-xl font-semibold tracking-tight text-balance transition-colors md:text-2xl">
                  {title}
                </h2>
                <span className="bg-background text-foreground border-border/80 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium shadow-xs">
                  <Layers className="text-primary size-3" />
                  {logos.length} skills
                </span>
              </div>
              <p className="text-muted-foreground self-start text-xs text-balance md:text-sm lg:justify-self-end">
                {description}
              </p>
              <div className="hidden items-center justify-end pl-2 lg:flex">
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <ChevronDown className="text-primary size-4" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Marquee Section (Smoothly collapses via hardware-accelerated CSS Grid) */}
          <div
            className={cn(
              "grid w-full overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isOpen
                ? "pointer-events-none grid-rows-[0fr] opacity-0"
                : "grid-rows-[1fr] opacity-100",
            )}
            style={{
              maskImage: isOpen
                ? "none"
                : "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className="flex w-max items-center gap-3 py-3 pr-3 transition-all duration-300 ease-in-out hover:[animation-play-state:paused]"
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
                    className="group bg-background border-border/70 hover:border-primary/40 relative flex h-16 w-36 shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border p-2 shadow-xs hover:shadow-sm"
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
                      className="absolute inset-0 scale-150 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)] opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-30"
                    />
                    {/* Logo Image */}
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={cn(
                        "relative h-7 w-auto object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-105",
                        logo.invertOnDark && isDark && "brightness-0 invert",
                      )}
                    />
                    {/* Full Name revealed on hover */}
                    <span className="text-foreground absolute bottom-1 max-w-full translate-y-1.5 truncate px-1.5 text-center text-[11px] font-bold tracking-wide opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
              "bg-background grid w-full overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "pointer-events-none grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="p-4 pt-1 md:p-5 md:pt-1 lg:p-6 lg:pt-1">
                {/* Brick Wall Layout */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {logos.map((logo) => (
                    <div
                      key={logo.alt}
                      title={logo.alt}
                      className="group bg-background border-border/80 hover:border-primary/50 text-foreground relative flex h-11 cursor-pointer items-center gap-2.5 overflow-hidden rounded-lg border px-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
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
                        className="absolute inset-0 bg-gradient-to-r from-[var(--from)] via-[var(--via)] to-[var(--to)] opacity-0 transition-opacity duration-300 group-hover:opacity-25"
                      />
                      {/* Brick Logo */}
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={cn(
                          "relative z-10 h-5 w-auto object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110",
                          logo.invertOnDark && isDark && "brightness-0 invert",
                        )}
                      />
                      {/* Brick Title */}
                      <span className="text-foreground relative z-10 text-xs font-semibold transition-colors duration-200 sm:text-sm">
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
  },
);

MarqueeLogoScroller.displayName = "MarqueeLogoScroller";

export { MarqueeLogoScroller };
