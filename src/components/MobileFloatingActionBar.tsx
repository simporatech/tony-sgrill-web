import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useCallModal } from '../context/CallModalContext';
import { WHATSAPP_INQUIRY_TEXT } from '../data/menuData';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const MobileFloatingActionBar: React.FC = () => {
  const { openCallModal } = useCallModal();
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(WHATSAPP_INQUIRY_TEXT)}`;

  return (
    <>
      {/* Mobile-First Bottom Fixed Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0c0c0e]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2.5 max-w-lg mx-auto">
          {/* Primary Conversion Metric: Phone Call */}
          <button
            type="button"
            onClick={() => openCallModal()}
            style={{ backgroundColor: '#D90302' }}
            className="flex-1 py-3.5 px-5 rounded-full hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D90302]/30 active:scale-[0.98] cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#EBFA00]" />
            <span>Llamar para Ordenar</span>
          </button>

          {/* Secondary Inquiry Channel: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consulta sobre el menú por WhatsApp"
            title="Consulta sobre el menú"
            className="shrink-0 py-3.5 px-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-zinc-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#03AF45]" />
            <span className="text-[11px]">Consulta</span>
          </a>
        </div>
      </div>

      {/* Desktop Floating Action Pill */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 rounded-full bg-[#141416]/90 hover:bg-[#1c1c20] backdrop-blur-xl text-zinc-300 hover:text-white border border-white/15 text-xs font-medium transition-all flex items-center gap-2 shadow-xl"
          title="Consulta sobre el menú por WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-[#03AF45]" />
          <span>Consulta Menú</span>
        </a>

        <button
          type="button"
          onClick={() => openCallModal()}
          style={{ backgroundColor: '#D90302' }}
          className="group relative flex items-center gap-2.5 px-5 py-3.5 hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-2xl shadow-[#D90302]/35 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          title="Llamar para ordenar por teléfono"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EBFA00]"></span>
          </span>
          <Phone className="w-4 h-4 text-[#EBFA00]" />
          <span>Llamar para Ordenar</span>
        </button>
      </div>
    </>
  );
};
