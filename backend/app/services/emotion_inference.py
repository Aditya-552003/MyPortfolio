"""
Ensemble emotion inference — confidence-gated hybrid voting.

This mirrors the ensemble logic in emosense-ai's `scripts/evaluate_model.py`
(the algorithm that produced the project's published 98% accuracy/F1 and the
confusion matrix shown on its portfolio page) rather than the simpler fixed
alpha-blend in that repo's live `/predict` route — so this demo's live
behavior matches the accuracy already advertised on the EmoSens project page.

  1. Semantic branch  : word TF-IDF + char TF-IDF + NRC lexicon -> XGBoost
  2. Contextual branch: fine-tuned RoBERTa
  3. Confidence gate   : RoBERTa alone when confident (>= 0.75),
                         else 70% RoBERTa + 30% XGBoost
"""

import torch
from scipy.sparse import hstack

from app.services.emotion_model import get_emotion_registry
from app.services.emotion_preprocessing import clean_text, nrc_features

ROBERTA_CONFIDENCE_THRESHOLD = 0.75
BLEND_ROBERTA_WEIGHT = 0.70


class EmotionModelUnavailableError(RuntimeError):
    """Raised when the emotion model failed to load or never loaded."""


def predict_emotions(text: str) -> list[tuple[str, float]]:
    """Returns `(label, confidence)` pairs for all classes, sorted descending."""
    registry = get_emotion_registry()
    if not registry.loaded:
        raise EmotionModelUnavailableError(registry.load_error or "Emotion model not loaded.")

    clean = clean_text(text)

    # Semantic branch (XGBoost)
    x_word = registry.word_tfidf.transform([clean])
    x_char = registry.char_tfidf.transform([clean])
    x_nrc = registry.nrc_scaler.transform(
        nrc_features([clean], registry.nrc_dict, registry.nrc_emotions)
    )
    x_semantic = hstack([x_word, x_char, x_nrc])
    semantic_probs = registry.xgb.predict_proba(x_semantic)[0]

    # Contextual branch (RoBERTa)
    encoded = registry.tokenizer(
        [text], padding=True, truncation=True, max_length=128, return_tensors="pt"
    ).to(registry.device)
    with torch.no_grad():
        logits = registry.roberta(**encoded).logits
    contextual_probs = torch.softmax(logits, dim=1).cpu().numpy()[0]

    # Confidence-gated blend
    roberta_confidence = float(contextual_probs.max())
    if roberta_confidence >= ROBERTA_CONFIDENCE_THRESHOLD:
        final_probs = contextual_probs
    else:
        final_probs = (
            BLEND_ROBERTA_WEIGHT * contextual_probs + (1 - BLEND_ROBERTA_WEIGHT) * semantic_probs
        )

    classes: list[str] = registry.label_encoder.classes_.tolist()
    results = list(zip(classes, (float(p) for p in final_probs), strict=True))
    return sorted(results, key=lambda pair: pair[1], reverse=True)
