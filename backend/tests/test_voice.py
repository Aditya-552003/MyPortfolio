from fastapi.testclient import TestClient


def test_tts_rejects_empty_text(client: TestClient) -> None:
    response = client.post("/api/voice/tts", json={"text": ""})

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_tts_rejects_blank_text(client: TestClient) -> None:
    response = client.post("/api/voice/tts", json={"text": "   "})

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_tts_available_or_graceful_503(client: TestClient) -> None:
    response = client.post("/api/voice/tts", json={"text": "Hello from Aditya AI Studio."})

    # 200 when GEMINI_API_KEY is configured and TTS succeeds; 503 otherwise.
    assert response.status_code in (200, 503)
    if response.status_code == 200:
        assert response.headers["content-type"].startswith("audio/wav")
        assert response.content[:4] == b"RIFF"
    else:
        assert response.json()["error"]["code"] == "HTTP_ERROR"


def test_stt_rejects_empty_upload(client: TestClient) -> None:
    response = client.post(
        "/api/voice/stt",
        files={"audio": ("empty.webm", b"", "audio/webm")},
    )

    assert response.status_code in (422, 503)
    assert "error" in response.json()


def test_stt_rejects_unsupported_type(client: TestClient) -> None:
    response = client.post(
        "/api/voice/stt",
        files={"audio": ("clip.txt", b"not audio", "text/plain")},
    )

    assert response.status_code in (422, 503)
    body = response.json()
    assert "error" in body
