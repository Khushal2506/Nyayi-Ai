import sys
import pytest
from pathlib import Path

# Ensure backend root is on sys.path
backend_dir = Path(__file__).resolve().parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.core.config import Settings
from app.ai.llm.factory import get_llm_provider
from app.ai.llm.mock_provider import MockLLMProvider
from app.ai.embeddings.factory import get_embedding_provider
from app.ai.embeddings.mock_provider import MockEmbeddingProvider


@pytest.mark.asyncio
async def test_mock_llm_provider():
    """Verify that MockLLMProvider generates a response without external network access."""
    settings = Settings(LLM_PROVIDER="mock")
    provider = get_llm_provider(settings)
    assert isinstance(provider, MockLLMProvider)

    response = await provider.generate(prompt="What are my rights under Consumer Protection Act 2019?")
    assert "[MOCK_RESPONSE]" in response
    assert "Legal query processed successfully" in response


def test_gemini_provider_requires_api_key():
    """Verify that Gemini provider validates presence of GEMINI_API_KEY."""
    settings = Settings(LLM_PROVIDER="gemini", GEMINI_API_KEY="")
    with pytest.raises(ValueError, match="GEMINI_API_KEY is not configured"):
        get_llm_provider(settings)


@pytest.mark.asyncio
async def test_mock_embedding_provider():
    """Verify that MockEmbeddingProvider generates deterministic vectors."""
    settings = Settings(EMBEDDING_PROVIDER="mock")
    provider = get_embedding_provider(settings)
    assert isinstance(provider, MockEmbeddingProvider)

    vector = await provider.embed_query("defective electronics refund")
    assert len(vector) == 384
    assert isinstance(vector[0], float)
