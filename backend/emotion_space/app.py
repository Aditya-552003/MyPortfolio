"""
Gradio HF Space entrypoint — EmoSens emotion API + demo UI.

ZeroGPU requires @spaces.GPU on the function bound to .click() inside gr.Blocks.
Do not use gr.mount_gradio_app() on ZeroGPU — it breaks the startup GPU scan.
Portfolio frontend uses the Gradio API (/gradio_api/call/predict_emotion).
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
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

from app.core.config import get_settings
from app.services.emotion_inference import EmotionModelUnavailableError, predict_emotions
from app.services.emotion_model import get_emotion_registry, load_emotion_model

MAX_TEXT_LENGTH = 2000


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
def predict_emotion(text: str) -> list[dict[str, float | str]] | dict[str, str]:
    """Bound to Gradio .click() — ZeroGPU scans this handler at startup."""
    if not text.strip():
        return []
    try:
        return _to_response(text)["emotions"]
    except EmotionModelUnavailableError as exc:
        return {"error": str(exc)}


load_emotion_model()

with gr.Blocks(title="EmoSens") as demo:
    gr.Markdown(
        "# EmoSens — Emotion Detection\n"
        "Portfolio Playground calls the Gradio API (`predict_emotion`) on this Space."
    )
    text_input = gr.Textbox(label="Text", lines=3, placeholder="I am thrilled about this project!")
    json_output = gr.JSON(label="Predictions")
    analyze_btn = gr.Button("Analyze", variant="primary")
    analyze_btn.click(
        predict_emotion,
        inputs=text_input,
        outputs=json_output,
        api_name="predict_emotion",
    )

# Optional REST routes for local dev (HF production uses Gradio API).
app = demo.app

_settings = get_settings()
_cors_origins = [_settings.frontend_origin] if _settings.frontend_origin else []
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/emotion")
async def api_emotion(body: EmotionRequest) -> dict[str, list[dict[str, float | str]]]:
    try:
        result = predict_emotion(body.text)
        if isinstance(result, dict) and "error" in result:
            raise HTTPException(status_code=503, detail=str(result["error"]))
        return {"emotions": result}
    except EmotionModelUnavailableError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc


@app.get("/api/health")
def api_health() -> dict[str, object]:
    registry = get_emotion_registry()
    return {
        "status": "ok" if registry.loaded else "degraded",
        "service": "emotion",
        "model_loaded": registry.loaded,
        "error": registry.load_error,
    }

if __name__ == "__main__":
    demo.launch()
