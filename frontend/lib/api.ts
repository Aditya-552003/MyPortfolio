export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Emotion demo — defaults to main API locally; set to HF Space URL in production hybrid deploy. */
export const EMOTION_API_BASE_URL =
  process.env.NEXT_PUBLIC_EMOTION_API_URL?.trim() || API_BASE_URL;

export const EMOTION_API_EXTERNAL = EMOTION_API_BASE_URL !== API_BASE_URL;

interface ApiErrorBody {
  error: { code: string; message: string };
}

/** Thrown by `apiFetch` for any non-2xx response, carrying the backend's `{ error }` shape. */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as { error: unknown }).error === "object"
  );
}

async function parseError(response: Response): Promise<ApiError> {
  const body: unknown = await response.json().catch(() => null);
  if (isApiErrorBody(body)) {
    return new ApiError(response.status, body.error.code, body.error.message);
  }
  return new ApiError(response.status, "UNKNOWN_ERROR", "Something went wrong. Please try again.");
}

/** Typed fetch wrapper for the FastAPI backend — consistent error handling for every call. */
export async function apiFetch<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Couldn't reach the server. Check your connection.");
  }

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<TResponse>;
}

export function apiPost<TResponse, TBody = unknown>(path: string, body: TBody): Promise<TResponse> {
  return apiFetch<TResponse>(path, { method: "POST", body: JSON.stringify(body) });
}

/** POST to the emotion service (main API in dev, HF Space in hybrid production). */
export async function emotionApiPost<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
): Promise<TResponse> {
  let response: Response;
  try {
    response = await fetch(`${EMOTION_API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Couldn't reach the emotion service. Check your connection.");
  }

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<TResponse>;
}

/** Multipart upload (e.g. voice STT) — lets the browser set the boundary Content-Type. */
export async function apiUpload<TResponse>(path: string, formData: FormData): Promise<TResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { method: "POST", body: formData });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Couldn't reach the server. Check your connection.");
  }

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<TResponse>;
}

/** JSON POST that expects a binary body (e.g. voice TTS → audio/wav). */
export async function apiPostBlob(path: string, body: unknown): Promise<Blob> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Couldn't reach the server. Check your connection.");
  }

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.blob();
}
