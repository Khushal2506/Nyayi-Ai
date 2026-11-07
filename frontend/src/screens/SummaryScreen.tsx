import React from 'react';
import { Calendar, FileText, ShieldCheck, Copy, AlertCircle } from 'lucide-react';
import type { IntakeResponse } from '../services/api';

interface SummaryScreenProps {
  caseData: IntakeResponse | null;
  onNotify: (type: 'success' | 'info' | 'warning', title: string, msg?: string) => void;
  onNavigateToIntake: () => void;
  onNavigateToEvidence: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  caseData,
  onNotify,
  onNavigateToIntake,
  onNavigateToEvidence
}) => {
  if (!caseData) {
    return (
      <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-10 text-center shadow-warm">
        <FileText className="w-10 h-10 mx-auto mb-4 text-nyaya-orange" />
        <h2 className="text-xl font-serif font-bold text-nyaya-plum">No complaint submitted yet</h2>
        <p className="text-sm text-nyaya-text-secondary mt-2">
          Submit a consumer complaint to generate a case brief from your information.
        </p>
        <button
          onClick={onNavigateToIntake}
          className="mt-6 px-5 py-3 rounded-xl bg-nyaya-orange text-white text-sm font-semibold"
        >
          Start a complaint
        </button>
      </div>
    );
  }

  const facts = [
    ['Complaint Type', caseData.complaint_type],
    ['Product / Service', caseData.product_or_service],
    ['Seller / Platform', caseData.seller_or_platform],
    ['Amount Paid', caseData.amount_paid],
    ['Order Date', caseData.order_date],
    ['Delivery Date', caseData.delivery_date],
    ['Issue Date', caseData.issue_date],
    ['Payment Method', caseData.payment_method],
    ['Requested Resolution', caseData.resolution_requested]
  ].filter((item) => item[1] !== undefined && item[1] !== null && String(item[1]).trim() !== '');

  const timeline = [
    ['Order placed', caseData.order_date],
    ['Product delivered', caseData.delivery_date],
    ['Issue reported', caseData.issue_date]
  ].filter((item) => item[1]);

  const copySummary = async () => {
    const text = [
      'NYAYA AI — CASE BRIEF',
      ...facts.map(([label, value]) => `${label}: ${value}`),
      '',
      `Summary: ${caseData.summary || 'Not available'}`,
      '',
      `Missing information: ${(caseData.missing_information || []).join(', ') || 'Not specified'}`,
      '',
      'This is an AI-generated information summary, not legal advice.'
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      onNotify('success', 'Summary copied', 'Case brief copied to clipboard.');
    } catch {
      onNotify('warning', 'Copy unavailable', 'Please copy the case brief manually.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-6 sm:p-8 shadow-warm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-nyaya-orange uppercase tracking-wider">
              AI-generated case brief
            </span>
            <h1 className="text-2xl font-serif font-bold text-nyaya-plum mt-2">
              {caseData.product_or_service || 'Consumer dispute'}
            </h1>
            <p className="text-sm text-nyaya-text-secondary mt-1">
              Based on the complaint information you submitted.
            </p>
          </div>
          <button
            onClick={copySummary}
            className="inline-flex items-center px-4 py-2.5 rounded-xl border border-slate-200 text-nyaya-plum text-xs font-semibold"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Case Brief
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facts.map(([label, value]) => (
            <div key={label} className="p-4 rounded-xl bg-nyaya-cream-light border border-nyaya-cream-dark/60">
              <div className="text-xs text-slate-500 uppercase font-medium">{label}</div>
              <div className="text-sm font-semibold text-nyaya-plum mt-2 break-words">
                {String(value)}
              </div>
            </div>
          ))}
        </div>

        {caseData.summary && (
          <div className="mt-6 p-5 rounded-xl bg-nyaya-cream-light border border-nyaya-cream-dark/60">
            <h2 className="text-sm font-bold text-nyaya-plum mb-2">Complaint Summary</h2>
            <p className="text-sm text-nyaya-text-secondary leading-relaxed">{caseData.summary}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-6 sm:p-8 shadow-warm">
        <div className="flex items-center gap-2 mb-5">
          <Calendar className="w-5 h-5 text-nyaya-orange" />
          <h2 className="text-lg font-serif font-bold text-nyaya-plum">Known Events</h2>
        </div>
        {timeline.length > 0 ? (
          <div className="space-y-4">
            {timeline.map(([label, date]) => (
              <div key={label} className="flex gap-3 items-start">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-nyaya-orange shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-nyaya-plum">{label}</div>
                  <div className="text-xs text-slate-500 mt-1">{String(date)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No dates were identified in the submitted complaint.</p>
        )}
      </div>

      {!!caseData.missing_information?.length && (
        <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-warm">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold text-nyaya-plum">Information still needed</h2>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            {caseData.missing_information.map((item, index) => (
              <li key={index}>{String(item)}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onNavigateToIntake}
          className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-nyaya-plum"
        >
          Edit complaint
        </button>
        <button
          onClick={onNavigateToEvidence}
          className="inline-flex items-center px-4 py-3 rounded-xl bg-nyaya-orange text-white text-xs font-semibold"
        >
          <ShieldCheck className="w-4 h-4 mr-2" />
          Evidence checklist
        </button>
      </div>

      <p className="text-xs text-slate-500">
        Processing mode: {caseData.processing_mode || 'Not specified'}. This AI-generated summary is for information only and is not legal advice. Verify all facts and legal requirements independently.
      </p>
    </div>
  );
};
