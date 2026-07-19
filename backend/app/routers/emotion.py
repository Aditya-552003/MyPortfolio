import logging

from fastapi import APIRouter, HTTPException, Request

from app.core.config import get_settings
from app.core.rate_limit import limiter
from app.models.emotion import EmotionPrediction, EmotionRequest, EmotionResponse

logger = logging.getLogger("app.emotion")

router = APIRouter(tags=["emotion"])

_EMOTION_UNAVAILABLE_MSG = (
    "Emotion detection needs more memory than this server provides (EmoSens requires ~1 GB). "
    "Try the Chat or Semantic Search demos instead."
)


@router.post("/api/emotion", response_model=EmotionResponse)
@limiter.limit("20/minute")
async def detect_emotion(request: Request, payload: EmotionRequest) -> EmotionResponse:
    settings = get_settings()
    if settings.low_memory_mode or not settings.load_emotion_model:
        raise HTTPException(status_code=503, detail=_EMOTION_UNAVAILABLE_MSG)

    from app.services.emotion_inference import EmotionModelUnavailableError, predict_emotions

    try:
        predictions = predict_emotions(payload.text)
    except EmotionModelUnavailableError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("emotion inference failed")
        raise HTTPException(status_code=500, detail="Emotion inference failed.") from exc

    emotions = [
        EmotionPrediction(label=label, confidence=confidence) for label, confidence in predictions
    ]
    return EmotionResponse(emotions=emotions)
