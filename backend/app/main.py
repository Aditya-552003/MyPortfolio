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
from app.routers import chat, contact, emotion, health, search, voice
from app.services.emotion_model import load_emotion_model
from app.services.retrieval import load_rag_index
from app.services.search_index import load_search_index

settings = get_settings()
configure_logging(settings.log_level)


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None]:
    load_emotion_model()
    load_rag_index()
    load_search_index()
    yield


app = FastAPI(title="Aditya AI Studio API", version="0.1.0", lifespan=lifespan)

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
        "docs": "/docs",
        "health": "/api/health",
    }


app.include_router(health.router)
app.include_router(contact.router)
app.include_router(emotion.router)
app.include_router(search.router)
app.include_router(chat.router)
app.include_router(voice.router)
