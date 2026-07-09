from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration, sourced from environment variables / .env."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"
    frontend_origin: str = "http://localhost:3000"
    log_level: str = "INFO"
    gemini_api_key: str = ""
    hf_token: str = ""
    hf_model_repo: str = "DSAditya552003/emosense-ai-model"


@lru_cache
def get_settings() -> Settings:
    return Settings()
