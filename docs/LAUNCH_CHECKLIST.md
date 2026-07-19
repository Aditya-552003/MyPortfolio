# Launch Checklist — Aditya AI Studio

Complete before announcing go-live. See [DEPLOY.md](./DEPLOY.md) for platform setup.

---

## Content & assets

- [ ] Replace placeholder résumé: swap `frontend/public/resume.pdf` with your latest PDF
- [ ] Update `frontend/config/site.ts`:
  - [ ] `url` → production domain
  - [ ] `githubUsername` → real GitHub handle (currently `octocat`)
  - [ ] `socialLinks` → real email, LinkedIn, GitHub URLs
- [ ] Replace placeholder experience / education / certification entries with real data (or remove `isPlaceholder` badges)
- [ ] Proofread all project pages for typos
- [ ] Verify all GitHub repo links open correctly

---

## Deployment

- [ ] Vercel production deploy green
- [ ] Render backend healthy (`GET /api/health` → 200)
- [ ] `FRONTEND_ORIGIN` on Render matches Vercel URL exactly (no trailing slash)
- [ ] `NEXT_PUBLIC_API_URL` on Vercel points to Render backend
- [ ] Custom domain + HTTPS working
- [ ] `www` redirects to apex (or vice versa — pick one canonical)
- [ ] GitHub secrets configured (`VERCEL_*`, `RENDER_DEPLOY_HOOK_URL`)
- [ ] GitHub variables set (`PRODUCTION_FRONTEND_URL`, `PRODUCTION_API_URL`)

---

## PRD §24 acceptance (production)

### Experience
- [ ] Hero + CTAs work
- [ ] Playground: chat, voice, emotion, search all functional (or graceful fallback)
- [ ] RAG chat grounded; refuses off-topic / injection attempts
- [ ] Project Explorer filters all 7 categories
- [ ] 3 flagship project detail pages complete

### Quality
- [ ] Lighthouse: P > 95, A/SEO/BP = 100 on `/`, `/playground`, `/projects/emosens`
- [ ] Keyboard navigation works end-to-end
- [ ] Reduced-motion honored

### Engineering
- [ ] No secrets in client bundle (`npm run audit:client`)
- [ ] OpenAPI docs live at `{API_URL}/docs`
- [ ] CI + deploy workflows green on `main`

### Conversion
- [ ] Résumé download works
- [ ] Contact form submits successfully
- [ ] Social links open correctly

---

## User flows (PRD §10)

- [ ] **Flow A** — Recruiter: hero → chat → résumé → LinkedIn
- [ ] **Flow B** — Hiring manager: projects → NLP filter → EmoSens → emotion demo → contact
- [ ] **Flow C** — Engineer: Chat with Code page → RAG explainer → GitHub stats
- [ ] **Flow D** — Semantic search: "Which projects use transformers?"
- [ ] **Flow E** — Voice: mic → STT → answer → TTS (or text fallback)

---

## SEO & social

- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` allows indexing
- [ ] OpenGraph preview looks correct ([opengraph.xyz](https://www.opengraph.xyz/) or LinkedIn Post Inspector)
- [ ] Twitter/X card preview correct
- [ ] Submit sitemap in [Google Search Console](https://search.google.com/search-console)

---

## Monitoring

- [ ] Sentry project created + `NEXT_PUBLIC_SENTRY_DSN` set on Vercel
- [ ] GitHub `uptime.yml` workflow enabled (Actions → allow scheduled workflows)
- [ ] Alert channel configured for failed deploy/uptime runs

---

## Go-live

- [ ] Post launch announcement (LinkedIn, Twitter/X)
- [ ] Update sprint.md Sprint 7 exit criteria ✅
- [ ] 🚀 **LAUNCHED**
