from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

from app.core.config import get_settings
from app.services.rag_chat import get_rag_chat_service
from app.services.search_index import get_search_index
from app.services.voice import get_voice_service

router = APIRouter(tags=["health"])


class ServiceStatus(BaseModel):
    chat: bool
    emotion: bool
    search: bool
    voice: bool


class HealthResponse(BaseModel):
    """Liveness plus per-service readiness for the frontend status indicator."""

    status: Literal["ok", "degraded"]
    services: ServiceStatus
    mode: Literal["full", "low_memory"]


@router.get("/api/health", response_model=HealthResponse)
def get_health() -> HealthResponse:
    settings = get_settings()
    emotion_ready = False
    if not settings.low_memory_mode and settings.load_emotion_model:
        from app.services.emotion_model import get_emotion_registry

        emotion_ready = get_emotion_registry().loaded
    services = ServiceStatus(
        chat=get_rag_chat_service().is_available,
        emotion=emotion_ready,
        search=get_search_index().is_ready,
        voice=get_voice_service().is_available,
    )
    # In low_memory_mode emotion is intentionally off — don't mark degraded for that alone.
    if settings.low_memory_mode:
        core_ready = services.chat and services.search and services.voice
        status: Literal["ok", "degraded"] = "ok" if core_ready else "degraded"
        mode: Literal["full", "low_memory"] = "low_memory"
    else:
        all_ready = all((services.chat, services.emotion, services.search, services.voice))
        status = "ok" if all_ready else "degraded"
        mode = "full"
    return HealthResponse(status=status, services=services, mode=mode)
