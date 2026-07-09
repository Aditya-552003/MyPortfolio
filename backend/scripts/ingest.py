"""
Ingestion script — chunks the grounding content and the search catalog, embeds
everything once with Sentence-Transformers, and persists the vectors so the
RAG chatbot and semantic search endpoints do a fast lookup at request time
instead of re-embedding the corpus on every call.

Run from the backend/ directory:
    python scripts/ingest.py
"""

import json
import sys
from pathlib import Path

import numpy as np

BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))

from app.data.search_catalog import SEARCH_ITEMS  # noqa: E402
from app.services.chunking import chunk_markdown  # noqa: E402
from app.services.embedder import embed_texts  # noqa: E402

REPO_ROOT = BACKEND_DIR.parent
DATA_DIR = BACKEND_DIR / "app" / "data"
EMBEDDINGS_DIR = BACKEND_DIR / "embeddings"

RAG_SOURCES = [
    (DATA_DIR / "about.md", "about"),
    (DATA_DIR / "projects.md", "projects"),
    (REPO_ROOT / "SKILLS.md", "skills"),
]


def build_rag_index() -> None:
    all_chunks = []
    for path, source_name in RAG_SOURCES:
        if not path.exists():
            print(f"WARNING: source file not found, skipping: {path}")
            continue
        text = path.read_text(encoding="utf-8")
        chunks = chunk_markdown(text, source=source_name)
        all_chunks.extend(chunks)
        print(f"  {source_name}: {len(chunks)} chunks from {path.name}")

    if not all_chunks:
        raise SystemExit("No RAG chunks produced — check source files.")

    embeddings = embed_texts([chunk.text for chunk in all_chunks])

    np.save(EMBEDDINGS_DIR / "rag_chunks.npy", embeddings)
    metadata = [
        {"text": chunk.text, "source": chunk.source, "section": chunk.section}
        for chunk in all_chunks
    ]
    (EMBEDDINGS_DIR / "rag_chunks.json").write_text(
        json.dumps(metadata, indent=2), encoding="utf-8"
    )
    print(f"RAG index: {len(all_chunks)} chunks -> {EMBEDDINGS_DIR}")


def build_search_index() -> None:
    embeddings = embed_texts([item.context for item in SEARCH_ITEMS])

    np.save(EMBEDDINGS_DIR / "search_items.npy", embeddings)
    metadata = [
        {"title": item.title, "type": item.type, "url": item.url} for item in SEARCH_ITEMS
    ]
    (EMBEDDINGS_DIR / "search_items.json").write_text(
        json.dumps(metadata, indent=2), encoding="utf-8"
    )
    print(f"Search index: {len(SEARCH_ITEMS)} items -> {EMBEDDINGS_DIR}")


def main() -> None:
    EMBEDDINGS_DIR.mkdir(parents=True, exist_ok=True)
    print("Building RAG chunk index...")
    build_rag_index()
    print("Building semantic search index...")
    build_search_index()


if __name__ == "__main__":
    main()
