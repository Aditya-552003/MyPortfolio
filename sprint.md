# Aditya AI Studio — Sprint Roadmap

**Methodology:** Agile / Scrum · 2-week sprints  
**Team:** Solo developer (Aditya)  
**Velocity assumption:** ~40 story points / sprint (~6–8 productive hours/day)  
**Estimation scale:** Fibonacci — 1 SP ≈ 2–3 hours of focused work  
**Timeline:** 8 sprints · 16 weeks · ~313 SP total  
**PRD reference:** [PROJECT (1).md](./PROJECT%20(1).md)  
**Skills reference:** [SKILLS.md](./SKILLS.md)

---

## Table of Contents

1. [Global Definitions](#global-definitions)
2. [Epic Map](#epic-map)
3. [Sprint Dependency Graph](#sprint-dependency-graph)
4. [Sprint 0 — Foundations & Infrastructure](#sprint-0--foundations--infrastructure)
5. [Sprint 1 — Marketing Shell (Hero + Landing)](#sprint-1--marketing-shell-hero--landing)
6. [Sprint 2 — Portfolio Content + Project Explorer](#sprint-2--portfolio-content--project-explorer)
7. [Sprint 3 — Project Detail Pages + Backend Core](#sprint-3--project-detail-pages--backend-core)
8. [Sprint 4 — AI Endpoints + Playground UI](#sprint-4--ai-endpoints--playground-ui)
9. [Sprint 5 — Voice AI + RAG Explainer + Polish](#sprint-5--voice-ai--rag-explainer--polish)
10. [Sprint 6 — Hardening & Quality Gates](#sprint-6--hardening--quality-gates)
11. [Sprint 7 — Launch & Operations](#sprint-7--launch--operations)
12. [Summary Timeline](#summary-timeline)
13. [Risk Register](#risk-register)

---

## Global Definitions

### Definition of Done (DoD) — applies to ALL stories

Every user story is "Done" **only** when all of the following hold:

- [ ] Code is in **strict TypeScript** (frontend) or **typed Python** (backend) — zero `any`, zero untyped params
- [ ] Code follows the **feature-based folder structure** (PRD §12)
- [ ] Existing comments and docstrings are preserved unless directly modified
- [ ] Component is **responsive** across all 5 breakpoints (mobile / tablet / laptop / desktop / ultra-wide)
- [ ] Component is **keyboard-navigable** with visible focus rings
- [ ] Component honors **`prefers-reduced-motion`** where motion is used
- [ ] No **console errors or warnings** in dev or production builds
- [ ] Code passes **lint** (ESLint / Ruff) and **type-check** (tsc / mypy) with zero errors
- [ ] **Build succeeds** (`next build` / `uvicorn` startup) with no errors
- [ ] Committed with a **conventional commit** message (`feat:`, `fix:`, `chore:`, etc.)
- [ ] PR description documents what changed and why

### Definition of Ready (DoR) — every story must satisfy before entering a sprint

- [ ] Story has a clear title, description, and acceptance criteria
- [ ] Story is estimated in story points
- [ ] All dependencies are identified and either resolved or scheduled in an earlier sprint
- [ ] Design tokens / mockups are available if the story involves new UI

### MoSCoW Priority Key

| Tag | Meaning |
|-----|---------|
| **M** | Must have — launch-blocking |
| **S** | Should have — high value but launch can proceed without it |
| **C** | Could have — nice-to-have, deferred if velocity is tight |

---

## Epic Map

| Epic ID | Epic Name | Sprint(s) |
|---------|-----------|-----------|
| E0 | Project Foundations | Sprint 0 |
| E1 | Marketing Shell | Sprint 1 |
| E2 | Portfolio Content | Sprint 2 |
| E3 | Project Showcase | Sprint 2 – 3 |
| E4 | Backend & AI Core | Sprint 3 – 4 |
| E5 | AI Playground | Sprint 4 – 5 |
| E6 | Voice & Advanced AI | Sprint 5 |
| E7 | Hardening & Quality | Sprint 6 |
| E8 | Launch & Ops | Sprint 7 |

---

## Sprint Dependency Graph

```
Sprint 0 (Foundations)
   ├──► Sprint 1 (Marketing Shell)
   │       └──► Sprint 2 (Content + Explorer)
   │               └──► Sprint 3 (Projects + Backend)
   │                       └──► Sprint 4 (AI + Playground)
   │                               └──► Sprint 5 (Voice + Polish)
   │                                       └──► Sprint 6 (Hardening)
   │                                               └──► Sprint 7 (Launch)
   └──► Sprint 3 (Backend Core — can start infra in parallel)
```

---

## Sprint 0 — Foundations & Infrastructure

> **Sprint Goal:** Zero-to-buildable. Establish repo, CI, design system, and layout shell so every future sprint builds on a green pipeline.

**Duration:** 2 weeks (Weeks 1–2)  
**Epic:** E0 — Project Foundations  
**Capacity:** ~38 SP

---

### S0-1 · Repository & Toolchain Setup

**Priority:** M  
**Points:** 8 SP  
**As a** developer, **I want** a fully configured monorepo with CI **so that** every commit is validated automatically.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Initialize Git repo with `.gitignore`, `README.md`, `LICENSE` | 1 | ☑ |
| T2 | Scaffold Next.js (App Router) with TypeScript strict mode in `frontend/` | 2 | ☑ |
| T3 | Scaffold FastAPI project with Poetry/pip in `backend/` — `main.py` + `/api/health` endpoint | 2 | ☑ |
| T4 | Configure ESLint + Prettier (frontend), Ruff + mypy (backend) | 1 | ☑ |
| T5 | Create GitHub Actions CI workflow: lint → type-check → build on every push/PR | 2 | ☑ |

#### Acceptance Criteria

- [x] `npm run dev` starts frontend on `localhost:3000`
- [x] `uvicorn app.main:app` starts backend on `localhost:8000`
- [x] `GET /api/health` returns `{ "status": "ok" }`
- [x] CI runs on push/PR and blocks merge on failure
- [x] `tsconfig.json` has `strict: true`, `noImplicitAny: true`

---

### S0-2 · Folder Structure Scaffold

**Priority:** M  
**Points:** 5 SP  
**As a** developer, **I want** the full feature-based directory structure in place **so that** I never reorganize mid-project.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Create all frontend dirs per PRD §12: `app/`, `features/`, `components/`, `lib/`, `styles/`, `content/`, `public/`, `config/` | 2 | ☑ |
| T2 | Create all backend dirs per PRD §12: `routers/`, `services/`, `models/`, `core/`, `data/`, `embeddings/`, `scripts/`, `tests/` | 2 | ☑ |
| T3 | Add barrel `index.ts` / `__init__.py` files for clean imports | 1 | ☑ |

#### Acceptance Criteria

- [x] Folder structure matches PRD §12 exactly
- [x] All directories tracked by Git (placeholder files)
- [x] Import paths are clean and barrel-exported

---

### S0-3 · Design System & Tokens

**Priority:** M  
**Points:** 13 SP  
**As a** developer, **I want** a complete design system **so that** every component is visually consistent without ad-hoc styling.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Define CSS custom properties (design tokens) for colors, typography, spacing, radii, shadows, transitions per PRD §17 | 2 | ☑ |
| T2 | Configure Inter font via `next/font` with weights 400–800 | 1 | ☑ |
| T3 | Implement dark/light theme: CSS variables + toggle mechanism + localStorage persistence | 3 | ☑ |
| T4 | Build `Button` primitive (primary / secondary / ghost / icon variants; all interaction states) | 2 | ☑ |
| T5 | Build `Card` primitive (glass variant, standard variant, hover states) | 1 | ☑ |
| T6 | Build remaining primitives: `Badge`, `Tabs`, `Tooltip`, `Modal`, `Skeleton`, `Spinner`, `Divider` | 3 | ☑ |
| T7 | Build `SectionContainer` wrapper (max-width, padding, responsive) | 1 | ☑ |

#### Acceptance Criteria

- [x] All color tokens from PRD §17 are defined as CSS variables
- [x] Dark mode is default; light toggle works; preference persists in `localStorage`
- [x] Every primitive has hover, focus-visible, active, and disabled states
- [x] All primitives render correctly at all 5 breakpoints
- [x] Focus rings are clearly visible for keyboard navigation
- [x] Inter font loads with correct weights, no FOUT (Flash of Unstyled Text)

---

### S0-4 · Layout Shell

**Priority:** M  
**Points:** 12 SP  
**As a** visitor, **I want** persistent navigation and footer **so that** I can navigate the site from any page.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `AppShell` — top-level layout wrapping all pages | 1 | ☑ |
| T2 | Build `Navbar` — sticky glassmorphism nav: Home, Projects, Playground, Skills, Experience, Contact + Resume + ThemeToggle | 5 | ☑ |
| T3 | Build `MobileNav` — hamburger → slide-over menu for < 1024px | 3 | ☑ |
| T4 | Build `Footer` — links, copyright, social icons | 2 | ☑ |
| T5 | Build `ResumeButton` — styled CTA that downloads `resume.pdf` | 1 | ☑ |

#### Acceptance Criteria

- [x] Navbar is sticky with glassmorphism blur on scroll
- [x] Active section is highlighted in nav
- [x] Mobile nav collapses to hamburger below 1024px
- [ ] Resume button triggers file download — component wired; actual `public/resume.pdf` still needed (tracked for S7-5)
- [x] `backdrop-filter: blur()` used with fallback for unsupported browsers
- [x] Reduced-motion: no nav entrance animation

---

### Sprint 0 — Exit Criteria

- [x] Green CI pipeline (lint + type-check + build)
- [x] Design system renders on a demo page or `/design` route
- [x] Navbar, footer, and theme toggle functional
- [x] Both frontend and backend start without errors
- [x] Folder structure matches PRD §12

---

## Sprint 1 — Marketing Shell (Hero + Landing)

> **Sprint Goal:** A visitor lands on a stunning, fully accessible hero and can see About, Skills teasers, and a Playground hook — all responsive.

**Duration:** 2 weeks (Weeks 3–4)  
**Epic:** E1 — Marketing Shell  
**Capacity:** ~40 SP  
**Depends on:** Sprint 0

---

### S1-1 · Hero Section

**Priority:** M  
**Points:** 13 SP  
**As a** visitor, **I want** a visually stunning hero that communicates who Aditya is within 3 seconds **so that** I'm compelled to explore further.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `AnimatedGradient` background (Primary → Secondary gradient drift) | 3 | ☑ |
| T2 | Build `ParticleField` (subtle floating AI-themed particles, canvas/WebGL) | 5 | ☑ |
| T3 | Build `Hero` component: headline "Aditya AI Studio", subtitle, mission line | 2 | ☑ |
| T4 | Build `CTAButton` (primary: "Talk to My AI", secondary: "Explore Projects") | 1 | ☑ |
| T5 | Integrate `prefers-reduced-motion`: disable gradient drift + particles | 1 | ☑ |
| T6 | Responsive: stacked CTAs on mobile, centered text, adaptive particle density | 1 | ☑ |

> **Note:** T4 reused the `Button` primitive directly (primary/secondary variants) rather than a separate `CTAButton` wrapper — same behavior, no duplicate component.

#### Acceptance Criteria

- [x] Hero renders headline, subtitle, mission, and both CTAs (FR-H1, FR-H2, FR-H3)
- [x] "Talk to My AI" navigates to Playground section
- [ ] "Explore Projects" scrolls to Projects section — navigates to the dedicated `/projects` route instead; Projects is its own page, not a landing-page anchor, in this architecture
- [x] Gradient animation is subtle and smooth
- [x] Particles are low-amplitude, low-frequency, non-distracting
- [x] Reduced-motion: static gradient, no particle animation
- [x] FCP < 1.5s on representative hardware — Lighthouse FCP 0.2s / LCP 0.5s locally

---

### S1-2 · Landing Page Below-Fold Content

**Priority:** M  
**Points:** 10 SP  
**As a** visitor, **I want** condensed teasers below the hero **so that** I taste Aditya's skills, projects, and AI capabilities in one scroll.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build About teaser — short intro + "Learn More" link | 2 | ☑ |
| T2 | Build 3-item skills highlight strip (top categories + icons) | 3 | ☑ |
| T3 | Build Playground teaser card ("Try it now" → Playground) | 2 | ☑ |
| T4 | Build projects preview strip (3 featured project cards with hover effects) | 3 | ☑ |

#### Acceptance Criteria

- [x] Below-fold: About teaser, Skills highlight, Playground teaser, Projects strip
- [x] Each teaser links to its full section/page
- [x] Scroll-reveal animations: fade + translate (≤ 12px), staggered
- [x] Reduced-motion: final states shown immediately
- [x] Responsive: single-column mobile, multi-column desktop

---

### S1-3 · Scroll Reveal & Page Transitions

**Priority:** S  
**Points:** 5 SP  
**As a** visitor, **I want** smooth scroll-reveal animations **so that** the experience feels like a polished SaaS product.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `useScrollReveal` hook or Framer Motion wrapper with Intersection Observer | 3 | ☑ |
| T2 | Apply staggered reveals to all landing-page sections | 1 | ☑ |
| T3 | Add smooth-scroll for in-page navigation links | 1 | ☑ |

#### Acceptance Criteria

- [x] Elements fade in with subtle upward translate on scroll
- [x] Stagger: 50–100ms between items
- [x] Reduced-motion: all reveals disabled
- [x] Zero layout shift during reveals

---

### S1-4 · SEO & Metadata Foundation

**Priority:** M  
**Points:** 5 SP  
**As a** search engine / social platform, **I need** proper metadata **so that** the site is discoverable and shares well.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Configure `metadata` in `layout.tsx`: title, description, OpenGraph, Twitter cards | 2 | ☑ |
| T2 | Add JSON-LD structured data (Person, CreativeWork) | 1 | ☑ |
| T3 | Create `sitemap.ts`, `robots.ts`, canonical URL config | 1 | ☑ |
| T4 | Semantic HTML: single `<h1>` per page, heading hierarchy, `<main>`, `<section>`, `<nav>` | 1 | ☑ |

#### Acceptance Criteria

- [x] Lighthouse SEO = 100 — verified locally on `/`, `/projects/emosens`, `/playground`, `/contact`
- [ ] OpenGraph preview renders correctly on LinkedIn, Twitter, Slack — tags + dynamic OG image verified programmatically; not tested against live social platforms pre-deploy
- [x] Sitemap and robots.txt accessible
- [x] Every page has unique `<title>` and `<meta description>`

---

### S1-5 · Accessibility Layer — Pass 1

**Priority:** M  
**Points:** 7 SP  
**As a** user with accessibility needs, **I want** the site to be fully keyboard/screen-reader navigable **so that** the experience is inclusive.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Audit + add ARIA labels/roles to Navbar, MobileNav, Hero, all primitives | 3 | ☑ |
| T2 | Implement skip-to-content link | 1 | ☑ |
| T3 | Ensure all interactive elements are focusable in logical tab order | 2 | ☑ |
| T4 | Test with screen reader (NVDA/VoiceOver); fix announced labels | 1 | ☑ |

> **Note:** T4 verified via automated axe-core scans (0 violations, dark + light, all routes) and a scripted keyboard tab-order walk, not manual NVDA/VoiceOver — no screen reader available in this environment.

#### Acceptance Criteria

- [x] Lighthouse Accessibility = 100 on Home — and on every other sampled route
- [x] Skip-to-content is the first focusable element
- [x] All images have `alt`; decorative images have `alt=""`
- [x] Tab order follows visual reading order
- [ ] Screen reader announces nav items, buttons, headings correctly — inferred from ARIA audit + axe-core; not confirmed with an actual screen reader

---

### Sprint 1 — Exit Criteria

- [x] Landing page fully responsive + accessible at all 5 breakpoints
- [x] Lighthouse: Performance > 95, Accessibility = 100, SEO = 100, Best Practices = 100 — all 100 locally (desktop preset)
- [x] Hero animation smooth and reduced-motion compliant
- [x] Dark/light mode works on landing page
- [x] CI green — lint, type-check, format-check, build all pass locally; GitHub Actions run pending push

---

## Sprint 2 — Portfolio Content + Project Explorer

> **Sprint Goal:** All static portfolio sections built. Project Explorer index is interactive. Content sourced from typed data files.

**Duration:** 2 weeks (Weeks 5–6)  
**Epics:** E2, E3 (index only)  
**Capacity:** ~42 SP  
**Depends on:** Sprint 1

---

### S2-1 · Content Data Architecture

**Priority:** M  
**Points:** 5 SP  
**As a** developer, **I want** all portfolio content in typed data files **so that** components render data and content changes require zero code edits.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Create TS types/interfaces: `Project`, `Skill`, `Experience`, `Education`, `Certification` | 2 | ☑ |
| T2 | Create data files in `content/`: `projects.ts`, `skills.ts`, `experience.ts`, `education.ts`, `certifications.ts`, `about.ts` | 2 | ☑ |
| T3 | Populate data files with content from PRD + SKILLS.md | 1 | ☑ |

> **Note:** Experience/Education/Certifications have no real source data in this repo (resume, transcript, credentials). Per explicit user decision, these are populated with clearly-flagged placeholder entries (`isPlaceholder: true` → a visible "Sample data" badge) rather than fabricated history. About's journey timeline uses only real, already-established facts (the actual projects + this site).

#### Acceptance Criteria

- [x] All types are strict — no `any`
- [x] Data files export typed constants
- [x] 4 flagship projects defined with full metadata (explorer-level; the full 17-item detail template is Sprint 3)
- [x] All SKILLS.md skills represented with proficiency + category tags — 21 skills across 7 categories

---

### S2-2 · About Section

**Priority:** M  
**Points:** 5 SP  
**As a** visitor, **I want** a rich About section **so that** I understand who Aditya is and his career journey.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `AboutSection` — intro, objective, focus, mission, values | 3 | ☑ |
| T2 | Build `Timeline` + `TimelineItem` — vertical journey timeline | 2 | ☑ |

#### Acceptance Criteria

- [x] Renders: professional intro, career objective, focus, mission, values
- [x] Journey timeline displays milestones chronologically
- [x] Responsive: vertical on all breakpoints, adjusted spacing on mobile
- [x] Scroll-reveal on timeline items

---

### S2-3 · Skills Matrix

**Priority:** M  
**Points:** 5 SP  
**As a** visitor, **I want** a scannable skills section **so that** I quickly assess Aditya's technical breadth and depth.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `SkillsMatrix` — grouped layout with category headers | 3 | ☑ |
| T2 | Build `SkillPill` — individual badge with proficiency signal (color/icon) | 2 | ☑ |

#### Acceptance Criteria

- [x] Skills grouped per PRD §7.3: Programming, ML/DL, NLP, AI Systems, Backend, Frontend, DevOps
- [x] Proficiency levels (Core / Proficient / Working) visually differentiated
- [x] Interactive pills with hover effects
- [x] Responsive: multi-column desktop, wrapped mobile

---

### S2-4 · Experience & Education Timelines

**Priority:** M  
**Points:** 5 SP  
**As a** visitor, **I want** experience and education sections **so that** I verify real-world credentials.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build Experience timeline (reuse `Timeline` with experience data) | 2 | ☑ |
| T2 | Build Education timeline (university, degree, coursework) | 2 | ☑ |
| T3 | Add achievement highlights + tags to experience items | 1 | ☑ |

#### Acceptance Criteria

- [x] Experience: internships, freelance, open-source, achievements — placeholder entries, clearly flagged (see S2-1 note)
- [x] Education: university, degree, relevant coursework — placeholder entry, clearly flagged
- [x] Each entry: date range, title, description, optional tags
- [x] Scroll-reveal applied

---

### S2-5 · Certifications & GitHub Stats

**Priority:** S  
**Points:** 8 SP  
**As a** visitor, **I want** certifications and GitHub activity **so that** I see verified credentials and ongoing contributions.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `CertificationCard` — title, date, credential link | 2 | ☑ |
| T2 | Build `GitHubStats` — contribution graph, pinned repos, stars, followers, top languages | 5 | ☑ |
| T3 | Integrate GitHub API (or readme stats images as fallback) | 1 | ☑ |

> **Note:** GitHub stats use the real REST API (live followers/repos/languages/top-repos-by-stars) and the `ghchart.rshah.org` contribution-graph image, both genuinely working — but pointed at the placeholder username `octocat` (GitHub's own public demo account) since there's no real handle yet. Swap `githubUsername` in `config/site.ts` before launch. A visible badge flags this on the page.

#### Acceptance Criteria

- [x] Cert cards: title, date, clickable credential link
- [x] GitHub section: contribution graph, pinned repos, stars, followers, languages — real API data for the placeholder username
- [x] Graceful fallback if GitHub API unavailable — tested: falls back to a link to the profile; contribution image falls back to text on load failure

---

### S2-6 · Project Explorer (Index Page)

**Priority:** M  
**Points:** 8 SP  
**As a** visitor, **I want** an interactive project explorer with filtering **so that** I browse projects by technology category.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `ProjectExplorer` — grid layout of project cards | 2 | ☑ |
| T2 | Build `ProjectCard` — image, title, description, category badges, hover effects | 3 | ☑ |
| T3 | Build `CategoryFilter` — filter chips: AI, ML, NLP, Web, Vision, Search, Voice | 2 | ☑ |
| T4 | Implement filter logic with animated enter/exit transitions | 1 | ☑ |

> **Note:** No real project screenshots exist yet (Sprint 5 generates hero images), so `ProjectCard` shows a gradient placeholder with a category icon instead of a broken `<img>`. T2's "image" requirement is satisfied structurally; real images land in Sprint 5.

#### Acceptance Criteria

- [x] All 4 flagship projects render in responsive grid
- [x] Category filters work: "NLP" → only NLP-tagged projects — verified all 7 categories filter correctly (Playwright)
- [x] "All" filter shows everything
- [x] Cards have hover effects (scale / shadow / border glow) — new `Card` `hover="glow"` variant
- [x] Filtered cards animate in/out — Framer Motion `AnimatePresence`, reduced-motion aware
- [x] Each card links to `/projects/[slug]`

---

### S2-7 · Contact Section

**Priority:** M  
**Points:** 6 SP  
**As a** visitor, **I want** to contact Aditya and download his résumé **so that** I can take action on my interest.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `ContactForm` — name, email, message with validation | 3 | ☑ |
| T2 | Build `SocialLinks` — email, LinkedIn, GitHub icons | 1 | ☑ |
| T3 | Build `Toast` / `Notification` for success/error states | 1 | ☑ |
| T4 | Wire form to submission handler (placeholder API or email service) | 1 | ☑ |

> **Note:** T4's "placeholder API" is a Next.js route handler (`app/api/contact/route.ts`) with real validation, using the exact `{ error: { code, message } }` shape the real FastAPI endpoint will use — Sprint 3 (S3-4) swaps the fetch target, not the contract.

#### Acceptance Criteria

- [x] Form validates: required fields, email format — client-side + server-side (verified via direct API call)
- [x] Success/error toast shows after submission
- [x] Direct links to email, LinkedIn, GitHub functional — still placeholder URLs (Sprint 0 gap, unchanged)
- [ ] Résumé download works — button wired; `public/resume.pdf` still doesn't exist (tracked since Sprint 0, for S7-5)
- [x] Accessible: labels, error messages, focus management — focus moves to first invalid field; 0 axe violations

---

### Sprint 2 — Exit Criteria

- [x] All content sections render with real typed data — projects/skills real; experience/education/certifications/GitHub-username clearly-flagged placeholders pending real input
- [x] Project Explorer filtering works across all 7 categories
- [x] Contact form validates and shows success/error
- [x] All new sections responsive + accessible — Lighthouse 100/100/100/100 and 0 axe violations (dark + light) on all Sprint 2 routes
- [x] CI green — lint, type-check, format-check, build (frontend) + ruff, mypy, pytest (backend) all pass locally
- [ ] CI green

---

## Sprint 3 — Project Detail Pages + Backend Core

> **Sprint Goal:** All 4 flagship project detail pages complete. FastAPI backend live with core infrastructure (CORS, rate limiting, validation, error handling).

**Duration:** 2 weeks (Weeks 7–8)  
**Epics:** E3 (details), E4 (infra)  
**Capacity:** ~42 SP  
**Depends on:** Sprint 2

---

### S3-1 · Project Detail Page Template

**Priority:** M  
**Points:** 8 SP  
**As a** visitor, **I want** rich deep-dive project pages **so that** I assess technical depth.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `ProjectHero` — large hero image per project | 1 | ☑ |
| T2 | Build `ArchitectureDiagram` — image/SVG display component | 2 | ☑ |
| T3 | Build `TechStackGrid` — technology icons/badges grid | 1 | ☑ |
| T4 | Build `FolderTree` — stylized directory tree renderer | 2 | ☑ |
| T5 | Build `MetricsPanel`, `ScreenshotGallery`, `ChallengesList`, `LessonsList` | 2 | ☑ |

> **Note:** T1's "hero image" and T2's "architecture diagram" are rendered, not static images — a gradient+category-icon banner and a real data-flow diagram built from each project's actual pipeline steps, since no project screenshots exist yet. `ScreenshotGallery` and `LessonsList`/`ChallengesList`/an `ApiEndpointsList` were added beyond the original list to cover the remaining template items cleanly.

#### Acceptance Criteria

- [x] Template covers all 17 items from PRD §7.4
- [x] Dynamic route `/projects/[slug]` resolves for all 4 projects — 3 projects (see S3-2 note on Voice AI Assistant)
- [x] Components render from data in `content/projects.ts`
- [x] Responsive + keyboard-navigable

---

### S3-2 · Four Flagship Project Pages

**Priority:** M  
**Points:** 13 SP  
**As a** visitor, **I want** each flagship project fully populated **so that** I see real engineering depth.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | **EmoSens** (Emotion Detection): dataset, metrics, confusion matrix, training pipeline, inference flow | 3 | ☑ |
| T2 | **Chat with Code** (Repository Analysis): chunking, retriever, LLM layer, architecture, flow diagram | 4 | ☑ |
| T3 | ~~**Voice AI Assistant**: pipeline, latency handling, architecture~~ | 3 | ✗ |
| T4 | **Smart Shortlist**: embeddings, cosine similarity, recommendation pipeline, ranking | 3 | ☑ |

> **Note:** Voice AI Assistant was dropped from the flagship lineup (explicit product decision). The real repo (`Voice-Assistant`) turned out to be a ~100-line Tkinter script — Google's free `speech_recognition` for STT, `pyttsx3` for TTS, plain `if/elif` keyword matching — not the LLM-grounded conversational assistant the original PRD described. Rather than fabricate depth that isn't there, the flagship lineup is now 3 projects: **EmoSens**, **Chat with Code**, **Smart Shortlist**. All three are populated from the real repositories (READMEs, source, and — for EmoSens — an actual generated `metrics.json`), pulled and verified by cloning each repo, not invented from the PRD's aspirational descriptions. One correction made along the way: EmoSens uses a RoBERTa + XGBoost ensemble, not "BERT and RoBERTa" as the PRD stated.

#### Acceptance Criteria

- [x] Each detail page has all 17 template items
- [x] Architecture diagrams present (generated or SVG) — generated from real pipeline data, not static images
- [x] GitHub/demo links functional (or graceful "coming soon") — GitHub links are real repos; no live demos are deployed yet, so those buttons show a disabled "coming soon" state
- [x] Correct category tags from SKILLS.md

---

### S3-3 · Backend Infrastructure

**Priority:** M  
**Points:** 13 SP  
**As a** developer, **I want** the FastAPI backend production-ready **so that** AI endpoints can be added safely.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Configure CORS middleware locked to frontend origin | 1 | ☑ |
| T2 | Implement per-IP rate limiting (slowapi or custom) | 3 | ☑ |
| T3 | Define Pydantic base models: request/response/error `{ error: { code, message } }` | 2 | ☑ |
| T4 | Implement global exception handler with consistent error shape | 2 | ☑ |
| T5 | Add request logging middleware (structured JSON logs) | 2 | ☑ |
| T6 | Configure env var management (pydantic-settings / python-dotenv) | 1 | ☑ |
| T7 | Add `/api/contact` endpoint with validation + spam protection | 2 | ☑ |

> **Note:** T5's logging middleware also stamps + returns an `X-Request-ID` header per request (originally an S7-3 concern) — cheap to add alongside the middleware itself, so pulled forward. Spam protection (T7) is a honeypot field: a CSS-hidden input real users never fill in; a non-empty value causes the backend to silently return success without processing.

#### Acceptance Criteria

- [x] CORS only allows configured frontend origin
- [x] Rate limiting returns `429 Too Many Requests` after threshold — verified: 429 after ~3-4 rapid requests on `/api/contact` (5/minute limit)
- [x] All errors follow `{ error: { code, message } }` shape — verified for validation errors, 404s, and rate limits
- [x] OpenAPI docs auto-generated at `/docs` — verified `/docs` and `/openapi.json` both return 200
- [x] Env vars loaded from `.env` (dev) or platform env (prod)
- [x] `/api/contact` validates input and returns success/error
- [x] No secrets hardcoded; `.env` in `.gitignore`

---

### S3-4 · Frontend ↔ Backend Integration Layer

**Priority:** M  
**Points:** 8 SP  
**As a** developer, **I want** a typed API client **so that** all backend calls go through a single consistent layer.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build API client in `lib/api.ts` — base URL, error handling, typed responses | 3 | ☑ |
| T2 | Set up React Query (TanStack Query) — global config, query client, provider | 2 | ☑ |
| T3 | Create custom hooks: `useChat`, `useEmotion`, `useSemanticSearch`, `useContact` (stubs) | 2 | ☑ |
| T4 | Wire contact form to backend `/api/contact` | 1 | ☑ |

> **Note:** `useContact` is fully functional; `useEmotion`/`useSemanticSearch` are typed and call the real (not-yet-built) endpoint paths, so Sprint 4 just has to build the backend — no frontend changes needed. `useChat` is typed but its `sendMessage` throws, since SSE streaming needs materially different plumbing than a JSON mutation (that's explicitly S4-2 T3). The Sprint 2 placeholder Next.js `/api/contact` route was deleted now that the real backend handles it.

#### Acceptance Criteria

- [x] API client handles errors consistently with typed error objects — `ApiError` class carries `status` + `code` + `message`
- [x] React Query configured with sensible defaults (retry, stale time)
- [x] All hooks typed with Pydantic-matching TS interfaces
- [x] Contact form submits to backend; real success/error responses — verified end-to-end (Playwright confirmed the request hits `localhost:8000`, not a Next.js route)

---

### Sprint 3 — Exit Criteria

- [x] All 4 project detail pages render with full content — 3 flagship projects (Voice AI Assistant dropped; see S3-2)
- [x] Backend starts with CORS, rate limiting, validation, error handling
- [x] `/api/contact` functional end-to-end — real backend, verified via Playwright + curl
- [x] OpenAPI docs render at `/docs`
- [x] Frontend API client typed and integrated
- [x] CI green — lint, type-check, format-check, build (frontend) + ruff, mypy, pytest (backend) all pass locally; Lighthouse 100/100/100/100 and 0 axe violations (dark + light) on all new routes

---

## Sprint 4 — AI Endpoints + Playground UI

> **Sprint Goal:** Three core AI endpoints (chat/RAG, emotion, semantic search) are functional. Playground hub UI is built with working demos.

**Duration:** 2 weeks (Weeks 9–10)  
**Epics:** E4 (endpoints), E5 (playground)  
**Capacity:** ~43 SP  
**Depends on:** Sprint 3

---

### S4-1 · Embedding Pipeline & RAG Ingestion

**Priority:** M  
**Points:** 8 SP  
**As a** developer, **I want** personal content chunked, embedded, and stored **so that** RAG chatbot and semantic search retrieve context at request time.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Write ingestion script: load résumé, projects, skills, experience from source files | 2 | ☐ |
| T2 | Implement chunking strategy (overlapping chunks, metadata preservation) | 2 | ☐ |
| T3 | Embed chunks with Sentence Transformers; save to disk/vector store | 3 | ☐ |
| T4 | Build retrieval service: embed query → cosine similarity → top-k chunks | 1 | ☐ |

#### Acceptance Criteria

- [ ] Ingestion processes all personal content into chunks
- [ ] Each chunk preserves source metadata (section, project name, type)
- [ ] Embeddings precomputed and persisted (not per-request)
- [ ] Retrieval returns top-k chunks with similarity scores

---

### S4-2 · `/api/chat` — RAG Chatbot Endpoint

**Priority:** M  
**Points:** 13 SP  
**As a** visitor, **I want** to chat with an AI that knows everything about Aditya **so that** I ask questions naturally and get accurate, sourced answers.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build RAG service: query embed → retrieval → context assembly → LLM prompt | 3 | ☐ |
| T2 | Implement grounding system prompt (restrict to Aditya's info) | 2 | ☐ |
| T3 | Implement streaming via SSE (Server-Sent Events) | 3 | ☐ |
| T4 | Implement per-session conversation memory (history in request) | 2 | ☐ |
| T5 | Implement guardrails: out-of-scope redirect, no hallucination, no instruction leak | 2 | ☐ |
| T6 | Add citations/links to relevant projects/sections in responses | 1 | ☐ |

#### Acceptance Criteria

- [ ] `/api/chat` accepts `{ message, history }`, streams via SSE
- [ ] Responses grounded in retrieved context — no fabricated facts
- [ ] Out-of-scope: polite redirect ("I can only speak to Aditya's work…")
- [ ] Follow-ups respect conversation context
- [ ] Quick-ask presets return correct answers
- [ ] First token < 1.5s after send

---

### S4-3 · `/api/emotion` — Emotion Detection

**Priority:** M  
**Points:** 5 SP  
**As a** visitor, **I want** to submit text and see predicted emotions **so that** I try a live AI demo.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Load BERT/RoBERTa emotion classifier at startup | 2 | ☐ |
| T2 | Build `/api/emotion`: text in → emotions + confidence out | 2 | ☐ |
| T3 | Input validation (min/max length) + error handling | 1 | ☐ |

#### Acceptance Criteria

- [ ] Returns `{ emotions: [{ label, confidence }] }`
- [ ] Confidence scores between 0 and 1
- [ ] Empty/too-long input → validation error
- [ ] Model loads once at startup

---

### S4-4 · `/api/search` — Semantic Search

**Priority:** M  
**Points:** 5 SP  
**As a** visitor, **I want** to search skills/projects by natural language **so that** I find what's relevant.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `/api/search`: query → embed → cosine similarity → ranked results | 3 | ☐ |
| T2 | Return title, type (skill/project/tech), score, URL | 1 | ☐ |
| T3 | Input validation + empty-result handling | 1 | ☐ |

#### Acceptance Criteria

- [ ] Returns `{ results: [{ title, type, score, url }] }` ranked by score
- [ ] "Which projects use transformers?" returns EmoSens etc.
- [ ] Empty query → validation error; no match → empty array + message

---

### S4-5 · Playground Hub UI

**Priority:** M  
**Points:** 12 SP  
**As a** visitor, **I want** a Playground hub with chat, emotion, and search demos **so that** I try each AI capability interactively.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `PlaygroundHub` — tabbed/card layout with 4 demo sections | 2 | ☐ |
| T2 | Build `ChatWindow` + `ChatMessage` + `ChatInput` + `StreamingText` | 4 | ☐ |
| T3 | Build `QuickAskChips` — preset prompts ("Show Resume", etc.) | 1 | ☐ |
| T4 | Build `EmotionDemo` — `EmotionInput` + `EmotionResultBars` (animated bars) | 3 | ☐ |
| T5 | Build `SemanticSearchDemo` — `SearchInput` + `RankedResultList` | 2 | ☐ |

#### Acceptance Criteria

- [ ] Playground hub displays all demos via tabs/cards
- [ ] Chat streams tokens in real-time with typing indicator
- [ ] Quick-ask chips insert preset prompts
- [ ] Emotion demo shows animated confidence bars
- [ ] Semantic search shows ranked results with scores
- [ ] All demos handle loading, error, empty states gracefully
- [ ] Responsive: stacked mobile, side-by-side desktop

---

### Sprint 4 — Exit Criteria

- [ ] 3 AI endpoints live, validated, rate-limited
- [ ] RAG chatbot answers about Aditya accurately with streaming
- [ ] Emotion demo returns labels + confidence
- [ ] Semantic search returns ranked results
- [ ] Playground UI fully functional end-to-end
- [ ] CI green

---

## Sprint 5 — Voice AI + RAG Explainer + Polish

> **Sprint Goal:** Voice assistant functional (STT/TTS). RAG explainer built. First visual polish pass across the entire site.

**Duration:** 2 weeks (Weeks 11–12)  
**Epics:** E6, E5 (remaining)  
**Capacity:** ~40 SP  
**Depends on:** Sprint 4

---

### S5-1 · Voice AI Endpoints

**Priority:** S  
**Points:** 8 SP  
**As a** visitor, **I want** to speak a question and hear the answer **so that** I experience voice-first AI.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `/api/voice/stt`: audio in → transcript out (STT provider API) | 3 | ☐ |
| T2 | Build `/api/voice/tts`: text in → audio out (TTS provider API) | 3 | ☐ |
| T3 | Timeout/retry logic for external voice provider calls | 1 | ☐ |
| T4 | Graceful fallback when voice services unavailable | 1 | ☐ |

#### Acceptance Criteria

- [ ] STT converts audio to text accurately
- [ ] TTS generates natural-sounding audio
- [ ] Timeouts return friendly errors, not crashes
- [ ] When provider down, UI shows text-only fallback

---

### S5-2 · Voice Assistant UI

**Priority:** S  
**Points:** 8 SP  
**As a** visitor, **I want** a voice panel with mic, waveform, and transcript **so that** the interaction feels polished.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `MicButton` with recording state (pulsing animation) | 2 | ☐ |
| T2 | Build `AudioVisualizer` — real-time waveform visualization | 3 | ☐ |
| T3 | Build `TranscriptView` — STT transcript + streamed text response | 2 | ☐ |
| T4 | Wire full round-trip: mic → STT → RAG → TTS + streaming text | 1 | ☐ |

#### Acceptance Criteria

- [ ] Mic button starts/stops recording with visual feedback
- [ ] Waveform shows during recording
- [ ] Transcript appears; response streams as text
- [ ] TTS plays answer audio simultaneously
- [ ] Reduced-motion: disable waveform, keep static indicator

---

### S5-3 · RAG Explainer

**Priority:** S  
**Points:** 5 SP  
**As a** visitor, **I want** an interactive walkthrough of how the RAG system works **so that** I understand the engineering.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `RagExplainer` — step-through: Ingest → Chunk → Embed → Retrieve → Generate | 3 | ☐ |
| T2 | Add data-flow animations between steps | 1 | ☐ |
| T3 | Add non-technical-friendly descriptions per step | 1 | ☐ |

#### Acceptance Criteria

- [ ] 5 steps with visual icons/diagrams
- [ ] User can step through or auto-play
- [ ] Jargon-minimized explanations at each step
- [ ] Reduced-motion: instant step transitions

---

### S5-4 · Visual Polish Pass

**Priority:** M  
**Points:** 13 SP  
**As a** visitor, **I want** the entire site to feel premium **so that** it's indistinguishable from a real SaaS product.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Audit + refine spacing, alignment, typography consistency across all pages | 3 | ☐ |
| T2 | Refine glassmorphism effects (blur quality, border opacity) | 2 | ☐ |
| T3 | Add/refine hover effects on all interactive elements | 2 | ☐ |
| T4 | Add skeletons to all data-fetching sections | 2 | ☐ |
| T5 | Refine light mode: ensure equal visual quality | 2 | ☐ |
| T6 | Generate hero images + architecture diagrams for all 4 projects | 2 | ☐ |

#### Acceptance Criteria

- [ ] No misaligned elements, inconsistent spacing, orphaned text
- [ ] Hover effects smooth (150–300ms transitions)
- [ ] Loading skeletons prevent layout shift
- [ ] Light mode polished, not just color inversion
- [ ] All projects have real images

---

### S5-5 · Graceful Degradation

**Priority:** M  
**Points:** 6 SP  
**As a** visitor, **I want** the site to work even when AI services are down **so that** I never see a broken page.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Add error boundaries around all AI-dependent components | 2 | ☐ |
| T2 | Build fallback states: cached answers for common chatbot queries | 2 | ☐ |
| T3 | Add timeout indicators + retry buttons for slow responses | 1 | ☐ |
| T4 | Add backend health check + frontend status indicator | 1 | ☐ |

#### Acceptance Criteria

- [ ] Backend unreachable → Playground shows friendly message (no crash/infinite spinner)
- [ ] Common queries have cached fallback answers
- [ ] Slow responses: timeout message + retry after 10s
- [ ] Non-AI sections fully functional without backend

---

### Sprint 5 — Exit Criteria

- [ ] Voice round-trip works end-to-end with fallback
- [ ] RAG explainer interactive and informative
- [ ] Visual quality premium across all pages in both themes
- [ ] Graceful degradation when AI unavailable
- [ ] CI green

---

## Sprint 6 — Hardening & Quality Gates

> **Sprint Goal:** Hit all performance, accessibility, SEO, and security targets. Fix every edge case.

**Duration:** 2 weeks (Weeks 13–14)  
**Epic:** E7 — Hardening  
**Capacity:** ~38 SP  
**Depends on:** Sprint 5

---

### S6-1 · Performance Optimization

**Priority:** M  
**Points:** 10 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Run Lighthouse; document all failing metrics | 1 | ☐ |
| T2 | Route-level code-splitting + lazy loading (Playground, Voice) | 3 | ☐ |
| T3 | Optimize images: `next/image`, WebP/AVIF, responsive `srcSet`, lazy load | 2 | ☐ |
| T4 | Font optimization: subset Inter, `font-display: swap`, preload critical weights | 1 | ☐ |
| T5 | Bundle analysis (`@next/bundle-analyzer`); eliminate dead code | 2 | ☐ |
| T6 | Cache headers for static assets | 1 | ☐ |

#### Acceptance Criteria

- [ ] Lighthouse Performance > 95
- [ ] FCP < 1.5s, LCP < 2.5s
- [ ] Initial JS bundle minimized
- [ ] No render-blocking resources

---

### S6-2 · Accessibility Audit — Final Pass

**Priority:** M  
**Points:** 8 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Run axe-core / Lighthouse a11y on every page | 1 | ☐ |
| T2 | Fix all issues: contrast, ARIA, roles, focus management | 3 | ☐ |
| T3 | Full keyboard nav test across all pages + Playground | 2 | ☐ |
| T4 | Screen reader test (NVDA/VoiceOver) | 1 | ☐ |
| T5 | Verify `prefers-reduced-motion` honored everywhere | 1 | ☐ |

#### Acceptance Criteria

- [ ] Lighthouse Accessibility = 100 on **all** pages
- [ ] Zero axe-core violations
- [ ] Complete keyboard flow: navigate, chat, run demos, submit forms
- [ ] Screen reader announces all elements correctly
- [ ] Reduced-motion fully disables all animations

---

### S6-3 · Security Hardening

**Priority:** M  
**Points:** 8 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Audit env vars — verify no secrets in client bundle | 1 | ☐ |
| T2 | Request size limits on all API endpoints | 1 | ☐ |
| T3 | Prompt-injection-aware system prompts; test adversarial inputs | 2 | ☐ |
| T4 | CSRF / spam protection on contact form (honeypot + rate limit) | 2 | ☐ |
| T5 | Audit CORS — locked to production origin only | 1 | ☐ |
| T6 | `npm audit` + `pip audit`; fix high/critical vulns | 1 | ☐ |

#### Acceptance Criteria

- [ ] No secrets in client bundle (verified via `next build` output)
- [ ] Prompt injection blocked; chatbot stays grounded
- [ ] Contact spam protection functional
- [ ] All dependency vulns resolved
- [ ] CORS headers only allow production frontend

---

### S6-4 · SEO Final Pass

**Priority:** M  
**Points:** 5 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Verify unique title + meta description on all pages | 1 | ☐ |
| T2 | Verify JSON-LD structured data on all pages | 1 | ☐ |
| T3 | Test OpenGraph/Twitter previews on LinkedIn, Twitter/X, Slack | 1 | ☐ |
| T4 | Verify sitemap includes all routes; robots.txt correct | 1 | ☐ |
| T5 | Verify canonical URLs | 1 | ☐ |

#### Acceptance Criteria

- [ ] Lighthouse SEO = 100 on all pages
- [ ] Social previews correct on LinkedIn, Twitter/X, Slack
- [ ] Sitemap comprehensive + auto-generated
- [ ] No duplicate canonical URLs

---

### S6-5 · Cross-Browser & Device Testing

**Priority:** M  
**Points:** 7 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Test on Chrome, Firefox, Safari, Edge (latest) | 2 | ☐ |
| T2 | Test on iOS Safari + Chrome Android | 2 | ☐ |
| T3 | Test at all 5 breakpoints | 2 | ☐ |
| T4 | Fix any browser/viewport-specific issues | 1 | ☐ |

#### Acceptance Criteria

- [ ] No visual/functional bugs in Chrome, Firefox, Safari, Edge
- [ ] Touch targets ≥ 44px on mobile
- [ ] No horizontal scroll at any breakpoint
- [ ] Content max-width enforced on ultra-wide

---

### Sprint 6 — Exit Criteria

- [ ] Lighthouse: Performance > 95, Accessibility = 100, SEO = 100, Best Practices = 100 — **on ALL pages**
- [ ] Zero console errors/warnings in production build
- [ ] All security measures in place
- [ ] Cross-browser compatible
- [ ] CI green

---

## Sprint 7 — Launch & Operations

> **Sprint Goal:** Deploy to production, configure monitoring, final QA, go live.

**Duration:** 2 weeks (Weeks 15–16)  
**Epic:** E8 — Launch & Ops  
**Capacity:** ~30 SP  
**Depends on:** Sprint 6

---

### S7-1 · Deployment Pipeline

**Priority:** M  
**Points:** 8 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Configure Vercel: connect repo, set env vars, custom domain | 2 | ☐ |
| T2 | Configure Render: deploy backend, env vars, health checks | 3 | ☐ |
| T3 | Update GitHub Actions: on merge to `main` → deploy both | 2 | ☐ |
| T4 | Configure PR preview deploys | 1 | ☐ |

#### Acceptance Criteria

- [ ] `git push main` → automatic production deploy
- [ ] Frontend live on custom domain with HTTPS
- [ ] Backend health endpoint monitored
- [ ] PR previews work for frontend

---

### S7-2 · Custom Domain & SSL

**Priority:** M  
**Points:** 3 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Configure DNS records | 1 | ☐ |
| T2 | Verify SSL/HTTPS + HSTS | 1 | ☐ |
| T3 | Redirect www ↔ non-www | 1 | ☐ |

#### Acceptance Criteria

- [ ] `https://[domain]` works
- [ ] HTTP → HTTPS redirect
- [ ] HSTS headers set
- [ ] www + non-www both resolve

---

### S7-3 · Monitoring & Error Tracking

**Priority:** S  
**Points:** 5 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Uptime monitoring on backend health endpoint | 1 | ☐ |
| T2 | Frontend error tracking (Sentry free tier or similar) | 2 | ☐ |
| T3 | Backend structured logging with request ID tracing | 1 | ☐ |
| T4 | Alerts for error spikes + downtime | 1 | ☐ |

#### Acceptance Criteria

- [ ] Downtime triggers alert
- [ ] Frontend errors captured with stack traces
- [ ] Backend logs structured (JSON) with request IDs

---

### S7-4 · Final QA & Smoke Tests

**Priority:** M  
**Points:** 8 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Run full acceptance criteria checklist (PRD §24) on production | 3 | ☐ |
| T2 | Test all user flows A–E (PRD §10) end-to-end on production | 2 | ☐ |
| T3 | Lighthouse on production domain | 1 | ☐ |
| T4 | Edge cases: empty states, max-length input, rapid clicks, back/forward nav | 1 | ☐ |
| T5 | Fix any launch-blocking bugs | 1 | ☐ |

#### Acceptance Criteria

- [ ] All PRD §24 acceptance criteria pass ✅
- [ ] All 5 user flows (§10) complete without errors
- [ ] Lighthouse targets met on production
- [ ] No launch-blocking bugs remain

---

### S7-5 · Launch Checklist & Go-Live

**Priority:** M  
**Points:** 6 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Final content review: text, links, images all correct | 2 | ☐ |
| T2 | Update `resume.pdf` in `public/` with latest version | 1 | ☐ |
| T3 | Verify OpenGraph image on LinkedIn + Twitter/X | 1 | ☐ |
| T4 | Submit sitemap to Google Search Console | 1 | ☐ |
| T5 | Post launch announcement (LinkedIn, Twitter/X, communities) | 1 | ☐ |

#### Acceptance Criteria

- [ ] No typos, broken links, or placeholder content
- [ ] Social sharing preview professional
- [ ] Site indexed by Google
- [ ] Launch announcement posted

---

### Sprint 7 — Exit Criteria

- [ ] Site live on custom domain with HTTPS
- [ ] Deployments fully automated
- [ ] Monitoring + error tracking active
- [ ] All PRD acceptance criteria met
- [ ] 🚀 **LAUNCHED**

---

## Summary Timeline

| Sprint | Weeks | Theme | Key Deliverables | SP |
|--------|-------|-------|------------------|----|
| **Sprint 0** | 1–2 | Foundations | Repo, CI, design system, layout shell | 38 |
| **Sprint 1** | 3–4 | Marketing Shell | Hero, landing page, SEO, a11y pass 1 | 40 |
| **Sprint 2** | 5–6 | Content + Explorer | About, Skills, Experience, Education, Certs, GitHub, Contact, Project Explorer | 42 |
| **Sprint 3** | 7–8 | Projects + Backend | 4 project detail pages, backend infrastructure, API client | 42 |
| **Sprint 4** | 9–10 | AI + Playground | RAG chatbot, emotion, semantic search endpoints + Playground UI | 43 |
| **Sprint 5** | 11–12 | Voice + Polish | Voice AI, RAG explainer, visual polish, graceful degradation | 40 |
| **Sprint 6** | 13–14 | Hardening | Performance, accessibility, security, SEO, cross-browser | 38 |
| **Sprint 7** | 15–16 | Launch | Deployment, monitoring, QA, go-live 🚀 | 30 |
| | | | **Total** | **313** |

---

## Risk Register

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| R1 | LLM API costs exceed budget | Medium | High | Free/low-cost tiers; cache frequent responses; hard rate limits |
| R2 | Voice provider API latency/reliability | High | Medium | Text-only fallback; 10s timeout; voice as "bonus" feature |
| R3 | Model loading cold start (Render free tier) | High | Medium | Warm-up health checks; consider alternative hosting |
| R4 | Solo developer burnout over 16 weeks | Medium | High | Strict sprint scope; no scope creep; celebrate sprint completions |
| R5 | Browser API compat (Web Speech, MediaRecorder) | Medium | Low | Feature-detect + graceful degrade; polyfills where available |
| R6 | Content gaps (screenshots, architecture diagrams) | Low | Medium | Generate images early in Sprint 3; don't block on perfection |
| R7 | Scope creep from "Future Roadmap" features | Medium | High | Hard scope boundary: only PRD v1.0 features in these 8 sprints |

---

*Last updated: 2026-07-08*  
*Next review: End of Sprint 0 (Week 2)*
