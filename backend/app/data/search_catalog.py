"""
Structured catalog for the semantic search demo — mirrors the real facts in
frontend/content/{skills,projects}.ts and SKILLS.md, with extra context text
per item so short queries (e.g. "which projects use transformers?") retrieve
well. Kept in sync by hand; see those files for the canonical descriptions.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class SearchItem:
    title: str
    type: str  # "skill" | "project"
    url: str
    context: str  # embedded text — richer than the title alone for better recall


SEARCH_ITEMS: list[SearchItem] = [
    # --- Skills (SKILLS.md) ---
    SearchItem("Python", "skill", "/skills", "Python programming core language AI ML NLP backend"),
    SearchItem("TypeScript", "skill", "/skills", "TypeScript strict typed frontend programming"),
    SearchItem("JavaScript", "skill", "/skills", "JavaScript browser scripting frontend"),
    SearchItem("SQL", "skill", "/skills", "SQL relational database querying"),
    SearchItem(
        "Machine Learning", "skill", "/skills", "machine learning model training evaluation ML"
    ),
    SearchItem(
        "Deep Learning",
        "skill",
        "/skills",
        "deep learning neural networks transformers fine-tuning",
    ),
    SearchItem(
        "Natural Language Processing",
        "skill",
        "/skills",
        "NLP natural language processing text classification tokenization embeddings",
    ),
    SearchItem(
        "Transformers",
        "skill",
        "/skills",
        "transformers BERT RoBERTa attention fine-tuning language models",
    ),
    SearchItem(
        "Sentence Transformers",
        "skill",
        "/skills",
        "sentence transformers embeddings cosine similarity semantic similarity ranking",
    ),
    SearchItem(
        "RAG (Retrieval-Augmented Generation)",
        "skill",
        "/skills",
        "RAG retrieval augmented generation grounding vector search context injection chatbot",
    ),
    SearchItem(
        "LangChain", "skill", "/skills", "LangChain orchestration retrievers prompts LLM chains"
    ),
    SearchItem(
        "FastAPI", "skill", "/skills", "FastAPI backend API streaming SSE Python web service"
    ),
    SearchItem("REST APIs", "skill", "/skills", "REST API design backend web services"),
    SearchItem("React", "skill", "/skills", "React component-driven UI hooks frontend"),
    SearchItem(
        "Next.js", "skill", "/skills", "Next.js React framework SSR static generation frontend"
    ),
    SearchItem(
        "SharePoint Framework (SPFx)",
        "skill",
        "/skills",
        "SharePoint Framework SPFx Microsoft 365 web parts",
    ),
    SearchItem("Docker", "skill", "/skills", "Docker containers deployment reproducible builds"),
    SearchItem(
        "GitHub Actions", "skill", "/skills", "GitHub Actions CI/CD pipelines automated deploys"
    ),
    SearchItem("Azure", "skill", "/skills", "Azure cloud hosting deployment"),
    SearchItem("Git", "skill", "/skills", "Git version control branching"),
    SearchItem("Linux", "skill", "/skills", "Linux shell server operation DevOps"),
    # --- Projects (content/projects.ts) ---
    SearchItem(
        "EmoSens",
        "project",
        "/projects/emosens",
        "EmoSens emotion detection hybrid RoBERTa XGBoost ensemble NLP deep learning transformers",
    ),
    SearchItem(
        "Chat with Code",
        "project",
        "/projects/chat-with-code",
        "Chat with Code RAG retrieval augmented generation LlamaIndex Gemini GitHub repo search",
    ),
    SearchItem(
        "Smart Shortlist",
        "project",
        "/projects/smart-shortlist",
        "Smart Shortlist Sentence Transformers embeddings cosine similarity resume ranking search",
    ),
]
