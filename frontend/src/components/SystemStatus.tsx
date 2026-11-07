import React, { useEffect, useState } from 'react';
import { fetchHealthStatus, HealthStatus } from '../services/api';
import { Activity, RefreshCw, CheckCircle2, AlertCircle, Cpu, Database, Server } from 'lucide-react';

export const SystemStatus: React.FC = () => {
  const [status, setStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHealthStatus();
      setStatus(data);
      setLastChecked(new Date());
    } catch (err: any) {
      setError(err.message || 'Unable to connect to FastAPI backend');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <section className="py-16 bg-nyaya-cream border-t border-nyaya-cream-dark" id="system-status">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-6 sm:p-8 shadow-warm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-nyaya-orange" />
                <h3 className="text-xl font-bold font-serif text-nyaya-plum">
                  Backend Service Diagnostics
                </h3>
              </div>
              <p className="text-xs text-nyaya-text-secondary mt-1">
                Live verification of FastAPI backend connectivity and runtime settings.
              </p>
            </div>

            <button
              onClick={checkHealth}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-nyaya-plum bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-2 text-nyaya-orange ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Probing...' : 'Recheck Status'}
            </button>
          </div>

          {/* Status Display */}
          {loading && !status && !error && (
            <div className="py-8 text-center text-sm text-slate-500">
              Probing FastAPI health endpoint (<code className="bg-slate-100 px-1 py-0.5 rounded">/api/health</code>)...
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-amber-950">Backend Offline (Simulation Mode)</strong>
                <p className="mt-1 text-xs text-amber-800">{error}</p>
                <div className="mt-3 text-xs bg-white/80 p-2.5 rounded border border-amber-200 font-mono text-slate-700">
                  Run: <span className="font-semibold text-nyaya-plum">cd backend && uvicorn app.main:app --reload --port 8000</span>
                </div>
              </div>
            </div>
          )}

          {status && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-nyaya-cream-light border border-nyaya-cream-dark flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Service Status</span>
                  <Server className="w-4 h-4 text-slate-400" />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold capitalize text-emerald-800">
                    {status.status}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1">
                  v{status.version} ({status.environment})
                </span>
              </div>

              <div className="p-4 rounded-xl bg-nyaya-cream-light border border-nyaya-cream-dark flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">LLM Engine</span>
                  <Cpu className="w-4 h-4 text-slate-400" />
                </div>
                <div className="mt-2">
                  <span className="text-sm font-semibold text-nyaya-plum uppercase tracking-wider">
                    {status.details?.llm_provider || 'Mock'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1">Gemini swappable layer</span>
              </div>

              <div className="p-4 rounded-xl bg-nyaya-cream-light border border-nyaya-cream-dark flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Vector Store</span>
                  <Database className="w-4 h-4 text-slate-400" />
                </div>
                <div className="mt-2">
                  <span className="text-sm font-semibold text-nyaya-plum uppercase tracking-wider">
                    ChromaDB
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1">Local persistent vector DB</span>
              </div>

              <div className="p-4 rounded-xl bg-nyaya-cream-light border border-nyaya-cream-dark flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Last Verified</span>
                  <Activity className="w-4 h-4 text-slate-400" />
                </div>
                <div className="mt-2">
                  <span className="text-xs font-medium text-slate-700">
                    {lastChecked ? lastChecked.toLocaleTimeString() : 'Just now'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1">
                  {status.app_name}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
