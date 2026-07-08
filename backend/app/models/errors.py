from pydantic import BaseModel


class ErrorDetail(BaseModel):
    code: str
    message: str


class ErrorResponse(BaseModel):
    """The consistent error shape every endpoint returns: `{ error: { code, message } }`."""

    error: ErrorDetail
