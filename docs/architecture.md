# Nyaya AI Architecture Specification

## 1. System Overview

**Nyaya AI** (न्याय AI) is an AI-powered legal assistance platform engineered specifically for ordinary Indian citizens facing consumer disputes under the **Consumer Protection Act, 2019**, **Consumer Protection (E-Commerce) Rules, 2020**, and related statutory frameworks.

The architectural foundation guarantees **grounded legal precision and zero hallucination**:
- Every statutory section cited must originate from an indexed, verified legal database.
- Every complaint draft produced must follow established Indian consumer forum jurisdictions (District Commission, State Commission, NCDRC).
- The AI architecture cleanly separates probabilistic conversational intake from deterministic statutory verification.

---

## 2. Agreed Technology Stack

| Tier | Technology | Role & Justification |
|---|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS | Fast compilation, static typing, accessible UI, lightweight client runtime. |
| **Backend** | Python 3.11+, FastAPI, Pydantic v2, Uvicorn | Async performance, declarative request/response validation, clean modular design. |
| **LLM Provider** | Google Gemini API (swappable interface) | Primary reasoning engine for statutory interpretation, fact extraction, and document drafting. |
| **Relational Storage** | SQLite | Serverless, zero-config relational storage for case facts, intake sessions, and audit trails. |
| **Vector Database** | ChromaDB (local persistence) | Lightweight, self-contained embedded vector store for indexing statutory bare acts and precedents. |
| **Testing** | Pytest, FastAPI TestClient, pytest-asyncio | Continuous verification of API contracts, data models, and swappable provider logic. |

---

## 3. Monorepo Structure

```
nyaya-ai/
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── ai/               # AI orchestration & provider interfaces
│   │   │   ├── llm/          # BaseLLMProvider, MockLLMProvider, GeminiLLMProvider, Factory
│   │   │   └── embeddings/   # BaseEmbeddingProvider, MockEmbeddingProvider, Factory
│   │   ├── api/              # HTTP routers & endpoints
│   │   │   └── routes/       # Endpoint handlers (health.py)
│   │   ├── core/             # Configuration & environment management (config.py)
│   │   ├── models/           # Pydantic data schemas (schemas.py)
│   │   ├── services/         # Domain business logic
│   │   │   ├── case_intelligence/   # Grievance structuring & fact extraction
│   │   │   ├── rag/                 # Statutory semantic & keyword retrieval
│   │   │   ├── citation/            # Anti-hallucination verification
│   │   │   ├── document_generation/ # Complaint & notice drafting
│   │   │   └── ingestion/           # Statute & precedent parsing
│   │   └── main.py           # FastAPI application entrypoint
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Backend environment template
├── frontend/                 # React + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/       # Accessible UI components (Navbar, Hero, Features, SystemStatus, Footer)
│   │   ├── services/         # HTTP API client services (api.ts)
│   │   ├── App.tsx           # Main application view
│   │   ├── main.tsx          # React DOM entrypoint
│   │   ├── vite-env.d.ts     # Vite environment types
│   │   └── index.css         # Tailwind styles & typography
│   ├── package.json          # Node dependencies & build scripts
│   ├── tsconfig.json         # TypeScript compiler configuration
│   ├── vite.config.ts        # Vite build configuration
│   └── tailwind.config.js    # Design tokens & color system
├── docs/                     # Architectural & roadmap documentation
│   ├── architecture.md
│   └── roadmap.md
├── tests/                    # Backend & integration tests
│   ├── test_health.py
│   └── test_llm_provider.py
├── .gitignore
├── .env.example              # Monorepo root environment template
├── PROJECT_CONTEXT.md        # Master technical context for development handoff
└── README.md                 # Setup, run, and contributor documentation
```

---

## 4. Replaceable Provider Abstraction

Nyaya AI decouples all generative AI and embedding logic from third-party vendor SDKs via abstract base classes:

### LLM Interface (`backend/app/ai/llm/base.py`)
```python
class BaseLLMProvider(ABC):
    @abstractmethod
    async def generate(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.0, max_tokens: int = 1024, **kwargs: Any) -> str:
        """Generate complete text response."""
        pass

    @abstractmethod
    async def stream(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.0, max_tokens: int = 1024, **kwargs: Any) -> AsyncIterator[str]:
        """Stream response tokens asynchronously."""
        pass
```

- **`MockLLMProvider`**: Used for unit tests, offline development, and CI environments without network latency or API costs.
- **`GeminiLLMProvider`**: Primary provider interface for Google Gemini API models (`gemini-1.5-pro`).
- **`get_llm_provider(settings)`**: Factory that instantiates the active provider based on the `LLM_PROVIDER` environment variable.

---

## 5. Placeholder UI Functionality & User Flows

The current frontend implements the foundational landing page and health verification interface. The following elements are placeholders designed for upcoming milestones:

1. **Hero Action Links**:
   - `Explore Foundation Architecture` — Anchors to `#architecture` (Features section).
   - `Check API Health` — Anchors to `#system-status` (Live Diagnostic section).
2. **Feature Capability Cards**:
   - All 6 cards in `Features.tsx` (*Conversational Intake*, *Structured Case Summary*, *Evidence & Missing Fact Audit*, *Grounded Statutory Retrieval*, *Strict Citation Verification*, *Editable Legal Drafts*) display the status badge `"Planned for subsequent milestones"`.
   - The interactive chat panel and document generation workspace are planned for Milestones 3 and 6.
3. **System Status Section**:
   - `Recheck Status` button is **fully operational**: triggers real HTTP requests to `/api/health` and displays live backend metrics (status, version, active LLM provider, embedding engine, timestamp).
