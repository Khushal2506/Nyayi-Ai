import React from 'react';
import { Scale, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Emblem */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-nyaya-navy flex items-center justify-center text-white shadow-sm">
              <Scale className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-nyaya-navy font-serif">
                  Nyaya AI
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Consumer Law
                </span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                Legal Intelligence Platform
              </p>
            </div>
          </div>

          {/* Right Info / Trust badge */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center text-xs text-slate-600 space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Grounded in Indian Statutes</span>
            </div>
            <a
              href="#system-status"
              className="text-xs font-medium text-slate-600 hover:text-nyaya-navy transition-colors"
            >
              System Health
            </a>
            <a
              href="#architecture"
              className="text-xs font-medium text-slate-600 hover:text-nyaya-navy transition-colors"
            >
              Architecture
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
