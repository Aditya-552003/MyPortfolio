---
title: Aditya EmoSens
emoji: 🎭
colorFrom: blue
colorTo: purple
sdk: gradio
sdk_version: "5.12.0"
python_version: "3.11"
app_file: app.py
pinned: false
---

# EmoSens on Hugging Face Spaces

Host the **emotion demo only** for the hybrid portfolio deploy. The main API stays on Render (lite mode).

> **Use Gradio, not Docker.** Docker Spaces on HF require **Pro**. **CPU basic** (needed for public visitors) also requires **Pro** as of mid-2026. Free Spaces default to **ZeroGPU** — OK for owner testing, **not for anonymous portfolio traffic** (zero GPU quota).

## Deploy (HF git — no Repository tab)

Many blank Spaces only show **Settings → Variables and secrets**, not GitHub linking.
Use HF's git remote instead:

### 1. Clone your Space

```powershell
git clone https://huggingface.co/spaces/DSAditya552003/MyPortfolio hf-emotion
cd hf-emotion
```

When prompted for a password, paste an HF **write token** from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens).

### 2. Copy files from this monorepo

From your portfolio repo root (adjust paths if needed):

```powershell
Copy-Item ..\portfolio\backend\emotion_space\app.py .
Copy-Item ..\portfolio\backend\emotion_space\requirements.txt .
Copy-Item ..\portfolio\backend\emotion_space\README.md .
Copy-Item -Recurse -Force ..\portfolio\backend\app .\app
```

The Space needs both `app.py` **and** the `app/` package (model code).

### 3. Push

```powershell
git add app.py requirements.txt README.md app
git commit -m "Deploy EmoSens Gradio Space"
git push
```

### 4. Space secrets (Settings → Variables and secrets)

| Variable | Value |
|----------|--------|
| `HF_TOKEN` | Hugging Face read token |
| `HF_MODEL_REPO` | `DSAditya552003/emosense-ai-model` |
| `FRONTEND_ORIGIN` | Your Vercel URL |
| `ENVIRONMENT` | `production` |

### 5. Hardware (Settings → Hardware)

Prefer **CPU basic** (free, 16 GB RAM) for this CPU inference workload.  
If you stay on **ZeroGPU**, `requirements.txt` pins `torch==2.11.0` (HF-supported max).

## Auto-sync from GitHub (optional)

Add `HF_TOKEN` (write access) to **GitHub → Settings → Secrets → Actions**.
Pushes to `main` that touch `backend/emotion_space/` or `backend/app/` run
`.github/workflows/sync-emotion-space.yml` and upload to this Space.

## After deploy

Vercel env:

```
NEXT_PUBLIC_EMOTION_API_URL=https://DSAditya552003-MyPortfolio.hf.space
```

Test:

```bash
curl https://DSAditya552003-MyPortfolio.hf.space/api/health
curl -X POST https://DSAditya552003-MyPortfolio.hf.space/api/emotion \
  -H "Content-Type: application/json" \
  -d '{"text":"I am thrilled about this project!"}'
```

First request after sleep may take 1–2 minutes while EmoSens loads.
