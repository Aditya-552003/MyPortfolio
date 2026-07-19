# Aditya AI Studio API — production image for Render (or any container host).
# ML deps (torch, transformers) make this image large (~2 GB+); allow extra build time.

FROM python:3.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=8000

WORKDIR /app

# System libs occasionally required by scipy/sklearn wheels on slim images.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app ./app
COPY embeddings ./embeddings
COPY scripts ./scripts

EXPOSE 8000

# Render sets $PORT; default to 8000 for local docker runs.
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
