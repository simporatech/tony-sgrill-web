import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Clock, Utensils } from 'lucide-react';
import { useCallModal } from '../context/CallModalContext';
import { OFFICIAL_PHONE_LINES } from '../data/menuData';

export const CallOrderModal: React.FC = () => {
  const { isOpen, selectedDish, closeCallModal } = useCallModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCallModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Bottom Drawer (Mobile) / Centered Modal (Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-[#121215] border-t sm:border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8"
          >
            {/* Subtle top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D90302] to-transparent" />

            {/* Mobile pull handle */}
            <div className="w-10 h-1 rounded-full bg-white/15 mx-auto mb-5 sm:hidden" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D90302]/15 border border-[#D90302]/30 text-[10px] font-bold uppercase tracking-widest text-[#EBFA00] mb-2">
                  <Phone className="w-3 h-3 text-[#D90302]" />
                  <span>Pedidos Directos</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                  Llamar para <span className="text-[#D90302]">Ordenar</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-light">
                  Selecciona cualquiera de nuestras líneas oficiales en Chiquimula.
                </p>
              </div>

              <button
                onClick={closeCallModal}
                aria-label="Cerrar modal de llamadas"
                className="p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Dish Reminder (if triggered from a card) */}
            {selectedDish && (
              <div className="mb-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D90302]/20 flex items-center justify-center shrink-0">
                  <Utensils className="w-4 h-4 text-[#EBFA00]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                    Platillo seleccionado
                  </span>
                  <p className="text-sm font-semibold text-white truncate">
                    {selectedDish}
                  </p>
                </div>
              </div>
            )}

            {/* 3 Official Phone Lines */}
            <div className="space-y-3">
              {OFFICIAL_PHONE_LINES.map((line, index) => (
                <a
                  key={line.href}
                  href={line.href}
                  onClick={() => setTimeout(closeCallModal, 300)}
                  className={`group w-full p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    index === 0
                      ? 'bg-[#D90302] hover:bg-[#b80201] border-[#D90302] text-white shadow-lg shadow-[#D90302]/25'
                      : 'bg-[#18181c] hover:bg-[#1f1f24] border-white/10 hover:border-[#D90302]/60 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        index === 0 ? 'bg-black/20' : 'bg-[#D90302]/15 text-[#D90302]'
                      }`}
                    >
                      <Phone className={`w-5 h-5 ${index === 0 ? 'text-[#EBFA00]' : 'text-[#D90302]'}`} />
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest block ${
                          index === 0 ? 'text-white/80' : 'text-zinc-400'
                        }`}
                      >
                        {line.label}
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                        {line.display}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 transition-transform group-hover:scale-105 ${
                      index === 0
                        ? 'bg-white text-[#D90302]'
                        : 'bg-white/10 text-white group-hover:bg-[#D90302]'
                    }`}
                  >
                    Llamar
                  </span>
                </a>
              ))}
            </div>

            {/* Schedule note */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-[#EBFA00]" />
              <span>Atención diaria de 7:00 AM a 9:45 PM • Para llevar o mesa</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
