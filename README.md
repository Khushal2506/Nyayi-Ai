# NYAYA AI — Consumer Grievance Intake Prototype

NYAYA AI is a prototype that helps organize an Indian consumer grievance into structured facts. The current working backend includes a FastAPI intake endpoint, a configurable Gemini provider, and a deterministic local fallback. The React frontend submits complaints to that API and displays the returned case fields.

> **Important scope note:** This is an informational prototype, not a law firm or legal-advice service. The legal-reference, evidence and document-studio screens are illustrative UI. They are not connected to a verified legal database, real file-upload/verification pipeline, or complaint-document generation service. Do not rely on sample legal citations without checking current official sources and obtaining qualified advice.

## Live demo

- Frontend: https://nyayi-ai.vercel.app
- Backend: https://nyayi-ai.onrender.com
- API docs (if enabled): https://nyayi-ai.onrender.com/docs
- Source: https://github.com/Khushal2506/Nyayi-Ai

## Current capabilities

- Submit a consumer complaint through the React intake screen.
- Extract structured fields: complaint type, product/service, seller/platform, order/delivery/issue dates, amount, payment method, requested resolution, facts and missing information.
- Select an LLM provider through configuration (`gemini` or `mock`).
- Fall back to local rule-based extraction when the configured provider fails or returns invalid output.
- Expose health endpoints and API documentation through FastAPI.

## Known limitations

- The local fallback is heuristic and may miss or misclassify facts in complex wording. It is not a substitute for human review.
- The Gemini path depends on a valid API key, provider configuration, network access and a supported model. Production activation must be verified from deployment configuration and a real request.
- Evidence records are demonstration data. Adding a record currently stores metadata in frontend state only; it does not upload or verify a file.
- Legal-source entries are illustrative and are not dynamically retrieved or citation-verified.
- The Document Studio is a placeholder; no legal notice or complaint petition is generated.
- No operational RAG/vector retrieval or persistent complaint database is established by the current source code.

## Architecture

```text
React + TypeScript + Vite
        | HTTP / JSON
        v
FastAPI API (/api/intake/extract)
        |
        +--> Configured LLM provider (Gemini or mock)
        |
        +--> Local rule-based fallback on provider/JSON/schema failure
        |
        v
Structured Pydantic response
        |
        v
Frontend case brief and missing-information display
```

## Technology

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Lucide icons
- Backend: Python, FastAPI, Pydantic, Uvicorn
- AI provider: Google Gemini through `google-genai` (optional/configurable)
- Tests: Pytest, pytest-asyncio, HTTPX

SQLite and ChromaDB paths exist as configuration placeholders; this prototype does not currently implement persistence or vector retrieval using them.

## Local setup

### Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in the frontend environment to the backend base URL.

## Backend configuration

Set environment variables in the hosting provider; never commit secrets.

| Variable | Purpose |
|---|---|
| `LLM_PROVIDER` | `gemini` or `mock`; default is `mock` |
| `GEMINI_API_KEY` | Gemini API key; keep secret |
| `GEMINI_MODEL` | Gemini model identifier supported by the account |
| `GEMINI_TIMEOUT_SECONDS` | Provider timeout |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |
| `DEBUG` | Controls API docs availability |

For a Gemini production test, set `LLM_PROVIDER=gemini`, configure a valid `GEMINI_API_KEY`, choose a supported `GEMINI_MODEL`, redeploy, and submit a real complaint. Confirm the returned `processing_mode` before describing the live system as Gemini-powered.

## Tests

From the repository root with backend dependencies installed:

```powershell
pytest tests/ -v
```

Tests cover health endpoints, provider abstractions and the local fallback's complaint extraction. Passing local tests do not establish production Gemini availability.

## Disclaimer

NYAYA AI provides informational assistance only. It does not provide legal representation, guarantee outcomes, or replace advice from a qualified legal professional. Verify legislation, rules and case law against current official sources before taking action.
