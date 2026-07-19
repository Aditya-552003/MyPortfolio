from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

from app.core.config import get_settings
from app.services.lite_search import is_lite_search_ready
from app.services.rag_chat import get_rag_chat_service
from app.services.voice import get_voice_service

router = APIRouter(tags=["health"])


class ServiceStatus(BaseModel):
    chat: bool
    emotion: bool
    search: bool
    voice: bool
    mode: Literal["full", "lite"] = "full"
    emotion_external: bool = False


class HealthResponse(BaseModel):
    """Liveness plus per-service readiness for the frontend status indicator."""

    status: Literal["ok", "degraded"]
    services: ServiceStatus


@router.get("/api/health", response_model=HealthResponse)
def get_health() -> HealthResponse:
    settings = get_settings()

    if settings.is_lite:
        services = ServiceStatus(
            chat=get_rag_chat_service().is_available,
            emotion=False,
            search=is_lite_search_ready(),
            voice=get_voice_service().is_available,
            mode="lite",
            emotion_external=True,
        )
    else:
        from app.services.emotion_model import get_emotion_registry
        from app.services.search_index import get_search_index

        services = ServiceStatus(
            chat=get_rag_chat_service().is_available,
            emotion=get_emotion_registry().loaded,
            search=get_search_index().is_ready,
            voice=get_voice_service().is_available,
            mode="full",
            emotion_external=False,
        )

    # In lite/hybrid mode emotion is checked against HF Space from the frontend.
    core_ready = services.chat and services.search and services.voice
    all_ready = core_ready and (services.emotion or services.emotion_external)
    return HealthResponse(status="ok" if all_ready else "degraded", services=services)
