from fastapi.testclient import TestClient


def test_health_returns_status_and_services(client: TestClient) -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] in ("ok", "degraded")
    assert set(body["services"]) == {"chat", "emotion", "search", "voice"}
    for ready in body["services"].values():
        assert isinstance(ready, bool)
