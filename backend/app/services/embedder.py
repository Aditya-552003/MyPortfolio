"""Shared Sentence-Transformer embedding model — used by both RAG retrieval and semantic search."""

import logging
from functools import lru_cache
from typing import cast

import numpy as np
from numpy.typing import NDArray
from sentence_transformers import SentenceTransformer

logger = logging.getLogger("app.embedder")

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"


@lru_cache
def get_embedding_model() -> SentenceTransformer:
    logger.info(
        "loading sentence-transformer model",
        extra={"extra_fields": {"model": EMBEDDING_MODEL_NAME}},
    )
    return cast(SentenceTransformer, SentenceTransformer(EMBEDDING_MODEL_NAME))


def embed_texts(texts: list[str]) -> NDArray[np.float32]:
    model = get_embedding_model()
    embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=False)
    return np.asarray(embeddings, dtype=np.float32)


def embed_query(text: str) -> NDArray[np.float32]:
    return cast(NDArray[np.float32], embed_texts([text])[0])


def cosine_similarity_scores(
    query_vec: NDArray[np.float32], corpus_matrix: NDArray[np.float32]
) -> NDArray[np.float32]:
    """Both inputs are L2-normalized, so cosine similarity reduces to a dot product."""
    result = corpus_matrix @ query_vec
    return np.asarray(result, dtype=np.float32)
