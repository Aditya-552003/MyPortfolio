from functools import lru_cache
from typing import Self

from pydantic import model_validator
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

    @model_validator(mode="after")
    def production_origin_must_not_be_localhost(self) -> Self:
        if self.environment == "production":
            origin = self.frontend_origin.lower()
            if "localhost" in origin or "127.0.0.1" in origin:
                raise ValueError(
                    "FRONTEND_ORIGIN must be the production site URL when ENVIRONMENT=production."
                )
        return self


@lru_cache
def get_settings() -> Settings:
    return Settings()
