import React from 'react';
import { ArrowRight, BookOpen, FileCheck2, Scale } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200">
      {/* Decorative subtle legal motif */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex justify-center items-center">
        <Scale className="w-[800px] h-[800px] text-nyaya-navy" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtle pill label */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-nyaya-blue-subtle border border-nyaya-blue-border text-nyaya-blue text-xs font-semibold tracking-wide uppercase mb-6">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Consumer Protection Act, 2019 Guided Intelligence</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-nyaya-navy tracking-tight leading-[1.15] mb-6">
          Accessible Legal Redressal for <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nyaya-navy to-nyaya-blue">
            Every Indian Citizen.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8">
          Nyaya AI empowers consumers facing unfair trade practices, defective products, and service
          deficiencies to understand their rights, compile evidence, and generate verifiable legal complaint drafts.
        </p>

        {/* Action / Next steps placeholder */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#architecture"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-nyaya-navy text-white text-sm font-semibold hover:bg-nyaya-navy-light shadow-md transition-all group"
          >
            <span>Explore Foundation Architecture</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#system-status"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <FileCheck2 className="w-4 h-4 mr-2 text-slate-500" />
            Check API Health
          </a>
        </div>

        {/* Legal Disclaimer Box - Required by architectural principles */}
        <div className="max-w-2xl mx-auto p-4 rounded-lg bg-amber-50/70 border border-amber-200 text-left flex items-start space-x-3 text-xs text-amber-900 leading-relaxed shadow-sm">
          <div className="p-1 rounded bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <strong className="font-semibold block text-amber-950 mb-0.5">
              Statutory Informational Disclaimer
            </strong>
            Nyaya AI provides informational legal assistance and research automation based on public Indian statutes.
            It does not constitute formal legal counsel or create an advocate-client relationship.
            For court representation or formal proceedings, consult an advocate enrolled under the Advocates Act, 1961.
          </div>
        </div>
      </div>
    </section>
  );
};
