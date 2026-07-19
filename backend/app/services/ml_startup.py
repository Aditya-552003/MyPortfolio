"""Background ML initialization — skipped entirely in low_memory_mode."""

from __future__ import annotations

import asyncio
import logging
import threading

from app.core.config import get_settings

logger = logging.getLogger("app.ml_startup")

_load_lock = threading.Lock()
_background_task: asyncio.Task[None] | None = None


def _load_emotion_if_enabled() -> None:
    settings = get_settings()
    if settings.low_memory_mode:
        logger.info("emotion model skipped (LOW_MEMORY_MODE=true)")
        return
    if not settings.load_emotion_model:
        logger.info("emotion model load skipped (LOAD_EMOTION_MODEL=false)")
        return
    with _load_lock:
        from app.services.emotion_model import load_emotion_model

        load_emotion_model()


async def start_background_ml_load() -> None:
    """Load EmoSens in a worker thread after uvicorn has opened the port."""
    global _background_task

    settings = get_settings()
    if settings.low_memory_mode or not settings.load_emotion_model:
        return

    if _background_task is not None and not _background_task.done():
        return

    logger.info("deferring emotion model load to background thread")
    _background_task = asyncio.create_task(asyncio.to_thread(_load_emotion_if_enabled))


def load_emotion_sync() -> None:
    """Blocking load for local dev / tests that expect eager startup."""
    _load_emotion_if_enabled()
