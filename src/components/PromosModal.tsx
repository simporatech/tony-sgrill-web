import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Sparkles, Calendar, ArrowRight, Percent, Check } from 'lucide-react';
import { PROMOTIONS, RESTAURANT_INFO } from '../data/restaurantData';

interface PromosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPromo?: (promoTitle: string) => void;
}

export const PromosModal: React.FC<PromosModalProps> = ({ isOpen, onClose, onSelectPromo }) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-3xl bg-[#121214] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#D90302] to-[#800000] text-[#EBFA00] shadow-md">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  Promociones & Experiencias Especiales
                </h3>
                <p className="text-xs text-zinc-400">Válidas en Tony's Grill Chiquimula</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Promos List */}
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto bg-[#0d0d0f]">
            {PROMOTIONS.map((promo) => (
              <div
                key={promo.id}
                className="p-5 rounded-2xl glass-card border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D90302] text-white">
                      {promo.badge}
                    </span>
                    <span className="text-xs font-bold text-[#EBFA00]">
                      {promo.validity}
                    </span>
                  </div>

                  <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#EBFA00] transition-colors">
                    {promo.title}
                  </h4>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    {promo.description}
                  </p>
                  <p className="text-[11px] text-zinc-400 italic">
                    {promo.subtitle}
                  </p>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                  <span className="text-lg font-black text-[#EBFA00] px-3 py-1 bg-white/5 rounded-xl border border-white/10">
                    {promo.discount}
                  </span>

                  <a
                    href="#reservar"
                    onClick={() => {
                      if (onSelectPromo) onSelectPromo(promo.title);
                      onClose();
                    }}
                    className="px-4 py-2 bg-[#D90302] hover:bg-[#b00201] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-[#D90302]/30 cursor-pointer"
                  >
                    <span>Aprovechar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400">
            <span>* Aplican restricciones. No acumulable con otros descuentos.</span>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20tengo%20una%20duda%20sobre%20sus%20promociones`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#03AF45] font-bold hover:underline"
            >
              Preguntar por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

