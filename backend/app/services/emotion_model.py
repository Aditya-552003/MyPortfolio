"""
ML model lifecycle for the EmoSens emotion classifier.

Downloads the real trained ensemble (fine-tuned RoBERTa + XGBoost + NRC lexicon)
from its private Hugging Face Hub repo and loads it into a module-level registry
once at startup. If `HF_TOKEN` isn't configured or the download fails, the
registry records the error and `/api/emotion` degrades to a 503 instead of
crashing the whole app.
"""

import logging
import pickle
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import joblib
import torch
from huggingface_hub import hf_hub_download
from transformers import AutoModelForSequenceClassification, AutoTokenizer

from app.core.config import get_settings
from app.services.emotion_preprocessing import load_nrc_lexicon

logger = logging.getLogger("app.emotion_model")

_ROBERTA_FILES = (
    "roberta_best/config.json",
    "roberta_best/model.safetensors",
    "roberta_best/tokenizer.json",
    "roberta_best/tokenizer_config.json",
)


@dataclass
class EmotionModelRegistry:
    loaded: bool = False
    load_error: str | None = None
    word_tfidf: Any = None
    char_tfidf: Any = None
    nrc_scaler: Any = None
    xgb: Any = None
    label_encoder: Any = None
    tokenizer: Any = None
    roberta: Any = None
    nrc_dict: dict[str, list[int]] = field(default_factory=dict)
    nrc_emotions: list[str] = field(default_factory=list)
    device: str = "cpu"


_registry = EmotionModelRegistry()


def get_emotion_registry() -> EmotionModelRegistry:
    return _registry


def load_emotion_model() -> None:
    """Loads all model artifacts once. Safe to call at startup; never raises."""
    settings = get_settings()

    if not settings.hf_token:
        _registry.load_error = (
            "HF_TOKEN is not configured — emotion detection is unavailable. "
            "See backend/.env.example."
        )
        logger.warning(_registry.load_error)
        return

    try:
        def download(filename: str) -> str:
            return hf_hub_download(
                repo_id=settings.hf_model_repo, filename=filename, token=settings.hf_token
            )

        _registry.word_tfidf = joblib.load(download("word_tfidf.pkl"))
        _registry.char_tfidf = joblib.load(download("char_tfidf.pkl"))
        _registry.nrc_scaler = joblib.load(download("nrc_scaler.pkl"))
        _registry.xgb = joblib.load(download("xgb.pkl"))
        with open(download("label_encoder.pkl"), "rb") as f:
            _registry.label_encoder = pickle.load(f)

        nrc_dict, nrc_emotions = load_nrc_lexicon(download("nrc_lexicon.txt"))
        _registry.nrc_dict = nrc_dict
        _registry.nrc_emotions = nrc_emotions

        roberta_files = [download(name) for name in _ROBERTA_FILES]
        roberta_dir = str(Path(roberta_files[0]).parent)

        _registry.device = "cuda" if torch.cuda.is_available() else "cpu"
        _registry.tokenizer = AutoTokenizer.from_pretrained(roberta_dir)
        roberta = AutoModelForSequenceClassification.from_pretrained(roberta_dir)
        roberta.to(_registry.device)
        roberta.eval()
        _registry.roberta = roberta

        _registry.loaded = True
        logger.info(
            "emotion model loaded",
            extra={"extra_fields": {"device": _registry.device}},
        )
    except Exception as exc:  # noqa: BLE001 - degrade gracefully, never crash startup
        _registry.load_error = f"Failed to load emotion model: {exc}"
        logger.exception("emotion model load failed")
