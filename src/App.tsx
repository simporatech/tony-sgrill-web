import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { PromosPage } from './pages/PromosPage';
import { PdfMenuPage } from './pages/PdfMenuPage';
import { WebMenuPage } from './pages/WebMenuPage';
import { MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from './data/restaurantData';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 flex flex-col font-sans selection:bg-[#D90302] selection:text-white">
      {/* Persistent Navbar */}
      <Navbar />

      {/* Dynamic Pages / Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/promos" element={<PromosPage />} />
          <Route path="/menu-pdf" element={<PdfMenuPage />} />
          <Route path="/menu" element={<WebMenuPage />} />
        </Routes>
      </main>

      {/* Render standalone footer only on non-landing routes */}
      {!isLandingPage && <Footer />}

      {/* Floating Quick WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20deseo%20hacer%20una%20consulta`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#03AF45] hover:bg-[#029139] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          title="Habla directo con nosotros por WhatsApp"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EBFA00]"></span>
          </span>
          <MessageCircle className="w-5 h-5 fill-white text-[#03AF45]" />
          <span className="hidden sm:inline">WhatsApp Tony's</span>
        </a>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
