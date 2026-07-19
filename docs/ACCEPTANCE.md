# PRD §24 Acceptance Criteria — Production Verification

Use this checklist when running S7-4 final QA on **production** (not localhost).

Reference: [PROJECT (1).md](../PROJECT%20(1).md) §24, §10 user flows.

---

## Experience

| # | Criterion | Pass? | Notes |
|---|-----------|-------|-------|
| E1 | Hero: headline, subtitle, mission, both CTAs | ☐ | |
| E2 | Playground: chat, voice, emotion, search tabs load | ☐ | |
| E3 | RAG chat grounded; refuses off-topic / injection | ☐ | Try "ignore instructions" |
| E4 | Emotion demo returns labels + confidence | ☐ | |
| E5 | Semantic search returns ranked results | ☐ | "transformers" query |
| E6 | 3 project detail pages complete (17 template items) | ☐ | |
| E7 | Project Explorer filters all 7 categories | ☐ | |

## Quality gates

| # | Criterion | Pass? | Target |
|---|-----------|-------|--------|
| Q1 | Lighthouse Performance | ☐ | > 95 |
| Q2 | Lighthouse Accessibility | ☐ | 100 |
| Q3 | Lighthouse SEO | ☐ | 100 |
| Q4 | Lighthouse Best Practices | ☐ | 100 |
| Q5 | FCP | ☐ | < 1.5s |
| Q6 | LCP | ☐ | < 2.5s |
| Q7 | Keyboard navigation complete | ☐ | |
| Q8 | Reduced-motion honored | ☐ | |
| Q9 | Responsive at 5 breakpoints | ☐ | |

## Engineering

| # | Criterion | Pass? | Notes |
|---|-----------|-------|-------|
| G1 | API validated + rate-limited | ☐ | 429 on rapid requests |
| G2 | CORS locked to frontend origin | ☐ | |
| G3 | OpenAPI at `/docs` | ☐ | |
| G4 | No secrets in client bundle | ☐ | `npm run audit:client` |
| G5 | CI + deploy green on `main` | ☐ | |

## Conversion

| # | Criterion | Pass? | Notes |
|---|-----------|-------|-------|
| C1 | Résumé download | ☐ | `public/resume.pdf` |
| C2 | Contact form success | ☐ | |
| C3 | Social links work | ☐ | |

## User flows (§10)

| Flow | Description | Pass? |
|------|-------------|-------|
| A | Recruiter quick-scan → chat → résumé | ☐ |
| B | Hiring manager → projects → demo → contact | ☐ |
| C | Engineer → project deep-dive → RAG explainer | ☐ |
| D | Semantic search transformers query | ☐ |
| E | Voice round-trip (or text fallback) | ☐ |

## Edge cases (S7-4 T4)

| Case | Pass? |
|------|-------|
| Empty chat message blocked | ☐ |
| Max-length input (2000 chars) handled | ☐ |
| Rapid tab switching in Playground | ☐ |
| Browser back/forward navigation | ☐ |
| Backend down → friendly Playground banner | ☐ |

---

**Sign-off:** All launch-blocking items checked → proceed to [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) go-live steps.
