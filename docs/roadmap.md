# Nyaya AI Project Roadmap

## Milestone 1: Initial Project Foundation (Completed)
- [x] Monorepo directory structure created (`frontend/`, `backend/`, `docs/`, `tests/`).
- [x] FastAPI backend initialized with CORS, environment configuration, and root routing.
- [x] Health diagnostic endpoints implemented (`/health`, `/api/health`).
- [x] Swappable provider abstraction interfaces established (`BaseLLMProvider`, `BaseEmbeddingProvider`).
- [x] React 18 + Vite + TypeScript + Tailwind CSS frontend initialized with civic legal styling.
- [x] Frontend health status polling widget with live diagnostic indicators.
- [x] Environment configuration templates (`.env.example`).
- [x] Automated test suite created with Pytest.

---

## Milestone 2: Technical Architecture Baseline & Stack Alignment (Completed)
- [x] Technology stack aligned to agreed architecture: **Gemini API**, **ChromaDB**, **SQLite**, **FastAPI**, and **React**.
- [x] Gemini API provider contract implemented (`GeminiLLMProvider`) with configuration safeguards.
- [x] Local relational storage architecture defined with SQLite (`DATABASE_URL="sqlite:///./nyaya_ai.db"`).
- [x] Vector store architecture aligned to embedded ChromaDB (`CHROMA_PERSIST_DIRECTORY="./chroma_db"`).
- [x] Removed cloud-vendor dependencies (Supabase/Claude) to ensure localized, privacy-compliant execution.
- [x] Verified full test suite (6/6 unit & API integration tests passing).
- [x] Verified production frontend build (`vite build` passing with zero TypeScript errors).
- [x] Comprehensive documentation updated for engineering handoff (`PROJECT_CONTEXT.md`, `README.md`, `docs/architecture.md`).

---

## Milestone 3: Conversational Case Intake & Fact Extraction
- [ ] Multi-turn conversational flow to gather consumer dispute details.
- [ ] Structured extraction schema (Pydantic model) for case facts:
  - Complainant and Opposite Party identities.
  - Transaction date, payment mode, and order/transaction reference numbers.
  - Invoiced amount and product/service category.
  - Nature of grievance (defective goods, deficiency in service, unfair trade practices, misleading advertisements).
  - Quantified relief sought (refund, product replacement, compensation for mental agony, litigation costs).
- [ ] Missing facts audit and proactive follow-up question engine.
- [ ] SQLite schema and repository models for persisting user intake sessions and case facts.

---

## Milestone 4: Statutory Legal Ingestion & ChromaDB Vector RAG
- [ ] Statutory data ingestion & chunking pipeline:
  - Consumer Protection Act, 2019 (all 107 sections and schedules).
  - Consumer Protection (E-Commerce) Rules, 2020.
  - Consumer Protection (Consumer Disputes Redressal Commissions) Rules, 2020.
  - Landmark precedent summaries from NCDRC and Supreme Court of India.
- [ ] Embedding generation using Gemini embeddings / local sentence transformers into ChromaDB collections.
- [ ] Hybrid search implementation (dense semantic search + BM25 keyword matching for exact section lookups).

---

## Milestone 5: Anti-Hallucination & Citation Verification Layer
- [ ] Automated statutory citation extraction engine.
- [ ] Strict cross-referencing against indexed bare acts before surfacing any legal claim.
- [ ] Algorithmic safeguard: rejection or flagging of ungrounded legal claims or fabricated section numbers.
- [ ] Confidence scoring for statutory applicability and consumer forum jurisdictional matching.

---

## Milestone 6: Case Briefing & Legal Document Drafting
- [ ] Pre-litigation Legal Notice generator (addressed to merchant/vendor giving statutory 15-day rectification window).
- [ ] National Consumer Helpline (NCH / INGRAM) grievance filing draft.
- [ ] Formal Consumer Commission complaint petition builder tailored to pecuniary jurisdiction under CPA 2019:
  - District Commission: Claims up to ₹50 Lakhs.
  - State Commission: Claims from ₹50 Lakhs to ₹2 Crores.
  - National Commission (NCDRC): Claims exceeding ₹2 Crores.
- [ ] Document export in printable PDF and editable text/DOCX formats.

---

## Milestone 7: End-to-End Evaluation & Citizen Workspace
- [ ] Benchmark test suite with synthetic and anonymized real-world Indian consumer dispute scenarios.
- [ ] Grounding and factual accuracy evaluation harness.
- [ ] Multi-panel citizen legal workspace (Conversational Intake, Case Fact Summary, Evidence Checklist, Statutory Sources Viewer, Document Editor).
