import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';

interface DocumentStudioScreenProps {
  onNotify: (type: 'success' | 'info' | 'warning', title: string, msg?: string) => void;
}

export const DocumentStudioScreen: React.FC<DocumentStudioScreenProps> = () => {
  return (
    <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-8 sm:p-12 text-center shadow-warm">
      <FileText className="w-12 h-12 mx-auto text-nyaya-orange mb-5" />
      <h1 className="text-2xl font-serif font-bold text-nyaya-plum">
        Legal Document Studio
      </h1>
      <p className="text-sm text-nyaya-text-secondary mt-3 max-w-xl mx-auto">
        Generate a structured consumer complaint draft from verified case facts.
      </p>
      <div className="mt-7 p-5 rounded-xl bg-amber-50 border border-amber-200 text-left max-w-xl mx-auto">
        <div className="flex gap-2 items-center text-amber-800 font-semibold text-sm">
          <AlertCircle className="w-4 h-4" />
          Draft generation not yet connected
        </div>
        <p className="text-sm text-amber-900 mt-2">
          This feature is currently under development. No legal notice or complaint petition has been generated or verified. Please do not rely on sample documents as legal advice.
        </p>
      </div>
    </div>
  );
};
