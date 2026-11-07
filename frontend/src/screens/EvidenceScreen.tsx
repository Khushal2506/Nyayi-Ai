import React, { useState } from 'react';
import { 
  EvidenceItem, 
  INITIAL_EVIDENCE 
} from '../data/demoCase';
import { 
  FileCheck2, 
  AlertCircle, 
  Upload, 
  CheckCircle2, 
  Eye, 
  ShieldCheck, 
  X,
  FilePlus2
} from 'lucide-react';

interface EvidenceScreenProps {
  onNotify: (type: 'success' | 'info' | 'warning', title: string, msg?: string) => void;
  onNavigateToSources: () => void;
}

export const EvidenceScreen: React.FC<EvidenceScreenProps> = ({ 
  onNotify,
  onNavigateToSources 
}) => {
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(INITIAL_EVIDENCE);
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'missing'>('all');
  const [previewItem, setPreviewItem] = useState<EvidenceItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New simulated upload form
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<EvidenceItem['category']>('Invoice');
  const [uploadSignificance, setUploadSignificance] = useState('');

  const verifiedCount = evidenceList.filter(e => e.status === 'verified').length;
  const missingCount = evidenceList.filter(e => e.status === 'missing').length;
  const readinessPercent = Math.round((verifiedCount / evidenceList.length) * 100);

  const handleResolveMissing = (id: string) => {
    setEvidenceList(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'verified',
          fileName: `${item.title.replace(/\s+/g, '_')}_Document.pdf`,
          fileSize: '620 KB',
          dateAdded: 'Today',
        };
      }
      return item;
    }));

    onNotify('success', 'Evidence Recorded', 'Document marked as resolved. Evidence readiness score improved.');
  };

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      onNotify('warning', 'Missing Information', 'Please provide a document title.');
      return;
    }

    const newItem: EvidenceItem = {
      id: `ev-${Date.now()}`,
      title: uploadTitle.trim(),
      category: uploadCategory,
      status: 'verified',
      fileName: `${uploadTitle.trim().replace(/\s+/g, '_')}_Uploaded.pdf`,
      fileSize: '1.1 MB',
      dateAdded: 'Just now',
      priority: 'medium',
      significance: uploadSignificance.trim() || 'Supplied by complainant to corroborate factual narrative.',
    };

    setEvidenceList([newItem, ...evidenceList]);
    setUploadTitle('');
    setUploadSignificance('');
    setShowUploadModal(false);
    onNotify('success', 'Document Uploaded', 'New document verified and added to evidence registry.');
  };

  const filteredEvidence = evidenceList.filter(item => {
    if (activeFilter === 'verified') return item.status === 'verified';
    if (activeFilter === 'missing') return item.status === 'missing';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner: Evidence Readiness */}
      <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-6 sm:p-8 shadow-warm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-nyaya-lavender text-nyaya-plum">
                Evidentiary Audit
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Rule 14, Consumer Protection (Consumer Commission Procedure) Regulations
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-nyaya-plum">
              Evidence & Document Registry
            </h1>
            <p className="text-sm text-nyaya-text-secondary mt-1">
              Verify documentary proof required under Indian consumer law to substantiate allegations of defect and unfair trade.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2.5 rounded-xl bg-nyaya-orange hover:bg-nyaya-orange-hover text-white text-xs font-semibold shadow-orange-sm transition-all"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload New Record
            </button>
            <button
              onClick={onNavigateToSources}
              className="inline-flex items-center px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-nyaya-plum text-xs font-semibold shadow-sm transition-all"
            >
              <FileCheck2 className="w-4 h-4 mr-2 text-nyaya-orange" />
              View Statutory Sources
            </button>
          </div>
        </div>

        {/* Readiness Meter Bar */}
        <div className="pt-6">
          <div className="flex items-center justify-between text-xs font-medium mb-2">
            <span className="text-nyaya-plum font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Case Evidentiary Strength Score: {readinessPercent}%
            </span>
            <span className="text-slate-500">
              {verifiedCount} Verified, {missingCount} Action Required
            </span>
          </div>

          <div className="w-full h-3 bg-nyaya-cream rounded-full overflow-hidden border border-nyaya-cream-dark">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                readinessPercent >= 80 ? 'bg-emerald-500' : 'bg-nyaya-orange'
              }`}
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-nyaya-cream-dark shadow-sm text-xs font-medium text-slate-600">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeFilter === 'all' ? 'bg-nyaya-plum text-white font-semibold shadow-sm' : 'hover:text-nyaya-plum'
            }`}
          >
            All Evidence ({evidenceList.length})
          </button>
          <button
            onClick={() => setActiveFilter('verified')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeFilter === 'verified' ? 'bg-emerald-600 text-white font-semibold shadow-sm' : 'hover:text-nyaya-plum'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setActiveFilter('missing')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeFilter === 'missing' ? 'bg-nyaya-orange text-white font-semibold shadow-sm' : 'hover:text-nyaya-plum'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Missing / Action Required ({missingCount})
          </button>
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvidence.map((item) => {
          const isVerified = item.status === 'verified';

          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isVerified 
                  ? 'bg-white border-slate-200/90 shadow-warm hover:border-emerald-300' 
                  : 'bg-nyaya-orange-light/50 border-nyaya-orange-border/80 shadow-warm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-nyaya-lavender text-nyaya-plum border border-nyaya-lavender-border">
                      {item.category}
                    </span>
                    {item.priority === 'high' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                        Critical Proof
                      </span>
                    )}
                  </div>

                  {isVerified ? (
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs font-semibold text-nyaya-orange bg-white px-2.5 py-1 rounded-full border border-nyaya-orange-border">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      Action Required
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold font-serif text-nyaya-plum mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-nyaya-text-secondary leading-relaxed mb-4">
                  {item.significance}
                </p>

                {item.actionRequired && (
                  <div className="p-3 rounded-xl bg-white/90 border border-nyaya-orange-border text-xs text-amber-950 mb-4">
                    <strong className="block text-[11px] uppercase tracking-wider text-nyaya-orange font-bold mb-1">
                      Action Required:
                    </strong>
                    {item.actionRequired}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {isVerified ? (
                  <>
                    <div className="text-slate-400 font-mono text-[11px]">
                      {item.fileName} • {item.fileSize}
                    </div>
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-nyaya-plum text-xs font-semibold shadow-sm transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5 text-nyaya-orange" />
                      View Record
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleResolveMissing(item.id)}
                    className="w-full py-2.5 rounded-xl bg-nyaya-orange hover:bg-nyaya-orange-hover text-white text-xs font-semibold shadow-orange-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <FilePlus2 className="w-4 h-4" />
                    <span>Upload & Mark as Resolved</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Record Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nyaya-plum/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-warm-lg border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-nyaya-orange">
                  Document Preview ({previewItem.category})
                </span>
                <h3 className="text-lg font-serif font-bold text-nyaya-plum mt-0.5">
                  {previewItem.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-nyaya-plum hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 rounded-xl bg-nyaya-cream border border-nyaya-cream-dark text-xs space-y-3 font-mono text-nyaya-plum">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400">Filename:</span>
                <span className="font-semibold">{previewItem.fileName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400">File Size:</span>
                <span>{previewItem.fileSize}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400">Verification Hash:</span>
                <span className="text-slate-500">SHA256: 8f4b1...e902a</span>
              </div>
              <div className="pt-2 text-slate-600 font-sans text-xs leading-relaxed">
                <strong>Legal evidentiary value:</strong> {previewItem.significance}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 rounded-xl bg-nyaya-plum text-white text-xs font-semibold hover:bg-nyaya-plum-light transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nyaya-plum/60 backdrop-blur-sm animate-in fade-in duration-150">
          <form 
            onSubmit={handleSimulatedUpload}
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-warm-lg border border-slate-200 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-nyaya-orange" />
                <h3 className="text-lg font-serif font-bold text-nyaya-plum">
                  Add Evidence Record
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-nyaya-plum"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Document Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Bank Debit UTR Statement or Email Receipt"
                value={uploadTitle}
                onChange={e => setUploadTitle(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-nyaya-orange"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Document Category
              </label>
              <select
                value={uploadCategory}
                onChange={e => setUploadCategory(e.target.value as any)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-nyaya-orange bg-white"
              >
                <option value="Invoice">Invoice / Bill</option>
                <option value="Inspection Report">Service / Technician Job Sheet</option>
                <option value="Correspondence">Email / SMS / Ticket Correspondence</option>
                <option value="Payment">Bank Statement / Payment Receipt</option>
                <option value="Photographic">Defect Photographs / Videos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Evidentiary Significance (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Explain what this document proves..."
                value={uploadSignificance}
                onChange={e => setUploadSignificance(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-nyaya-orange"
              />
            </div>

            <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 text-center bg-nyaya-cream-light hover:border-nyaya-orange transition-colors cursor-pointer">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-nyaya-plum">Click or drag simulated PDF/JPG here</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Maximum size: 10MB per document</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-nyaya-orange hover:bg-nyaya-orange-hover text-white text-xs font-semibold shadow-orange-sm transition-all"
              >
                Upload & Register Proof
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
