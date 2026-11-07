from typing import List
from app.ai.embeddings.base import BaseEmbeddingProvider


class MockEmbeddingProvider(BaseEmbeddingProvider):
    """
    Mock embedding provider returning deterministic fixed-size vectors.
    Useful for local testing and CI/CD without model downloads or API costs.
    """

    def __init__(self, dimension: int = 384):
        self.dimension = dimension

    async def embed_query(self, text: str) -> List[float]:
        # Return deterministic unit vector based on length
        val = (len(text) % 100) / 100.0
        return [val] * self.dimension

    async def embed_documents(self, texts: List[str]) -> List[List[float]]:
        return [await self.embed_query(t) for t in texts]
