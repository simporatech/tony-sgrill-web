import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { PromosPage } from './pages/PromosPage';
import { PdfMenuPage } from './pages/PdfMenuPage';
import { WebMenuPage } from './pages/WebMenuPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { BrandLoadingScreen } from './components/BrandLoadingScreen';
import { DataErrorBoundary } from './components/DataErrorBoundary';
import { CallOrderModal } from './components/CallOrderModal';
import { MobileFloatingActionBar } from './components/MobileFloatingActionBar';
import { RouteSeoManager } from './components/RouteSeoManager';
import { CmsProvider, useCmsData } from './context/CmsContext';
import { CallModalProvider } from './context/CallModalContext';

function AppContent() {
  const location = useLocation();
  const { isMaintenanceMode, isInitialLoading } = useCmsData();

  const isLandingPage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isExplicitMaintenanceRoute = location.pathname === '/mantenimiento' || location.pathname === '/maintenance';

  // 503 Maintenance Mode: Disables public navigation when active
  if ((isMaintenanceMode && !isAdminPage) || isExplicitMaintenanceRoute) {
    return <MaintenancePage />;
  }

  return (
    <>
      <RouteSeoManager />

      {/* Smooth Brand Loading Screen: Only the logo, prevents layout flicker while Supabase loads */}
      <AnimatePresence>
        {isInitialLoading && !isAdminPage && <BrandLoadingScreen />}
      </AnimatePresence>

      <div
        className={`min-h-screen bg-[#080808] text-zinc-100 flex flex-col font-sans selection:bg-[#D90302] selection:text-white ${
          !isAdminPage ? 'pb-20 md:pb-0' : ''
        }`}
      >
        {/* Persistent Navbar (hidden on admin page for focused layout) */}
        {!isAdminPage && <Navbar />}

        {/* Dynamic Pages / Routes protected by Global Data Error Boundary */}
        <main className="flex-grow">
          <DataErrorBoundary>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/promos" element={<PromosPage />} />
              <Route path="/menu-pdf" element={<PdfMenuPage />} />
              <Route path="/menu" element={<WebMenuPage />} />
              <Route path="/terminos-y-condiciones" element={<TermsPage />} />
              <Route path="/politicas-de-privacidad" element={<PrivacyPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/mantenimiento" element={<MaintenancePage />} />
              <Route path="/maintenance" element={<MaintenancePage />} />
              {/* 404 Catch-All Route with luxury branded screen */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </DataErrorBoundary>
        </main>

        {/* Standalone footer on non-landing, non-admin routes */}
        {!isLandingPage && !isAdminPage && <Footer />}

        {/* Mobile-First Floating Action Bar & Desktop Call Conversion Pill */}
        {!isAdminPage && <MobileFloatingActionBar />}

        {/* Global Call Order Modal / Bottom Drawer with 3 Official Lines */}
        <CallOrderModal />
      </div>
    </>
  );
}

export function App() {
  return (
    <CmsProvider>
      <CallModalProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CallModalProvider>
    </CmsProvider>
  );
}

export default App;
