from fastapi.testclient import TestClient


def test_rejects_oversized_json_body(client: TestClient) -> None:
    response = client.post(
        "/api/emotion",
        content=b"x" * (6 * 1024 * 1024 + 1),
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 413
    assert response.json()["error"]["code"] == "PAYLOAD_TOO_LARGE"
