import type { Project } from "./types";

/** The four flagship projects (PRD §7.4). Full detail content lands in Sprint 3. */
export const projects: readonly Project[] = [
  {
    slug: "emosens",
    title: "EmoSens",
    tagline: "Hybrid BERT/RoBERTa emotion detection with a live confidence-scored demo.",
    categories: ["AI", "ML", "NLP"],
  },
  {
    slug: "chat-with-code",
    title: "Chat with Code",
    tagline: "Semantic Q&A over a codebase — chunking, retrieval, and a grounded LLM layer.",
    categories: ["AI", "NLP", "Search", "Web"],
  },
  {
    slug: "voice-ai-assistant",
    title: "Voice AI Assistant",
    tagline: "Conversational assistant with streaming STT/TTS and per-session memory.",
    categories: ["AI", "Voice", "NLP"],
  },
  {
    slug: "smart-shortlist",
    title: "Smart Shortlist",
    tagline: "Sentence-Transformer embeddings and cosine similarity for candidate ranking.",
    categories: ["ML", "NLP", "Search"],
  },
] as const;
