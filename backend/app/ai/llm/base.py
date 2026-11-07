from abc import ABC, abstractmethod
from typing import Optional, Any, AsyncIterator


class LLMProviderError(Exception):
    """Provider-agnostic LLM failure. Routes catch this, never SDK-specific errors."""

    def __init__(self, message: str, status_code: Optional[int] = None):
        super().__init__(message)
        self.status_code = status_code


class BaseLLMProvider(ABC):
    """
    Abstract interface for LLM providers.
    Enables swapping between Gemini, other hosted models, or mock implementations
    without modifying business logic or RAG pipelines.

    Optional kwargs understood by providers:
      json_mode=True        -> force a JSON response
      response_schema=Model -> JSON constrained to a Pydantic model / schema
    """

    @abstractmethod
    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.0,
        max_tokens: int = 1024,
        **kwargs: Any
    ) -> str:
        """Generate a complete text response given a prompt."""
        pass

    @abstractmethod
    async def stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.0,
        max_tokens: int = 1024,
        **kwargs: Any
    ) -> AsyncIterator[str]:
        """Stream response chunks asynchronously."""
        pass
