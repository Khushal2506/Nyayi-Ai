# Nyaya AI (न्याय AI)

> **AI-Powered Legal Assistance for Indian Citizens — Consumer Dispute Redressal**

Nyaya AI is an open, civic-first legal intelligence platform engineered to assist Indian citizens in understanding their statutory rights, compiling evidence, and generating grounded complaint drafts for consumer disputes under the **Consumer Protection Act, 2019**.

---

## Design System Tokens

The user interface combines a **Kuku FM-inspired warm visual identity**, **Stripe-inspired precision**, and a **Notion-inspired document editing experience**:

- **Deep Plum**: `#17152B` (Brand identity, shell headers, and primary typography)
- **Vibrant Orange**: `#FF6B35` (Primary CTAs, status badges, and active accents)
- **Warm Yellow**: `#FFC857` (Highlights and advisory banners)
- **Warm Cream**: `#FFF8EF` (Page canvas and card backgrounds)
- **Soft Lavender**: `#E9E3F5` (Metadata tags and category pills)
- **White**: `#FFFFFF` (Document canvas and modal dialogues)

---

## Completed Frontend Screens

Nyaya AI features 7 fully interactive screens:

1. **Landing Page**: Value positioning, 4-step consumer journey, disputes catalog, statutory disclaimer, and backend diagnostics.
2. **Main Legal Workspace**: Navigation shell, case switcher (*Rahul Sharma vs. NexaCart*), and subnav tabs.
3. **Conversational Legal Intake**: Interactive chat with prompt chips, realistic legal analysis, and real-time fact extraction.
4. **Case Summary & Chronological Timeline**: Structured brief (parties, jurisdiction, relief claims) and sequential timeline with add-event capability.
5. **Evidence Management**: Dynamic readiness score (75% to 85%), verified/missing filters, document inspector, and simulated upload.
6. **Statutory Sources**: Authentic provisions from CPA 2019 and E-Commerce Rules 2020 with plain-language citizen translations.
7. **Document Studio**: Notion-style editable drafting canvas with 3 statutory templates (15-Day Legal Notice, District Commission Petition, NCH Grievance), print preview, and export tools.

---

## Screenshots

Screenshots of all views are saved in [`docs/screenshots/`](file:///c:/Users/khush/OneDrive/Desktop/nyaya-ai/docs/screenshots/):
- `01_landing_page.png` — Landing page presentation
- `02_workspace_overview.png` — Case overview & chronological timeline
- `03_conversational_intake.png` — Conversational legal intake
- `04_evidence_management.png` — Evidence management & readiness score
- `05_statutory_sources.png` — Statutory sources inspector (CPA 2019)
- `06_document_studio.png` — Notion-style document studio
- `07_mobile_responsive.png` — Mobile responsive viewport (375x812)

---

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend API**: Python 3.11+ (FastAPI, Pydantic v2, Uvicorn)
- **AI Engine**: Google Gemini API (via swappable `BaseLLMProvider`)
- **Vector Store**: ChromaDB (local persistence at `./chroma_db`)
- **Relational Storage**: SQLite (`sqlite:///./nyaya_ai.db`)
- **Testing**: Pytest, pytest-asyncio, HTTPX

---

## Quickstart Guide

### 1. Environment Setup

```bash
# Clone or navigate to the repository
cd nyaya-ai

# Copy environment template
cp .env.example .env
```

---

### 2. Backend Setup & Run

The backend is built with FastAPI and runs on port `8000`.

```bash
# Navigate to backend directory
cd backend

# Create a Python virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI development server with auto-reload
uvicorn app.main:app --reload --port 8000
```

Once started:
- **API Root**: [http://localhost:8000/](http://localhost:8000/)
- **Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

### 3. Frontend Setup & Run

The frontend is built with React, TypeScript, Vite, and Tailwind CSS and runs on port `5173`.

```bash
# Navigate to frontend directory in a separate terminal window
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

> **Note for Windows Node v24 users**: If Windows certificate policies trigger SSL leaf signature warnings during npm install, pass `$env:NODE_OPTIONS="--use-system-ca"` in PowerShell.

Once started, open your browser at:
- **Nyaya AI Web App**: [http://localhost:5173/](http://localhost:5173/)
- **Direct Workspace Deep-Link**: [http://localhost:5173/#overview](http://localhost:5173/#overview)
- **Direct Intake Deep-Link**: [http://localhost:5173/#intake](http://localhost:5173/#intake)
- **Direct Evidence Deep-Link**: [http://localhost:5173/#evidence](http://localhost:5173/#evidence)
- **Direct Sources Deep-Link**: [http://localhost:5173/#sources](http://localhost:5173/#sources)
- **Direct Studio Deep-Link**: [http://localhost:5173/#studio](http://localhost:5173/#studio)

---

### 4. Running Backend Tests

The test suite validates health endpoints, CORS, the mock LLM/embedding abstractions, and provider key validation:

```bash
# From the repository root (with backend virtual environment activated):
pytest tests/ -v
```

---

## Configuration Reference

Key variables in `.env`:

| Variable | Default | Description |
|---|---|---|
| `APP_NAME` | `Nyaya AI Backend` | Name of the service |
| `ENVIRONMENT` | `development` | Deployment environment (`development` / `production`) |
| `PORT` | `8000` | Port for FastAPI server |
| `CORS_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Allowed frontend origins |
| `LLM_PROVIDER` | `mock` | Active LLM provider (`mock`, `gemini`) |
| `GEMINI_API_KEY` | `""` | Google Gemini API key |
| `GEMINI_MODEL` | `gemini-1.5-pro` | Gemini model name |
| `EMBEDDING_PROVIDER` | `mock` | Active vector embedding engine (`mock`, `gemini`, `fastembed`) |
| `DATABASE_URL` | `sqlite:///./nyaya_ai.db` | Local SQLite database URL |
| `CHROMA_PERSIST_DIRECTORY` | `./chroma_db` | Embedded ChromaDB storage path |
| `VITE_API_BASE_URL` | `http://localhost:8000` | Backend API URL for frontend |

---

## Legal & Compliance Disclaimer

Nyaya AI provides automated legal research and informational assistance based on public statutes. It does not provide formal legal advice, representation, or advocacy under the Advocates Act, 1961. Consult a licensed legal practitioner for formal courtroom proceedings.
