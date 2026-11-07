from app.core.config import Settings
from app.ai.embeddings.base import BaseEmbeddingProvider
from app.ai.embeddings.mock_provider import MockEmbeddingProvider


def get_embedding_provider(settings: Settings) -> BaseEmbeddingProvider:
    """
    Factory function for embedding providers.
    """
    provider_name = settings.EMBEDDING_PROVIDER.lower().strip()

    if provider_name == "mock":
        return MockEmbeddingProvider()
    else:
        raise ValueError(
            f"Unsupported EMBEDDING_PROVIDER: '{settings.EMBEDDING_PROVIDER}'. Supported options: 'mock'."
        )
