from pydantic import BaseModel, Field, field_validator


class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=200)

    @field_validator("query")
    @classmethod
    def query_must_not_be_blank(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("Query must not be empty.")
        return stripped


class SearchResultItem(BaseModel):
    title: str
    type: str
    score: float
    url: str


class SearchResponse(BaseModel):
    results: list[SearchResultItem]
