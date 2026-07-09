import json
import logging
from collections.abc import AsyncIterator, Sequence

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse

from app.core.rate_limit import limiter
from app.models.chat import ChatRequest
from app.services.rag_chat import RagChatUnavailableError, get_rag_chat_service

logger = logging.getLogger("app.chat")

router = APIRouter(tags=["chat"])


def _sse_event(payload: dict[str, object]) -> str:
    return f"data: {json.dumps(payload)}\n\n"


async def _event_stream(
    message: str, history: Sequence[tuple[str, str]]
) -> AsyncIterator[str]:
    service = get_rag_chat_service()
    try:
        async for token in service.stream_reply(message, history):
            yield _sse_event({"token": token})
    except RagChatUnavailableError as exc:
        yield _sse_event({"error": str(exc)})
        return
    except Exception:
        logger.exception("chat stream failed")
        yield _sse_event({"error": "Something went wrong generating a response."})
        return

    yield _sse_event({"done": True})


@router.post("/api/chat")
@limiter.limit("10/minute")
async def chat(request: Request, payload: ChatRequest) -> StreamingResponse:
    service = get_rag_chat_service()
    if not service.is_available:
        raise HTTPException(status_code=503, detail="Chat is temporarily unavailable.")

    history = [(entry.role, entry.content) for entry in payload.history]

    return StreamingResponse(
        _event_stream(payload.message, history),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
