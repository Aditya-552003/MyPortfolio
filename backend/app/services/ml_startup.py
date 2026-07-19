"""Background ML initialization — keeps startup fast so Render can bind a port."""

from __future__ import annotations

import asyncio
import logging
import threading

from app.core.config import get_settings
from app.services.emotion_model import load_emotion_model

logger = logging.getLogger("app.ml_startup")

_load_lock = threading.Lock()
_background_task: asyncio.Task[None] | None = None


def _load_emotion_if_enabled() -> None:
    settings = get_settings()
    if not settings.load_emotion_model:
        logger.info("emotion model load skipped (LOAD_EMOTION_MODEL=false)")
        return
    with _load_lock:
        load_emotion_model()


async def start_background_ml_load() -> None:
    """Load EmoSens in a worker thread after uvicorn has opened the port."""
    global _background_task

    if _background_task is not None and not _background_task.done():
        return

    logger.info("deferring emotion model load to background thread")
    _background_task = asyncio.create_task(asyncio.to_thread(_load_emotion_if_enabled))


def load_emotion_sync() -> None:
    """Blocking load for local dev / tests that expect eager startup."""
    _load_emotion_if_enabled()
