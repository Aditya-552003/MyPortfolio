from fastapi import APIRouter, HTTPException, Request

from app.core.rate_limit import limiter
from app.models.search import SearchRequest, SearchResponse, SearchResultItem
from app.services.search_index import get_search_index
from app.services.search_index import search as run_search

router = APIRouter(tags=["search"])

# Below this cosine-similarity score, a match is unlikely to be genuinely relevant.
MIN_SCORE_THRESHOLD = 0.15


@router.post("/api/search", response_model=SearchResponse)
@limiter.limit("30/minute")
async def semantic_search(request: Request, payload: SearchRequest) -> SearchResponse:
    index = get_search_index()
    if not index.is_ready:
        raise HTTPException(
            status_code=503, detail=index.load_error or "Search index unavailable."
        )

    matches = run_search(payload.query, top_k=10)
    results = [
        SearchResultItem(title=item.title, type=item.type, score=score, url=item.url)
        for item, score in matches
        if score >= MIN_SCORE_THRESHOLD
    ]
    return SearchResponse(results=results)
