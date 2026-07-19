# Aditya AI Studio

An interactive AI engineering portfolio — a working RAG chatbot, live emotion detection, semantic search, and a voice assistant, wrapped in a premium, dark-mode-first interface.

**Build. Search. Understand. Communicate.**

See [PROJECT (1).md](./PROJECT%20(1).md) for the full PRD and [sprint.md](./sprint.md) for the sprint roadmap.

## Monorepo layout

```
frontend/   Next.js (App Router) + TypeScript (strict) + Tailwind CSS
backend/    FastAPI (Python) + Pydantic + Sentence Transformers
docs/       Deployment guide + launch checklist
scripts/    Smoke tests, resume placeholder generator
```

## Getting started

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev                  # http://localhost:3000
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate       # Windows
pip install -r requirements.txt
cp .env.example .env         # set GEMINI_API_KEY, HF_TOKEN
uvicorn app.main:app --reload   # http://localhost:8000
```

### Placeholder résumé (dev)

```bash
python scripts/generate-resume-placeholder.py
```

Replace `frontend/public/resume.pdf` with your real résumé before launch.

## Quality gates

| Check | Frontend | Backend |
|---|---|---|
| Lint | `npm run lint` | `ruff check .` |
| Type-check | `npm run type-check` | `mypy app` |
| Build | `npm run build` | Docker / uvicorn startup |
| Client secrets | `npm run audit:client` | — |
| Smoke (local API) | — | `pytest tests/test_smoke.py` |
| Smoke (production) | `bash scripts/smoke-test-production.sh` | — |

CI runs lint, type-check, build, and tests on every push/PR (`.github/workflows/ci.yml`).

## Deployment

**Production:** Vercel (frontend) + Render (backend). See **[docs/DEPLOY.md](./docs/DEPLOY.md)** for step-by-step setup.

On merge to `main`, `.github/workflows/deploy.yml` deploys both services (requires GitHub secrets). Uptime checks run every 15 minutes via `.github/workflows/uptime.yml`.

Before go-live, complete **[docs/LAUNCH_CHECKLIST.md](./docs/LAUNCH_CHECKLIST.md)**.

## License

MIT — see [LICENSE](./LICENSE).
