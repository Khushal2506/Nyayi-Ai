import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import argparse
import asyncio
import json

from app.ai.llm.base import LLMProviderError
from app.ai.llm.gemini_provider import GeminiLLMProvider
from app.core.config import get_settings


def build_provider():
    s = get_settings()
    return GeminiLLMProvider(
        api_key=s.GEMINI_API_KEY,
        model=s.GEMINI_MODEL,
        timeout_seconds=s.GEMINI_TIMEOUT_SECONDS
    )


def list_models(provider):
    print("Available Gemini models:")
    for model in provider._client.models.list():
        actions = getattr(model, "supported_actions", None) or []
        if "generateContent" in actions and "gemini" in model.name:
            print(model.name.replace("models/", ""))


async def run_checks(provider):
    failures = 0

    try:
        result = await provider.generate(
            "Reply with exactly: NYAYA_OK",
            max_tokens=1024
        )
        print("[PLAIN]", result)
    except LLMProviderError as e:
        failures += 1
        print("[PLAIN FAILED]", e)

    try:
        result = await provider.generate(
            'Return JSON {"complaint_type": "short string"} for: '
            '"My laptop arrived damaged and the seller refuses a refund."',
            max_tokens=1024,
            json_mode=True
        )
        print("[JSON]", json.loads(result))
    except (LLMProviderError, json.JSONDecodeError) as e:
        failures += 1
        print("[JSON FAILED]", e)

    return failures


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--list", action="store_true")
    args = parser.parse_args()

    try:
        provider = build_provider()

        if args.list:
            list_models(provider)
        else:
            exit_code = asyncio.run(run_checks(provider))
            raise SystemExit(1 if exit_code else 0)

    except (ValueError, LLMProviderError) as e:
        print("ERROR:", e)
        raise SystemExit(1)
