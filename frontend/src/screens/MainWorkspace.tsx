import React, { useState } from 'react';
import { SummaryScreen } from './SummaryScreen';
import { IntakeScreen } from './IntakeScreen';
import { SourcesScreen } from './SourcesScreen';
import { DocumentStudioScreen } from './DocumentStudioScreen';
import type { IntakeResponse } from '../services/api';
import {
  Scale,
  MessageSquare,
  FileSpreadsheet,
  ShieldCheck,
  BookOpen,
  FileText,
  ArrowLeft,
  Layers
} from 'lucide-react';

export type WorkspaceTab = 'overview' | 'intake' | 'evidence' | 'sources' | 'studio';

interface MainWorkspaceProps {
  initialTab?: WorkspaceTab;
  onBackToLanding: () => void;
  onNotify: (type: 'success' | 'info' | 'warning', title: string, msg?: string) => void;
  backendOnline: boolean;
}

export const MainWorkspace: React.FC<MainWorkspaceProps> = ({
  initialTab = 'overview',
  onBackToLanding,
  onNotify,
  backendOnline
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>(initialTab);
  const [caseData, setCaseData] = useState<IntakeResponse | null>(null);

  const handleTabChange = (tab: WorkspaceTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const navItems = [
    { id: 'overview', label: 'Case Brief & Timeline', icon: FileSpreadsheet, badge: caseData ? 'Created' : 'Empty' },
    { id: 'intake', label: 'Conversational Intake', icon: MessageSquare, badge: 'Interactive' },
    { id: 'evidence', label: 'Evidence Checklist', icon: ShieldCheck, badge: 'Checklist' },
    { id: 'sources', label: 'Statutory Sources', icon: BookOpen, badge: 'CPA 2019' },
    { id: 'studio', label: 'Document Studio', icon: FileText, badge: 'Draft' }
  ];

  const caseLabel = caseData
    ? `${caseData.seller_or_platform || 'Consumer dispute'} — ${caseData.product_or_service || 'New case'}`
    : 'No complaint submitted';

  return (
    <div className="min-h-screen bg-nyaya-cream flex flex-col">
      <header className="sticky top-0 z-40 bg-nyaya-plum text-white border-b border-nyaya-plum-light shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToLanding}
                className="flex items-center gap-1.5 text-xs font-semibold text-nyaya-lavender hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-nyaya-plum-light transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Landing Page</span>
              </button>

              <div className="h-6 w-px bg-nyaya-plum-light" />

              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-nyaya-orange flex items-center justify-center text-white shadow-orange-sm">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-base font-bold font-serif tracking-tight text-white">Nyaya AI</span>
                  <span className="ml-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-nyaya-plum-light text-nyaya-yellow border border-nyaya-plum-muted">
                    Citizen Workspace
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-nyaya-plum-surface px-3 py-1.5 rounded-xl border border-nyaya-plum-light text-xs">
                <Layers className="w-3.5 h-3.5 text-nyaya-orange" />
                <span className="text-slate-400">Case:</span>
                <span className="font-semibold text-white truncate max-w-[240px]">{caseLabel}</span>
              </div>

              <div className="flex items-center space-x-1.5 text-[11px] font-medium bg-nyaya-plum-light px-2.5 py-1 rounded-full border border-nyaya-plum-muted">
                <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className="text-slate-300 hidden sm:inline">
                  {backendOnline ? 'API Connected' : 'API Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-nyaya-plum-dark border-t border-nyaya-plum-light/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id as WorkspaceTab)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-nyaya-orange text-white shadow-orange-sm'
                        : 'text-nyaya-lavender hover:bg-nyaya-plum-light hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-nyaya-plum-light text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <SummaryScreen
            caseData={caseData}
            onNotify={onNotify}
            onNavigateToIntake={() => handleTabChange('intake')}
            onNavigateToEvidence={() => handleTabChange('evidence')}
          />
        )}

        {activeTab === 'intake' && (
          <IntakeScreen
            onNotify={onNotify}
            onCaseExtracted={setCaseData}
            onProceedToSummary={() => handleTabChange('overview')}
          />
        )}

        {activeTab === 'evidence' && (
          <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-8 text-center">
            <h2 className="text-xl font-serif font-bold text-nyaya-plum">Evidence checklist</h2>
            <p className="text-sm text-slate-600 mt-3">Evidence tracking is not yet connected to this complaint. No documents have been verified or uploaded in this workspace.</p>
          </div>
        )}

        {activeTab === 'sources' && (
          <SourcesScreen
            onNotify={onNotify}
            onNavigateToStudio={() => handleTabChange('studio')}
          />
        )}

        {activeTab === 'studio' && (
          <DocumentStudioScreen onNotify={onNotify} />
        )}
      </main>
    </div>
  );
};

