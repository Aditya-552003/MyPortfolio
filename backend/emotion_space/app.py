"""
Gradio HF Space entrypoint — EmoSens emotion API + demo UI.

HF Gradio Spaces only reliably expose routes on a FastAPI app with Gradio mounted
via gr.mount_gradio_app(), not routes added to demo.app after the fact.
"""

from __future__ import annotations

import sys
from pathlib import Path

_SPACE_ROOT = Path(__file__).resolve().parent
if (_SPACE_ROOT / "app").is_dir():
    BACKEND_ROOT = _SPACE_ROOT
elif (_SPACE_ROOT.parent / "app").is_dir():
    BACKEND_ROOT = _SPACE_ROOT.parent
else:
    BACKEND_ROOT = _SPACE_ROOT.parent

if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

import gradio as gr
import spaces
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

from app.core.config import get_settings
from app.services.emotion_inference import EmotionModelUnavailableError, predict_emotions
from app.services.emotion_model import get_emotion_registry, load_emotion_model

MAX_TEXT_LENGTH = 2000

fastapi_app = FastAPI(title="EmoSens Emotion API")

_settings = get_settings()
_cors_origins = [_settings.frontend_origin] if _settings.frontend_origin else []
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmotionRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=MAX_TEXT_LENGTH)

    @field_validator("text")
    @classmethod
    def text_must_not_be_blank(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("Input text must not be empty.")
        return stripped


def _to_response(text: str) -> dict[str, list[dict[str, float | str]]]:
    predictions = predict_emotions(text)
    return {
        "emotions": [
            {"label": label, "confidence": float(confidence)} for label, confidence in predictions
        ]
    }


@spaces.GPU(duration=120)
def predict_for_ui(text: str) -> list[dict[str, float | str]] | dict[str, str]:
    """Gradio handler — must carry @spaces.GPU when Space uses ZeroGPU hardware."""
    if not text.strip():
        return []
    try:
        return _to_response(text)["emotions"]
    except EmotionModelUnavailableError as exc:
        return {"error": str(exc)}


@fastapi_app.get("/api/health")
def api_health() -> dict[str, object]:
    registry = get_emotion_registry()
    return {
        "status": "ok" if registry.loaded else "degraded",
        "service": "emotion",
        "model_loaded": registry.loaded,
        "error": registry.load_error,
    }


@fastapi_app.post("/api/emotion")
async def api_emotion(body: EmotionRequest) -> dict[str, list[dict[str, float | str]]]:
    try:
        result = predict_for_ui(body.text)
        if isinstance(result, dict) and "error" in result:
            raise HTTPException(status_code=503, detail=str(result["error"]))
        return {"emotions": result}
    except EmotionModelUnavailableError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc


load_emotion_model()

with gr.Blocks(title="EmoSens") as blocks:
    gr.Markdown(
        "# EmoSens — Emotion Detection\n"
        "Portfolio Playground calls `POST /api/emotion` on this Space. "
        "Try a sample below while the model is warm."
    )
    text_input = gr.Textbox(label="Text", lines=3, placeholder="I am thrilled about this project!")
    json_output = gr.JSON(label="Predictions")
    analyze_btn = gr.Button("Analyze", variant="primary")
    analyze_btn.click(
        predict_for_ui,
        inputs=text_input,
        outputs=json_output,
        api_name="predict_emotion",
    )

# Custom REST routes on fastapi_app + Gradio UI — HF exposes this combined app.
demo = gr.mount_gradio_app(fastapi_app, blocks, path="/")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(demo, host="0.0.0.0", port=7860)
