"""
Text cleaning and NRC Emotion Lexicon feature engineering.

Ported from the real EmoSens project (emosense-ai/backend/app/utils/preprocessing.py)
to mirror the exact preprocessing used at training time.
"""

import re
from collections import defaultdict

import numpy as np
import pandas as pd
from numpy.typing import NDArray


def clean_text(text: str) -> str:
    """Lowercase, strip URLs, and keep only ASCII letters and spaces."""
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    return text.strip()


def load_nrc_lexicon(lexicon_path: str) -> tuple[dict[str, list[int]], list[str]]:
    """Parses the NRC word-level lexicon file into a word -> emotion-index lookup."""
    nrc = pd.read_csv(lexicon_path, sep="\t", names=["word", "emotion", "association"])
    nrc = nrc[nrc["association"] == 1]
    nrc_emotions: list[str] = sorted(nrc["emotion"].unique().tolist())
    emotion_to_idx = {emotion: index for index, emotion in enumerate(nrc_emotions)}

    nrc_dict: dict[str, list[int]] = defaultdict(list)
    for _, row in nrc.iterrows():
        nrc_dict[row["word"]].append(emotion_to_idx[row["emotion"]])

    return dict(nrc_dict), nrc_emotions


def nrc_features(
    texts: list[str], nrc_dict: dict[str, list[int]], nrc_emotions: list[str]
) -> NDArray[np.float32]:
    """Computes NRC emotion density features for pre-cleaned texts."""
    feats = np.zeros((len(texts), len(nrc_emotions)), dtype=np.float32)
    for i, text in enumerate(texts):
        tokens = text.split()
        n_tokens = max(len(tokens), 1)
        for token in set(tokens):
            for emo_idx in nrc_dict.get(token, []):
                feats[i, emo_idx] += 1.0 / n_tokens
    return feats
