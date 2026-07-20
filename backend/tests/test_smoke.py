"""Production smoke tests — verify every public route responds without crashing."""

from fastapi.testclient import TestClient

PUBLIC_GET_ROUTES = (
    "/",
    "/docs",
    "/openapi.json",
    "/api/health",
)

PUBLIC_POST_ROUTES_VALIDATION = (
    ("/api/contact", {"name": "", "email": "bad", "message": ""}),
    ("/api/emotion", {"text": ""}),
    ("/api/search", {"query": ""}),
    ("/api/chat", {"message": ""}),
)


def test_public_get_routes_respond(client: TestClient) -> None:
    for path in PUBLIC_GET_ROUTES:
        response = client.get(path)
        assert response.status_code in (200, 503), f"{path} returned {response.status_code}"


def test_validation_errors_use_consistent_shape(client: TestClient) -> None:
    for path, payload in PUBLIC_POST_ROUTES_VALIDATION:
        response = client.post(path, json=payload)
        assert response.status_code == 422, f"{path} should reject invalid input"
        body = response.json()
        assert body["error"]["code"] == "VALIDATION_ERROR"


def test_health_includes_service_readiness(client: TestClient) -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] in ("ok", "degraded")
    assert set(body["services"]) == {
        "chat",
        "emotion",
        "search",
        "voice",
        "mode",
        "emotion_external",
    }
