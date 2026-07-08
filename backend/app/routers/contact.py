import logging

from fastapi import APIRouter, Request

from app.core.rate_limit import limiter
from app.models.contact import ContactRequest, ContactResponse

logger = logging.getLogger("app.contact")

router = APIRouter(tags=["contact"])


@router.post("/api/contact", response_model=ContactResponse)
@limiter.limit("5/minute")
async def submit_contact(request: Request, payload: ContactRequest) -> ContactResponse:
    if payload.honeypot:
        logger.info("contact honeypot triggered, discarding silently")
        return ContactResponse(success=True)

    logger.info(
        "contact submission received",
        extra={"extra_fields": {"email": payload.email, "message_length": len(payload.message)}},
    )
    return ContactResponse(success=True)
