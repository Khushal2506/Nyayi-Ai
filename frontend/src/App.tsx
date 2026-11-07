import React, { useState, useEffect } from 'react';
import { LandingPage } from './screens/LandingPage';
import { MainWorkspace } from './screens/MainWorkspace';
import { ToastContainer, ToastMessage } from './components/Toast';
import { fetchHealthStatus } from './services/api';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'workspace'>('landing');
  const [initialTab, setInitialTab] = useState<'overview' | 'intake' | 'evidence' | 'sources' | 'studio'>('overview');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);

  useEffect(() => {
    // Parse URL hash on mount
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['overview', 'intake', 'evidence', 'sources', 'studio', 'workspace'].includes(hash)) {
      setCurrentView('workspace');
      if (['overview', 'intake', 'evidence', 'sources', 'studio'].includes(hash)) {
        setInitialTab(hash as any);
      }
    }

    const handleHashChange = () => {
      const h = window.location.hash.replace('#', '').toLowerCase();
      if (['overview', 'intake', 'evidence', 'sources', 'studio', 'workspace'].includes(h)) {
        setCurrentView('workspace');
        if (['overview', 'intake', 'evidence', 'sources', 'studio'].includes(h)) {
          setInitialTab(h as any);
        }
      } else if (h === '' || h === 'landing') {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Check backend health on initial load
    fetchHealthStatus()
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false));
  }, []);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-nyaya-cream font-sans antialiased text-nyaya-text-primary selection:bg-nyaya-orange selection:text-white">
      {currentView === 'landing' ? (
        <LandingPage 
          onOpenWorkspace={() => {
            window.location.hash = 'overview';
            setCurrentView('workspace');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      ) : (
        <MainWorkspace 
          initialTab={initialTab}
          onBackToLanding={() => {
            window.location.hash = '';
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNotify={addToast}
          backendOnline={backendOnline}
        />
      )}

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default App;
