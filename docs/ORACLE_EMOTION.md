# EmoSens on Oracle Cloud Always Free

Host the **emotion API only** ($0/month) when Hugging Face ZeroGPU won't work for public visitors.

Uses `backend/Dockerfile.emotion` — plain FastAPI with `/api/emotion` and `/api/health` (no Gradio, no GPU quota).

## Why Oracle?

| | HF ZeroGPU (free) | Oracle Always Free |
|--|-------------------|---------------------|
| Public visitors | ❌ 0 GPU quota | ✅ CPU inference |
| Cost | Free but broken for demos | **$0** (Ampere ARM) |
| RAM | 16 GB (with Pro only) | Up to **24 GB** on free tier |
| HTTPS | ✅ `.hf.space` | ⚠️ You must add it (see below) |

**Important:** Vercel is HTTPS. Browsers **block** `http://` calls from `https://` pages (mixed content). You need **HTTPS** on the emotion URL — use **Cloudflare Tunnel** (free, no domain required) or a subdomain + Caddy.

---

## Architecture

```
Vercel (HTTPS)  →  Render lite API (chat/search/voice)
                →  Oracle VM (emotion) via Cloudflare Tunnel (HTTPS)
```

---

## Part 1 — Oracle VM (~20 min)

### 1. Sign up

1. [oracle.com/cloud/free](https://www.oracle.com/cloud/free/) — Always Free, no trial charges if you stay in free shapes.
2. Create a **home region** (cannot change later). Pick one close to you.

### 2. Create an Ampere VM

**Compute → Instances → Create instance**

| Setting | Value |
|---------|--------|
| Name | `emosens-emotion` |
| Image | **Ubuntu 22.04** (aarch64) |
| Shape | **Ampere** → `VM.Standard.A1.Flex` |
| OCPUs | **2** (or 4 if you have quota) |
| Memory | **12 GB** minimum (**16–24 GB** recommended for first model download) |
| Boot volume | 50 GB default is fine |
| Public IP | Assign a **public IPv4** |

**Networking → Security list → Add ingress rules:**

| Source | Protocol | Port |
|--------|----------|------|
| `0.0.0.0/0` | TCP | **22** (SSH) |
| `0.0.0.0/0` | TCP | **8000** (optional if using Cloudflare Tunnel only) |

Download your **SSH private key** when prompted.

### 3. SSH in

```bash
ssh -i ~/.ssh/oracle_emosens.key ubuntu@YOUR_PUBLIC_IP
```

### 4. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
newgrp docker
```

### 5. Clone repo and run emotion API

```bash
git clone https://github.com/Aditya-552003/MyPortfolio.git
cd MyPortfolio/backend/deploy/oracle
cp .env.example .env
nano .env   # fill in HF_TOKEN, FRONTEND_ORIGIN, etc.
docker compose up -d --build
```

First start downloads ~500 MB of model weights — can take **5–15 minutes**.

### 6. Test locally on the VM

```bash
curl http://localhost:8000/api/health
curl -X POST http://localhost:8000/api/emotion \
  -H "Content-Type: application/json" \
  -d '{"text":"I am thrilled about this project!"}'
```

---

## Part 2 — HTTPS with Cloudflare Tunnel (free, ~10 min)

Without this, the Vercel Playground **cannot** call your Oracle IP over HTTP.

### 1. Cloudflare account

1. [dash.cloudflare.com](https://dash.cloudflare.com) — free plan.
2. You do **not** need to move your domain to Cloudflare for quick tunnels.

### 2. Install `cloudflared` on the Oracle VM

```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
```

### 3. Start a quick tunnel to port 8000

```bash
cloudflared tunnel --url http://localhost:8000
```

Copy the HTTPS URL it prints, e.g. `https://something-random.trycloudflare.com`

> Quick tunnels change URL on restart. For a **stable URL**, create a named tunnel in Cloudflare Zero Trust (still free).

### 4. Run tunnel as a service (optional)

See [Cloudflare docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/local-management/create-local-tunnel/) for `cloudflared service install`.

---

## Part 3 — Vercel

```env
NEXT_PUBLIC_EMOTION_ENABLED=true
NEXT_PUBLIC_EMOTION_API_URL=https://your-tunnel.trycloudflare.com
NEXT_PUBLIC_API_URL=https://myportfolio-chr0.onrender.com
```

**Redeploy** Vercel after saving.

Test from your machine:

```powershell
Invoke-RestMethod "https://your-tunnel.trycloudflare.com/api/health"
```

---

## Environment variables (`.env` on Oracle)

| Variable | Example |
|----------|---------|
| `ENVIRONMENT` | `production` |
| `FRONTEND_ORIGIN` | `https://my-portfolio-xxx.vercel.app` |
| `HF_TOKEN` | Hugging Face read token |
| `HF_MODEL_REPO` | `DSAditya552003/emosense-ai-model` |
| `LOG_LEVEL` | `INFO` |

---

## Maintenance

```bash
cd ~/MyPortfolio
git pull
cd backend/deploy/oracle
docker compose up -d --build
```

**Auto-start on reboot:** `docker compose` uses `restart: unless-stopped`.

**Pause HF Space** on Hugging Face so you are not charged there.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| OOM during model load | Use 16–24 GB RAM shape; add swap: `sudo fallocate -l 4G /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile` |
| Can't SSH | Check Oracle security list port 22; verify public IP |
| Playground still blocked | Emotion URL must be **https://**; check browser DevTools → Network |
| CORS error | Set `FRONTEND_ORIGIN` to exact Vercel URL (no trailing slash) |
| ARM build slow | First `docker compose build` takes 10–20 min on Ampere — normal |

---

## Cost note

Always Free includes **3,000 OCPU hours/month** on Ampere (enough for one VM running 24/7). Stay on **VM.Standard.A1.Flex** in Always Free limits — do not resize to paid shapes.
