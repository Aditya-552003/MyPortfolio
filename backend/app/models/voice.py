from pydantic import BaseModel, Field, field_validator

MAX_TTS_TEXT_LENGTH = 2000
MAX_AUDIO_BYTES = 5 * 1024 * 1024  # 5 MB


class SttResponse(BaseModel):
    transcript: str


class TtsRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=MAX_TTS_TEXT_LENGTH)

    @field_validator("text")
    @classmethod
    def text_must_not_be_blank(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("Input text must not be empty.")
        return stripped
