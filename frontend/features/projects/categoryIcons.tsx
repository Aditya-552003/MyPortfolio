import { Eye, Mic, Search, Sparkles, SquareCode, Globe, BrainCircuit } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import type { ProjectCategory } from "@/content/types";

export const CATEGORY_ICONS: Record<ProjectCategory, ComponentType<SVGProps<SVGSVGElement>>> = {
  AI: Sparkles,
  ML: BrainCircuit,
  NLP: SquareCode,
  Web: Globe,
  Vision: Eye,
  Search: Search,
  Voice: Mic,
};
