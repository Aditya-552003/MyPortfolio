# Aditya AI Studio

An interactive AI engineering portfolio — a working RAG chatbot, live emotion detection, semantic search, and a voice assistant, wrapped in a premium, dark-mode-first interface.

**Build. Search. Understand. Communicate.**

See [PROJECT (1).md](./PROJECT%20(1).md) for the full PRD and [sprint.md](./sprint.md) for the sprint roadmap.

## Monorepo layout

```
frontend/   Next.js (App Router) + TypeScript (strict) + Tailwind CSS
backend/    FastAPI (Python) + Pydantic + Sentence Transformers
```

## Getting started

### Frontend

```bash
cd frontend
npm install
npm run dev       # http://localhost:3000
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload   # http://localhost:8000
```

## Quality gates

| Check | Frontend | Backend |
|---|---|---|
| Lint | `npm run lint` (ESLint) | `ruff check .` |
| Type-check | `npm run type-check` (tsc) | `mypy .` |
| Build | `npm run build` | `uvicorn app.main:app` starts cleanly |

CI runs all of the above on every push and pull request via GitHub Actions (`.github/workflows/ci.yml`).

## License

MIT — see [LICENSE](./LICENSE).
