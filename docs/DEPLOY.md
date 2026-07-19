# Deployment Guide — Aditya AI Studio

## Recommended production layout (hybrid, free tier)

| Service | Host | Cost | Notes |
|---------|------|------|-------|
| Frontend | [Vercel](https://vercel.com) | Free | `frontend/` |
| Main API (contact, chat, search, voice) | [Render](https://render.com) Starter 512Mi | Free | **Lite mode** — no torch |
| Emotion demo only | [HF Space](https://huggingface.co/spaces) | Free ZeroGPU* / Pro for CPU | ~16GB RAM for EmoSens |

\* **July 2026 HF free tier:** new Spaces default to **ZeroGPU**, which has **no quota for anonymous visitors** and cannot downgrade to CPU basic without **HF Pro**. For a public portfolio, either subscribe to Pro, pause the Space and disable the emotion tab (`NEXT_PUBLIC_EMOTION_ENABLED=false`), or host EmoSens elsewhere (e.g. Oracle Cloud free ARM).

```
Browser → Vercel (Next.js)
              ├─→ Render lite API     /api/chat, /api/search, /api/voice, /api/contact
              └─→ HF Space emotion API /api/emotion
```

| Layer | Platform | Config |
|-------|----------|--------|
| Frontend | Vercel | `frontend/vercel.json` |
| Main API (lite) | Render | `backend/render.yaml` + `backend/Dockerfile.lite` |
| Emotion API | HF Space | `backend/Dockerfile.emotion` |
| CI/CD | GitHub Actions | `.github/workflows/ci.yml`, `deploy.yml` |

Local development uses **full mode** (`BACKEND_MODE=full`) with everything on `localhost:8000`.

---

## 1. One-time setup

### Frontend (Vercel)

1. Import this GitHub repo in Vercel → set **Root Directory** to `frontend`.
2. Framework preset: **Next.js** (auto-detected).
3. Add environment variables:

   | Variable | Value |
   |----------|-------|
   | `NEXT_PUBLIC_API_URL` | Render lite API URL, e.g. `https://aditya-ai-studio-api.onrender.com` |
   | `NEXT_PUBLIC_EMOTION_API_URL` | HF Space URL, e.g. `https://aditya-emosens.hf.space` |
   | `NEXT_PUBLIC_SENTRY_DSN` | *(optional)* Sentry project DSN |

4. Connect custom domain in Vercel → DNS (see §2).
5. Copy **Project ID** and **Org ID** from Vercel project settings for GitHub secrets.

### Backend — Render (lite API)

1. **New → Blueprint** → point at this repo → select `backend/render.yaml`.
   - Or manually: **Root Directory** `backend`, **Dockerfile** `Dockerfile.lite`.
2. Set secret env vars in Render dashboard:

   | Variable | Value |
   |----------|-------|
   | `ENVIRONMENT` | `production` |
   | `BACKEND_MODE` | `lite` *(set automatically by blueprint)* |
   | `FRONTEND_ORIGIN` | Your Vercel URL, e.g. `https://aditya-ai-studio.vercel.app` |
   | `GEMINI_API_KEY` | Google AI Studio key |

   No `HF_TOKEN` needed on Render — emotion runs on HF Space.

3. **Memory:** Lite mode fits **Starter 512Mi**. Chat uses static markdown context + Gemini; search uses keyword matching (no embeddings).

4. Health check path: `/api/health` (returns `emotion_external: true`, `emotion: false` — emotion is checked against HF from the frontend).

5. Copy the **Deploy Hook** URL from Render → Settings → Deploy Hook.

### Emotion — Hugging Face Space (or disable on free tier)

**HF Pro required for CPU basic** on Spaces created with ZeroGPU. Without Pro, public visitors hit ZeroGPU quota errors.

**Free-tier production (recommended now):**

1. **Pause** the HF Space (Settings → pause) to avoid charges.
2. On Vercel set `NEXT_PUBLIC_EMOTION_ENABLED=false` and redeploy — hides the Emotion tab; Chat/Search/Voice still work via Render.
3. Link visitors to the [EmoSens project page](/projects/emosens) for model details.

**With HF Pro ($9/mo):** switch Hardware to **CPU basic**, set `NEXT_PUBLIC_EMOTION_ENABLED=true` and `NEXT_PUBLIC_EMOTION_API_URL`.

Follow **[backend/emotion_space/README.md](../backend/emotion_space/README.md)** for Space setup.

> **Cold starts:** Render lite API wakes in ~5–15s. HF Space first request after sleep may take 1–2 min while EmoSens loads.

---

## 2. Custom domain & SSL

1. Add domain in Vercel (e.g. `aditya-ai-studio.com`).
2. Point DNS:
   - Apex → Vercel A record (or CNAME flattening per registrar)
   - `www` → Vercel CNAME
3. Vercel provisions SSL automatically. HSTS is set via `next.config.ts` in production builds.
4. `frontend/vercel.json` redirects `www.aditya-ai-studio.vercel.app` → apex; add similar redirect for your custom domain in Vercel dashboard.

Update `frontend/config/site.ts` → `url` to match your production domain (used in sitemap, canonicals, JSON-LD).

Update Render `FRONTEND_ORIGIN` and HF Space `FRONTEND_ORIGIN` to the same URL (CORS).

---

## 3. GitHub secrets & variables

### Secrets (Settings → Secrets and variables → Actions)

| Secret | Purpose |
|--------|---------|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Vercel team/org ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `RENDER_DEPLOY_HOOK_URL` | Render deploy hook (optional) |

### Variables

| Variable | Example |
|----------|---------|
| `PRODUCTION_FRONTEND_URL` | `https://aditya-ai-studio.vercel.app` |
| `PRODUCTION_API_URL` | `https://aditya-ai-studio-api.onrender.com` |

These power post-deploy smoke tests (`.github/workflows/deploy.yml`) and uptime checks (`.github/workflows/uptime.yml`).

---

## 4. Deploy flow

```
PR opened  →  CI (lint, type-check, build, test)  →  Vercel preview deploy (automatic)
merge main →  CI  →  deploy.yml  →  Vercel production + Render hook  →  smoke test
every 15m  →  uptime.yml pings /api/health + homepage
```

Manual deploy:

```bash
# Frontend
cd frontend && vercel --prod

# Backend — push to main or POST to Render deploy hook
curl -X POST "$RENDER_DEPLOY_HOOK_URL"

# HF Space — push to main (auto-deploy) or rebuild in Space settings
```

---

## 5. Post-deploy verification

```bash
FRONTEND_URL=https://your-domain.com \
API_URL=https://your-api.onrender.com \
EMOTION_API_URL=https://your-space.hf.space \
bash scripts/smoke-test-production.sh
```

Run Lighthouse on production. Complete [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md).

---

## 6. Monitoring

| Signal | Tool |
|--------|------|
| Backend uptime | GitHub Actions `uptime.yml` (every 15 min) |
| Backend logs | Render logs (JSON structured, `X-Request-ID` per request) |
| Emotion Space | HF Space logs + `/api/health` |
| Frontend errors | Sentry Browser SDK (when `NEXT_PUBLIC_SENTRY_DSN` set on Vercel) |
| CI failures | GitHub Actions notifications |

Enable GitHub Actions email/Slack notifications for failed `uptime` or `deploy` workflows.

---

## 7. Full mode (optional, paid Render)

For a single-host deployment with vector RAG + embedding search + EmoSens, use `backend/Dockerfile` with `BACKEND_MODE=full` on **Render Standard (2GB+)**. Not required for the hybrid free-tier layout above.
