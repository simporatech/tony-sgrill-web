import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Printer, Sparkles, Flame, Check } from 'lucide-react';
import { FEATURED_DISHES, RESTAURANT_INFO } from '../data/restaurantData';

interface PdfMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfMenuModal: React.FC<PdfMenuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#111113] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#D90302]/20 text-[#EBFA00]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  Menú Digital Oficial • Tony's Grill
                </h3>
                <p className="text-xs text-zinc-400">Edición 2026 • Chiquimula, Guatemala</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 rounded-lg border border-white/10 transition-colors"
                title="Imprimir Menú"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>

              <a
                href="#menu"
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white rounded-lg transition-colors shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar PDF</span>
              </a>

              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors ml-2"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body Simulation */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 bg-[#0d0d0f]">
            {/* Cover of PDF */}
            <div className="text-center py-6 border-b border-white/10">
              <img 
                src="/logo.png" 
                alt="Tony's Grill" 
                className="h-16 w-auto object-contain mx-auto mb-3 filter drop-shadow-[0_2px_10px_rgba(217,3,2,0.4)]"
              />
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-widest uppercase">
                TONY'S <span className="text-[#D90302]">GRILL</span>
              </h2>
              <p className="text-xs text-[#EBFA00] font-semibold tracking-widest uppercase mt-1">
                Cortes de Carne • Pizzas • Pastas • Hamburguesas • Desayunos
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                {RESTAURANT_INFO.shortAddress} • Tel: {RESTAURANT_INFO.phone}
              </p>
            </div>

            {/* Simulated Menu Sections in PDF Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FEATURED_DISHES.map((dish) => (
                <div 
                  key={dish.id} 
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex gap-4 items-start"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-bold text-white">
                        {dish.name}
                      </h4>
                      <span className="text-xs font-black text-[#EBFA00] shrink-0">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      {dish.description}
                    </p>
                    {dish.tag && (
                      <span className="inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded bg-[#D90302]/30 text-[#EBFA00]">
                        {dish.tag}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Note at the bottom */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <p className="text-xs text-zinc-300 font-medium">
                * Precios en Quetzales (Q). Precios incluyen IVA. Servicio del 10% sugerido.
              </p>
              <p className="text-[11px] text-zinc-500 mt-1">
                Consulte con su anfitrión sobre opciones para personas con requerimientos dietéticos especiales.
              </p>
            </div>
          </div>

          {/* Footer of modal */}
          <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
            <span className="text-xs text-zinc-400">
              ¿Listo para ordenar? Haz tu reservación o visítanos hoy.
            </span>
            <a
              href="#reservar"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white uppercase tracking-wider transition-colors"
            >
              Reservar Mesa
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

