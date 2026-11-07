from app.core.config import Settings
from app.ai.llm.base import BaseLLMProvider
from app.ai.llm.mock_provider import MockLLMProvider
from app.ai.llm.gemini_provider import GeminiLLMProvider


def get_llm_provider(settings: Settings) -> BaseLLMProvider:
    """
    Factory function to instantiate the configured LLM provider.
    Allows seamless switching between mock and Gemini providers without altering business logic.
    """
    provider_name = settings.LLM_PROVIDER.lower().strip()

    if provider_name == "mock":
        return MockLLMProvider()
    elif provider_name == "gemini":
        return GeminiLLMProvider(api_key=settings.GEMINI_API_KEY,
model=settings.GEMINI_MODEL,
timeout_seconds=settings.GEMINI_TIMEOUT_SECONDS
        )
    else:
        raise ValueError(
            f"Unsupported LLM_PROVIDER: '{settings.LLM_PROVIDER}'. Supported options: 'mock', 'gemini'."
        )
