import React, { useState } from 'react';
import { 
  LegalSource, 
  ILLUSTRATIVE_LEGAL_REFERENCES 
} from '../data/demoCase';
import { 
  BookOpen, 
  Search, 
  FileText,
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
  const [sources] = useState<LegalSource[]>(ILLUSTRATIVE_LEGAL_REFERENCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<LegalSource>(ILLUSTRATIVE_LEGAL_REFERENCES[0]);

  const filteredSources = sources.filter(s => 
    s.act.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.plainSummary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCitation = (source: LegalSource) => {
    const citation = `${source.act}, ${source.section} — "${source.title}" (${source.year}):\n${source.referenceExcerpt}`;
    navigator.clipboard.writeText(citation);
    onNotify('success', 'Reference Text Copied', `Copied the illustrative reference text for ${source.section}.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-6 sm:p-8 shadow-warm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                Reference Library — Verification Required
              </span>
              <span className="text-xs text-slate-400">Reference material; not legal advice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-nyaya-plum">
              Indian Consumer Law Sources & Precedents
            </h1>
            <p className="text-sm text-nyaya-text-secondary mt-1">
              Illustrative legal references for orientation. Verify the current official text and applicability before relying on any provision.
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

        {/* Legal reference limitation notice */}
        <div className="pt-6">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
            <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-0.5">Reference material — not independently verified</strong>
              This screen contains illustrative legal reference text. It is not connected to a live legal database or citation-verification service. Verify the latest official legislation, case law and applicability before relying on any citation.
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
                    <span className={`text-[10px] font-semibold ${isSelected ? 'text-amber-200' : 'text-amber-700'}`}>
                      Reference item
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
                Copy Reference Text
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
                Reference excerpt (verify against official text)
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-serif text-xs text-slate-800 leading-relaxed italic border-l-4 border-l-nyaya-orange">
                "{selectedSource.referenceExcerpt}"
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Check jurisdiction and current law before filing
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
