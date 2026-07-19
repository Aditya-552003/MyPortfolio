"""Lightweight retrieval when sentence-transformers/torch cannot fit in memory (Render 512Mi)."""

from __future__ import annotations

import re
from collections.abc import Callable, Sequence
from typing import TypeVar

T = TypeVar("T")

_STOPWORDS = frozenset(
    {
        "a",
        "an",
        "the",
        "is",
        "are",
        "was",
        "were",
        "for",
        "to",
        "of",
        "in",
        "on",
        "with",
        "and",
        "or",
        "my",
        "me",
        "what",
        "which",
        "how",
        "does",
        "do",
        "about",
        "your",
        "you",
    }
)


def _tokens(text: str) -> set[str]:
    return {
        token
        for token in re.findall(r"[a-z0-9]+", text.lower())
        if len(token) > 2 and token not in _STOPWORDS
    }


def keyword_overlap_score(query: str, document: str) -> float:
    query_tokens = _tokens(query)
    if not query_tokens:
        return 0.0
    doc_tokens = _tokens(document)
    if not doc_tokens:
        return 0.0
    overlap = len(query_tokens & doc_tokens)
    return overlap / len(query_tokens)


def rank_by_keywords(
    query: str,
    items: Sequence[T],
    text_fn: Callable[[T], str],
    top_k: int,
) -> list[tuple[T, float]]:
    scored = [(item, keyword_overlap_score(query, text_fn(item))) for item in items]
    scored.sort(key=lambda pair: pair[1], reverse=True)
    return [(item, score) for item, score in scored[:top_k] if score > 0]
