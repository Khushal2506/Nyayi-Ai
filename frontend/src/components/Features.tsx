import React from 'react';
import { MessageSquareText, FileSpreadsheet, CheckSquare, Library, ShieldCheck, FileText } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: MessageSquareText,
    title: "Conversational Intake",
    description: "Describe grievances in natural everyday language. The intake engine gently probes for crucial timelines, monetary amounts, and transaction identifiers.",
  },
  {
    icon: FileSpreadsheet,
    title: "Structured Case Summary",
    description: "Transforms unstructured narratives into organized case briefs categorized by complainant details, opposite parties, cause of action, and quantified claims.",
  },
  {
    icon: CheckSquare,
    title: "Evidence & Missing Fact Audit",
    description: "Identifies evidentiary gaps—such as missing tax invoices, warranty cards, delivery receipts, or formal merchant communication trails.",
  },
  {
    icon: Library,
    title: "Grounded Statutory Retrieval",
    description: "Semantic search over the Consumer Protection Act, 2019, E-Commerce Rules, 2020, and authoritative NCDRC precedent records without fabrication.",
  },
  {
    icon: ShieldCheck,
    title: "Strict Citation Verification",
    description: "Enforces an anti-hallucination barrier. Every cited section, statute, and rule is cross-referenced against authentic legal indexes before display.",
  },
  {
    icon: FileText,
    title: "Editable Legal Drafts",
    description: "Helps users organize complaint information and prepare structured drafts for review. Document generation is not yet connected.",
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="architecture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-nyaya-blue mb-3">
            Core Pillars
          </h2>
          <h3 className="text-3xl font-serif font-bold text-nyaya-navy tracking-tight">
            Engineered for Grounded Legal Precision
          </h3>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Unlike generic AI chatbots that risk fabricating statutes and legal procedures, Nyaya AI enforces
            rigorous citation verification, RAG grounding, and deterministic document schemas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-nyaya-parchment hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-nyaya-navy flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-nyaya-blue" />
                  </div>
                  <h4 className="text-lg font-semibold text-nyaya-navy mb-2 font-serif">
                    {cap.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center text-xs font-medium text-nyaya-blue">
                  <span>Planned for subsequent milestones</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
