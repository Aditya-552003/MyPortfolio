# EmoSens on Hugging Face Spaces (free CPU, ~16GB RAM)

Host the **emotion demo only**. The main portfolio API stays on Render in **lite** mode.

## Create the Space

1. Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. **Space name:** e.g. `aditya-emosens`
3. **SDK:** Docker
4. **Visibility:** Public (required for free CPU hardware)
5. Connect this GitHub repo

## Space settings (Settings → Repository)

| Setting | Value |
|---------|--------|
| **Dockerfile path** | `backend/Dockerfile.emotion` |
| **Root directory** | *(leave empty — build context is repo root with Dockerfile COPY paths)* |

If HF requires root inside `backend/`, set **Root directory** to `backend` and use Dockerfile path `Dockerfile.emotion`.

## Environment variables (Space secrets)

| Variable | Value |
|----------|--------|
| `HF_TOKEN` | Your Hugging Face read token |
| `HF_MODEL_REPO` | `DSAditya552003/emosense-ai-model` |
| `FRONTEND_ORIGIN` | Your Vercel URL, e.g. `https://aditya-ai-studio.vercel.app` |
| `ENVIRONMENT` | `production` |

## After deploy

Copy the Space URL (e.g. `https://aditya-emosens.hf.space`) into Vercel:

```
NEXT_PUBLIC_EMOTION_API_URL=https://aditya-emosens.hf.space
```

Test:

```bash
curl https://YOUR-SPACE.hf.space/api/health
curl -X POST https://YOUR-SPACE.hf.space/api/emotion \
  -H "Content-Type: application/json" \
  -d '{"text":"I am thrilled about this project!"}'
```

First request after sleep may take 1–2 minutes while the model loads.
