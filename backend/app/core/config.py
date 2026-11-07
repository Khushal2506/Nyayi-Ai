from functools import lru_cache
from pathlib import Path
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

_BACKEND_DIR = Path(__file__).resolve().parents[2]  # .../backend
_ROOT_DIR = _BACKEND_DIR.parent                      # repo root


class Settings(BaseSettings):
    """Application settings loaded from environment variables or .env file."""

    # Later files override earlier ones: backend/.env wins over root .env.
    # Paths are absolute so it works no matter where the server is started.
    model_config = SettingsConfigDict(
        env_file=(str(_ROOT_DIR / ".env"), str(_BACKEND_DIR / ".env")),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    APP_NAME: str = "Nyaya AI Backend"
    APP_VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "0.0.0.0"

    # CORS configuration
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    # LLM Settings (Primary: Gemini API, with swappable mock/fallback)
    LLM_PROVIDER: str = "mock"
    GEMINI_API_KEY: str = ""
    # gemini-1.5-pro is retired. This alias is UNVERIFIED for your key:
    # run scripts/check_gemini.py --list and set GEMINI_MODEL explicitly.
    GEMINI_MODEL: str = "gemini-flash-latest"
    GEMINI_TIMEOUT_SECONDS: int = 30

    # Embedding Settings
    EMBEDDING_PROVIDER: str = "mock"
    EMBEDDING_API_KEY: str = ""

    # Relational Database (SQLite)
    DATABASE_URL: str = "sqlite:///./nyaya_ai.db"

    # Vector Database (ChromaDB)
    CHROMA_PERSIST_DIRECTORY: str = "./chroma_db"


@lru_cache()
def get_settings() -> Settings:
    """Return cached application settings singleton."""
    return Settings()
