# Deployment Guide — Aditya AI Studio

Production stack per PRD §16:

| Layer | Platform | Config |
|-------|----------|--------|
| Frontend | [Vercel](https://vercel.com) | `frontend/vercel.json` |
| Backend | [Render](https://render.com) | `backend/render.yaml` + `backend/Dockerfile` |
| CI/CD | GitHub Actions | `.github/workflows/ci.yml`, `deploy.yml` |

---

## 1. One-time setup

### Frontend (Vercel)

1. Import this GitHub repo in Vercel → set **Root Directory** to `frontend`.
2. Framework preset: **Next.js** (auto-detected).
3. Add environment variables:

   | Variable | Value |
   |----------|-------|
   | `NEXT_PUBLIC_API_URL` | Your Render backend URL, e.g. `https://aditya-ai-studio-api.onrender.com` |
   | `NEXT_PUBLIC_SENTRY_DSN` | *(optional)* Sentry project DSN |

4. Connect custom domain in Vercel → DNS (see §2).
5. Copy **Project ID** and **Org ID** from Vercel project settings for GitHub secrets.

### Backend (Render)

1. **New → Blueprint** → point at this repo → select `backend/render.yaml`.
2. Set secret env vars in Render dashboard:

   | Variable | Value |
   |----------|-------|
   | `ENVIRONMENT` | `production` |
   | `FRONTEND_ORIGIN` | Your Vercel URL, e.g. `https://aditya-ai-studio.vercel.app` |
   | `GEMINI_API_KEY` | Google AI Studio key *(required)* |
   | `LOW_MEMORY_MODE` | `true` on **Starter/free (512Mi)** — keyword RAG/search, no torch |
   | `LOAD_EMOTION_MODEL` | `false` on 512Mi *(emotion demo off)* |
   | `DEFER_ML_LOAD` | `true` *(default in render.yaml)* |
   | `HF_TOKEN` | Only if `LOAD_EMOTION_MODEL=true` on a 2GB+ plan |

3. **Memory tiers:**
   - **Starter / free (512Mi):** Set `LOW_MEMORY_MODE=true` and `LOAD_EMOTION_MODEL=false`. Chat, semantic search (keyword), voice, and contact work via Gemini + precomputed JSON. Emotion demo shows “unavailable”.
   - **Standard (2GB+):** Set `LOW_MEMORY_MODE=false`, `LOAD_EMOTION_MODEL=true`, add `HF_TOKEN` for full semantic search + EmoSens.

4. Health check path: `/api/health` (configured in `render.yaml`).
5. Copy the **Deploy Hook** URL from Render → Settings → Deploy Hook.

> **Cold starts:** Render free tier may spin down after inactivity. First request can take 30–60s. On 512Mi, `/api/health` should return `ok` with `mode: low_memory` once Gemini is configured.

---

## 2. Custom domain & SSL

1. Add domain in Vercel (e.g. `aditya-ai-studio.com`).
2. Point DNS:
   - Apex → Vercel A record (or CNAME flattening per registrar)
   - `www` → Vercel CNAME
3. Vercel provisions SSL automatically. HSTS is set via `next.config.ts` in production builds.
4. `frontend/vercel.json` redirects `www.aditya-ai-studio.vercel.app` → apex; add similar redirect for your custom domain in Vercel dashboard.

Update `frontend/config/site.ts` → `url` to match your production domain (used in sitemap, canonicals, JSON-LD).

Update Render `FRONTEND_ORIGIN` to the same URL (CORS lock).

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
```

---

## 5. Post-deploy verification

```bash
FRONTEND_URL=https://your-domain.com \
API_URL=https://your-api.onrender.com \
bash scripts/smoke-test-production.sh
```

Run Lighthouse on production. Complete [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md).

---

## 6. Monitoring

| Signal | Tool |
|--------|------|
| Backend uptime | GitHub Actions `uptime.yml` (every 15 min) |
| Backend logs | Render logs (JSON structured, `X-Request-ID` per request) |
| Frontend errors | Sentry Browser SDK (when `NEXT_PUBLIC_SENTRY_DSN` set on Vercel) |
| CI failures | GitHub Actions notifications |

Enable GitHub Actions email/Slack notifications for failed `uptime` or `deploy` workflows.
