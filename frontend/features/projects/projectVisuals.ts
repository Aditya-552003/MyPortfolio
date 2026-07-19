/** Per-project hero/card atmospheres — real visual anchors until photo assets land. */

export interface ProjectVisual {
  /** CSS background-image layers */
  backgroundImage: string;
  /** Accent label shown on the hero plane */
  label: string;
}

const VISUALS: Record<string, ProjectVisual> = {
  emosens: {
    label: "Emotion · Ensemble",
    backgroundImage:
      "radial-gradient(ellipse 80% 60% at 20% 40%, color-mix(in srgb, #f472b6 35%, transparent), transparent 70%), radial-gradient(ellipse 70% 50% at 80% 60%, color-mix(in srgb, var(--primary) 40%, transparent), transparent 65%), linear-gradient(135deg, color-mix(in srgb, var(--secondary) 12%, var(--background)), var(--background))",
  },
  "chat-with-code": {
    label: "RAG · Codebase Q&A",
    backgroundImage:
      "radial-gradient(ellipse 70% 55% at 15% 30%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%), radial-gradient(ellipse 60% 50% at 85% 70%, color-mix(in srgb, var(--primary) 35%, transparent), transparent 65%), linear-gradient(160deg, color-mix(in srgb, var(--primary) 10%, var(--background)), var(--background))",
  },
  "smart-shortlist": {
    label: "Embeddings · Ranking",
    backgroundImage:
      "radial-gradient(ellipse 75% 55% at 70% 25%, color-mix(in srgb, var(--secondary) 40%, transparent), transparent 70%), radial-gradient(ellipse 55% 45% at 20% 75%, color-mix(in srgb, var(--warning) 25%, transparent), transparent 65%), linear-gradient(200deg, color-mix(in srgb, var(--secondary) 10%, var(--background)), var(--background))",
  },
};

const FALLBACK: ProjectVisual = {
  label: "AI Project",
  backgroundImage:
    "radial-gradient(circle at 25% 30%, color-mix(in srgb, var(--primary) 30%, transparent), transparent 65%), radial-gradient(circle at 75% 70%, color-mix(in srgb, var(--secondary) 30%, transparent), transparent 65%)",
};

export function getProjectVisual(slug: string): ProjectVisual {
  return VISUALS[slug] ?? FALLBACK;
}
