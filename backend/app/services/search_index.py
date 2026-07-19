"""Loads the precomputed semantic-search item index and ranks matches for a query."""

import json
import logging
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from numpy.typing import NDArray

from app.core.config import get_settings
from app.services.keyword_retrieval import rank_by_keywords

logger = logging.getLogger("app.search_index")

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
EMBEDDINGS_DIR = BACKEND_DIR / "embeddings"


@dataclass(frozen=True)
class SearchResultItem:
    title: str
    type: str
    url: str


@dataclass
class SearchIndex:
    items: list[SearchResultItem] | None = None
    embeddings: NDArray[np.float32] | None = None
    load_error: str | None = None
    keyword_mode: bool = False

    @property
    def is_ready(self) -> bool:
        if not self.items:
            return False
        if self.keyword_mode:
            return True
        return self.embeddings is not None


_index = SearchIndex()


def get_search_index() -> SearchIndex:
    return _index


def load_search_index() -> None:
    items_path = EMBEDDINGS_DIR / "search_items.json"
    vectors_path = EMBEDDINGS_DIR / "search_items.npy"
    settings = get_settings()
    _index.keyword_mode = settings.low_memory_mode

    if not items_path.exists():
        _index.load_error = (
            "Search index not found — run `python scripts/ingest.py` in backend/."
        )
        logger.warning(_index.load_error)
        return

    try:
        metadata = json.loads(items_path.read_text(encoding="utf-8"))
        _index.items = [SearchResultItem(**item) for item in metadata]
        if _index.keyword_mode:
            logger.info(
                "search index loaded (keyword mode — no torch)",
                extra={"extra_fields": {"items": len(_index.items)}},
            )
            return
        if not vectors_path.exists():
            _index.load_error = (
                "Search vectors not found — run `python scripts/ingest.py` in backend/."
            )
            logger.warning(_index.load_error)
            return
        _index.embeddings = np.load(vectors_path)
        logger.info(
            "search index loaded", extra={"extra_fields": {"items": len(_index.items)}}
        )
    except Exception as exc:  # noqa: BLE001 - degrade gracefully, never crash startup
        _index.load_error = f"Failed to load search index: {exc}"
        logger.exception("search index load failed")


def search(query: str, top_k: int = 10) -> list[tuple[SearchResultItem, float]]:
    if not _index.is_ready or _index.items is None:
        return []

    if _index.keyword_mode:
        return rank_by_keywords(
            query,
            _index.items,
            lambda item: f"{item.title} {item.type}",
            top_k,
        )

    from app.services.embedder import cosine_similarity_scores, embed_query

    if _index.embeddings is None:
        return []

    query_vec = embed_query(query)
    scores = cosine_similarity_scores(query_vec, _index.embeddings)
    top_indices = np.argsort(scores)[::-1][:top_k]
    return [(_index.items[i], float(scores[i])) for i in top_indices]
