import logging
from typing import Annotated

from fastapi import APIRouter, File, HTTPException, Request, UploadFile
from fastapi.responses import Response

from app.core.rate_limit import limiter
from app.models.voice import MAX_AUDIO_BYTES, SttResponse, TtsRequest
from app.services.voice import VoiceUnavailableError, get_voice_service

logger = logging.getLogger("app.voice")

router = APIRouter(tags=["voice"])

AudioUpload = Annotated[
    UploadFile, File(description="Recorded audio (webm/wav/mp3/ogg)")
]

ALLOWED_AUDIO_TYPES = frozenset(
    {
        "audio/webm",
        "audio/wav",
        "audio/wave",
        "audio/x-wav",
        "audio/mpeg",
        "audio/mp3",
        "audio/mp4",
        "audio/ogg",
        "audio/flac",
        "application/octet-stream",
    }
)


@router.post("/api/voice/stt", response_model=SttResponse)
@limiter.limit("10/minute")
async def speech_to_text(request: Request, audio: AudioUpload) -> SttResponse:
    service = get_voice_service()
    if not service.is_available:
        raise HTTPException(
            status_code=503,
            detail="Voice is temporarily unavailable. You can continue with text instead.",
        )

    mime_type = (audio.content_type or "application/octet-stream").split(";")[0].strip().lower()
    if mime_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=422,
            detail=f"Unsupported audio type '{mime_type}'. Use webm, wav, mp3, or ogg.",
        )

    data = await audio.read()
    if not data:
        raise HTTPException(status_code=422, detail="Audio file is empty.")
    if len(data) > MAX_AUDIO_BYTES:
        raise HTTPException(status_code=422, detail="Audio file exceeds the 5 MB limit.")

    try:
        transcript = await service.transcribe(data, mime_type)
    except VoiceUnavailableError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("STT failed")
        raise HTTPException(status_code=500, detail="Speech recognition failed.") from exc

    return SttResponse(transcript=transcript)


@router.post("/api/voice/tts")
@limiter.limit("10/minute")
async def text_to_speech(request: Request, payload: TtsRequest) -> Response:
    service = get_voice_service()
    if not service.is_available:
        raise HTTPException(
            status_code=503,
            detail="Voice is temporarily unavailable. You can continue with text instead.",
        )

    try:
        wav_bytes = await service.synthesize(payload.text)
    except VoiceUnavailableError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("TTS failed")
        raise HTTPException(status_code=500, detail="Speech synthesis failed.") from exc

    return Response(
        content=wav_bytes,
        media_type="audio/wav",
        headers={"Cache-Control": "no-store", "Content-Disposition": "inline; filename=speech.wav"},
    )
