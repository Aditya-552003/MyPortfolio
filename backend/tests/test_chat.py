from fastapi.testclient import TestClient


def test_chat_rejects_empty_message(client: TestClient) -> None:
    response = client.post("/api/chat", json={"message": ""})

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_chat_rejects_invalid_history_role(client: TestClient) -> None:
    response = client.post(
        "/api/chat",
        json={"message": "hello", "history": [{"role": "system", "content": "x"}]},
    )

    assert response.status_code == 422


def test_chat_streams_or_degrades_gracefully(client: TestClient) -> None:
    # 200 + SSE stream if GEMINI_API_KEY is configured, 503 if it isn't —
    # either way the response must follow the app's contracts, not crash.
    response = client.post("/api/chat", json={"message": "What projects has Aditya built?"})

    assert response.status_code in (200, 503)
    if response.status_code == 200:
        assert response.headers["content-type"].startswith("text/event-stream")
        assert "data:" in response.text
    else:
        assert response.json()["error"]["code"] == "HTTP_ERROR"
