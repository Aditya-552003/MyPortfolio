from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

from app.services.emotion_model import get_emotion_registry
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


@router.get("/api/health", response_model=HealthResponse)
def get_health() -> HealthResponse:
    services = ServiceStatus(
        chat=get_rag_chat_service().is_available,
        emotion=get_emotion_registry().loaded,
        search=get_search_index().is_ready,
        voice=get_voice_service().is_available,
    )
    all_ready = all((services.chat, services.emotion, services.search, services.voice))
    return HealthResponse(status="ok" if all_ready else "degraded", services=services)
