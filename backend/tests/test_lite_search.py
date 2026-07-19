"""Unit tests for lite-mode keyword search (no embeddings)."""

from app.services.lite_search import init_lite_search, keyword_search


def test_keyword_search_finds_python_skill() -> None:
    init_lite_search()
    matches = keyword_search("python machine learning", top_k=5)
    assert len(matches) > 0
    titles = [item.title.lower() for item, _ in matches]
    assert any("python" in title for title in titles)


def test_keyword_search_empty_query_returns_nothing() -> None:
    init_lite_search()
    assert keyword_search("a", top_k=5) == []
