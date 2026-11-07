from typing import Optional, Any, AsyncIterator
from app.ai.llm.base import BaseLLMProvider


class MockLLMProvider(BaseLLMProvider):
    """
    Mock LLM provider for unit tests and local development without external API costs or keys.
    """

    def __init__(self, default_response: str = "Mock response: Legal query processed successfully."):
        self.default_response = default_response

    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.0,
        max_tokens: int = 1024,
        **kwargs: Any
    ) -> str:
        return f"[MOCK_RESPONSE] For query: '{prompt[:50]}...'. Response: {self.default_response}"

    async def stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.0,
        max_tokens: int = 1024,
        **kwargs: Any
    ) -> AsyncIterator[str]:
        words = self.default_response.split()
        for word in words:
            yield f"{word} "
