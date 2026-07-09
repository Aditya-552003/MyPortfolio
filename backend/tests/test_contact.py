from fastapi.testclient import TestClient

VALID_PAYLOAD = {"name": "Ada Lovelace", "email": "ada@example.com", "message": "Hello there!"}


def test_contact_accepts_valid_submission(client: TestClient) -> None:
    response = client.post("/api/contact", json=VALID_PAYLOAD)

    assert response.status_code == 200
    assert response.json() == {"success": True}


def test_contact_rejects_missing_name(client: TestClient) -> None:
    payload = {**VALID_PAYLOAD, "name": ""}

    response = client.post("/api/contact", json=payload)

    assert response.status_code == 422
    body = response.json()
    assert body["error"]["code"] == "VALIDATION_ERROR"


def test_contact_rejects_invalid_email(client: TestClient) -> None:
    payload = {**VALID_PAYLOAD, "email": "not-an-email"}

    response = client.post("/api/contact", json=payload)

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_contact_silently_accepts_honeypot_spam(client: TestClient) -> None:
    payload = {**VALID_PAYLOAD, "honeypot": "I am a bot"}

    response = client.post("/api/contact", json=payload)

    assert response.status_code == 200
    assert response.json() == {"success": True}


def test_contact_rate_limits_repeated_requests(client: TestClient) -> None:
    # The limiter's in-memory bucket persists across tests in this module, so don't
    # assume a precise starting count — just drive enough requests to trip the
    # 5/minute limit and confirm the shape of the response when it does.
    responses = [client.post("/api/contact", json=VALID_PAYLOAD) for _ in range(10)]

    rate_limited = [r for r in responses if r.status_code == 429]
    assert rate_limited, "expected at least one 429 after 10 rapid requests"
    assert rate_limited[0].json()["error"]["code"] == "RATE_LIMITED"


def test_not_found_uses_consistent_error_shape(client: TestClient) -> None:
    response = client.get("/api/does-not-exist")

    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NOT_FOUND"
