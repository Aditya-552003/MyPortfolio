const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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
    const body: unknown = await response.json().catch(() => null);
    if (isApiErrorBody(body)) {
      throw new ApiError(response.status, body.error.code, body.error.message);
    }
    throw new ApiError(response.status, "UNKNOWN_ERROR", "Something went wrong. Please try again.");
  }

  return response.json() as Promise<TResponse>;
}

export function apiPost<TResponse, TBody = unknown>(path: string, body: TBody): Promise<TResponse> {
  return apiFetch<TResponse>(path, { method: "POST", body: JSON.stringify(body) });
}
