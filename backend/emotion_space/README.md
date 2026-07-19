---
title: Aditya EmoSens
emoji: 🎭
colorFrom: blue
colorTo: purple
sdk: gradio
sdk_version: 5.12.0
app_file: app.py
pinned: false
---

# EmoSens on Hugging Face Spaces

Host the **emotion demo only** for the hybrid portfolio deploy. The main API stays on Render (lite mode).

> **Use Gradio, not Docker.** As of mid-2026, Docker Spaces on HF require a **Pro** subscription. Gradio on CPU Basic is the free option (~16 GB RAM).

## Create the Space

1. Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. **SDK:** **Gradio** (not Docker)
3. **Visibility:** Public
4. Connect this GitHub repo

## Space settings (Settings → Repository)

| Setting | Value |
|---------|--------|
| **Root directory** | `backend/emotion_space` |

HF clones the full monorepo; the root directory tells it where `app.py` and `requirements.txt` live.

## Secrets (Settings → Variables and secrets)

| Variable | Value |
|----------|--------|
| `HF_TOKEN` | Hugging Face read token |
| `HF_MODEL_REPO` | `DSAditya552003/emosense-ai-model` |
| `FRONTEND_ORIGIN` | Your Vercel URL, e.g. `https://aditya-ai-studio.vercel.app` |
| `ENVIRONMENT` | `production` |

## After deploy

Copy the Space URL into Vercel:

```
NEXT_PUBLIC_EMOTION_API_URL=https://YOUR-USERNAME-aditya-emosens.hf.space
```

Test:

```bash
curl https://YOUR-SPACE.hf.space/api/health
curl -X POST https://YOUR-SPACE.hf.space/api/emotion \
  -H "Content-Type: application/json" \
  -d '{"text":"I am thrilled about this project!"}'
```

First request after sleep may take 1–2 minutes while EmoSens loads.

## Docker (Pro only)

`Dockerfile.emotion` + `main.py` remain for HF Pro or other Docker hosts. Free HF users should use this Gradio `app.py` instead.
