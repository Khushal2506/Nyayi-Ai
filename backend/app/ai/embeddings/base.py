from abc import ABC, abstractmethod
from typing import List


class BaseEmbeddingProvider(ABC):
    """
    Abstract interface for text embedding models.
    Decouples retrieval from any specific vectorization provider.
    """

    @abstractmethod
    async def embed_query(self, text: str) -> List[float]:
        """Generate vector embedding for a search query."""
        pass

    @abstractmethod
    async def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Generate vector embeddings for a list of document chunks."""
        pass
