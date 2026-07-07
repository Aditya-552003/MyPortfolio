# Aditya AI Studio — PROJECT.md

**Document type:** Product Requirements Document (PRD)
**Status:** Draft v1.0 — Ready for Implementation
**Owner:** Aditya (Founder / Sole Engineer)
**Audience:** Senior engineers, designers, and reviewers building or evaluating this product
**Last updated:** 2026

> **Tagline —** Build. Search. Understand. Communicate.
> *An Interactive AI Engineering Portfolio.*

---

## Table of Contents

1. [Vision](#1-vision)
2. [Product Goals](#2-product-goals)
3. [User Personas](#3-user-personas)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Complete Feature List](#6-complete-feature-list)
7. [Page-by-Page Breakdown](#7-page-by-page-breakdown)
8. [Component Inventory](#8-component-inventory)
9. [Architecture Overview](#9-architecture-overview)
10. [User Flows](#10-user-flows)
11. [Technical Stack](#11-technical-stack)
12. [Folder Structure](#12-folder-structure)
13. [API Requirements](#13-api-requirements)
14. [AI Integrations](#14-ai-integrations)
15. [Database Design (Future)](#15-database-design-future)
16. [Deployment Strategy](#16-deployment-strategy)
17. [UI Guidelines](#17-ui-guidelines)
18. [Motion Guidelines](#18-motion-guidelines)
19. [Responsive Guidelines](#19-responsive-guidelines)
20. [Security Considerations](#20-security-considerations)
21. [Performance Targets](#21-performance-targets)
22. [Future Roadmap](#22-future-roadmap)
23. [Development Milestones](#23-development-milestones)
24. [Acceptance Criteria](#24-acceptance-criteria)
25. [Conclusion](#25-conclusion)

---

## 1. Vision

Aditya AI Studio is not a portfolio in the traditional sense. It is a **living demonstration of AI engineering** — a product that a visitor *uses* rather than *reads*. The moment a recruiter lands on the page, they should feel they have entered an **AI Operating System**: something closer in spirit to ChatGPT, Perplexity, Notion AI, GitHub, and Vercel than to a résumé rendered in HTML.

The core insight driving this product is that **telling** recruiters about AI skills is weak evidence, while **letting them experience** those skills is strong evidence. Instead of a bullet list claiming "experience with RAG," the site ships a working RAG chatbot that answers questions about Aditya's own background. Instead of claiming "NLP expertise," it runs live emotion detection and semantic search in the browser-facing playground. The website itself is the strongest project in the portfolio.

The experience is **dark-mode-first, minimal, premium, and highly interactive**, with smooth, restrained motion and zero gimmickry. Every interaction should feel intentional and production-grade — the way a mature SaaS application feels, not the way a personal site feels.

### Design north star

> A hiring manager should be convinced of Aditya's engineering ability within **30 seconds**, and should want to keep exploring for **30 minutes**.

---

## 2. Product Goals

### Primary goal
Create the best-in-class AI Engineer portfolio that demonstrates *real engineering capability* through interaction rather than description.

### Supporting goals
- **Impress within 30 seconds.** The hero and first playground interaction must land immediately.
- **Prove breadth and depth.** Surface concrete evidence of AI Engineering, Machine Learning, NLP, Full-Stack Development, Product Thinking, UI/UX, Software Architecture, API Design, and modern frontend engineering.
- **Feel like a product, not a page.** Match the polish, responsiveness, and reliability of a shipped SaaS application.
- **Be genuinely useful.** The AI Playground and chatbot should answer real recruiter questions accurately and fast.
- **Convert.** Drive measurable outcomes: résumé downloads, contact form submissions, GitHub/LinkedIn clicks, and demo interactions.

### Success metrics
| Metric | Target |
|---|---|
| Time-to-first-interaction | < 5 seconds from load |
| Playground engagement rate | > 40% of visitors interact with at least one demo |
| Chatbot session length | ≥ 3 messages median |
| Résumé download / contact conversion | ≥ 8% of unique visitors |
| Lighthouse Performance | > 95 |
| Bounce rate | < 35% |

---

## 3. User Personas

### Primary personas

**P1 — Technical Recruiter ("Priya")**
Screens dozens of candidates daily, non-deep-technical, time-poor. Needs to quickly verify claims, download a résumé, and forward a strong link to a hiring manager. Values clarity, speed, and obvious credibility signals.

**P2 — Hiring Manager / Engineering Manager ("Daniel")**
Evaluates whether the candidate can build real systems. Wants architecture diagrams, technology depth, trade-off reasoning, and evidence of shipping. Will click into project internals and test the playground.

**P3 — Technical Lead / Senior Engineer ("Wei")**
Assesses code quality, system design, and depth of understanding. Will inspect the RAG explanation, folder structure, API design, and challenge sections. Highly skeptical of surface polish without substance.

**P4 — AI Startup Founder / CTO ("Maria")**
Looking for a versatile early engineer who can ship end-to-end AI features. Cares about product thinking, autonomy, and the ability to go from idea to deployed system.

### Secondary personas
- **Developers** exploring for inspiration or reference.
- **Students** learning how to present AI work.
- **Open-source contributors** who may collaborate on linked repositories.

### Persona-to-feature mapping
| Persona | Highest-value features |
|---|---|
| Priya | Hero, résumé download, chatbot ("Show Resume"), contact |
| Daniel | Project deep-dives, architecture diagrams, playground |
| Wei | RAG explainer, folder structure, API docs, challenges/lessons |
| Maria | Product narrative, roadmap, end-to-end project stories |

---

## 4. Functional Requirements

Requirements use MoSCoW prioritization (**M**ust, **S**hould, **C**ould).

### 4.1 Global
- **FR-G1 (M):** Sticky glassmorphism navigation with sections: Home, Projects, Playground, Skills, Experience, Contact; plus Resume button and Dark Mode toggle.
- **FR-G2 (M):** Dark-mode-first theme with a functional light-mode toggle; preference persisted in local storage.
- **FR-G3 (M):** Fully responsive across mobile, tablet, laptop, desktop, and ultra-wide.
- **FR-G4 (M):** Keyboard-navigable and screen-reader accessible throughout.
- **FR-G5 (S):** Reduced-motion mode honoring `prefers-reduced-motion`.

### 4.2 Landing / Hero
- **FR-H1 (M):** Display headline "Aditya AI Studio," subtitle "Interactive AI Engineering Portfolio," and the one-line mission statement.
- **FR-H2 (M):** Primary CTA "Talk to My AI" opens the chatbot; secondary CTA "Explore Projects" scrolls/navigates to Projects.
- **FR-H3 (M):** Animated gradient background with subtle floating AI particles; motion must be subtle and pausable via reduced-motion.

### 4.3 AI Playground (core)
- **FR-P1 (M):** Chat with Portfolio — RAG chatbot grounded in Aditya's résumé, projects, and skills.
- **FR-P2 (S):** Voice Assistant — speech-to-text input and text-to-speech output.
- **FR-P3 (M):** Emotion Detection Demo — user submits text, receives predicted emotion(s) with confidence.
- **FR-P4 (M):** Semantic Search Demo — user queries skills/technologies/projects; results ranked by semantic similarity.
- **FR-P5 (M):** Quick-ask presets: "Show Resume," "Show AI projects," "What technologies do you know?," "How does your RAG work?"

### 4.4 Chatbot
- **FR-C1 (M):** Answer questions about Aditya, his projects, technologies, and background using retrieved context.
- **FR-C2 (M):** Support streaming token-by-token responses.
- **FR-C3 (M):** Cite or link to the relevant project/section when relevant (e.g., "Show GitHub," "Show Resume").
- **FR-C4 (S):** Maintain per-session conversation memory.
- **FR-C5 (M):** Gracefully handle out-of-scope questions ("I can only speak to Aditya's work, but here's what's related…").

### 4.5 Projects
- **FR-PR1 (M):** Four flagship project pages (EmoSens, Chat with Code, Voice AI Assistant, Smart Shortlist), each containing the full detail template (see §7.4).
- **FR-PR2 (M):** Interactive Project Explorer with hover effects and category filters: AI, ML, NLP, Web, Vision, Search, Voice.
- **FR-PR3 (S):** Each project links to GitHub, live demo, and API documentation where available.

### 4.6 Content sections
- **FR-CS1 (M):** About (intro, objective, focus, mission, values, journey timeline).
- **FR-CS2 (M):** Skills (grouped, with proficiency signal).
- **FR-CS3 (M):** Experience timeline (internships, freelance, open source, achievements).
- **FR-CS4 (M):** Education timeline (university, degree, coursework).
- **FR-CS5 (S):** Certifications cards (title, date, credential link).
- **FR-CS6 (S):** GitHub section (contribution graph, pinned repos, stars, followers, languages, recent commits).
- **FR-CS7 (C):** Blog (future).

### 4.7 Contact
- **FR-CT1 (M):** Contact form with validation, spam protection, and success/error states.
- **FR-CT2 (M):** Direct links: email, LinkedIn, GitHub, résumé download.

---

## 5. Non-Functional Requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-1 | Performance | Lighthouse Performance > 95; FCP < 1.5s; LCP < 2.5s. |
| NFR-2 | Accessibility | Lighthouse Accessibility 100; WCAG 2.1 AA; full keyboard nav; ARIA labels; reduced-motion support. |
| NFR-3 | SEO | Lighthouse SEO 100; structured data; OpenGraph; Twitter cards; sitemap; robots; canonical URLs. |
| NFR-4 | Best Practices | Lighthouse Best Practices 100; HTTPS only; no console errors. |
| NFR-5 | Maintainability | Feature-based folder structure; reusable components; clean architecture. |
| NFR-6 | Type safety | Strict TypeScript across the frontend; no implicit `any`. |
| NFR-7 | Scalability | Stateless API; horizontally scalable backend; cached embeddings. |
| NFR-8 | Reliability | Graceful degradation when AI services are slow or unavailable. |
| NFR-9 | Observability | Basic request logging and error tracking on the backend. |
| NFR-10 | Security | Env-managed secrets; rate limiting; input validation and sanitization. |
| NFR-11 | Production readiness | CI checks (lint, type-check, build) must pass before deploy. |

---

## 6. Complete Feature List

**Core experience**
- Animated hero with gradient + floating particles
- Sticky glassmorphism navigation
- Dark/light mode toggle with persistence
- AI Playground hub (chat, voice, emotion, semantic search)
- RAG chatbot grounded in personal data
- Streaming responses
- Quick-ask preset prompts

**Portfolio content**
- About with journey timeline
- Grouped skills matrix
- Four flagship project deep-dives
- Interactive Project Explorer with category filters
- Experience timeline
- Education timeline
- Certifications cards
- GitHub stats section
- Contact form + direct links + résumé download

**AI demos**
- Emotion detection (text → emotion + confidence)
- Semantic search (query → ranked skills/tech/projects)
- Voice assistant (STT + TTS)
- "Explain my RAG" interactive walkthrough

**Platform**
- Responsive across all breakpoints
- Full accessibility layer
- SEO + social sharing metadata
- Rate-limited, validated API
- CI/CD pipeline

---

## 7. Page-by-Page Breakdown

### 7.1 Landing / Home
- **Hero:** headline, subtitle, mission line, primary CTA "Talk to My AI," secondary CTA "Explore Projects," animated gradient + floating particles.
- **Below fold:** condensed About teaser, a 3-item skills highlight, a Playground teaser card ("Try it now"), and a projects preview strip.
- **Goal:** deliver credibility and an interaction hook within one scroll.

### 7.2 About
Professional introduction, career objective, current focus, mission statement, core values, and a vertical **journey timeline** marking key milestones.

### 7.3 Skills
Grouped, scannable matrix with a subtle proficiency signal per item.

- **Programming:** Python, SQL, JavaScript, TypeScript
- **ML / DL:** Machine Learning, Deep Learning
- **NLP:** Natural Language Processing, Transformers, Sentence Transformers
- **AI Systems:** LangChain, RAG
- **Backend:** FastAPI, REST APIs
- **Frontend:** React, Next.js, SharePoint Framework (SPFx)
- **DevOps / Cloud:** Docker, GitHub Actions, Azure, Git, Linux

### 7.4 Projects (index + detail)
The **index** renders the Project Explorer: interactive cards, hover effects, and category filters (AI, ML, NLP, Web, Vision, Search, Voice).

Each **detail page** follows a fixed template:
1. Large hero image
2. Architecture diagram
3. Project overview
4. Problem statement
5. Solution
6. Features
7. Screenshots
8. Technology stack
9. Folder structure
10. Model used
11. Challenges
12. Future improvements
13. GitHub link
14. Live demo
15. API documentation
16. Performance metrics
17. Lessons learned

#### Project 1 — EmoSens (Emotion Detection)
Hybrid deep-learning emotion classification using BERT and RoBERTa. Detail should cover the dataset, evaluation metrics, confusion matrix, training pipeline, and inference flow. Categories: AI, ML, NLP.

#### Project 2 — Chat with Code (Repository Analysis)
Explains a codebase via semantic Q&A. Cover repository analysis, code embeddings, semantic search, chunking strategy, retriever design, the LLM layer, context-window handling, overall architecture, and a flow diagram. Categories: AI, NLP, Search, Web.

#### Project 3 — Voice AI Assistant
Conversational assistant with speech-to-text and text-to-speech, conversation memory, and streaming. Cover latency handling, the end-to-end pipeline, and architecture. Categories: AI, Voice, NLP.

#### Project 4 — Smart Shortlist
Candidate/item shortlisting using Sentence Transformers. Cover semantic similarity, embeddings, cosine similarity, the recommendation pipeline, ranking, and architecture. Categories: ML, NLP, Search.

### 7.5 AI Playground
Tabbed or card-based hub exposing: Chat with Portfolio, Voice Assistant, Emotion Detection Demo, Semantic Search Demo, plus preset actions (Ask about Resume, Ask about Projects, Search Skills, Search Technologies). This is the emotional and technical center of the site.

### 7.6 Experience
Timeline of internships, freelance work, open-source contributions, and major achievements.

### 7.7 Education
Timeline with university, degree, and relevant coursework.

### 7.8 Certifications
Professional cards showing title, completion date, and credential link.

### 7.9 GitHub Stats
Contribution graph, pinned projects, stars, followers, top languages, and recent commits.

### 7.10 Contact
Email, LinkedIn, GitHub, résumé download, and a validated contact form.

### 7.11 Blog (Future)
Placeholder route reserved for future long-form technical writing.

---

## 8. Component Inventory

### Layout & navigation
- `AppShell` — top-level layout wrapper
- `Navbar` — sticky glassmorphism nav
- `MobileNav` — slide-over menu
- `Footer`
- `ThemeToggle`
- `ResumeButton`
- `SectionContainer` — consistent spacing/max-width wrapper

### Hero & marketing
- `Hero`
- `AnimatedGradient`
- `ParticleField`
- `CTAButton` (primary / secondary variants)
- `TeaserCard`

### Playground & AI
- `PlaygroundHub`
- `ChatWindow`
- `ChatMessage` (user / assistant / system)
- `ChatInput`
- `StreamingText`
- `QuickAskChips`
- `VoiceAssistant` (`MicButton`, `AudioVisualizer`, `TranscriptView`)
- `EmotionDemo` (`EmotionInput`, `EmotionResultBars`)
- `SemanticSearchDemo` (`SearchInput`, `RankedResultList`)
- `RagExplainer` (interactive step-through)

### Projects
- `ProjectExplorer`
- `ProjectCard`
- `CategoryFilter`
- `ProjectHero`
- `ArchitectureDiagram`
- `TechStackGrid`
- `FolderTree`
- `MetricsPanel`
- `ScreenshotGallery`
- `ChallengesList`
- `LessonsList`

### Content
- `AboutSection`
- `Timeline` / `TimelineItem`
- `SkillsMatrix` / `SkillPill`
- `CertificationCard`
- `GitHubStats` (`ContributionGraph`, `PinnedRepoCard`, `StatBadge`)

### Contact & forms
- `ContactForm`
- `FormField`
- `SocialLinks`
- `Toast` / `Notification`

### Primitives (design system)
- `Button`, `Card`, `Badge`, `Tabs`, `Tooltip`, `Modal`, `Skeleton`, `Spinner`, `Divider`, `Icon`

---

## 9. Architecture Overview

Aditya AI Studio is a **decoupled client–server application**. The frontend is a statically-optimized Next.js app; the AI/ML workloads run on a separate Python (FastAPI) service so heavy models and embeddings never bloat the client bundle.

```
                         ┌───────────────────────────┐
                         │        Visitor (Browser)   │
                         └─────────────┬─────────────┘
                                       │ HTTPS
                         ┌─────────────▼─────────────┐
                         │   Frontend — Next.js       │
                         │   (Vercel, edge/CDN)       │
                         │   • Marketing pages        │
                         │   • Playground UI          │
                         │   • Streaming chat UI      │
                         └─────────────┬─────────────┘
                                       │ REST / SSE (JSON)
                         ┌─────────────▼─────────────┐
                         │   Backend — FastAPI        │
                         │   (Render)                 │
                         │   • /chat (RAG + stream)   │
                         │   • /emotion               │
                         │   • /search (semantic)     │
                         │   • /voice (STT/TTS proxy) │
                         │   • rate limiting + auth    │
                         └───┬───────────┬──────────┬─┘
                             │           │          │
                   ┌─────────▼──┐ ┌──────▼─────┐ ┌──▼────────────┐
                   │ Vector /   │ │  LLM       │ │ Model layer    │
                   │ embedding  │ │  provider  │ │ (BERT/RoBERTa, │
                   │ store      │ │  (API)     │ │ Sentence-Tx)   │
                   └────────────┘ └────────────┘ └───────────────┘
```

**Key architectural decisions**
- **Separation of concerns:** presentation (Next.js) vs. inference (FastAPI). Keeps the frontend fast and the AI layer independently scalable.
- **Streaming via SSE:** chat responses stream token-by-token for perceived speed.
- **Pre-computed embeddings:** personal content (résumé, projects, skills) is chunked and embedded ahead of time; retrieval is a fast vector lookup at request time.
- **Stateless API:** session memory is passed per request (or held in a lightweight session store) so the backend scales horizontally.
- **Graceful degradation:** if the LLM provider is slow/unavailable, the UI shows cached answers or a friendly fallback rather than failing hard.

---

## 10. User Flows

### Flow A — Recruiter quick-scan (Priya)
1. Lands on hero → reads mission in ~3s.
2. Clicks **Talk to My AI** → asks "Show Resume."
3. Chatbot returns summary + résumé download link.
4. Downloads résumé, clicks LinkedIn → converts.

### Flow B — Hiring manager deep-dive (Daniel)
1. Clicks **Explore Projects**.
2. Filters Explorer by **NLP**.
3. Opens **EmoSens** → reviews architecture diagram, metrics, confusion matrix.
4. Returns to Playground → runs Emotion Detection demo live.
5. Submits contact form.

### Flow C — Technical evaluation (Wei)
1. Opens **Chat with Code** project page.
2. Reads chunking/retriever/context-window sections and folder structure.
3. Uses chatbot: "How does your RAG work?" → reads RAG explainer.
4. Checks GitHub stats and repo links.

### Flow D — Semantic search
1. In Playground, types "Which projects use transformers?"
2. Backend embeds query → cosine similarity over project/skill vectors.
3. Returns ranked results → user clicks into top project.

### Flow E — Voice interaction
1. Taps mic in Voice Assistant.
2. Speaks a question → STT transcript appears.
3. Backend generates answer → TTS plays audio while text streams.

---

## 11. Technical Stack

### Frontend
- **Framework:** Next.js (App Router) with React
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + CSS variables for theming
- **Animation:** Framer Motion (restrained, reduced-motion aware)
- **State/data:** React Query (or equivalent) for server state; lightweight local state otherwise
- **Icons:** a single consistent icon set

### Backend
- **Framework:** FastAPI (Python)
- **Serving:** Uvicorn/Gunicorn workers
- **AI/ML libraries:** Transformers, Sentence Transformers, LangChain
- **Streaming:** Server-Sent Events

### AI / ML
- **LLM:** hosted LLM provider via API (for chat/generation)
- **Embeddings:** Sentence Transformers for semantic search & RAG retrieval
- **Emotion:** BERT / RoBERTa hybrid classifier
- **Voice:** STT + TTS via provider APIs

### Infrastructure
- **Frontend hosting:** Vercel
- **Backend hosting:** Render
- **CI/CD:** GitHub Actions
- **Containerization (future):** Docker
- **Cloud (future):** Azure

---

## 12. Folder Structure

Feature-based organization on both tiers.

```
aditya-ai-studio/
├── frontend/
│   ├── app/                      # Next.js routes (App Router)
│   │   ├── (marketing)/          # home, about, skills
│   │   ├── projects/
│   │   │   ├── page.tsx          # explorer
│   │   │   └── [slug]/page.tsx   # project detail
│   │   ├── playground/
│   │   ├── experience/
│   │   ├── contact/
│   │   └── layout.tsx
│   ├── features/                 # feature-scoped logic + UI
│   │   ├── hero/
│   │   ├── playground/
│   │   │   ├── chat/
│   │   │   ├── voice/
│   │   │   ├── emotion/
│   │   │   └── search/
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── experience/
│   │   └── contact/
│   ├── components/               # shared design-system primitives
│   ├── lib/                      # api client, hooks, utils
│   ├── styles/                   # tokens, globals
│   ├── content/                  # résumé, projects, skills data
│   ├── public/                   # images, og assets, resume.pdf
│   └── config/                   # theme, seo, site config
│
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI entry
│   │   ├── routers/              # chat, emotion, search, voice, health
│   │   ├── services/             # rag, embeddings, emotion, voice
│   │   ├── models/               # pydantic schemas
│   │   ├── core/                 # config, security, rate limiting
│   │   └── data/                 # source content + chunks
│   ├── embeddings/               # precomputed vectors
│   ├── scripts/                  # ingest/embed jobs
│   └── tests/
│
├── .github/workflows/            # CI/CD
├── docker/                       # (future) Dockerfiles
└── PROJECT.md
```

---

## 13. API Requirements

All endpoints return JSON, enforce input validation, and are rate-limited. Errors follow a consistent shape: `{ error: { code, message } }`.

| Endpoint | Method | Purpose | Notes |
|---|---|---|---|
| `/api/health` | GET | Liveness/readiness | For uptime checks |
| `/api/chat` | POST | RAG chatbot | Streams via SSE; accepts message + session history |
| `/api/emotion` | POST | Emotion detection | Text in → emotions + confidence out |
| `/api/search` | POST | Semantic search | Query in → ranked results with scores |
| `/api/voice/stt` | POST | Speech-to-text | Audio in → transcript out |
| `/api/voice/tts` | POST | Text-to-speech | Text in → audio out |
| `/api/contact` | POST | Contact form | Validated + spam-protected |

**Cross-cutting requirements**
- CORS locked to the production frontend origin.
- Per-IP rate limiting on all AI endpoints.
- Request/response schemas defined with Pydantic and surfaced via FastAPI's OpenAPI docs.
- Timeouts and retries around external provider calls.

---

## 14. AI Integrations

### 14.1 RAG chatbot ("Chat with Portfolio")
- **Ingestion:** résumé, project write-ups, skills, and experience are chunked and embedded ahead of time.
- **Retrieval:** query is embedded; top-k chunks retrieved via vector similarity.
- **Generation:** retrieved context + user question sent to the LLM with a grounding system prompt that restricts answers to Aditya's information and refuses fabrication.
- **Streaming:** tokens streamed to the UI.
- **Memory:** per-session history maintained for follow-ups.
- **Guardrails:** out-of-scope questions redirected politely; no hallucinated facts about Aditya.

### 14.2 Emotion detection (EmoSens demo)
- Hybrid BERT/RoBERTa classifier returns emotion labels with confidence scores, visualized as bars.

### 14.3 Semantic search
- Sentence-Transformer embeddings + cosine similarity rank skills, technologies, and projects against a natural-language query.

### 14.4 Voice assistant
- STT transcribes user speech; the transcript feeds the RAG pipeline; the answer is spoken back via TTS while text streams.

### 14.5 RAG explainer
- An interactive, non-technical-friendly walkthrough of the ingest → embed → retrieve → generate flow, doubling as proof of understanding.

---

## 15. Database Design (Future)

The v1 product is largely stateless (content lives in versioned files; embeddings are precomputed). A datastore becomes valuable once analytics, memory, and blogging land.

**Proposed future entities**
- `visitors` — anonymous id, first/last seen, device, referrer.
- `chat_sessions` — session id, visitor id, started_at.
- `chat_messages` — session id, role, content, created_at (for analytics/memory).
- `interactions` — event type (demo run, résumé download, filter used), metadata.
- `contact_submissions` — name, email, message, status, created_at.
- `blog_posts` — slug, title, body, tags, published_at (future).

**Storage direction:** a managed Postgres for relational data plus a dedicated vector store for embeddings once content volume grows. All PII (contact submissions) encrypted at rest and access-controlled.

---

## 16. Deployment Strategy

- **Frontend → Vercel:** automatic deploys on push to `main`; preview deploys on PRs.
- **Backend → Render:** container/web service with health checks and autoscaling.
- **CI/CD → GitHub Actions:** on every PR run lint, type-check, and build; block merge on failure. On merge to `main`, trigger frontend and backend deploys.
- **Secrets:** managed via platform environment variables; never committed.
- **Future:** Dockerized services and optional migration to Azure for unified hosting.

**Environments:** Preview (per-PR) → Production. A lightweight staging environment can be added once traffic justifies it.

---

## 17. UI Guidelines

### Color palette
| Token | Value |
|---|---|
| Background | `#050816` |
| Primary | `#0EA5E9` |
| Secondary | `#7C3AED` |
| Accent | `#22C55E` |
| Error | `#EF4444` |
| Warning | `#F59E0B` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `#94A3B8` |
| Border | `rgba(255,255,255,0.08)` |

### Typography
- **Font:** Inter.
- **Weights:** 400, 500, 600, 700, 800.
- **Hierarchy:** large, tight headlines (700–800); comfortable body (400–500); labels/badges (500–600).

### Visual language
- Dark-mode-first; light mode as an equal-quality alternative.
- Glassmorphism for the navbar and select overlays (subtle blur, low-opacity borders using the border token).
- Generous whitespace; strong grid alignment; consistent corner radii.
- Gradients derived from Primary→Secondary for accents, used sparingly.
- Premium, minimal, professional — **no flashy effects**.

### Interaction states
- Every interactive element has hover, focus-visible, active, and disabled states.
- Focus rings must be clearly visible for keyboard users.
- Loading uses skeletons/spinners, never layout shift.

---

## 18. Motion Guidelines

- **Philosophy:** motion clarifies, never decorates. Smooth and restrained.
- **Timing:** 150–300ms for micro-interactions; ease-out on enter, ease-in on exit.
- **Hero:** slow, subtle gradient drift and gently floating particles — low amplitude, low frequency.
- **Scroll reveals:** small fade + translate (≤ 12px), staggered subtly.
- **Chat streaming:** token-by-token text appearance is the primary "alive" signal.
- **Reduced motion:** when `prefers-reduced-motion: reduce` is set, disable particle motion, gradient drift, and scroll reveals; show final states immediately.
- **No:** parallax overkill, bouncy springs on content, spinning logos, or attention-grabbing loops.

---

## 19. Responsive Guidelines

Support: **mobile, tablet, laptop, desktop, ultra-wide**.

| Breakpoint | Target width | Key adaptations |
|---|---|---|
| Mobile | < 640px | Single column; slide-over nav; stacked playground; full-width CTAs |
| Tablet | 640–1024px | Two-column content; condensed nav |
| Laptop | 1024–1440px | Full layout; side-by-side playground panels |
| Desktop | 1440–1920px | Comfortable max-width, centered content |
| Ultra-wide | > 1920px | Capped content width; no stretched line lengths |

- Touch targets ≥ 44px; no hover-only interactions on touch.
- Content max-width enforced to preserve readable line length on large screens.
- Images responsive and lazy-loaded; art-directed hero assets per breakpoint where needed.

---

## 20. Security Considerations

- **Secrets:** all keys and provider credentials in environment variables; nothing sensitive in the client bundle.
- **Transport:** HTTPS everywhere; HSTS.
- **API protection:** per-IP rate limiting on all AI endpoints; request size limits.
- **Input handling:** strict validation (Pydantic on backend, schema validation on frontend) and sanitization of all user input, including chat and contact form.
- **CORS:** restricted to the production frontend origin.
- **Abuse mitigation:** spam protection on the contact form; prompt-injection-aware system prompts that keep the chatbot grounded and refuse to leak instructions.
- **PII:** contact submissions treated as sensitive; encrypted at rest (future DB) and never logged in plaintext.
- **Dependencies:** automated vulnerability checks in CI.

---

## 21. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | > 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |
| Lighthouse Best Practices | 100 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to first chat token | < 1.5s after send |
| JS bundle (initial) | Minimized via code-splitting & route-level lazy loading |

**Techniques:** static generation where possible, image optimization, font subsetting, code-splitting, precomputed embeddings, SSE streaming, and CDN edge delivery.

### SEO checklist
Meta tags, structured data (JSON-LD Person/CreativeWork), OpenGraph, Twitter cards, sitemap, robots.txt, and canonical URLs.

### Accessibility checklist
Keyboard navigation, ARIA labels, high-contrast compliance, screen-reader support, and reduced-motion support.

---

## 22. Future Roadmap

- **AI Agent** capable of navigating the site and completing tasks for the visitor.
- **Multi-agent system** for specialized sub-tasks (research, retrieval, drafting).
- **LangGraph** orchestration for complex, stateful agent flows.
- **MCP integration** to connect external tools/data sources.
- **Portfolio analytics** dashboard (interactions, funnels, conversions).
- **Visitor memory** for returning-user personalization.
- **Personal AI assistant** that can email/schedule on Aditya's behalf.
- **Realtime collaboration** for live pairing/demos.
- **Blog** launch for long-form technical writing.

---

## 23. Development Milestones

| Phase | Scope | Exit criteria |
|---|---|---|
| **M0 — Foundations** | Repo setup, design tokens, component primitives, CI | Lint/type/build green; design system renders |
| **M1 — Marketing shell** | Hero, nav, About, Skills, responsive layout, theming | Home fully responsive & accessible |
| **M2 — Projects** | Explorer, filters, 4 project detail pages | All four projects complete with full template |
| **M3 — Backend & AI** | FastAPI service, embeddings, `/chat`, `/emotion`, `/search` | Endpoints live, validated, rate-limited |
| **M4 — Playground** | Chat UI (streaming), emotion demo, semantic search, RAG explainer | All demos functional end-to-end |
| **M5 — Voice** | STT/TTS integration, voice assistant UI | Voice round-trip works with fallback |
| **M6 — Content & polish** | Experience, education, certifications, GitHub stats, contact | Content complete; conversion paths work |
| **M7 — Hardening** | Perf, a11y, SEO, security pass; Lighthouse targets | All performance/accessibility targets met |
| **M8 — Launch** | Production deploy, monitoring, final QA | Live on custom domain; deploys automated |

---

## 24. Acceptance Criteria

The project is considered **done** when all of the following hold:

**Experience**
- [ ] Hero renders headline, subtitle, mission, and both CTAs; CTAs behave as specified.
- [ ] Playground exposes chat, voice, emotion, and semantic search, all functional.
- [ ] RAG chatbot answers questions about Aditya accurately, streams responses, and refuses out-of-scope fabrication.
- [ ] Emotion demo returns labels + confidence; semantic search returns ranked results.
- [ ] All four flagship projects include every item in the detail template.
- [ ] Project Explorer filtering works across all seven categories.

**Quality gates**
- [ ] Lighthouse: Performance > 95, Accessibility 100, SEO 100, Best Practices 100.
- [ ] FCP < 1.5s and LCP < 2.5s on a representative device/network.
- [ ] Fully keyboard-navigable; screen-reader labels present; reduced-motion honored.
- [ ] Responsive and correct across mobile, tablet, laptop, desktop, and ultra-wide.

**Engineering**
- [ ] Strict TypeScript with no implicit `any`; feature-based structure followed.
- [ ] All API endpoints validated, rate-limited, CORS-restricted, and documented via OpenAPI.
- [ ] Secrets managed via environment variables; no secrets in client bundle.
- [ ] CI (lint, type-check, build) passes; deploys automated via GitHub Actions.

**Conversion**
- [ ] Résumé download, contact form, and social links all function correctly.

---

## 25. Conclusion

Aditya AI Studio reframes the portfolio as a **product**. Rather than asserting competence, it demonstrates it: a working RAG chatbot, live emotion detection, real semantic search, and a voice assistant, all wrapped in a premium, dark-mode-first, production-grade interface. The architecture cleanly separates a fast Next.js frontend from a scalable FastAPI inference layer, and every quality dimension — performance, accessibility, SEO, security — is held to production standards.

Built to this specification, the site should convince a hiring manager of Aditya's engineering ability within thirty seconds and invite them to explore for thirty minutes. It is detailed enough that a senior engineer can implement it end-to-end without further clarification, and structured so that the ambitious roadmap — agents, multi-agent orchestration, analytics, and personalization — can be layered on without rework.

**Build. Search. Understand. Communicate.**
