from fastapi import APIRouter, HTTPException, Request

from app.core.config import get_settings
from app.core.rate_limit import limiter
from app.models.search import SearchRequest, SearchResponse, SearchResultItem
from app.services.lite_search import is_lite_search_ready, keyword_search
from app.services.search_index import get_search_index
from app.services.search_index import search as embedding_search

router = APIRouter(tags=["search"])

MIN_SCORE_THRESHOLD = 0.15
LITE_MIN_SCORE_THRESHOLD = 0.2


@router.post("/api/search", response_model=SearchResponse)
@limiter.limit("30/minute")
async def semantic_search(request: Request, payload: SearchRequest) -> SearchResponse:
    settings = get_settings()

    if settings.is_lite:
        if not is_lite_search_ready():
            raise HTTPException(status_code=503, detail="Search catalog unavailable.")
        matches = keyword_search(payload.query, top_k=10)
        threshold = LITE_MIN_SCORE_THRESHOLD
        results = [
            SearchResultItem(title=item.title, type=item.type, score=score, url=item.url)
            for item, score in matches
            if score >= threshold
        ]
        return SearchResponse(results=results)

    index = get_search_index()
    if not index.is_ready:
        raise HTTPException(
            status_code=503, detail=index.load_error or "Search index unavailable."
        )

    matches = embedding_search(payload.query, top_k=10)
    results = [
        SearchResultItem(title=item.title, type=item.type, score=score, url=item.url)
        for item, score in matches
        if score >= MIN_SCORE_THRESHOLD
    ]
    return SearchResponse(results=results)
