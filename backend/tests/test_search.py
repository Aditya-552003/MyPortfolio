from fastapi.testclient import TestClient


def test_search_rejects_empty_query(client: TestClient) -> None:
    response = client.post("/api/search", json={"query": ""})

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_search_returns_ranked_results_for_valid_query(client: TestClient) -> None:
    response = client.post("/api/search", json={"query": "transformers NLP"})

    assert response.status_code == 200
    body = response.json()
    assert isinstance(body["results"], list)
    if body["results"]:
        first = body["results"][0]
        assert {"title", "type", "score", "url"} <= first.keys()
        scores = [item["score"] for item in body["results"]]
        assert scores == sorted(scores, reverse=True)
