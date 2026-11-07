import React from 'react';
import {
  Scale,
  ArrowRight,
  MessageSquare,
  FileSpreadsheet,
  ShieldCheck,
  FileText,
  Sparkles,
  Laptop,
  Plane,
  ShoppingBag,
  Building2
} from 'lucide-react';
import { SystemStatus } from '../components/SystemStatus';

interface LandingPageProps {
  onOpenWorkspace: () => void;
}

const COMMON_DISPUTES = [
  {
    icon: Laptop,
    tag: "Defective Electronics",
    title: "Dead-on-Arrival Laptop & Refund Denial",
    scenario: "Brand engineer confirms hardware flaw, but marketplace rejects 7-day return claiming customer damage.",
    statute: "CPA 2019 § 2(10) & E-Commerce Rule 6(2)",
    relief: "Full refund + 12% interest + compensation",
  },
  {
    icon: ShoppingBag,
    tag: "E-Commerce Arbitrariness",
    title: "Wrong Goods Delivered & Return Window Closed",
    scenario: "Platform delivered wrong garment/appliance, then unilaterally closed return ticket without refund.",
    statute: "CPA 2019 § 2(47)(viii) — Unfair Trade Practice",
    relief: "Replacement or immediate payment reversal",
  },
  {
    icon: Plane,
    tag: "Travel & Airlines",
    title: "Exorbitant Cancellation Charges",
    scenario: "Flight cancelled by airline or cancelled by passenger within statutory cooling period with zero refund.",
    statute: "DGCA CAR Section 3 & CPA 2019 Deficiency",
    relief: "Full refund of basic fare + fuel surcharge",
  },
  {
    icon: Building2,
    tag: "Real Estate & Housing",
    title: "Undue Possession Delay by Developer",
    scenario: "Builder exceeds contract delivery date by over 12 months with vague force majeure excuses.",
    statute: "Illustrative CPA 2019 reference — verify applicability",
    relief: "Delayed possession interest or principal exit",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Explain in Plain Words",
    description: "Describe your consumer dispute conversationally. Nyaya AI gently guides you to clarify timelines, invoices, amounts paid, and communications.",
  },
  {
    step: "02",
    icon: FileSpreadsheet,
    title: "Extract Case Brief & Timeline",
    description: "Transforms messy chats and email threads into a structured factual brief, jurisdictional check, and chronological timeline.",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Audit Missing Evidence",
    description: "Evaluates your documentary readiness against Consumer Commission evidentiary standards, flagging missing job sheets or UTR statements.",
  },
  {
    step: "04",
    icon: FileText,
    title: "Draft Notion-Style Notices",
    description: "Generates grounded pre-litigation legal notices and District Commission complaint petitions with zero hallucinated citations.",
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenWorkspace }) => {
  return (
    <div className="min-h-screen bg-nyaya-cream flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-nyaya-cream-dark shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-nyaya-plum flex items-center justify-center text-white shadow-warm">
                <Scale className="w-5 h-5 text-nyaya-orange" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold font-serif tracking-tight text-nyaya-plum">
                    Nyaya AI
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-nyaya-orange-light text-nyaya-orange border border-nyaya-orange-border">
                    CPA 2019 Edition
                  </span>
                </div>
                <p className="text-[10px] text-nyaya-text-muted uppercase tracking-widest font-semibold">
                  Civic Legal Intelligence
                </p>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-4">
              <a
                href="#disputes"
                className="hidden md:inline-block text-xs font-semibold text-nyaya-text-secondary hover:text-nyaya-plum transition-colors"
              >
                Common Disputes
              </a>
              <a
                href="#how-it-works"
                className="hidden md:inline-block text-xs font-semibold text-nyaya-text-secondary hover:text-nyaya-plum transition-colors"
              >
                How It Works
              </a>
              <a
                href="#system-status"
                className="hidden md:inline-block text-xs font-semibold text-nyaya-text-secondary hover:text-nyaya-plum transition-colors"
              >
                Diagnostics
              </a>

              <button
                onClick={onOpenWorkspace}
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-nyaya-plum hover:bg-nyaya-plum-light text-white text-xs font-semibold shadow-warm transition-all"
              >
                <span>Open Legal Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 text-nyaya-orange" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-nyaya-cream-dark">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-nyaya-orange-light/40 via-nyaya-lavender/30 to-transparent pointer-events-none rounded-full blur-3xl opacity-70" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-nyaya-lavender border border-nyaya-lavender-border text-nyaya-plum text-xs font-semibold mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-nyaya-orange" />
            <span>Built for Ordinary Indian Citizens & Consumers</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-nyaya-plum tracking-tight leading-[1.15] mb-6">
            Grounded Legal Redressal for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nyaya-orange via-nyaya-plum to-nyaya-orange">
              Every Indian Consumer.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-nyaya-text-secondary leading-relaxed mb-10">
            Faced a defective product, arbitrary refund denial, or service deficiency?
            Nyaya AI structures your grievance into a structured case brief, audits your evidence,
            and helps prepare complaint information for review under the <strong>Consumer Protection Act, 2019</strong>.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onOpenWorkspace}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-nyaya-orange hover:bg-nyaya-orange-hover text-white text-sm font-semibold shadow-orange-md transition-all group"
            >
              <span>Launch Live Legal Workspace</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenWorkspace}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white border border-nyaya-cream-dark text-nyaya-plum text-sm font-semibold hover:bg-nyaya-cream-light shadow-warm transition-all"
            >
              <span>Explore Demo Dispute (Laptop Refund)</span>
            </button>
          </div>

          {/* Statutory Informational Disclaimer */}
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-nyaya-yellow-light border border-nyaya-yellow-border text-left flex items-start space-x-3 text-xs text-amber-950 shadow-sm">
            <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-amber-950 mb-0.5">
                Statutory Informational Disclaimer
              </strong>
              Nyaya AI is an automated legal research and drafting assistant based on public Indian statutes.
              It does not provide formal legal representation or create an advocate-client relationship under the Advocates Act, 1961.
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-20 bg-white border-b border-nyaya-cream-dark" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-nyaya-orange">
              Structured Methodology
            </span>
            <h2 className="text-3xl font-serif font-bold text-nyaya-plum mt-2">
              From Grievance to Legal Notice in Minutes
            </h2>
            <p className="text-sm text-nyaya-text-secondary mt-3">
              Nyaya AI organizes complaint facts, highlights missing information, and presents illustrative legal references for user review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-nyaya-cream-dark bg-nyaya-cream-light/60 hover:bg-white hover:shadow-warm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-nyaya-lavender flex items-center justify-center text-nyaya-plum border border-nyaya-lavender-border">
                        <Icon className="w-5 h-5 text-nyaya-orange" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-serif text-nyaya-plum mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-nyaya-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/50 flex items-center text-[11px] font-semibold text-nyaya-orange">
                    <span>Grounded in CPA 2019</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Disputes Catalog Section */}
      <section className="py-20 bg-nyaya-cream border-b border-nyaya-cream-dark" id="disputes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-nyaya-orange">
                Jurisdictional Coverage
              </span>
              <h2 className="text-3xl font-serif font-bold text-nyaya-plum mt-2">
                Supported Consumer Disputes in India
              </h2>
              <p className="text-sm text-nyaya-text-secondary mt-2 max-w-xl">
                Illustrative consumer-law references for orientation. Verify current official text and jurisdiction before relying on any provision.
              </p>
            </div>

            <button
              onClick={onOpenWorkspace}
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-nyaya-plum hover:bg-nyaya-plum-light text-white text-xs font-semibold shadow-warm transition-all shrink-0"
            >
              <span>Test with Demo Case</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 text-nyaya-yellow" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMMON_DISPUTES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-nyaya-cream-dark shadow-warm hover:border-nyaya-orange-border transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-nyaya-lavender text-nyaya-plum border border-nyaya-lavender-border">
                        {item.tag}
                      </span>
                      <Icon className="w-5 h-5 text-nyaya-orange" />
                    </div>

                    <h3 className="text-lg font-serif font-bold text-nyaya-plum mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-nyaya-text-secondary leading-relaxed mb-4">
                      {item.scenario}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Statutory Grounding:</span>
                      <span className="font-semibold text-nyaya-plum">{item.statute}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pleadable Relief:</span>
                      <span className="font-semibold text-emerald-700">{item.relief}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Backend Diagnostics Section */}
      <SystemStatus />

      {/* Footer */}
      <footer className="bg-nyaya-plum text-nyaya-lavender py-14 border-t border-nyaya-plum-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-nyaya-plum-muted">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-nyaya-orange flex items-center justify-center text-white shadow-orange-sm">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold font-serif text-white tracking-tight">Nyaya AI</span>
                <p className="text-xs text-slate-400">
                  Civic Legal Intelligence for Indian Citizens
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <button
                onClick={onOpenWorkspace}
                className="px-4 py-2 rounded-xl bg-nyaya-plum-light hover:bg-nyaya-plum-surface text-white border border-nyaya-plum-muted transition-colors"
              >
                Open Legal Workspace
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>
              Designed under the Consumer Protection Act, 2019 • Powered by Gemini, ChromaDB, SQLite & FastAPI.
            </p>
            <p className="text-[11px] text-slate-500">
              Zero-Hallucination Architecture • Non-Advocate Informational Redressal
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
