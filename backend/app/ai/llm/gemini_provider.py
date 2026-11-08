
import asyncio
import logging
from typing import Any, AsyncIterator, Optional

from google import genai
from google.genai import errors as genai_errors
from google.genai import types

from app.ai.llm.base import BaseLLMProvider, LLMProviderError

logger = logging.getLogger(__name__)


class GeminiLLMProvider(BaseLLMProvider):
    def __init__(
        self,
        api_key: str,
        model: str = "gemini-3.8-flash",
        timeout_seconds: int = 90,
    ):
        if not api_key:
            raise ValueError("GEMINI_API_KEY is not configured.")

        self.model = model
        self._client = genai.Client(
            api_key=api_key,
            http_options=types.HttpOptions(
                timeout=int(timeout_seconds * 1000)
            ),
        )

    @staticmethod
    def _build_config(system_prompt, temperature, max_tokens, kwargs):
        cfg = {
            "temperature": temperature,
            "max_output_tokens": max_tokens,
        }

        if system_prompt:
            cfg["system_instruction"] = system_prompt

        if kwargs.get("json_mode") or kwargs.get("response_schema") is not None:
            cfg["response_mime_type"] = "application/json"

        if kwargs.get("response_schema") is not None:
            cfg["response_schema"] = kwargs["response_schema"]

        return types.GenerateContentConfig(**cfg)

    def _translate_error(self, exc):
        code = getattr(exc, "code", None)
        detail = getattr(exc, "message", None) or str(exc)

        if code in (401, 403):
            msg = "Gemini rejected the API key."
        elif code == 404:
            msg = f"Gemini model '{self.model}' failed: {detail}"
        elif code == 429:
            msg = f"Gemini quota or rate limit error: {detail}"
        else:
            msg = f"Gemini request failed: {detail}"

        return LLMProviderError(msg, status_code=code)

    @staticmethod
    def _extract_text(response):
        text = getattr(response, "text", None)
        if text:
            return text
        raise LLMProviderError("Gemini returned an empty response.")

    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.0,
        max_tokens: int = 1024,
        **kwargs: Any,
    ) -> str:
        config = self._build_config(
            system_prompt, temperature, max_tokens, kwargs
        )

        try:
            for attempt in range(4):
                try:
                    response = await asyncio.to_thread(
                        self._client.models.generate_content,
                        model=self.model,
                        contents=prompt,
                        config=config,
                    )
                    return self._extract_text(response)
                except genai_errors.APIError as exc:
                    status = getattr(exc, "code", None) or getattr(exc, "status_code", None)
                    if status not in (503, 504) or attempt == 3:
                        raise
                    wait_seconds = 2 ** (attempt + 1)
                    logger.warning(
                        "Gemini returned 503/504; retrying in %s seconds (attempt %s/3)",
                        wait_seconds, attempt + 1
                    )
                    await asyncio.sleep(wait_seconds)

        except LLMProviderError:
            raise
        except genai_errors.APIError as exc:
            raise self._translate_error(exc) from exc
        except Exception as exc:
            raise LLMProviderError(
                f"Gemini request failed: {type(exc).__name__}: {exc}"
            ) from exc

    async def stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.0,
        max_tokens: int = 1024,
        **kwargs: Any,
    ) -> AsyncIterator[str]:
        # Non-streaming fallback for providers that require synchronous calls.
        result = await self.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=temperature,
            max_tokens=max_tokens,
            **kwargs,
        )
        yield result

