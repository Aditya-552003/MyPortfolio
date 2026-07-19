"""
Voice STT/TTS via Gemini — reuses GEMINI_API_KEY (no separate voice provider).

- STT: gemini-2.5-flash audio understanding → transcript text
- TTS: gemini-2.5-flash-preview-tts → PCM audio wrapped as WAV for browsers

Timeouts and a single retry protect the event loop from hung provider calls;
missing keys or provider failures surface as VoiceUnavailableError → HTTP 503.
"""

from __future__ import annotations

import asyncio
import io
import logging
import wave
from collections.abc import Callable
from functools import lru_cache
from typing import TypeVar

from google import genai
from google.genai import types

from app.core.config import get_settings

logger = logging.getLogger("app.voice")

STT_MODEL = "gemini-2.5-flash"
TTS_MODEL = "gemini-2.5-flash-preview-tts"
TTS_VOICE = "Kore"
TTS_SAMPLE_RATE = 24000
PROVIDER_TIMEOUT_SECONDS = 10.0
MAX_ATTEMPTS = 2

STT_PROMPT = (
    "Transcribe the speech in this audio exactly. "
    "Return only the transcript text with no commentary, labels, or quotes."
)

T = TypeVar("T")


class VoiceUnavailableError(RuntimeError):
    """Raised when voice STT/TTS cannot run (no key, timeout, or provider failure)."""


def _pcm_to_wav(pcm: bytes, sample_rate: int = TTS_SAMPLE_RATE, channels: int = 1) -> bytes:
    buffer = io.BytesIO()
    with wave.open(buffer, "wb") as wav_file:
        wav_file.setnchannels(channels)
        wav_file.setsampwidth(2)  # 16-bit PCM
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(pcm)
    return buffer.getvalue()


def _extract_inline_audio(response: types.GenerateContentResponse) -> bytes:
    if not response.candidates:
        raise VoiceUnavailableError("TTS returned no audio.")
    content = response.candidates[0].content
    if content is None or not content.parts:
        raise VoiceUnavailableError("TTS returned no audio.")
    for part in content.parts:
        inline = part.inline_data
        if inline is not None and inline.data:
            data = inline.data
            return data if isinstance(data, bytes) else bytes(data)
    raise VoiceUnavailableError("TTS returned no audio payload.")


class VoiceService:
    def __init__(self) -> None:
        settings = get_settings()
        self._client: genai.Client | None = (
            genai.Client(api_key=settings.gemini_api_key) if settings.gemini_api_key else None
        )

    @property
    def is_available(self) -> bool:
        return self._client is not None

    async def _call_with_retry(self, sync_fn: Callable[..., T], *args: object) -> T:
        """Run a blocking Gemini call off-thread with timeout + one retry."""
        last_error: BaseException | None = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                return await asyncio.wait_for(
                    asyncio.to_thread(sync_fn, *args),
                    timeout=PROVIDER_TIMEOUT_SECONDS,
                )
            except TimeoutError as exc:
                last_error = exc
                logger.warning("voice provider timed out (attempt %s/%s)", attempt, MAX_ATTEMPTS)
            except Exception as exc:
                last_error = exc
                logger.warning(
                    "voice provider failed (attempt %s/%s): %s",
                    attempt,
                    MAX_ATTEMPTS,
                    exc,
                )
        raise VoiceUnavailableError(
            "Voice services are temporarily unavailable. You can continue with text instead."
        ) from last_error

    def _transcribe_sync(self, audio: bytes, mime_type: str) -> str:
        assert self._client is not None
        response = self._client.models.generate_content(
            model=STT_MODEL,
            contents=[
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_bytes(data=audio, mime_type=mime_type),
                        types.Part.from_text(text=STT_PROMPT),
                    ],
                )
            ],
            config=types.GenerateContentConfig(temperature=0.0),
        )
        text = (response.text or "").strip()
        if not text:
            raise VoiceUnavailableError("Could not transcribe audio — no speech detected.")
        return text

    def _synthesize_sync(self, text: str) -> bytes:
        assert self._client is not None
        response = self._client.models.generate_content(
            model=TTS_MODEL,
            contents=text,
            config=types.GenerateContentConfig(
                response_modalities=["AUDIO"],
                speech_config=types.SpeechConfig(
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=TTS_VOICE)
                    )
                ),
            ),
        )
        pcm = _extract_inline_audio(response)
        return _pcm_to_wav(pcm)

    async def transcribe(self, audio: bytes, mime_type: str) -> str:
        if self._client is None:
            raise VoiceUnavailableError(
                "GEMINI_API_KEY is not configured — voice is unavailable."
            )
        return await self._call_with_retry(self._transcribe_sync, audio, mime_type)

    async def synthesize(self, text: str) -> bytes:
        if self._client is None:
            raise VoiceUnavailableError(
                "GEMINI_API_KEY is not configured — voice is unavailable."
            )
        return await self._call_with_retry(self._synthesize_sync, text)


@lru_cache
def get_voice_service() -> VoiceService:
    return VoiceService()
