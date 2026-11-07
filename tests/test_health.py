import sys
import os
from pathlib import Path
from fastapi.testclient import TestClient

# Ensure backend root is on sys.path
backend_dir = Path(__file__).resolve().parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.main import app

client = TestClient(app)


def test_root_endpoint():
    """Ensure root endpoint returns service info."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "Nyaya AI Backend"
    assert data["status"] == "operational"
    assert "health_check" in data


def test_health_check_endpoint():
    """Ensure /health endpoint returns healthy status and metadata."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["app_name"] == "Nyaya AI Backend"
    assert "version" in data
    assert "environment" in data
    assert "timestamp" in data
    assert data["details"]["llm_provider"] in {"mock", "gemini"}


def test_api_health_check_endpoint():
    """Ensure /api/health endpoint behaves identically."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

