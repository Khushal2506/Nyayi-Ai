# Nyaya AI — Project Context & Engineering Handoff Specification

## 1. Product Mission & Scope

**Nyaya AI** (from Sanskrit *Nyāya* meaning "justice", "logic", and "due process") is an AI-powered civic legal assistance platform engineered for ordinary Indian citizens navigating consumer disputes.

In India, ordinary consumers frequently face defective goods, e-commerce refund refusals, delivery failures, and service deficiencies from merchants, airlines, telecommunications providers, and developers. While the **Consumer Protection Act, 2019** provides strong statutory remedies, average citizens lack the legal fluency to structure their claims, identify missing evidence, cite applicable legal sections, or draft formal legal notices.

Nyaya AI bridges this gap as an **informational legal assistant** combining:
- **Kuku FM-inspired warm, approachable visual identity**: welcoming, non-intimidating citizen experience.
- **Stripe-inspired premium visual quality**: rigorous micro-interactions, responsive grid layout, and accessible visual hierarchy.
- **Notion-inspired document drafting**: live editable clauses with inline statutory grounding tags.
- **Distinctive original Nyaya AI identity**: grounded strictly in authentic Indian statutory acts without hallucination.

> **Statutory Disclaimer**: Nyaya AI provides informational legal assistance and research automation based on public Indian statutes. It does not constitute formal legal counsel or create an advocate-client relationship under the Advocates Act, 1961.

---

## 2. Agreed Technology Stack & Exact Design Tokens

### Design System Tokens
| Token Name | Hex Code | Role in Interface |
|---|---|---|
| **Deep Plum** | `#17152B` | Primary brand canvas, header shell, text headings, and authority elements. |
| **Vibrant Orange** | `#FF6B35` | Primary action buttons, badges, status highlights, and active indicators. |
| **Warm Yellow** | `#FFC857` | Accent stars, advisory tags, and subtle highlight borders. |
| **Warm Cream** | `#FFF8EF` | App background canvas, card surfaces, and document backings. |
| **Soft Lavender** | `#E9E3F5` | Category pills, metadata tags, and soft accent containers. |
| **White** | `#FFFFFF` | Document drafting canvas, card interiors, and modal dialogues. |

### Technical Stack
| Component | Technology | Version / Configuration | Role |
|---|---|---|---|
| **Frontend** | React + TypeScript + Vite | React 18.3, TypeScript 5.6, Vite 5.4 | High-performance SPA with client routing. |
| **Styling** | Tailwind CSS | Tailwind 3.4 with custom Nyaya design tokens | Responsive utility classes with zero runtime overhead. |
| **Backend API** | Python + FastAPI | Python 3.11+ (tested on 3.13), FastAPI 0.162 | Asynchronous ASGI REST API with Pydantic v2 schemas. |
| **Server** | Uvicorn | 0.54.0 | ASGI web server. |
| **LLM Engine** | Google Gemini API | `gemini-1.5-pro` (via swappable `BaseLLMProvider`) | Planned fact extraction and statutory reasoning engine. |
| **Vector Store** | ChromaDB | Embedded local storage (`./chroma_db`) | Semantic vector indexing of statutory bare acts and precedents. |
| **Relational DB** | SQLite | `sqlite:///./nyaya_ai.db` | Local session persistence, case briefs, and audit logs. |
| **Testing** | Pytest + pytest-asyncio + httpx | Pytest 9.2, pytest-asyncio 1.4 | Automated backend unit and integration test suite. |

---

## 3. Monorepo Directory Structure

```
nyaya-ai/
├── .gitignore                          # Excludes secrets (.env), node_modules, Python venvs, build artifacts
├── .env.example                        # Canonical environment configuration template
├── .env                                # Local development environment (git-ignored)
├── README.md                           # Quickstart guide, service commands, and configuration
├── PROJECT_CONTEXT.md                  # Master project context, API contracts, and handoff specs
├── docs/
│   ├── architecture.md                 # System architecture, provider contracts, and UI flow mapping
│   ├── roadmap.md                      # Multi-milestone progress and future execution plan
│   └── screenshots/                    # High-resolution screenshots of all 7 completed screens
│       ├── 01_landing_page.png
│       ├── 02_workspace_overview.png
│       ├── 03_conversational_intake.png
│       ├── 04_evidence_management.png
│       ├── 05_statutory_sources.png
│       ├── 06_document_studio.png
│       └── 07_mobile_responsive.png
├── backend/
│   ├── .env.example                    # Backend-specific environment variables
│   ├── requirements.txt                # Pinned backend dependencies
│   └── app/
│       ├── __init__.py                 # Application package metadata (version 0.1.0)
│       ├── main.py                     # FastAPI app instance, CORS middleware, router registration
│       ├── core/
│       │   ├── __init__.py
│       │   └── config.py               # Pydantic Settings reading environment variables & .env
│       ├── models/
│       │   ├── __init__.py
│       │   └── schemas.py              # Pydantic models (HealthResponse, diagnostic schemas)
│       ├── api/
│       │   ├── __init__.py
│       │   └── routes/
│       │       ├── __init__.py
│       │       └── health.py           # /health and /api/health endpoint handlers
│       ├── ai/
│       │   ├── llm/
│       │   │   ├── __init__.py
│       │   │   ├── base.py             # BaseLLMProvider abstract base class
│       │   │   ├── mock_provider.py    # Offline MockLLMProvider for tests/local dev
│       │   │   ├── gemini_provider.py  # Google Gemini API provider implementation
│       │   │   └── factory.py          # get_llm_provider() factory function
│       │   └── embeddings/
│       │       ├── __init__.py
│       │       ├── base.py             # BaseEmbeddingProvider abstract base class
│       │       ├── mock_provider.py    # Deterministic MockEmbeddingProvider
│       │       └── factory.py          # get_embedding_provider() factory function
│       └── services/                   # Modular domain service stubs for future milestones
│           ├── __init__.py
│           ├── case_intelligence/__init__.py
│           ├── rag/__init__.py
│           ├── citation/__init__.py
│           ├── document_generation/__init__.py
│           └── ingestion/__init__.py
├── frontend/
│   ├── .env.example                    # Frontend environment template
│   ├── package.json                    # Dependencies, scripts (dev, build, preview)
│   ├── tsconfig.json                   # Strict TypeScript compiler options
│   ├── tsconfig.node.json              # Vite Node TypeScript config
│   ├── vite.config.ts                  # Vite server and React plugin setup
│   ├── tailwind.config.js              # Theme tokens (Plum, Orange, Yellow, Cream, Lavender, White)
│   ├── postcss.config.js               # PostCSS configuration
│   ├── index.html                      # HTML root with Newsreader, Inter & JetBrains Mono fonts
│   └── src/
│       ├── vite-env.d.ts               # Vite client and env typing declarations
│       ├── main.tsx                    # React DOM root render
│       ├── App.tsx                     # Main layout & hash navigation manager
│       ├── index.css                   # Custom scrollbars & Notion document styles
│       ├── data/
│       │   └── demoCase.ts             # Realistic Indian consumer dispute dataset (CPA 2019)
│       ├── services/
│       │   └── api.ts                  # Typed HTTP fetcher for health diagnostics
│       ├── components/
│       │   ├── Toast.tsx               # Global animated toast notification system
│       │   └── SystemStatus.tsx        # Live backend connectivity probe widget
│       └── screens/
│           ├── LandingPage.tsx         # Screen 1: Positioning, process, disputes catalog, CTAs
│           ├── MainWorkspace.tsx       # Screen 2: Case overview shell & subnav navigation
│           ├── IntakeScreen.tsx        # Screen 3: Conversational intake chat & fact extractor
│           ├── SummaryScreen.tsx       # Screen 4: Case brief & chronological timeline
│           ├── EvidenceScreen.tsx      # Screen 5: Uploaded/missing evidence & verification
│           ├── SourcesScreen.tsx       # Screen 6: Authentic statutory acts & NCDRC inspector
│           └── DocumentStudioScreen.tsx# Screen 7: Notion-style editable complaint studio
└── tests/
    ├── __init__.py
    ├── test_health.py                  # API test suite (root, /health, /api/health)
    └── test_llm_provider.py           # Provider test suite (Mock LLM, Gemini validation, Embedding)
```

---

## 4. Completed Frontend Screens & Working Demo Interactions

### Screen 1: Landing Page (`LandingPage.tsx`)
- **Product Positioning**: Headline emphasizing accessible, grounded legal redressal for Indian consumers.
- **CTAs**: "Launch Live Legal Workspace" and "Explore Demo Dispute" navigate directly to the workspace.
- **4-Step Methodology**: Explains Intake &rarr; Extraction &rarr; Evidence Audit &rarr; Notice Generation.
- **Disputes Catalog**: Realistic case categories (Dead-on-arrival electronics, e-commerce return refusals, airline fees, developer delays).
- **Statutory Disclaimer**: Explicitly informs users about informational scope under the Advocates Act, 1961.
- **System Health Widget**: Embeds `SystemStatus.tsx` probing FastAPI `/api/health`.

### Screen 2: Main Legal Workspace Shell (`MainWorkspace.tsx`)
- **Navigation Shell**: Top bar with brand emblem, active case pill (*Rahul Sharma vs. NexaCart*), backend status indicator (green pulse), and return link.
- **Subnav Tabs**: 5 tabs (`overview`, `intake`, `evidence`, `sources`, `studio`) with count badges.
- **URL Hash Synchronization**: Supports direct deep-linking via `#overview`, `#intake`, `#evidence`, `#sources`, `#studio`.

### Screen 3: Conversational Legal Intake (`IntakeScreen.tsx`)
- **Interactive Chat**: Preloaded with a realistic dialogue on dead-on-arrival laptop return refusal.
- **Working Message Sending**: User can type custom messages and receive simulated smart responses grounded in CPA 2019 provisions (e.g. interest claims under § 39(1)(d), engineer report evidentiary weight, notice requirements, territorial jurisdiction).
- **Quick Prompt Chips**: 4 pre-configured chips for instant legal questions.
- **Live Fact Extraction Brief**: Side panel tracking complainant, opposite party, transaction value (₹64,999), and cause of action in real-time.

### Screen 4: Case Summary & Chronological Timeline (`SummaryScreen.tsx`)
- **Structured Brief**: Detailed grid displaying litigating parties, forum jurisdiction (District Commission, Bengaluru Urban), and pecuniary breakdown (₹84,999 total claim).
- **Sequential Timeline**: 6 timeline nodes with category pills, date badges, and linked evidence tags.
- **Add Timeline Event Form**: Working inline form that prepends new factual events to the timeline.
- **Copy Summary**: Formats and copies a structured legal brief to the system clipboard with toast feedback.

### Screen 5: Evidence Management & Document Registry (`EvidenceScreen.tsx`)
- **Dynamic Evidentiary Readiness Score**: Visual meter calculating readiness percentage (75% &rarr; 85% as items are resolved).
- **Verified vs. Missing Tabs**: Filter evidence by all, verified (3 items), and missing action items (2 items).
- **Record Preview Modal**: Inspect file metadata, file size, SHA256 simulation, and legal value.
- **Resolve Missing Action**: "Upload & Mark as Resolved" button updates missing items to verified.
- **Add Document Form**: Interactive modal to simulate new document uploads with category tags.

### Screen 6: Statutory Sources & Precedents Inspector (`SourcesScreen.tsx`)
- **Authentic Bare Acts**: Displays authentic text from:
  - Consumer Protection Act, 2019: Section 2(10) (Defect), Section 2(47) (Unfair Trade Practice), Section 35 (Filing).
  - Consumer Protection (E-Commerce) Rules, 2020: Rule 5(3) (48-hr grievance acknowledgment), Rule 6(2) (Return obligations).
  - NCDRC Landmark Precedent: *Tata Motors Ltd. vs. Rajesh Tyagi & Anr.*
- **Two-Column Inspector**: Interactive selection updates the main view with plain-language citizen summaries, verbatim Gazette excerpts, and factual application.
- **Search & Filter**: Real-time keyword filter across bare acts and summaries.
- **Copy Citation**: Copies formal statutory citation to clipboard.

### Screen 7: Notion-Style Document Studio (`DocumentStudioScreen.tsx`)
- **3 Statutory Presets**:
  1. *Pre-Litigation Legal Notice (15-Day Demand to NexaCart)*
  2. *District Consumer Commission Complaint Petition (Form 1 under CPA 2019)*
  3. *National Consumer Helpline (NCH / INGRAM) Grievance Text*
- **Inline Editable Clauses**: Users can edit, reword, or customize any clause directly within the document canvas.
- **Edit vs. Print Preview Toggle**: Switch between interactive text areas and clean formatted document view.
- **Action Suite**:
  - "Copy All" with formatted text clipboard copy.
  - "Print / PDF" triggering native browser print window.
  - "Export .TXT" generating and downloading a `.txt` file.
  - "Reset Clauses" restoring statutory preset defaults.

---

## 5. Verification Results

| Quality Check | Execution Command | Result |
|---|---|---|
| **TypeScript & Build** | `npm --prefix frontend run build` | **PASSED** in 2.72s. 0 errors. Chunks generated in `frontend/dist/`. |
| **Backend Test Suite** | `python -m pytest tests/ -v` | **6/6 PASSED** (`test_root_endpoint`, `test_health_check_endpoint`, `test_api_health_check_endpoint`, `test_mock_llm_provider`, `test_gemini_provider_requires_api_key`, `test_mock_embedding_provider`). |
| **Screenshot Audit** | Headless Chrome capture (1366x900 & 375x812) | **7/7 captured** in `docs/screenshots/` verifying complete rendering across all screens. |
| **Security Audit** | Pattern grep on tracked files | Zero API keys, credentials, or `.env` files tracked in Git. |

---

## 6. Documented Simulation & Handoff Boundaries

For the upcoming engineering phase handled by Claude Code:
1. **Conversational Intake API**: Replace simulated regex/keyword response in `IntakeScreen.tsx` with streaming POST endpoint `/api/intake/chat` backed by `GeminiLLMProvider`.
2. **Fact Extraction Persistence**: Persist extracted facts to local SQLite via SQLAlchemy / SQLModel models.
3. **ChromaDB Vector Retrieval**: Implement vector embedding pipeline for CPA 2019 bare acts and connect search queries to ChromaDB in `backend/app/services/rag/`.
4. **Citation Verifier**: Connect `backend/app/services/citation/` to validate all sections cited in Document Studio before final export.
