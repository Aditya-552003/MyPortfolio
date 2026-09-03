"use client";

import React, { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useTheme } from "@/lib/hooks/useTheme";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Trophy, Award, Code2, Brain, Calendar, Building2, Sparkles } from "lucide-react";

export interface Step {
  title: string;
  description: string;
  badge?: string;
  issuer?: string;
  image?: string;
  date?: string;
  colorTheme?: "pink" | "blue" | "green" | "purple" | "yellow" | "orange";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

interface CardProps {
  number: string;
  title: string;
  description: string;
  badge?: string;
  issuer?: string;
  image?: string;
  date?: string;
  colorTheme?: "pink" | "blue" | "green" | "purple" | "yellow" | "orange";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const getBadgeIcon = (colorTheme?: string, isDark?: boolean) => {
  const iconColorClass = isDark ? "text-[#181818]" : "text-[#EDE8D0]";
  switch (colorTheme) {
    case "pink":
      return <Trophy className={`h-3.5 w-3.5 ${iconColorClass}`} />;
    case "blue":
      return <Award className={`h-3.5 w-3.5 ${iconColorClass}`} />;
    case "green":
      return <Code2 className={`h-3.5 w-3.5 ${iconColorClass}`} />;
    case "purple":
      return <Brain className={`h-3.5 w-3.5 ${iconColorClass}`} />;
    default:
      return <Sparkles className={`h-3.5 w-3.5 ${iconColorClass}`} />;
  }
};

const Card = ({
  number,
  title,
  description,
  badge,
  issuer,
  image,
  date,
  colorTheme = "blue",
  className,
  rotate,
}: CardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`group relative w-full transition-all duration-500 hover:z-40 hover:scale-105 md:w-[310px] ${rotate || ""} ${className || ""}`}
    >
      {/* Outer Card Sticky Frame - Strictly Theme Matched */}
      <div
        className={`relative overflow-hidden rounded-[28px] border p-2.5 transition-all duration-500 ${
          isDark
            ? "border-[#181818]/30 bg-[#EDE8D0] shadow-[0px_14px_30px_rgba(0,0,0,0.45)]"
            : "border-[#EDE8D0]/30 bg-[#181818] shadow-[0px_14px_30px_rgba(0,0,0,0.25)]"
        }`}
      >
        {/* Pin Header - Strict Theme Matched */}
        <div className="relative z-20 mb-2 flex justify-center">
          <Pin
            className={`h-7 w-7 drop-shadow-xs transition-all duration-300 group-hover:scale-110 ${
              isDark ? "text-[#181818]" : "text-[#EDE8D0]"
            }`}
          />
        </div>

        {/* Inner Card Container - Theme Colors */}
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[20px] border p-4 transition-all duration-300 ${
            isDark
              ? "border-[#181818]/20 bg-[#F5F1E3] text-[#181818]"
              : "border-[#EDE8D0]/20 bg-[#222222] text-[#EDE8D0]"
          }`}
        >
          {/* Top Accent Line */}
          <div
            className={`absolute top-0 right-0 left-0 h-1 transition-colors duration-300 ${
              isDark ? "bg-[#181818]/40" : "bg-[#EDE8D0]/40"
            }`}
          />

          {/* Header Row: Badge with Lucide Icon & Date */}
          <div className="mt-1 mb-3 flex items-center justify-between gap-2">
            {badge ? (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold tracking-wide uppercase shadow-2xs transition-colors duration-300 sm:text-[11px] ${
                  isDark
                    ? "border-[#181818]/25 bg-[#181818]/10 text-[#181818]"
                    : "border-[#EDE8D0]/25 bg-[#EDE8D0]/10 text-[#EDE8D0]"
                }`}
              >
                {getBadgeIcon(colorTheme, isDark)}
                {badge}
              </span>
            ) : (
              <span
                className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                  isDark ? "text-[#181818]" : "text-[#EDE8D0]"
                }`}
              >
                {number}
              </span>
            )}

            {date && (
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums transition-colors duration-300 ${
                  isDark
                    ? "border-[#181818]/20 bg-[#181818]/5 text-[#181818]/80"
                    : "border-[#EDE8D0]/20 bg-[#EDE8D0]/5 text-[#EDE8D0]/80"
                }`}
              >
                <Calendar
                  className={`h-3 w-3 ${isDark ? "text-[#181818]/70" : "text-[#EDE8D0]/70"}`}
                />
                {date}
              </span>
            )}
          </div>

          {/* Certificate Image Frame */}
          {image && (
            <div
              className={`group/img relative mb-3 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border p-1.5 shadow-inner transition-all duration-300 ${
                isDark
                  ? "border-[#181818]/15 bg-[#181818]/5"
                  : "border-[#EDE8D0]/15 bg-[#000000]/30"
              }`}
            >
              <img
                src={image}
                alt={title}
                className="h-full w-full rounded-lg object-contain transition-transform duration-300 group-hover/img:scale-[1.03]"
              />
            </div>
          )}

          {/* Issuer Subtitle with Building Icon */}
          {issuer && (
            <div className="mb-1 flex items-center gap-1.5">
              <Building2
                className={`h-3 w-3 ${isDark ? "text-[#181818]/70" : "text-[#EDE8D0]/70"}`}
              />
              <span
                className={`font-mono text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isDark ? "text-[#181818]/80" : "text-[#EDE8D0]/80"
                }`}
              >
                {issuer}
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            className={`text-base leading-snug font-bold tracking-tight transition-colors duration-300 sm:text-lg ${
              isDark ? "text-[#181818]" : "text-[#EDE8D0]"
            }`}
          >
            {title}
          </h3>

          {/* Optional Description */}
          {description && (
            <p
              className={`mt-1.5 text-xs leading-relaxed transition-colors duration-300 ${
                isDark ? "text-[#181818]/75" : "text-[#EDE8D0]/75"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface StampCardProps extends CardProps {
  index: number;
  totalCount: number;
  progress: MotionValue<number>;
}

const StampCard = ({
  index,
  totalCount,
  progress,
  rotate = "",
  className = "",
  ...cardProps
}: StampCardProps) => {
  // 4th card (index === 3) is finely tuned to ratio 0.58 (balanced sweet spot between 0.45 and 0.70)
  const stepRatio = index === 3 ? 0.65 : totalCount > 1 ? (index / (totalCount - 1)) * 0.7 : 0;
  const start = Math.max(0, stepRatio - 0.05);
  const targetPoint = stepRatio;

  const scale = useTransform(progress, [start, targetPoint, 1], [1.8, 1, 1]);
  const opacity = useTransform(progress, [start, targetPoint, 1], [0, 1, 1]);

  return (
    <m.div style={{ scale, opacity }} className={`will-change-transform ${className}`}>
      <Card rotate={rotate} {...cardProps} />
    </m.div>
  );
};

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-8" },
  {
    className: "md:absolute md:top-[110px] md:right-[15%]",
    rotate: "-rotate-8",
  },
  { className: "md:absolute md:top-[360px] md:left-[15%]", rotate: "rotate-8" },
  {
    className: "md:absolute md:top-[500px] md:right-[10%]",
    rotate: "-rotate-8",
  },
  { className: "md:absolute md:top-[680px] md:left-[15%]", rotate: "rotate-8" },
];

export default function HowItWorks({ features, className, stepPositions }: HowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const pathLength = useTransform(smoothProgress, [0, 0.7], [0, 1]);

  const data = features ?? [];
  const positions = stepPositions ?? DEFAULT_CARD_POSITIONS;

  const strokeWidthNum = 3;
  const pathD =
    "M 200,60 C 600,100 800,180 750,260 C 700,340 300,380 250,460 C 200,540 800,580 750,630";

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className="relative w-full">
        {/* Full Viewport 100vw Edge-to-Edge Dot Pattern Background */}
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
          className={cn(
            "pointer-events-none left-1/2 h-full w-screen -translate-x-1/2 fill-neutral-400 dark:fill-neutral-500",
          )}
        />

        <div className={`relative mx-auto w-full max-w-5xl px-4 ${className || ""}`}>
          <div className="relative min-h-[920px] py-10 md:min-h-[890px]">
            {/* Path Container */}
            <div className="relative h-full min-h-[820px] w-full md:min-h-[840px]">
              {/* SVG Connecting Line */}
              {data.length > 1 && (
                <svg
                  className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
                  viewBox="0 0 1000 800"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <marker
                      id="arrow-head"
                      viewBox="0 0 10 10"
                      refX="5"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path
                        d="M 0 1 L 8 5 L 0 9 z"
                        fill="currentColor"
                        className="text-primary/70"
                      />
                    </marker>
                  </defs>

                  <defs>
                    <mask id="dashed-line-mask">
                      <m.path
                        d={pathD}
                        stroke="white"
                        strokeWidth="14"
                        fill="none"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ pathLength }}
                      />
                    </mask>
                  </defs>
                  <path
                    d={pathD}
                    stroke="currentColor"
                    className="text-primary/60 transition-colors duration-300"
                    strokeWidth={strokeWidthNum}
                    strokeDasharray="10 8"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    mask="url(#dashed-line-mask)"
                    markerEnd="url(#arrow-head)"
                  />
                </svg>
              )}

              {data.map((step, index) => {
                const pos = positions[index % positions.length] ?? DEFAULT_CARD_POSITIONS[0];
                const rotate = pos?.rotate ?? "";
                const cardClassName = pos?.className ?? "";

                return (
                  <StampCard
                    key={step.title}
                    index={index}
                    totalCount={data.length}
                    progress={smoothProgress}
                    number={`0${index + 1}`}
                    title={step.title}
                    description={step.description}
                    badge={step.badge}
                    issuer={step.issuer}
                    image={step.image}
                    date={step.date}
                    colorTheme={step.colorTheme || "blue"}
                    colors={step.colors}
                    rotate={rotate}
                    className={cardClassName}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
