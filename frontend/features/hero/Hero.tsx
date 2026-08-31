"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bebas_Neue, Caveat } from "next/font/google";
import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

type IntroPhase = "liquid" | "zoom" | "portrait" | "traits" | "complete";

export interface HeroProps {
  traitsOpacity?: any;
  traitsY?: any;
  portraitOpacity?: any;
}

export function Hero({ traitsOpacity, traitsY, portraitOpacity }: HeroProps = {}): ReactNode {
  const [isMounted, setIsMounted] = useState(false);
  const [introPhase, setIntroPhase] = useState<IntroPhase>("liquid");

  useEffect(() => {
    setIsMounted(true);

    // Chronological Intro Sequence:
    // 0s - 1.2s : Liquid arises bottom-to-top filling "ADITYA" in center (small scale 0.55)
    // 1.2s - 1.8s: Zoom in smoothly to 1.0 (matching full hero title size)
    // 1.8s - 2.5s: Central high-res portrait of Aditya emerges smoothly
    // 2.5s - 3.4s: 5 Personal traits & hand-drawn 3D arrows pop in staggered
    // 3.4s+      : Complete — Mouse interactive parallax unlocked

    const t1 = setTimeout(() => setIntroPhase("zoom"), 1200);
    const t2 = setTimeout(() => {
      setIntroPhase("portrait");
      window.dispatchEvent(new Event("hero-loading-complete"));
    }, 1800);
    const t3 = setTimeout(() => setIntroPhase("traits"), 2500);
    const t4 = setTimeout(() => setIntroPhase("complete"), 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Motion values for subtle mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid mouse movement
  const springConfig = { stiffness: 40, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layered parallax offsets
  const textX = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [-3, 3]);

  const portraitX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const arrowX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const arrowY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (introPhase !== "complete") return;
      const { clientWidth, clientHeight } = e.currentTarget;
      const x = e.clientX / clientWidth - 0.5;
      const y = e.clientY / clientHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [introPhase, mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const isZoomOrLater = introPhase !== "liquid";
  const isPortraitOrLater = introPhase === "portrait" || introPhase === "traits" || introPhase === "complete";
  const isTraitsOrLater = introPhase === "traits" || introPhase === "complete";

  return (
    <section
      suppressHydrationWarning
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero Section"
      style={{
        height: "calc(100vh - 4rem)",
        minHeight: "650px",
        width: "100%",
      }}
      className="relative z-10 flex flex-col justify-between overflow-hidden bg-background text-foreground select-none"
    >
      {/* ------------------------------------------------------------- */}
      {/* PHASE 1 & 2: INTRO LIQUID LOADER OVERLAY & ZOOM SEQUENCE */}
      {/* ------------------------------------------------------------- */}
      {introPhase !== "complete" && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: isPortraitOrLater ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.55 }}
            animate={{ scale: isZoomOrLater ? 1 : 0.55 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center select-none"
          >
            {/* Ghost outline text boundary in center */}
            <span
              className={`${bebasNeue.className} uppercase whitespace-nowrap text-foreground/15`}
              style={{
                fontSize: "clamp(6rem, 30vw, 36rem)",
                lineHeight: "0.85",
                letterSpacing: "0.04em",
                WebkitTextStroke: "1px var(--hero-text-stroke, #EDE8D0)",
              }}
            >
              ADITYA
            </span>

            {/* Liquid Arising Solid Text Overlay (Bottom-to-Top Fill) */}
            <motion.span
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.15, ease: [0.25, 1, 0.5, 1] }}
              className={`${bebasNeue.className} absolute uppercase whitespace-nowrap text-[var(--hero-text-solid,#EDE8D0)]`}
              style={{
                fontSize: "clamp(6rem, 30vw, 36rem)",
                lineHeight: "0.85",
                letterSpacing: "0.04em",
              }}
            >
              ADITYA
            </motion.span>
          </motion.div>
        </motion.div>
      )}

      {/* Layer 0: Theme Background */}
      <div style={{ zIndex: 0 }} className="absolute inset-0 bg-background" />

      {/* Layer 1: Massive Solid Background Typography ("ADITYA") */}
      <div
        style={{ zIndex: 1 }}
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
      >
        <motion.div
          suppressHydrationWarning
          style={{
            zIndex: 1,
            x: isMounted && introPhase === "complete" ? textX : 0,
            y: isMounted && introPhase === "complete" ? textY : 0,
            fontSize: "clamp(6rem, 30vw, 36rem)",
            lineHeight: "0.85",
            letterSpacing: "0.04em",
            color: "var(--hero-text-solid, #EDE8D0)",
          }}
          initial={{ opacity: 0, scale: 0.55 }}
          animate={{
            opacity: isZoomOrLater ? 1 : 0,
            scale: isZoomOrLater ? 1 : 0.55,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`${bebasNeue.className} uppercase whitespace-nowrap select-none opacity-95`}
        >
          ADITYA
        </motion.div>
      </div>

      {/* Layer 5: 5 Decorative Hand-Drawn Arrow Traits (Top Layer z-index: 10) */}
      <div style={{ zIndex: 10 }} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 1. FREELANCER (Top-Left: Yellow arrow) */}
        <motion.div
          suppressHydrationWarning
          style={{
            position: "absolute",
            top: "8%",
            left: "24%",
            zIndex: 10,
            x: isMounted && introPhase === "complete" ? arrowX : 0,
            y: isMounted && introPhase === "complete" ? arrowY : 0,
          }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={isTraitsOrLater ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-1 select-none pointer-events-none"
        >
          <span className={`${caveat.className} text-[22px] sm:text-[26px] font-bold tracking-wider text-foreground/95 whitespace-nowrap`}>
            Freelancer
          </span>
          <div className="relative h-12 w-20 sm:h-14 sm:w-24 md:h-16 md:w-28 -translate-y-1 sm:-translate-y-2">
            <Image
              src="/images/elements/yellow.png"
              alt="Freelancer Arrow"
              fill
              sizes="150px"
              quality={100}
              unoptimized
              className="object-contain hero-arrow-img rotate-90 -scale-y-100"
            />
          </div>
        </motion.div>

        {/* 2. CREATIVE DEVELOPER (Middle-Left: Pink arrow) */}
        <motion.div
          suppressHydrationWarning
          style={{
            position: "absolute",
            top: "40%",
            left: "4%",
            zIndex: 10,
            x: isMounted && introPhase === "complete" ? arrowX : 0,
            y: isMounted && introPhase === "complete" ? arrowY : 0,
          }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={isTraitsOrLater ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-1 select-none pointer-events-none"
        >
          <div className="relative h-20 w-32 sm:h-24 sm:w-40 md:h-28 md:w-48 translate-x-12">
            <Image
              src="/images/elements/pink.png"
              alt="Creative Developer Arrow"
              fill
              sizes="200px"
              quality={100}
              unoptimized
              className="object-contain hero-arrow-img -scale-x-100 -scale-y-100 -rotate-340"
            />
          </div>
          <span className={`${caveat.className} text-[20px] sm:text-[24px] font-bold tracking-wider text-foreground/95 leading-none text-left translate-x-5 sm:translate-x-10 -translate-y-3 sm:-translate-y-4`}>
            Creative
            <br />
            Developer
          </span>
        </motion.div>

        {/* 3. AI / ML (Top-Right: Blue2 arrow moved right) */}
        <motion.div
          suppressHydrationWarning
          style={{
            position: "absolute",
            top: "8%",
            right: "10%",
            zIndex: 10,
            x: isMounted && introPhase === "complete" ? arrowX : 0,
            y: isMounted && introPhase === "complete" ? arrowY : 0,
          }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={isTraitsOrLater ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row items-center gap-2 select-none pointer-events-none"
        >
          <div className="relative h-12 w-20 sm:h-14 sm:w-24 md:h-16 md:w-28 translate-x-5 translate-y-5">
            <Image
              src="/images/elements/blue2.png"
              alt="AI / ML Arrow"
              fill
              sizes="150px"
              quality={100}
              unoptimized
              className="object-contain hero-arrow-img -rotate-12"
            />
          </div>
          <span className={`${caveat.className} text-[22px] sm:text-[26px] font-bold tracking-wider text-foreground/95 whitespace-nowrap -translate-y-1 sm:-translate-y-2`}>
            AI / ML
          </span>
        </motion.div>

        {/* 4. SHAREPOINT DEVELOPER (Bottom-Left: Green arrow) */}
        <motion.div
          suppressHydrationWarning
          style={{
            position: "absolute",
            bottom: "12%",
            left: "10%",
            zIndex: 10,
            x: isMounted && introPhase === "complete" ? arrowX : 0,
            y: isMounted && introPhase === "complete" ? arrowY : 0,
          }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={isTraitsOrLater ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row items-center gap-2 sm:gap-3 select-none pointer-events-none"
        >
          <span className={`${caveat.className} text-[20px] sm:text-[24px] font-bold tracking-wider text-foreground/95 leading-none text-left translate-x-25 sm:translate-x-30 translate-y-2`}>
            SharePoint
            <br />
            Developer
          </span>
          <div className="relative h-16 w-24 sm:h-20 sm:w-32 md:h-22 md:w-40 translate-x-25 -translate-y-5">
            <Image
              src="/images/elements/green.png"
              alt="SharePoint Developer Arrow"
              fill
              sizes="180px"
              quality={100}
              unoptimized
              className="object-contain hero-arrow-img scale-x-100 rotate-[125deg]"
            />
          </div>
        </motion.div>

        {/* 5. DIGITAL BUILDER (Bottom-Right: Purple arrow above text) */}
        <motion.div
          suppressHydrationWarning
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            zIndex: 10,
            x: isMounted && introPhase === "complete" ? arrowX : 0,
            y: isMounted && introPhase === "complete" ? arrowY : 0,
          }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={isTraitsOrLater ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-end gap-1 select-none pointer-events-none"
        >
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 translate-x-2 sm:translate-x-4 -translate-y-5">
            <Image
              src="/images/elements/purpule.png"
              alt="Digital Builder Arrow"
              fill
              sizes="180px"
              quality={100}
              unoptimized
              className="object-contain hero-arrow-img -scale-y-100 rotate-270"
            />
          </div>
          <span className={`${caveat.className} text-[20px] sm:text-[24px] font-bold tracking-wider text-foreground/95 leading-none text-right translate-x-2 sm:translate-x-4 -translate-y-4 sm:-translate-y-6`}>
            Digital
            <br />
            Builder
          </span>
        </motion.div>
      </div>

      {/* Layer 3: Central High-Res Portrait Cutout of Aditya */}
      <div
        style={{ zIndex: 3 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <motion.div
          suppressHydrationWarning
          style={{
            zIndex: 3,
            x: isMounted && introPhase === "complete" ? portraitX : 0,
            y: isMounted && introPhase === "complete" ? portraitY : 0,
            height: "98%",
            maxHeight: "960px",
          }}
          initial={{ opacity: 0, scale: 0.85, y: 80 }}
          animate={isPortraitOrLater ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 80 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex w-auto items-center justify-center pt-4 sm:pt-6"
        >
          <Image
            src="/images/aditya.png"
            alt="Aditya Sharma"
            width={1200}
            height={1600}
            priority
            quality={100}
            unoptimized
            style={{
              height: "100%",
              width: "auto",
              objectFit: "contain",
              objectPosition: "center",
              transform: "translateX(4%) scale(1.3)",
              transformOrigin: "center",
            }}
          />
        </motion.div>
      </div>

      {/* Layer 4: Outlined Foreground Typography Overlay over Portrait */}
      <div
        style={{ zIndex: 4 }}
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
      >
        <motion.div
          suppressHydrationWarning
          style={{
            zIndex: 4,
            x: isMounted && introPhase === "complete" ? textX : 0,
            y: isMounted && introPhase === "complete" ? textY : 0,
            fontSize: "clamp(6rem, 30vw, 36rem)",
            lineHeight: "0.85",
            letterSpacing: "0.04em",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "0.75px var(--hero-text-stroke, #EDE8D0)",
          }}
          initial={{ opacity: 0, scale: 0.55 }}
          animate={{
            opacity: isZoomOrLater ? 1 : 0,
            scale: isZoomOrLater ? 1 : 0.55,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`${bebasNeue.className} uppercase whitespace-nowrap select-none hero-stroke-overlay`}
        >
          ADITYA
        </motion.div>
      </div>
    </section>
  );
}
