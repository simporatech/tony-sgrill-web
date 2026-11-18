import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { PdfMenuPage } from './pages/PdfMenuPage';
import { WebMenuPage } from './pages/WebMenuPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { DataErrorBoundary } from './components/DataErrorBoundary';
import { CallOrderModal } from './components/CallOrderModal';
import { MobileFloatingActionBar } from './components/MobileFloatingActionBar';
import { RouteSeoManager } from './components/RouteSeoManager';
import { CallModalProvider } from './context/CallModalContext';

function AppContent() {
  const location = useLocation();

  const isLandingPage = location.pathname === '/';
  const isExplicitMaintenanceRoute =
    location.pathname === '/mantenimiento' || location.pathname === '/maintenance';

  if (isExplicitMaintenanceRoute) {
    return <MaintenancePage />;
  }

  return (
    <>
      <RouteSeoManager />

      <div className="min-h-screen bg-[#080808] text-zinc-100 flex flex-col font-sans selection:bg-[#D90302] selection:text-white pb-20 md:pb-0">
        <Navbar />

        <main className="flex-grow">
          <DataErrorBoundary>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/menu-pdf" element={<PdfMenuPage />} />
              <Route path="/menu" element={<WebMenuPage />} />
              <Route path="/terminos-y-condiciones" element={<TermsPage />} />
              <Route path="/politicas-de-privacidad" element={<PrivacyPage />} />
              <Route path="/mantenimiento" element={<MaintenancePage />} />
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </DataErrorBoundary>
        </main>

        {!isLandingPage && <Footer />}

        <MobileFloatingActionBar />
        <CallOrderModal />
      </div>
    </>
  );
}

export function App() {
  return (
    <CallModalProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CallModalProvider>
  );
}

export default App;
