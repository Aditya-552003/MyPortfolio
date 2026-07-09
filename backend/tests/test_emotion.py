from fastapi.testclient import TestClient


def test_emotion_rejects_empty_text(client: TestClient) -> None:
    response = client.post("/api/emotion", json={"text": ""})

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_emotion_rejects_overly_long_text(client: TestClient) -> None:
    response = client.post("/api/emotion", json={"text": "a" * 2001})

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_emotion_predicts_for_valid_text(client: TestClient) -> None:
    response = client.post("/api/emotion", json={"text": "I am thrilled about this!"})

    # 200 if the real model loaded (HF_TOKEN configured), 503 if it didn't —
    # either way the response must follow the app's contracts, not crash.
    assert response.status_code in (200, 503)
    if response.status_code == 200:
        body = response.json()
        assert isinstance(body["emotions"], list)
        assert len(body["emotions"]) > 0
        assert {"label", "confidence"} <= body["emotions"][0].keys()
    else:
        assert response.json()["error"]["code"] == "HTTP_ERROR"
