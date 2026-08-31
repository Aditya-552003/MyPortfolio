"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { Moon, Sun } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export interface MenuItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface FloatingMenuProps {
  items?: MenuItem[];
  isDark?: boolean;
  onToggleTheme?: () => void;
}

function MenuButton({
  label,
  onClick,
  isOpen,
  index,
  isDark,
}: {
  label: string;
  onClick?: () => void;
  isOpen: boolean;
  index: number;
  isDark?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const animatingRef = useRef(false);
  const pendingLeaveRef = useRef(false);
  const chars = label.split("");
  const lockDuration = 30 * chars.length + 300;

  const handleEnter = useCallback(() => {
    pendingLeaveRef.current = false;
    if (hovered) return;
    setHovered(true);
    animatingRef.current = true;
    setTimeout(() => {
      animatingRef.current = false;
      if (pendingLeaveRef.current) {
        pendingLeaveRef.current = false;
        setHovered(false);
      }
    }, lockDuration);
  }, [hovered, lockDuration]);

  const handleLeave = useCallback(() => {
    if (animatingRef.current) {
      pendingLeaveRef.current = true;
    } else {
      setHovered(false);
    }
  }, []);

  // Text color: Dark in Dark site theme (Light menu bg), Light Beige in Light site theme (Dark menu bg)
  const textColor = isDark ? "#181818" : "#EDE8D0";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="text-[22px] sm:text-[24px] uppercase leading-none overflow-hidden cursor-pointer"
      style={{
        fontFamily: "'Trobika', 'Bebas Neue', sans-serif",
        letterSpacing: "-0.03em",
        height: "1em",
        color: textColor,
      }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{
        duration: 0.4,
        delay: isOpen ? 0.2 + 0.05 * index : 0,
        ease,
      }}
    >
      <div className="flex justify-center">
        {chars.map((char, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ height: "1em" }}
          >
            <span
              className="flex flex-col"
              style={{
                transitionProperty: "transform",
                transitionDuration: hovered ? "800ms" : "0ms",
                transitionDelay: hovered ? `${30 * i}ms` : "0ms",
                transform: hovered ? "translateY(-50%)" : "translateY(0%)",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <span
                className="block"
                style={{ height: "1em", lineHeight: "1em" }}
              >
                {char}
              </span>
              <span
                className="block"
                style={{ height: "1em", lineHeight: "1em" }}
                aria-hidden
              >
                {char}
              </span>
            </span>
          </span>
        ))}
      </div>
    </motion.button>
  );
}

export default function FloatingMenu({ items, isDark, onToggleTheme }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = items ?? [
    { label: "Home" },
    { label: "Works" },
    { label: "Contact" },
  ];

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const heightValue = Math.max(260, 100 + menuItems.length * 42);

  // Inverted color mapping:
  // Light site theme (isDark == false): Dark menu background (#181818) & Beige text (#EDE8D0)
  // Dark site theme (isDark == true): Light menu background (#EDE8D0) & Dark text (#181818)
  const menuBgColor = isDark ? "rgba(237, 232, 208, 0.96)" : "rgba(24, 24, 24, 0.96)";
  const menuBorderColor = isDark ? "rgba(24, 24, 24, 0.25)" : "rgba(237, 232, 208, 0.25)";
  const contentColor = isDark ? "#181818" : "#EDE8D0";

  return (
    <>
      <motion.div
        ref={containerRef}
        className="fixed bottom-8 left-1/2 z-[100]"
        style={{ x: "-50%", pointerEvents: "auto" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
      >
        <motion.div
          className="relative overflow-hidden flex flex-col justify-between shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (!isOpen) setIsOpen(true);
          }}
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.02em",
            cursor: isOpen ? "default" : "pointer",
          }}
          animate={{
            width: isOpen ? 320 : 240,
            height: isOpen ? heightValue : 48,
            borderRadius: isOpen ? 20 : 24,
          }}
          whileHover={isOpen ? undefined : { scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 26,
          }}
        >
          {/* Flat Glassmorphic background layer */}
          <motion.div
            className="absolute inset-0 backdrop-blur-3xl overflow-hidden"
            animate={{
              backgroundColor: menuBgColor,
              borderColor: menuBorderColor,
            }}
            transition={{ duration: 0.3, ease }}
            style={{
              borderWidth: 1.5,
              borderStyle: "solid",
              borderRadius: "inherit",
            }}
          />

          {/* Menu items list */}
          {isOpen && (
            <motion.div
              className="relative z-10 flex flex-col gap-3 items-center justify-center pt-8 pb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease }}
              style={{
                pointerEvents: "auto",
                flex: 1,
                overflow: "hidden",
              }}
            >
              {menuItems.map((item, idx) => (
                <MenuButton
                  key={item.label}
                  label={item.label}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  isOpen={isOpen}
                  index={idx}
                  isDark={isDark}
                />
              ))}
            </motion.div>
          )}

          {/* Bottom bar: Menu + Theme toggle + hamburger */}
          <motion.div
            className="relative z-10 flex items-center justify-between w-full shrink-0 cursor-pointer px-6 h-12"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            style={{ alignItems: "center" }}
          >
            <div className="flex items-center gap-2">
              {onToggleTheme && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTheme();
                  }}
                  aria-label="Toggle theme"
                  className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <motion.div
                    animate={{ color: contentColor }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
                  </motion.div>
                </button>
              )}
              {/* Rolling character hover effect for MENU text */}
              <div
                className="text-[20px] leading-none select-none uppercase tracking-wide overflow-hidden"
                style={{
                  fontFamily: "'Trobika', 'Bebas Neue', sans-serif",
                  letterSpacing: "-0.01em",
                  height: "1em",
                }}
              >
                <div className="flex justify-center">
                  {"MENU".split("").map((char, i) => (
                    <span
                      key={i}
                      className="inline-block overflow-hidden"
                      style={{ height: "1em" }}
                    >
                      <span
                        className="flex flex-col"
                        style={{
                          transitionProperty: "transform",
                          transitionDuration: isHovered ? "700ms" : "0ms",
                          transitionDelay: isHovered ? `${40 * i}ms` : "0ms",
                          transform: isHovered ? "translateY(-50%)" : "translateY(0%)",
                          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                          color: contentColor,
                        }}
                      >
                        <span className="block" style={{ height: "1em", lineHeight: "1em" }}>
                          {char}
                        </span>
                        <span className="block" style={{ height: "1em", lineHeight: "1em" }} aria-hidden>
                          {char}
                        </span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-[32px] h-[32px] flex items-center justify-center">
              <motion.span
                className="absolute block w-[22px] h-[2.5px] rounded-full"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 0 : -4,
                  backgroundColor: contentColor,
                }}
                transition={{ duration: 0.4, ease }}
              />
              <motion.span
                className="absolute block w-[22px] h-[2.5px] rounded-full"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 4,
                  backgroundColor: contentColor,
                }}
                transition={{ duration: 0.4, ease }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
