import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

function errorResponse(code: string, message: string, status: number): NextResponse {
  return NextResponse.json({ error: { code, message } }, { status });
}

/**
 * Placeholder contact endpoint (Sprint 2). Validates and logs; Sprint 3 (S3-4)
 * swaps this for the real FastAPI `/api/contact` endpoint — the request/response
 * shape here already matches that contract so the frontend won't need to change.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return errorResponse("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name) {
    return errorResponse("VALIDATION_ERROR", "Name is required.", 400);
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return errorResponse("VALIDATION_ERROR", "A valid email address is required.", 400);
  }
  if (!message) {
    return errorResponse("VALIDATION_ERROR", "Message is required.", 400);
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return errorResponse("VALIDATION_ERROR", "Message is too long.", 400);
  }

  console.log("[contact] submission received:", { name, email, messageLength: message.length });

  return NextResponse.json({ success: true }, { status: 200 });
}
