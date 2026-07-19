"""Loads the precomputed RAG chunk index and retrieves top-k matches for a query."""

import json
import logging
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from numpy.typing import NDArray

from app.core.config import get_settings
from app.services.keyword_retrieval import rank_by_keywords

logger = logging.getLogger("app.retrieval")

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
EMBEDDINGS_DIR = BACKEND_DIR / "embeddings"


@dataclass(frozen=True)
class RagChunk:
    text: str
    source: str
    section: str


@dataclass
class RetrievalIndex:
    chunks: list[RagChunk] | None = None
    embeddings: NDArray[np.float32] | None = None
    load_error: str | None = None
    keyword_mode: bool = False

    @property
    def is_ready(self) -> bool:
        if not self.chunks:
            return False
        if self.keyword_mode:
            return True
        return self.embeddings is not None


_index = RetrievalIndex()


def get_retrieval_index() -> RetrievalIndex:
    return _index


def load_rag_index() -> None:
    chunks_path = EMBEDDINGS_DIR / "rag_chunks.json"
    vectors_path = EMBEDDINGS_DIR / "rag_chunks.npy"
    settings = get_settings()
    _index.keyword_mode = settings.low_memory_mode

    if not chunks_path.exists():
        _index.load_error = "RAG index not found — run `python scripts/ingest.py` in backend/."
        logger.warning(_index.load_error)
        return

    try:
        metadata = json.loads(chunks_path.read_text(encoding="utf-8"))
        _index.chunks = [RagChunk(**item) for item in metadata]
        if _index.keyword_mode:
            logger.info(
                "rag index loaded (keyword mode — no torch)",
                extra={"extra_fields": {"chunks": len(_index.chunks)}},
            )
            return
        if not vectors_path.exists():
            _index.load_error = "RAG vectors not found — run `python scripts/ingest.py` in backend/."
            logger.warning(_index.load_error)
            return
        _index.embeddings = np.load(vectors_path)
        logger.info(
            "rag index loaded", extra={"extra_fields": {"chunks": len(_index.chunks)}}
        )
    except Exception as exc:  # noqa: BLE001 - degrade gracefully, never crash startup
        _index.load_error = f"Failed to load RAG index: {exc}"
        logger.exception("rag index load failed")


def retrieve(query: str, top_k: int = 5) -> list[tuple[RagChunk, float]]:
    if not _index.is_ready or _index.chunks is None:
        return []

    if _index.keyword_mode:
        return rank_by_keywords(
            query,
            _index.chunks,
            lambda chunk: f"{chunk.section} {chunk.text}",
            top_k,
        )

    from app.services.embedder import cosine_similarity_scores, embed_query

    if _index.embeddings is None:
        return []

    query_vec = embed_query(query)
    scores = cosine_similarity_scores(query_vec, _index.embeddings)
    top_indices = np.argsort(scores)[::-1][:top_k]
    return [(_index.chunks[i], float(scores[i])) for i in top_indices]
