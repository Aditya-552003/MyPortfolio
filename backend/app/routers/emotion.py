import logging

from fastapi import APIRouter, HTTPException, Request

from app.core.rate_limit import limiter
from app.models.emotion import EmotionPrediction, EmotionRequest, EmotionResponse
from app.services.emotion_inference import EmotionModelUnavailableError, predict_emotions

logger = logging.getLogger("app.emotion")

router = APIRouter(tags=["emotion"])


@router.post("/api/emotion", response_model=EmotionResponse)
@limiter.limit("20/minute")
async def detect_emotion(request: Request, payload: EmotionRequest) -> EmotionResponse:
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
