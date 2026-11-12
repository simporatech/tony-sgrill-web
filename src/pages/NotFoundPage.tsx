import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, UtensilsCrossed, Flame, MessageCircle, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#080809] text-zinc-100 flex flex-col justify-between selection:bg-[#D90302] selection:text-white relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D90302]/10 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-[#EBFA00]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Top minimal bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Tony's Grill"
            className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(217,3,2,0.4)] group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <Link
          to="/"
          className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 text-[#D90302] group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Regresar al Restaurante</span>
        </Link>
      </header>

      {/* Main Error Content */}
      <main className="w-full max-w-3xl mx-auto px-6 py-12 flex flex-col items-center text-center relative z-10 my-auto">
        
        {/* Floating Brand Flame Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181b]/80 border border-white/10 backdrop-blur-md mb-8 shadow-xl"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          >
            <Flame className="w-4 h-4 text-[#D90302]" />
          </motion.div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#EBFA00]">
            Error 404 • Mesa No Encontrada
          </span>
        </motion.div>

        {/* Elegant Luxury 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 select-none"
        >
          <span 
            className="font-serif text-[110px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 block filter drop-shadow-[0_15px_35px_rgba(217,3,2,0.35)]"
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <span className="font-serif text-[130px] sm:text-[190px] md:text-[230px] font-black text-[#D90302] blur-xl">
              404
            </span>
          </div>
        </motion.div>

        {/* Headline & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 max-w-xl mx-auto"
        >
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Parece que te has alejado <br className="hidden sm:block" />
            de las <span className="text-[#D90302] italic">brasas</span>.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            El platillo o enlace que buscas no se encuentra en esta ubicación.
            Nuestras brasas y parrillas continúan encendidas con los mejores cortes de Chiquimula.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <Link
            to="/"
            style={{ backgroundColor: '#D90302' }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#D90302]/30 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>

          <Link
            to="/menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs uppercase tracking-wider border border-white/15 hover:border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#EBFA00]" />
            <span>Ver Menú Completo</span>
          </Link>
        </motion.div>

      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 relative z-10">
        <p className="font-serif">
          Tony's Grill &copy; {new Date().getFullYear()} — Chiquimula, Guatemala
        </p>

        <div className="flex items-center gap-6">
          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#D90302]" />
            <span>{RESTAURANT_INFO.phone}</span>
          </a>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20tengo%20una%20consulta`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#03AF45] transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#03AF45]" />
            <span>WhatsApp Directo</span>
          </a>
        </div>
      </footer>

    </div>
  );
};

