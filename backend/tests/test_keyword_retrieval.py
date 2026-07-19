from app.services.keyword_retrieval import keyword_overlap_score, rank_by_keywords


def test_keyword_overlap_prefers_matching_terms() -> None:
    high = keyword_overlap_score("python machine learning", "Python and machine learning projects")
    low = keyword_overlap_score("python machine learning", "TypeScript frontend work")
    assert high > low
    assert high > 0


def test_rank_by_keywords_returns_top_matches() -> None:
    items = ["Python backend", "React UI", "Python ML pipeline"]
    ranked = rank_by_keywords("python ml", items, lambda s: s, top_k=2)
    assert ranked[0][0] == "Python ML pipeline"
