from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)
    # Hidden honeypot field: real users never fill this in (it's CSS-hidden on the
    # frontend); bots that auto-fill every field trip it. Kept optional so legitimate
    # clients that omit it entirely aren't rejected.
    honeypot: str = Field("", max_length=500)


class ContactResponse(BaseModel):
    success: bool
