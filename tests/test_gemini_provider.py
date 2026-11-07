import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))
import pytest
from types import SimpleNamespace

from app.ai.llm.base import LLMProviderError
from app.ai.llm.gemini_provider import GeminiLLMProvider


class FakeModels:
    def __init__(self, response=None, chunks=None):
        self.response = response
        self.chunks = chunks or []
        self.calls = []

    async def generate_content(self, **kwargs):
        self.calls.append(kwargs)
        return self.response

    async def generate_content_stream(self, **kwargs):
        async def generate():
            for chunk in self.chunks:
                yield SimpleNamespace(text=chunk)
        return generate()


def make_provider(fake):
    provider = GeminiLLMProvider(
        api_key="test-key",
        model="test-model"
    )
    provider._client = SimpleNamespace(
        aio=SimpleNamespace(models=fake)
    )
    return provider


def test_requires_api_key():
    with pytest.raises(ValueError):
        GeminiLLMProvider(api_key="")


@pytest.mark.asyncio
async def test_generate_returns_text():
    fake = FakeModels(response=SimpleNamespace(text="hello"))
    result = await make_provider(fake).generate("hi")

    assert result == "hello"
    assert fake.calls[0]["model"] == "test-model"


@pytest.mark.asyncio
async def test_json_mode():
    fake = FakeModels(response=SimpleNamespace(text='{"ok": true}'))
    await make_provider(fake).generate("hi", json_mode=True)

    assert fake.calls[0]["config"].response_mime_type == "application/json"


@pytest.mark.asyncio
async def test_empty_response_raises():
    response = SimpleNamespace(
        text=None,
        prompt_feedback=None,
        candidates=[SimpleNamespace(finish_reason="MAX_TOKENS")]
    )

    with pytest.raises(LLMProviderError):
        await make_provider(FakeModels(response=response)).generate("hi")


@pytest.mark.asyncio
async def test_stream_returns_chunks():
    fake = FakeModels(chunks=["hello", " world"])
    result = "".join([
        chunk async for chunk in make_provider(fake).stream("hi")
    ])

    assert result == "hello world"