/**
 * Cached answers for common chatbot queries when `/api/chat` is unreachable.
 * Kept short and factual — mirrors what the grounded RAG bot would say from site content.
 */

export interface CachedAnswer {
  match: RegExp;
  answer: string;
}

export const CACHED_CHAT_ANSWERS: CachedAnswer[] = [
  {
    match: /who are you|about aditya|tell me about/i,
    answer:
      "I'm the portfolio assistant for Aditya AI Studio. Aditya builds applied AI systems — emotion detection (EmoSens), repository Q&A (Chat with Code), and semantic shortlisting (Smart Shortlist). Explore the Projects and Skills pages for the full picture.",
  },
  {
    match: /resume|cv|curriculum/i,
    answer:
      "You can download Aditya's résumé from the Resume button in the navigation. For a live walkthrough of his projects and skills, stay in this chat when the backend is online — or browse the Projects and Skills sections.",
  },
  {
    match: /emosens|emotion/i,
    answer:
      "EmoSens is Aditya's emotion-detection project: a RoBERTa + XGBoost ensemble that predicts emotion labels with confidence scores. Try the Emotion Detection tab in the Playground, or open the EmoSens project page for metrics and architecture.",
  },
  {
    match: /chat with code|repository|rag/i,
    answer:
      "Chat with Code is a RAG system over source repositories — chunking, retrieval, and an LLM layer so you can ask questions about a codebase. See the project detail page for the pipeline diagram.",
  },
  {
    match: /smart shortlist|recommend|semantic search/i,
    answer:
      "Smart Shortlist ranks candidates or items with embeddings and cosine similarity. The Semantic Search tab in this Playground uses the same idea over Aditya's skills and projects.",
  },
  {
    match: /skills|tech stack|technologies/i,
    answer:
      "Aditya's skills span Programming, ML/DL, NLP, AI Systems, Backend, Frontend, and DevOps — including Python, transformers, FastAPI, and Next.js. Open the Skills section for the full matrix with proficiency levels.",
  },
];

export function findCachedAnswer(message: string): string | null {
  const trimmed = message.trim();
  if (!trimmed) return null;
  for (const entry of CACHED_CHAT_ANSWERS) {
    if (entry.match.test(trimmed)) return entry.answer;
  }
  return null;
}
