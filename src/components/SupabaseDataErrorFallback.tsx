import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, RefreshCw, Phone, MessageCircle, AlertTriangle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface SupabaseDataErrorFallbackProps {
  onRetry?: () => Promise<void> | void;
  isRetrying?: boolean;
  errorMessage?: string;
  className?: string;
}

export const SupabaseDataErrorFallback: React.FC<SupabaseDataErrorFallbackProps> = ({
  onRetry,
  isRetrying = false,
  errorMessage,
  className = '',
}) => {
  const [internalRetrying, setInternalRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setInternalRetrying(true);
    try {
      await onRetry();
    } finally {
      setTimeout(() => setInternalRetrying(false), 600);
    }
  };

  const loading = isRetrying || internalRetrying;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#121215]/95 border border-[#D90302]/30 shadow-2xl relative overflow-hidden backdrop-blur-xl text-center ${className}`}
    >
      {/* Subtle ember glow in the background */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-72 h-72 bg-[#D90302]/15 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D90302] to-transparent opacity-75" />

      {/* Flame Icon with subtle animation */}
      <div className="relative z-10 flex justify-center mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1a1a1e] border border-white/10 flex items-center justify-center shadow-xl">
          <motion.div
            animate={{ 
              scale: [1, 1.12, 1],
              opacity: [0.85, 1, 0.85]
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <Flame className="w-9 h-9 sm:w-11 sm:h-11 text-[#D90302]" />
          </motion.div>
        </div>
      </div>

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-[10px] font-bold uppercase tracking-widest text-[#EBFA00] mb-4">
        <AlertTriangle className="w-3 h-3 text-[#EBFA00]" />
        <span>Conexión de Datos en Espera</span>
      </div>

      {/* Main Copy requested by user */}
      <div className="relative z-10 space-y-3">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Nuestras parrillas <span className="text-[#D90302] italic">están encendidas</span>
        </h3>

        <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-lg mx-auto">
          No pudimos cargar el menú en este momento, pero nuestras parrillas están encendidas. Llámanos para ordenar.
        </p>

        {errorMessage && (
          <p className="text-[11px] font-mono text-zinc-500 max-w-md mx-auto truncate pt-1">
            Detalle técnico: {errorMessage}
          </p>
        )}
      </div>

      {/* Action CTAs: Reintentar + Llamar + WhatsApp */}
      <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={handleRetry}
            disabled={loading}
            style={{ backgroundColor: '#D90302' }}
            className="w-full sm:w-auto px-6 py-3 rounded-full hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D90302]/30 hover:scale-105 active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Reconectando...' : 'Reintentar'}</span>
          </button>
        )}

        <a
          href={`tel:${RESTAURANT_INFO.phoneRaw}`}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-xs uppercase tracking-wider border border-white/15 hover:border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 text-[#EBFA00]" />
          <span>{RESTAURANT_INFO.phone}</span>
        </a>

        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20deseo%20ordenar%20directamente`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#03AF45] hover:bg-[#029139] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#03AF45]/20 hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white text-[#03AF45]" />
          <span>WhatsApp</span>
        </a>
      </div>
    </motion.div>
  );
};

