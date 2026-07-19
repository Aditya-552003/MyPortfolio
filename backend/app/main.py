from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.body_limit import BodySizeLimitMiddleware
from app.core.config import get_settings
from app.core.errors import (
    http_exception_handler,
    rate_limit_exception_handler,
    unhandled_exception_handler,
    validation_exception_handler,
)
from app.core.logging import configure_logging
from app.core.middleware import RequestLoggingMiddleware
from app.core.rate_limit import limiter
from app.routers import chat, contact, health, search, voice
from app.services.lite_context import load_lite_context
from app.services.lite_search import init_lite_search

settings = get_settings()
configure_logging(settings.log_level)


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None]:
    if settings.is_lite:
        load_lite_context()
        init_lite_search()
    else:
        from app.services.ml_startup import load_emotion_sync, start_background_ml_load
        from app.services.retrieval import load_rag_index
        from app.services.search_index import load_search_index

        load_rag_index()
        load_search_index()
        if settings.defer_ml_load:
            await start_background_ml_load()
        else:
            load_emotion_sync()

    yield


app = FastAPI(
    title="Aditya AI Studio API",
    version="0.1.0",
    lifespan=lifespan,
    description="Lite mode" if settings.is_lite else "Full mode",
)

app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(BodySizeLimitMiddleware)
app.add_middleware(RequestLoggingMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(RateLimitExceeded, rate_limit_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)


@app.get("/", tags=["health"])
def get_root() -> dict[str, str]:
    return {
        "name": app.title,
        "version": app.version,
        "mode": settings.backend_mode,
        "docs": "/docs",
        "health": "/api/health",
    }


app.include_router(health.router)
app.include_router(contact.router)
if not settings.is_lite:
    from app.routers import emotion

    app.include_router(emotion.router)
app.include_router(search.router)
app.include_router(chat.router)
app.include_router(voice.router)
