import React from 'react';
import { Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-nyaya-navy text-slate-300 py-12 border-t border-nyaya-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-nyaya-navy-light flex items-center justify-center text-amber-300 border border-slate-700">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-bold text-white font-serif">Nyaya AI</span>
              <p className="text-xs text-slate-400">
                Civic Legal Assistance Platform for Indian Consumers
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs text-slate-400">
              Milestone 1 — Initial Project Foundation
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Engineered with FastAPI, React, TypeScript, and Grounded Legal AI principles.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
