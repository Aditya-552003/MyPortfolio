"""Keyword search for lite mode — no embeddings required."""

from __future__ import annotations

import re

from app.data.search_catalog import SEARCH_ITEMS, SearchItem

_ready = False


def init_lite_search() -> None:
    global _ready
    _ready = bool(SEARCH_ITEMS)


def is_lite_search_ready() -> bool:
    return _ready


def keyword_search(query: str, top_k: int = 10) -> list[tuple[SearchItem, float]]:
    tokens = [t for t in re.findall(r"[a-z0-9]+", query.lower()) if len(t) > 1]
    if not tokens:
        return []

    scored: list[tuple[SearchItem, float]] = []
    for item in SEARCH_ITEMS:
        haystack = f"{item.title} {item.type} {item.context}".lower()
        hits = sum(1 for token in tokens if token in haystack)
        if hits == 0:
            continue
        score = min(1.0, hits / len(tokens))
        scored.append((item, score))

    scored.sort(key=lambda pair: pair[1], reverse=True)
    return scored[:top_k]
