# SKILLS.md — Aditya AI Studio

**Purpose:** Canonical skills reference for Aditya AI Studio. This file is the single source of truth for the **Skills** section, the **Project Explorer** category tags, and the **semantic search** index in the AI Playground. Keep it accurate — the RAG chatbot and search demo are grounded in it.

**Legend — proficiency**
- **Core** — used daily, can architect and lead with it.
- **Proficient** — comfortable building production features independently.
- **Working** — practical hands-on experience; productive with reference.

**Legend — category tags** (must match Project Explorer filters)
`AI` · `ML` · `NLP` · `Web` · `Vision` · `Search` · `Voice`

---

## 1. Skills at a Glance

| Group | Skills |
|---|---|
| Programming | Python, SQL, JavaScript, TypeScript |
| Machine Learning & Deep Learning | Machine Learning, Deep Learning |
| NLP | Natural Language Processing, Transformers, Sentence Transformers |
| AI Systems | LangChain, RAG |
| Backend | FastAPI, REST APIs |
| Frontend | React, Next.js, SharePoint Framework (SPFx) |
| DevOps & Cloud | Docker, GitHub Actions, Azure, Git, Linux |

---

## 2. Programming Languages

### Python — Core
Primary language for all AI/ML work: model training and inference, embeddings, and the FastAPI backend. Comfortable with data pipelines, async services, and clean, typed, testable code.
`AI` `ML` `NLP` · Demonstrated in: EmoSens, Chat with Code, Smart Shortlist, Voice AI Assistant

### TypeScript — Core
Strict-typed frontend development across the entire app. Used for reusable, well-typed React components and a maintainable, feature-based codebase.
`Web` · Demonstrated in: Aditya AI Studio (this site), Chat with Code (frontend)

### JavaScript — Proficient
Foundation underlying the frontend stack; used for browser APIs, interactivity, and tooling.
`Web`

### SQL — Proficient
Relational querying for analytics and structured data; designing schemas for future analytics, visitor memory, and contact storage.
`Web`

---

## 3. Machine Learning & Deep Learning

### Machine Learning — Core
End-to-end ML workflow: framing the problem, preparing data, training, evaluating (precision/recall/F1, confusion matrices), and shipping models behind an API.
`ML` `AI` · Demonstrated in: EmoSens, Smart Shortlist

### Deep Learning — Core
Neural architectures for language tasks, including fine-tuning transformer models and building hybrid classification pipelines.
`ML` `AI` `NLP` · Demonstrated in: EmoSens (hybrid BERT/RoBERTa emotion classifier)

---

## 4. Natural Language Processing

### Natural Language Processing — Core
Text classification, semantic understanding, and retrieval. Handles the full lifecycle from preprocessing and chunking to evaluation and inference.
`NLP` `AI` · Demonstrated in: EmoSens, Chat with Code, Smart Shortlist

### Transformers — Core
Working directly with BERT/RoBERTa-family models for classification and representation. Fine-tuning, tokenization, and context-window management.
`NLP` `AI` · Demonstrated in: EmoSens

### Sentence Transformers — Core
Sentence-level embeddings for semantic similarity, ranking, and retrieval. Cosine-similarity search over encoded content.
`NLP` `Search` `AI` · Demonstrated in: Smart Shortlist, Semantic Search demo

---

## 5. AI Systems

### RAG (Retrieval-Augmented Generation) — Core
Design and implementation of grounded RAG pipelines: ingest → chunk → embed → retrieve (top-k) → generate, with guardrails against hallucination and out-of-scope answers.
`AI` `NLP` `Search` · Demonstrated in: Chat with Portfolio (this site), Chat with Code

### LangChain — Proficient
Orchestrating retrievers, prompts, and LLM calls; composing chains for RAG and conversational flows with per-session memory.
`AI` `NLP` · Demonstrated in: Chat with Code, Chat with Portfolio

---

## 6. Backend Engineering

### FastAPI — Core
Building the inference API: streaming (SSE) chat, emotion, and semantic-search endpoints, with Pydantic validation, rate limiting, and auto-generated OpenAPI docs.
`Web` `AI` · Demonstrated in: Aditya AI Studio backend, Voice AI Assistant

### REST APIs — Core
Clean, versioned, well-documented API design: consistent error shapes, validation, timeouts/retries around providers, and CORS-restricted access.
`Web` · Demonstrated in: all backend services

---

## 7. Frontend Engineering

### React — Core
Component-driven UI with hooks, composition, and a shared design-system of primitives.
`Web` · Demonstrated in: Aditya AI Studio

### Next.js — Core
App Router, static optimization, route-level code-splitting, streaming UI, and SEO/metadata — tuned for Lighthouse >95.
`Web` · Demonstrated in: Aditya AI Studio

### SharePoint Framework (SPFx) — Working
Building custom web parts and extensions within the Microsoft 365 / SharePoint ecosystem.
`Web`

---

## 8. DevOps & Cloud

### Docker — Proficient
Containerizing services for reproducible builds and future portable deployment.
`Web`

### GitHub Actions — Proficient
CI/CD pipelines: lint, type-check, and build on every PR; automated deploys on merge to `main`.
`Web`

### Azure — Working
Cloud hosting target for future unified deployment of frontend and inference services.
`Web`

### Git — Core
Version control, branching strategy, and PR-based collaboration.
`Web`

### Linux — Proficient
Shell, service management, and server operation for backend deployment and debugging.
`Web`

---

## 9. Skill → Project Matrix

| Skill | EmoSens | Chat with Code | Voice AI Assistant | Smart Shortlist |
|---|:---:|:---:|:---:|:---:|
| Python | ✓ | ✓ | ✓ | ✓ |
| Deep Learning | ✓ | | | |
| Transformers | ✓ | | | |
| Sentence Transformers | | ✓ | | ✓ |
| NLP | ✓ | ✓ | ✓ | ✓ |
| RAG | | ✓ | ✓ | |
| LangChain | | ✓ | ✓ | |
| FastAPI | ✓ | ✓ | ✓ | ✓ |
| React / Next.js | | ✓ | ✓ | |
| Docker | ✓ | ✓ | ✓ | ✓ |

---

## 10. Search Keywords (for the semantic index)

To improve recall in the Semantic Search demo, each skill is also associated with common synonyms and adjacent terms:

- **NLP:** language models, text classification, tokenization, embeddings
- **RAG:** retrieval augmented generation, grounding, vector search, context injection
- **Sentence Transformers:** embeddings, cosine similarity, semantic similarity, ranking
- **Transformers:** BERT, RoBERTa, attention, fine-tuning
- **FastAPI:** backend, API, streaming, SSE, Python web service
- **Next.js:** React framework, SSR, static generation, frontend
- **Docker:** containers, deployment, reproducible builds
- **Vision (adjacent):** image classification, computer vision *(roadmap area)*

---

*Maintenance note:* when adding a skill, update (1) the at-a-glance table, (2) the detailed entry with proficiency + category tags + demonstrating projects, (3) the skill→project matrix, and (4) the search keywords. This keeps the Skills UI, Project Explorer filters, and semantic search in sync.
