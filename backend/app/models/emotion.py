from pydantic import BaseModel, Field, field_validator

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


class EmotionPrediction(BaseModel):
    label: str
    confidence: float


class EmotionResponse(BaseModel):
    emotions: list[EmotionPrediction]
