from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="session")
def client() -> Iterator[TestClient]:
    """
    A single app instance for the whole test session, entered as a context
    manager so FastAPI's lifespan actually runs — loading the emotion model
    and RAG/search indexes once, the way `uvicorn` does at real startup.
    (A bare `TestClient(app)` does not trigger lifespan events.)
    """
    with TestClient(app) as test_client:
        yield test_client
