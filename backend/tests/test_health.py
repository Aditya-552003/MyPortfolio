from fastapi.testclient import TestClient


def test_health_returns_status_and_services(client: TestClient) -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] in ("ok", "degraded")
    services = body["services"]
    assert {"chat", "emotion", "search", "voice"}.issubset(set(services))
    for key in ("chat", "emotion", "search", "voice"):
        assert isinstance(services[key], bool)
