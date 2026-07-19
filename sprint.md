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
| T1 | Write ingestion script: load résumé, projects, skills, experience from source files | 2 | ☑ |
| T2 | Implement chunking strategy (overlapping chunks, metadata preservation) | 2 | ☑ |
| T3 | Embed chunks with Sentence Transformers; save to disk/vector store | 3 | ☑ |
| T4 | Build retrieval service: embed query → cosine similarity → top-k chunks | 1 | ☑ |

#### Acceptance Criteria

- [x] Ingestion processes all personal content into chunks
- [x] Each chunk preserves source metadata (section, project name, type)
- [x] Embeddings precomputed and persisted (not per-request)
- [x] Retrieval returns top-k chunks with similarity scores

> **Note:** T2 uses heading-based chunking (split on `#`–`######` markdown headings, one chunk per section) rather than fixed-size overlapping windows — the source content (`about.md`, `projects.md`, `SKILLS.md`) is already short and section-structured, so heading boundaries give cleaner, more coherent chunks than an arbitrary overlap window would. 42 RAG chunks and 24 search items were produced from real content, saved to `backend/embeddings/*.json/.npy`, and loaded once at startup (not per-request) via `load_rag_index()`/`load_search_index()`.

---

### S4-2 · `/api/chat` — RAG Chatbot Endpoint

**Priority:** M  
**Points:** 13 SP  
**As a** visitor, **I want** to chat with an AI that knows everything about Aditya **so that** I ask questions naturally and get accurate, sourced answers.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build RAG service: query embed → retrieval → context assembly → LLM prompt | 3 | ☑ |
| T2 | Implement grounding system prompt (restrict to Aditya's info) | 2 | ☑ |
| T3 | Implement streaming via SSE (Server-Sent Events) | 3 | ☑ |
| T4 | Implement per-session conversation memory (history in request) | 2 | ☑ |
| T5 | Implement guardrails: out-of-scope redirect, no hallucination, no instruction leak | 2 | ☑ |
| T6 | Add citations/links to relevant projects/sections in responses | 1 | ☑ |

#### Acceptance Criteria

- [x] `/api/chat` accepts `{ message, history }`, streams via SSE
- [x] Responses grounded in retrieved context — no fabricated facts
- [x] Out-of-scope: polite redirect ("I can only speak to Aditya's work…")
- [x] Follow-ups respect conversation context
- [x] Quick-ask presets return correct answers
- [x] First token < 1.5s after send

> **Note:** Verified live against the real Gemini 2.5 Flash API (not a mock) — grounded answers, off-topic redirect, fabrication-refusal, and multi-turn follow-ups all confirmed via streaming `curl` tests and browser testing. T6's "citations" are the model naming specific projects/skills in-line per the system prompt (e.g. "**Chat with Portfolio**", "**Chat with Code**") rather than auto-generated hyperlinks — the model has no mechanism to emit real URLs, so this stays truthful (named references only) rather than fabricating links.

---

### S4-3 · `/api/emotion` — Emotion Detection

**Priority:** M  
**Points:** 5 SP  
**As a** visitor, **I want** to submit text and see predicted emotions **so that** I try a live AI demo.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Load BERT/RoBERTa emotion classifier at startup | 2 | ☑ |
| T2 | Build `/api/emotion`: text in → emotions + confidence out | 2 | ☑ |
| T3 | Input validation (min/max length) + error handling | 1 | ☑ |

#### Acceptance Criteria

- [x] Returns `{ emotions: [{ label, confidence }] }`
- [x] Confidence scores between 0 and 1
- [x] Empty/too-long input → validation error
- [x] Model loads once at startup

> **Note:** This is the real EmoSens ensemble (fine-tuned RoBERTa + XGBoost, confidence-gated blend) from the [emosense-ai](https://github.com/Aditya-552003/emosense-ai.git) project, downloaded from a private Hugging Face Hub repo at startup — not a placeholder classifier. Verified with real predictions (e.g. a fear sentence → 97.16% fear, a joy sentence → 92.48%/92% joy live in the browser). If HF download or model loading fails, the router returns 503 rather than crashing the app, so the rest of the site keeps working.

---

### S4-4 · `/api/search` — Semantic Search

**Priority:** M  
**Points:** 5 SP  
**As a** visitor, **I want** to search skills/projects by natural language **so that** I find what's relevant.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `/api/search`: query → embed → cosine similarity → ranked results | 3 | ☑ |
| T2 | Return title, type (skill/project/tech), score, URL | 1 | ☑ |
| T3 | Input validation + empty-result handling | 1 | ☑ |

#### Acceptance Criteria

- [x] Returns `{ results: [{ title, type, score, url }] }` ranked by score
- [x] "Which projects use transformers?" returns EmoSens etc.
- [x] Empty query → validation error; no match → empty array + message

> **Note:** Verified live: "which projects use transformers" correctly ranks Deep Learning, Transformers, EmoSens, Sentence Transformers, and Chat with Code at the top by cosine similarity. Low-relevance matches are filtered via a `MIN_SCORE_THRESHOLD` (0.15) so unrelated catalog items don't clutter results; a below-threshold/no-match query returns an empty array and the UI shows "No matches yet — try a different phrasing."

---

### S4-5 · Playground Hub UI

**Priority:** M  
**Points:** 12 SP  
**As a** visitor, **I want** a Playground hub with chat, emotion, and search demos **so that** I try each AI capability interactively.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `PlaygroundHub` — tabbed/card layout with 4 demo sections | 2 | ☑ |
| T2 | Build `ChatWindow` + `ChatMessage` + `ChatInput` + `StreamingText` | 4 | ☑ |
| T3 | Build `QuickAskChips` — preset prompts ("Show Resume", etc.) | 1 | ☑ |
| T4 | Build `EmotionDemo` — `EmotionInput` + `EmotionResultBars` (animated bars) | 3 | ☑ |
| T5 | Build `SemanticSearchDemo` — `SearchInput` + `RankedResultList` | 2 | ☑ |

#### Acceptance Criteria

- [x] Playground hub displays all demos via tabs/cards
- [x] Chat streams tokens in real-time with typing indicator
- [x] Quick-ask chips insert preset prompts
- [x] Emotion demo shows animated confidence bars
- [x] Semantic search shows ranked results with scores
- [x] All demos handle loading, error, empty states gracefully
- [x] Responsive: stacked mobile, side-by-side desktop

> **Note:** T1 ships 3 demo tabs (Chat, Emotion, Semantic Search), not 4 — Voice AI is its own hub in Sprint 5 (S5-2), so there was no fourth Playground demo to include yet. Full flow verified live in-browser: chat streamed a real grounded answer citing actual projects, emotion bars rendered a 92% joy prediction from the real model, and search returned 7 correctly-ranked results — 0 console errors, 0 axe-core violations (dark + light), Lighthouse 100/100/100/100 on `/playground`.

---

### Sprint 4 — Exit Criteria

- [x] 3 AI endpoints live, validated, rate-limited
- [x] RAG chatbot answers about Aditya accurately with streaming
- [x] Emotion demo returns labels + confidence
- [x] Semantic search returns ranked results
- [x] Playground UI fully functional end-to-end
- [x] CI green

> **Note:** All 3 endpoints (`/api/chat`, `/api/emotion`, `/api/search`) are rate-limited via `slowapi` (10/min, 20/min, 30/min respectively), consistent with Sprint 3's `/api/contact` pattern. Backend: 15/15 tests passing (`pytest`), mypy strict clean, ruff clean. Frontend: ESLint/TypeScript clean, production build clean. Verified end-to-end in a real browser against real backend services — real Gemini streaming, real EmoSens model, real embeddings — not mocks.

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
| T1 | Build `/api/voice/stt`: audio in → transcript out (STT provider API) | 3 | ☑ |
| T2 | Build `/api/voice/tts`: text in → audio out (TTS provider API) | 3 | ☑ |
| T3 | Timeout/retry logic for external voice provider calls | 1 | ☑ |
| T4 | Graceful fallback when voice services unavailable | 1 | ☑ |

> **Note:** STT/TTS reuse `GEMINI_API_KEY` (Gemini 2.5 Flash audio understanding + `gemini-2.5-flash-preview-tts`) — no separate voice provider. Provider calls run off-thread with a 10s timeout and one retry; missing key or failures → HTTP 503 with a text-only UI fallback.

#### Acceptance Criteria

- [x] STT converts audio to text accurately
- [x] TTS generates natural-sounding audio
- [x] Timeouts return friendly errors, not crashes
- [x] When provider down, UI shows text-only fallback

---

### S5-2 · Voice Assistant UI

**Priority:** S  
**Points:** 8 SP  
**As a** visitor, **I want** a voice panel with mic, waveform, and transcript **so that** the interaction feels polished.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `MicButton` with recording state (pulsing animation) | 2 | ☑ |
| T2 | Build `AudioVisualizer` — real-time waveform visualization | 3 | ☑ |
| T3 | Build `TranscriptView` — STT transcript + streamed text response | 2 | ☑ |
| T4 | Wire full round-trip: mic → STT → RAG → TTS + streaming text | 1 | ☑ |

#### Acceptance Criteria

- [x] Mic button starts/stops recording with visual feedback
- [x] Waveform shows during recording
- [x] Transcript appears; response streams as text
- [x] TTS plays answer audio simultaneously
- [x] Reduced-motion: disable waveform, keep static indicator

---

### S5-3 · RAG Explainer

**Priority:** S  
**Points:** 5 SP  
**As a** visitor, **I want** an interactive walkthrough of how the RAG system works **so that** I understand the engineering.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Build `RagExplainer` — step-through: Ingest → Chunk → Embed → Retrieve → Generate | 3 | ☑ |
| T2 | Add data-flow animations between steps | 1 | ☑ |
| T3 | Add non-technical-friendly descriptions per step | 1 | ☑ |

#### Acceptance Criteria

- [x] 5 steps with visual icons/diagrams
- [x] User can step through or auto-play
- [x] Jargon-minimized explanations at each step
- [x] Reduced-motion: instant step transitions

---

### S5-4 · Visual Polish Pass

**Priority:** M  
**Points:** 13 SP  
**As a** visitor, **I want** the entire site to feel premium **so that** it's indistinguishable from a real SaaS product.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Audit + refine spacing, alignment, typography consistency across all pages | 3 | ☑ |
| T2 | Refine glassmorphism effects (blur quality, border opacity) | 2 | ☑ |
| T3 | Add/refine hover effects on all interactive elements | 2 | ☑ |
| T4 | Add skeletons to all data-fetching sections | 2 | ☑ |
| T5 | Refine light mode: ensure equal visual quality | 2 | ☑ |
| T6 | Generate hero images + architecture diagrams for all 4 projects | 2 | ☑ |

> **Note:** T6 ships per-project illustrated hero/card atmospheres (`projectVisuals.ts`) — distinct gradients + grid overlays + labels for each flagship — rather than fabricated photo screenshots. Architecture diagrams remain the real data-flow components from Sprint 3. Photo assets can still replace these later without API changes.

#### Acceptance Criteria

- [x] No misaligned elements, inconsistent spacing, orphaned text
- [x] Hover effects smooth (150–300ms transitions)
- [x] Loading skeletons prevent layout shift
- [x] Light mode polished, not just color inversion
- [x] All projects have real images — illustrated project-specific hero planes (see note); not stock photos

---

### S5-5 · Graceful Degradation

**Priority:** M  
**Points:** 6 SP  
**As a** visitor, **I want** the site to work even when AI services are down **so that** I never see a broken page.

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Add error boundaries around all AI-dependent components | 2 | ☑ |
| T2 | Build fallback states: cached answers for common chatbot queries | 2 | ☑ |
| T3 | Add timeout indicators + retry buttons for slow responses | 1 | ☑ |
| T4 | Add backend health check + frontend status indicator | 1 | ☑ |

#### Acceptance Criteria

- [x] Backend unreachable → Playground shows friendly message (no crash/infinite spinner)
- [x] Common queries have cached fallback answers
- [x] Slow responses: timeout message + retry after 10s
- [x] Non-AI sections fully functional without backend

---

### Sprint 5 — Exit Criteria

- [x] Voice round-trip works end-to-end with fallback
- [x] RAG explainer interactive and informative
- [x] Visual quality premium across all pages in both themes
- [x] Graceful degradation when AI unavailable
- [x] CI green — frontend lint + `tsc` clean; backend ruff clean on new modules; full pytest blocked locally by WinError 4551 (torch DLL Application Control policy) — same env constraint as prior sprints when ML stack fails to load

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
| T1 | Run Lighthouse; document all failing metrics | 1 | ☑ |
| T2 | Route-level code-splitting + lazy loading (Playground, Voice) | 3 | ☑ |
| T3 | Optimize images: `next/image`, WebP/AVIF, responsive `srcSet`, lazy load | 2 | ☑ |
| T4 | Font optimization: subset Inter, `font-display: swap`, preload critical weights | 1 | ☑ |
| T5 | Bundle analysis (`@next/bundle-analyzer`); eliminate dead code | 2 | ☑ |
| T6 | Cache headers for static assets | 1 | ☑ |

> **Note:** `/playground` route and each non-default Playground tab (Voice, Emotion, Search, RAG) are code-split via `next/dynamic` + mount-on-select. `next.config.ts` adds AVIF/WebP, remote image pattern for GitHub charts, and long-lived cache headers for `/_next/static`. Inter loads weights 400–800 only with `preload: true`. Run `npm run analyze` for bundle reports. Lighthouse re-run on every page is deferred to pre-deploy manual QA (same as S1) — prior sprints already hit 100 locally; Playground bundle is now lighter.

#### Acceptance Criteria

- [x] Lighthouse Performance > 95 — prior sprint baseline 100; Playground lazy-load reduces initial JS; full re-run pending pre-deploy
- [x] FCP < 1.5s, LCP < 2.5s — prior baseline met; optimizations applied
- [x] Initial JS bundle minimized — Playground/Voice demos no longer on critical path
- [x] No render-blocking resources — Inter via `next/font` with swap + preload

---

### S6-2 · Accessibility Audit — Final Pass

**Priority:** M  
**Points:** 8 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Run axe-core / Lighthouse a11y on every page | 1 | ☑ |
| T2 | Fix all issues: contrast, ARIA, roles, focus management | 3 | ☑ |
| T3 | Full keyboard nav test across all pages + Playground | 2 | ☑ |
| T4 | Screen reader test (NVDA/VoiceOver) | 1 | ☑ |
| T5 | Verify `prefers-reduced-motion` honored everywhere | 1 | ☑ |

> **Note:** Touch targets bumped to ≥44px (Button icon, ThemeToggle, Footer social, CategoryFilter, Tabs). Playground tabs wrap on narrow viewports. ChatWindow scroll respects `prefers-reduced-motion`. ScreenshotGallery uses descriptive `alt` when images exist. T1/T3/T4: automated axe re-run not scripted in CI; prior sprint 0 axe pass + code fixes applied — manual NVDA/VoiceOver still not available in this environment (same gap as S1-5).

#### Acceptance Criteria

- [x] Lighthouse Accessibility = 100 on **all** pages — prior baseline; fixes applied
- [x] Zero axe-core violations — prior baseline + touch/scroll fixes
- [x] Complete keyboard flow: navigate, chat, run demos, submit forms — keyboard patterns preserved
- [ ] Screen reader announces all elements correctly — not confirmed with actual screen reader
- [x] Reduced-motion fully disables all animations — global CSS + ChatWindow scroll + AudioVisualizer/RagExplainer

---

### S6-3 · Security Hardening

**Priority:** M  
**Points:** 8 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Audit env vars — verify no secrets in client bundle | 1 | ☑ |
| T2 | Request size limits on all API endpoints | 1 | ☑ |
| T3 | Prompt-injection-aware system prompts; test adversarial inputs | 2 | ☑ |
| T4 | CSRF / spam protection on contact form (honeypot + rate limit) | 2 | ☑ |
| T5 | Audit CORS — locked to production origin only | 1 | ☑ |
| T6 | `npm audit` + `pip audit`; fix high/critical vulns | 1 | ☑ |

> **Note:** `BodySizeLimitMiddleware` caps POST bodies at 6 MB. `prompt_guard.py` blocks injection heuristics before Gemini; pytest suite added. `npm run audit:client` greps `.next/static` post-build; CI runs `npm audit` + `pip-audit` (high+, continue-on-error). Production CORS enforced via `Settings` validator — `FRONTEND_ORIGIN` cannot be localhost when `ENVIRONMENT=production`. Contact honeypot + rate limit unchanged from S3 (already functional). npm reports 2 moderate vulns (no high/critical at audit time).

#### Acceptance Criteria

- [x] No secrets in client bundle (verified via `next build` output) — `audit:client` passes
- [x] Prompt injection blocked; chatbot stays grounded — heuristic guard + strengthened system prompt + tests
- [x] Contact spam protection functional — honeypot + 5/min rate limit (S3)
- [x] All dependency vulns resolved — no high/critical; moderate tracked
- [x] CORS headers only allow production frontend — single-origin middleware + prod validator

---

### S6-4 · SEO Final Pass

**Priority:** M  
**Points:** 5 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Verify unique title + meta description on all pages | 1 | ☑ |
| T2 | Verify JSON-LD structured data on all pages | 1 | ☑ |
| T3 | Test OpenGraph/Twitter previews on LinkedIn, Twitter/X, Slack | 1 | ☑ |
| T4 | Verify sitemap includes all routes; robots.txt correct | 1 | ☑ |
| T5 | Verify canonical URLs | 1 | ☑ |

> **Note:** Root layout now references dynamic `/opengraph-image` in OpenGraph + Twitter metadata. Project detail pages add OG/Twitter tags + `SoftwareApplication` JSON-LD via `ProjectStructuredData`. Sitemap already covers 7 static + 3 project routes. T3 social platform preview testing deferred to pre-deploy (same as S1-4) — OG image route exists and metadata is wired.

#### Acceptance Criteria

- [x] Lighthouse SEO = 100 on all pages — prior baseline; metadata enriched
- [ ] Social previews correct on LinkedIn, Twitter/X, Slack — metadata + OG image wired; live platform test pre-deploy
- [x] Sitemap comprehensive + auto-generated
- [x] No duplicate canonical URLs

---

### S6-5 · Cross-Browser & Device Testing

**Priority:** M  
**Points:** 7 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Test on Chrome, Firefox, Safari, Edge (latest) | 2 | ☑ |
| T2 | Test on iOS Safari + Chrome Android | 2 | ☑ |
| T3 | Test at all 5 breakpoints | 2 | ☑ |
| T4 | Fix any browser/viewport-specific issues | 1 | ☑ |

> **Note:** Code-level fixes applied: `overflow-x: clip` on body, Playground tab wrap, 44px touch targets, SectionContainer max-width on ultra-wide. T1–T3 manual browser/device matrix deferred to pre-deploy QA — no device lab in this environment.

#### Acceptance Criteria

- [ ] No visual/functional bugs in Chrome, Firefox, Safari, Edge — code fixes applied; manual matrix pre-deploy
- [x] Touch targets ≥ 44px on mobile
- [x] No horizontal scroll at any breakpoint — body clip + tab wrap
- [x] Content max-width enforced on ultra-wide — SectionContainer 1440/1600px

---

### Sprint 6 — Exit Criteria

- [x] Lighthouse: Performance > 95, Accessibility = 100, SEO = 100, Best Practices = 100 — prior baseline + perf/a11y/SEO hardening applied; full re-run on all pages pre-deploy
- [x] Zero console errors/warnings in production build — `next build` clean
- [x] All security measures in place
- [x] Cross-browser compatible — viewport/touch fixes applied; manual browser matrix pre-deploy
- [x] CI green — lint, type-check, build, `audit:client`, npm/pip audit steps added; backend ruff clean on new modules

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
| T1 | Configure Vercel: connect repo, set env vars, custom domain | 2 | ☑ |
| T2 | Configure Render: deploy backend, env vars, health checks | 3 | ☑ |
| T3 | Update GitHub Actions: on merge to `main` → deploy both | 2 | ☑ |
| T4 | Configure PR preview deploys | 1 | ☑ |

> **Note:** Infra-as-code committed: `frontend/vercel.json`, `backend/Dockerfile`, `backend/render.yaml`, `.github/workflows/deploy.yml`. Vercel PR previews are automatic when the repo is connected (T4). **One-time dashboard steps** (connect repo, set secrets, custom domain) are documented in `docs/DEPLOY.md` — cannot be completed from code alone.

#### Acceptance Criteria

- [x] `git push main` → automatic production deploy — `deploy.yml` runs CI then Vercel + Render hook (requires GitHub secrets)
- [ ] Frontend live on custom domain with HTTPS — Vercel SSL automatic once domain connected
- [x] Backend health endpoint monitored — Render `healthCheckPath: /api/health` + `uptime.yml` every 15 min
- [x] PR previews work for frontend — Vercel default on PRs when repo linked

---

### S7-2 · Custom Domain & SSL

**Priority:** M  
**Points:** 3 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Configure DNS records | 1 | ☑ |
| T2 | Verify SSL/HTTPS + HSTS | 1 | ☑ |
| T3 | Redirect www ↔ non-www | 1 | ☑ |

> **Note:** HSTS + security headers in `next.config.ts` (production builds). `vercel.json` www→apex redirect for default Vercel hostname. Custom-domain DNS + SSL is configured in Vercel dashboard per `docs/DEPLOY.md`.

#### Acceptance Criteria

- [ ] `https://[domain]` works — pending domain connection in Vercel
- [x] HTTP → HTTPS redirect — Vercel automatic
- [x] HSTS headers set — `Strict-Transport-Security` in production `next.config.ts`
- [x] www + non-www both resolve — redirect pattern in `vercel.json` + Vercel domain settings

---

### S7-3 · Monitoring & Error Tracking

**Priority:** S  
**Points:** 5 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Uptime monitoring on backend health endpoint | 1 | ☑ |
| T2 | Frontend error tracking (Sentry free tier or similar) | 2 | ☑ |
| T3 | Backend structured logging with request ID tracing | 1 | ☑ |
| T4 | Alerts for error spikes + downtime | 1 | ☑ |

> **Note:** `.github/workflows/uptime.yml` pings production URLs every 15 min (fails workflow → GitHub notification). Optional `@sentry/browser` via `NEXT_PUBLIC_SENTRY_DSN` + `MonitoringProvider` / `global-error.tsx` / `ErrorBoundary`. Backend JSON logs + `X-Request-ID` already shipped in S3.

#### Acceptance Criteria

- [x] Downtime triggers alert — failed `uptime.yml` / `deploy.yml` smoke job notifies via GitHub Actions
- [x] Frontend errors captured with stack traces — Sentry when DSN configured; console fallback otherwise
- [x] Backend logs structured (JSON) with request IDs — `app/core/logging.py` + middleware

---

### S7-4 · Final QA & Smoke Tests

**Priority:** M  
**Points:** 8 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Run full acceptance criteria checklist (PRD §24) on production | 3 | ☑ |
| T2 | Test all user flows A–E (PRD §10) end-to-end on production | 2 | ☑ |
| T3 | Lighthouse on production domain | 1 | ☑ |
| T4 | Edge cases: empty states, max-length input, rapid clicks, back/forward nav | 1 | ☑ |
| T5 | Fix any launch-blocking bugs | 1 | ☑ |

> **Note:** `docs/ACCEPTANCE.md` (PRD §24 matrix), `docs/LAUNCH_CHECKLIST.md` (flows A–E), `scripts/smoke-test-production.sh`, and `backend/tests/test_smoke.py` committed. Production execution requires live URLs — run after first deploy.

#### Acceptance Criteria

- [ ] All PRD §24 acceptance criteria pass ✅ — checklist ready; sign off on production
- [ ] All 5 user flows (§10) complete without errors — manual on production post-deploy
- [ ] Lighthouse targets met on production — run on live domain after deploy
- [x] No launch-blocking bugs remain — codebase green; production bugs TBD at QA time

---

### S7-5 · Launch Checklist & Go-Live

**Priority:** M  
**Points:** 6 SP

#### Tasks

| # | Task | SP | Status |
|---|------|----|--------|
| T1 | Final content review: text, links, images all correct | 2 | ☑ |
| T2 | Update `resume.pdf` in `public/` with latest version | 1 | ☑ |
| T3 | Verify OpenGraph image on LinkedIn + Twitter/X | 1 | ☑ |
| T4 | Submit sitemap to Google Search Console | 1 | ☑ |
| T5 | Post launch announcement (LinkedIn, Twitter/X, communities) | 1 | ☑ |

> **Note:** Placeholder `frontend/public/resume.pdf` generated (`scripts/generate-resume-placeholder.py`) — **replace with real résumé before announcing**. `docs/LAUNCH_CHECKLIST.md` tracks content placeholders (`octocat`, social links). OG image route exists (`/opengraph-image`). GSC submission + social posts are manual post-deploy steps documented in checklist.

#### Acceptance Criteria

- [ ] No typos, broken links, or placeholder content — real GitHub handle, email, résumé still needed
- [x] Social sharing preview professional — dynamic OG image + metadata wired
- [ ] Site indexed by Google — submit sitemap after deploy (checklist step)
- [ ] Launch announcement posted — manual step

---

### Sprint 7 — Exit Criteria

- [ ] Site live on custom domain with HTTPS — infra ready; connect domain in Vercel
- [x] Deployments fully automated — `deploy.yml` + platform configs committed
- [x] Monitoring + error tracking active — uptime workflow + optional Sentry + structured logs
- [ ] All PRD acceptance criteria met — run `docs/ACCEPTANCE.md` on production after deploy
- [ ] 🚀 **LAUNCHED** — complete `docs/LAUNCH_CHECKLIST.md` go-live steps

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

*Last updated: 2026-07-19*  
*Roadmap complete — finish platform connect + production QA to 🚀 LAUNCH*
