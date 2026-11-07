import React, { useState } from 'react';
import { 
  LegalSource, 
  REAL_LEGAL_SOURCES 
} from '../data/demoCase';
import { 
  BookOpen, 
  Search, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Scale, 
  Copy
} from 'lucide-react';

interface SourcesScreenProps {
  onNotify: (type: 'success' | 'info' | 'warning', title: string, msg?: string) => void;
  onNavigateToStudio: () => void;
}

export const SourcesScreen: React.FC<SourcesScreenProps> = ({ 
  onNotify,
  onNavigateToStudio 
}) => {
  const [sources] = useState<LegalSource[]>(REAL_LEGAL_SOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<LegalSource>(REAL_LEGAL_SOURCES[0]);

  const filteredSources = sources.filter(s => 
    s.act.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.plainSummary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCitation = (source: LegalSource) => {
    const citation = `${source.act}, ${source.section} — "${source.title}" (${source.year}):\n${source.officialExcerpt}`;
    navigator.clipboard.writeText(citation);
    onNotify('success', 'Statutory Citation Copied', `Copied ${source.section} to clipboard.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-6 sm:p-8 shadow-warm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Statutory Grounding
              </span>
              <span className="text-xs text-slate-400">Zero Hallucination Guarantee</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-nyaya-plum">
              Indian Consumer Law Sources & Precedents
            </h1>
            <p className="text-sm text-nyaya-text-secondary mt-1">
              Grounded legal sections, Gazette definitions, and binding NCDRC precedents mapped to this dispute.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToStudio}
              className="inline-flex items-center px-4 py-2.5 rounded-xl bg-nyaya-orange hover:bg-nyaya-orange-hover text-white text-xs font-semibold shadow-orange-sm transition-all"
            >
              <FileText className="w-4 h-4 mr-2" />
              Open Document Studio
            </button>
          </div>
        </div>

        {/* Anti-Hallucination Policy Banner */}
        <div className="pt-6">
          <div className="p-4 rounded-xl bg-nyaya-cream-light border border-nyaya-cream-dark flex items-start gap-3 text-xs text-nyaya-text-secondary">
            <Scale className="w-5 h-5 text-nyaya-orange shrink-0 mt-0.5" />
            <div>
              <strong className="text-nyaya-plum block font-semibold mb-0.5">
                Authenticity & Grounding Standard
              </strong>
              All statutory citations and case laws presented here represent authentic provisions from the 
              <strong> Consumer Protection Act, 2019 (Act No. 35 of 2019)</strong> and 
              <strong> Consumer Protection (E-Commerce) Rules, 2020</strong> as notified in the Gazette of India.
              Nyaya AI never generates non-existent legal sections or fake court orders.
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sources List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search legal sections, e-commerce rules, keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-nyaya-orange bg-white shadow-sm"
            />
          </div>

          {/* Sources scroll list */}
          <div className="space-y-3">
            {filteredSources.map((source) => {
              const isSelected = selectedSource.id === source.id;

              return (
                <div
                  key={source.id}
                  onClick={() => setSelectedSource(source)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-nyaya-plum text-white border-nyaya-plum shadow-warm-lg scale-[1.01]'
                      : 'bg-white text-nyaya-plum border-slate-200/90 hover:border-nyaya-orange-border hover:shadow-warm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-nyaya-plum-light text-nyaya-yellow' : 'bg-nyaya-lavender text-nyaya-plum'
                    }`}>
                      {source.section}
                    </span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      {source.relevanceScore}% match
                    </span>
                  </div>

                  <h3 className={`text-sm font-bold font-serif ${isSelected ? 'text-white' : 'text-nyaya-plum'}`}>
                    {source.title}
                  </h3>

                  <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-nyaya-lavender' : 'text-slate-500'
                  }`}>
                    {source.plainSummary}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-200/20 flex items-center justify-between text-[11px]">
                    <span className={isSelected ? 'text-slate-300' : 'text-slate-400'}>
                      {source.act} ({source.year})
                    </span>
                    <span className={`font-medium ${isSelected ? 'text-nyaya-orange' : 'text-nyaya-orange'}`}>
                      Inspect &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Source Detailed Inspector (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-6 sm:p-8 shadow-warm space-y-6 sticky top-24">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 gap-4">
              <div>
                <span className="text-xs font-bold text-nyaya-orange uppercase tracking-wider">
                  {selectedSource.act} ({selectedSource.year})
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-nyaya-plum mt-1">
                  {selectedSource.section}: {selectedSource.title}
                </h2>
              </div>

              <button
                onClick={() => handleCopyCitation(selectedSource)}
                className="inline-flex items-center px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-nyaya-plum text-xs font-semibold shadow-sm transition-all shrink-0"
              >
                <Copy className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                Copy Citation
              </button>
            </div>

            {/* Plain English Translation for Indian Citizens */}
            <div className="p-4 rounded-xl bg-nyaya-cream border border-nyaya-cream-dark space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-nyaya-plum-muted flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-nyaya-orange" />
                Plain-Language Citizen Summary
              </span>
              <p className="text-sm font-medium text-nyaya-plum leading-relaxed">
                {selectedSource.plainSummary}
              </p>
            </div>

            {/* Official Statutory Excerpt */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Official Gazette Text (Verbatim Excerpt)
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-serif text-xs text-slate-800 leading-relaxed italic border-l-4 border-l-nyaya-orange">
                "{selectedSource.officialExcerpt}"
              </div>
            </div>

            {/* Direct Application to Rahul Sharma vs. NexaCart */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Application to Current Case (Why this applies)
              </span>
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                {selectedSource.applicationToCase}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Pleadable in District Consumer Commission, Bengaluru Urban
              </span>
              <button
                onClick={onNavigateToStudio}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-nyaya-plum hover:bg-nyaya-plum-light text-white text-xs font-semibold shadow-sm transition-all"
              >
                Insert into Complaint Draft &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
