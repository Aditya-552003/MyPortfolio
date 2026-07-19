"""Minimal FastAPI app for Hugging Face Spaces — EmoSens emotion demo only."""

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

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
from app.routers.emotion import router as emotion_router
from app.services.emotion_model import get_emotion_registry, load_emotion_model

settings = get_settings()
configure_logging(settings.log_level)


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None]:
    load_emotion_model()
    yield


app = FastAPI(title="EmoSens Emotion API", version="1.0.0", lifespan=lifespan)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin] if settings.frontend_origin else [],
    allow_origin_regex=r"https://.*\.(vercel\.app|hf\.space)$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(RateLimitExceeded, rate_limit_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)

app.include_router(emotion_router)


@app.get("/api/health")
def get_health() -> dict[str, object]:
    registry = get_emotion_registry()
    return {
        "status": "ok" if registry.loaded else "degraded",
        "service": "emotion",
        "model_loaded": registry.loaded,
        "error": registry.load_error,
    }


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "EmoSens Emotion API", "health": "/api/health", "endpoint": "/api/emotion"}
