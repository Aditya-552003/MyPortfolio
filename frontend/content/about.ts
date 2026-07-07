import type { AboutContent } from "./types";

/** About page content (PRD §7.2). Grounded in the real projects/mission — no fabricated history. */
export const about: AboutContent = {
  intro:
    "I'm an AI engineer who builds systems end to end — from training and evaluating models to shipping the full-stack apps that put them in front of real users. This site is itself one of those systems: every demo in the Playground is a real, working model, not a mockup.",
  objective:
    "To work on AI products where the interesting part isn't the demo — it's the engineering that makes the demo reliable, fast, and honest about what it doesn't know.",
  focus:
    "Currently focused on retrieval-augmented generation, grounded conversational AI, and the full-stack engineering that turns a model into a product people can trust.",
  mission: "Build. Search. Understand. Communicate.",
  values: [
    "Ship end-to-end — a model isn't done until it's behind a reliable API and a real UI.",
    'Grounded over impressive — a system that says "I don\'t know" beats one that hallucinates.',
    "Accessible by default, not as an afterthought.",
    "Production-grade or not at all — no half-finished demos.",
  ],
  journey: [
    {
      year: "2024",
      title: "EmoSens",
      description:
        "Built a hybrid BERT/RoBERTa emotion classifier — first deep-learning model shipped behind an API.",
    },
    {
      year: "2024",
      title: "Smart Shortlist",
      description:
        "Applied Sentence Transformers and cosine similarity to real-world candidate ranking.",
    },
    {
      year: "2025",
      title: "Chat with Code",
      description:
        "Designed a RAG pipeline — chunking, retrieval, and a grounded LLM layer — to answer questions about a codebase.",
    },
    {
      year: "2025",
      title: "Voice AI Assistant",
      description:
        "Extended the RAG pipeline with streaming speech-to-text and text-to-speech for a full conversational loop.",
    },
    {
      year: "2026",
      title: "Aditya AI Studio",
      description:
        "Started building this site — a portfolio that works like a product, with every AI claim backed by a live demo.",
    },
  ],
};
