from fastapi import APIRouter, HTTPException, Request

from app.core.config import get_settings
from app.core.rate_limit import limiter
from app.models.search import SearchRequest, SearchResponse, SearchResultItem
from app.services.lite_search import is_lite_search_ready, keyword_search

router = APIRouter(tags=["search"])

MIN_SCORE_THRESHOLD = 0.15
LITE_MIN_SCORE_THRESHOLD = 0.2


def _lite_search_results(query: str) -> list[SearchResultItem]:
    lite_matches = keyword_search(query, top_k=10)
    return [
        SearchResultItem(title=item.title, type=item.type, score=score, url=item.url)
        for item, score in lite_matches
        if score >= LITE_MIN_SCORE_THRESHOLD
    ]


def _embedding_search_results(query: str) -> list[SearchResultItem]:
    from app.services.search_index import get_search_index
    from app.services.search_index import search as embedding_search

    index = get_search_index()
    if not index.is_ready:
        raise HTTPException(
            status_code=503, detail=index.load_error or "Search index unavailable."
        )

    embedding_matches = embedding_search(query, top_k=10)
    return [
        SearchResultItem(title=item.title, type=item.type, score=score, url=item.url)
        for item, score in embedding_matches
        if score >= MIN_SCORE_THRESHOLD
    ]


@router.post("/api/search", response_model=SearchResponse)
@limiter.limit("30/minute")
async def semantic_search(request: Request, payload: SearchRequest) -> SearchResponse:
    settings = get_settings()

    if settings.is_lite:
        if not is_lite_search_ready():
            raise HTTPException(status_code=503, detail="Search catalog unavailable.")
        return SearchResponse(results=_lite_search_results(payload.query))

    return SearchResponse(results=_embedding_search_results(payload.query))
