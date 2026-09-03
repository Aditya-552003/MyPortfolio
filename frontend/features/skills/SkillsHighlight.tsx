"use client";

import type { ReactNode } from "react";
import { MarqueeLogoScroller, type Logo } from "@/components/ui/marquee-logo-scroller";

export const coreSkillLogos: Logo[] = [
  {
    src: "/logo/python.svg",
    alt: "Python",
    gradient: { from: "#3776AB", via: "#FFD43B", to: "#1E415E" },
  },
  {
    src: "/logo/scikitlearn.svg",
    alt: "Scikit-learn",
    gradient: { from: "#F7931E", via: "#3499CD", to: "#1C5B7D" },
  },
  {
    src: "/logo/pytorch.svg",
    alt: "PyTorch",
    gradient: { from: "#EE4C2C", via: "#FF8C00", to: "#991B00" },
  },
  {
    src: "/logo/tensorflow.svg",
    alt: "TensorFlow",
    gradient: { from: "#FF6F00", via: "#FFA726", to: "#B34E00" },
  },
  {
    src: "/logo/keras.svg",
    alt: "Keras",
    gradient: { from: "#D00000", via: "#FF4D4D", to: "#800000" },
  },
  {
    src: "/logo/huggingface.svg",
    alt: "Hugging Face",
    gradient: { from: "#FFD21E", via: "#FFA000", to: "#B37400" },
  },
  {
    src: "/logo/langchain.svg",
    alt: "LangChain",
    gradient: { from: "#7FC8FF", via: "#38BDF8", to: "#0284C7" },
  },
  {
    src: "/logo/react.svg",
    alt: "React",
    gradient: { from: "#61DAFB", via: "#0080FF", to: "#004080" },
  },
  {
    src: "/logo/javascript.svg",
    alt: "JavaScript",
    gradient: { from: "#F7DF1E", via: "#FFC107", to: "#B28900" },
  },
  {
    src: "/logo/typescript.svg",
    alt: "TypeScript",
    gradient: { from: "#3178C6", via: "#235A97", to: "#14365D" },
  },
  {
    src: "/logo/spfx.svg",
    alt: "SPFx",
    gradient: { from: "#0078D4", via: "#107C41", to: "#004578" },
  },
  {
    src: "/logo/pandas.svg",
    alt: "Pandas",
    gradient: { from: "#150458", via: "#E70488", to: "#0B022B" },
    invertOnDark: true,
  },
  {
    src: "/logo/numpy.svg",
    alt: "NumPy",
    gradient: { from: "#013243", via: "#4DABCF", to: "#001A24" },
    invertOnDark: true,
  },
  {
    src: "/logo/mysql.svg",
    alt: "MySQL",
    gradient: { from: "#4479A1", via: "#F29111", to: "#25445B" },
  },
];

export const aiWorkflowLogos: Logo[] = [
  {
    src: "/logo/cursor.svg",
    alt: "Cursor",
    gradient: { from: "#000000", via: "#333333", to: "#111111" },
    invertOnDark: true,
  },
  {
    src: "/logo/claude.svg",
    alt: "Claude",
    gradient: { from: "#D97757", via: "#F19E82", to: "#8F3C21" },
  },
  {
    src: "/logo/chatgpt.svg",
    alt: "ChatGPT",
    gradient: { from: "#10A37F", via: "#412991", to: "#000000" },
    invertOnDark: true,
  },
  {
    src: "/logo/gemini.svg",
    alt: "Gemini",
    gradient: { from: "#4285F4", via: "#8E75FF", to: "#D9657B" },
  },
  {
    src: "/logo/antigravity.svg",
    alt: "Antigravity",
    gradient: { from: "#7928CA", via: "#FF0080", to: "#0070F3" },
  },
];

export const buildShipLogos: Logo[] = [
  {
    src: "/logo/git.svg",
    alt: "Git",
    gradient: { from: "#F05032", via: "#FF6E54", to: "#A02000" },
  },
  {
    src: "/logo/github.svg",
    alt: "GitHub",
    gradient: { from: "#24292E", via: "#404448", to: "#040404" },
    invertOnDark: true,
  },
  {
    src: "/logo/githubactions.svg",
    alt: "GitHub Actions",
    gradient: { from: "#2088FF", via: "#4DA4FF", to: "#0055B3" },
  },
  {
    src: "/logo/docker.svg",
    alt: "Docker",
    gradient: { from: "#2496ED", via: "#52B3FF", to: "#005C9E" },
  },
  {
    src: "/logo/vercel.svg",
    alt: "Vercel",
    gradient: { from: "#000000", via: "#333333", to: "#111111" },
    invertOnDark: true,
  },
  {
    src: "/logo/render.svg",
    alt: "Render",
    gradient: { from: "#46E3B7", via: "#111111", to: "#000000" },
    invertOnDark: true,
  },
  {
    src: "/logo/npm.svg",
    alt: "npm",
    gradient: { from: "#CB3837", via: "#E05554", to: "#801817" },
  },
  {
    src: "/logo/nodejs.svg",
    alt: "Node.js",
    gradient: { from: "#5FA04E", via: "#83CD70", to: "#2E5C23" },
  },
  {
    src: "/logo/vscode.svg",
    alt: "VS Code",
    gradient: { from: "#007ACC", via: "#3399FF", to: "#004B80" },
  },
  {
    src: "/logo/jupyter.svg",
    alt: "Jupyter",
    gradient: { from: "#F37626", via: "#FFA059", to: "#9E3C00" },
  },
  {
    src: "/logo/googlecolab.svg",
    alt: "Google Colab",
    gradient: { from: "#F9AB00", via: "#FFD043", to: "#A36F00" },
  },
  {
    src: "/logo/kaggle.svg",
    alt: "Kaggle",
    gradient: { from: "#20BEFF", via: "#68D8FF", to: "#007BAE" },
  },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

// For backwards compatibility export skillLogos as alias
export const skillLogos = coreSkillLogos;

export function SkillsHighlight(): ReactNode {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <ScrollReveal delay={0} distance={30}>
        <MarqueeLogoScroller
          title="Core Skills"
          description="Technologies I use to build intelligent solutions"
          logos={coreSkillLogos}
          speed="normal"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.12} distance={30}>
        <MarqueeLogoScroller
          title="AI-Powered Workflow"
          description="AI tools I use to think, build, iterate, and move faster"
          logos={aiWorkflowLogos}
          speed="normal"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.24} distance={30}>
        <MarqueeLogoScroller
          title="Build & Ship"
          description="Some tools that I use to deliver results"
          logos={buildShipLogos}
          speed="normal"
        />
      </ScrollReveal>
    </div>
  );
}
