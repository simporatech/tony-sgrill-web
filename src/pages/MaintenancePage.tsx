import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Phone, MessageCircle, MapPin, Clock, ShieldAlert } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface MaintenancePageProps {
  onAdminBypass?: () => void;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = () => {
  return (
    <div className="min-h-screen w-full bg-[#070708] text-zinc-100 flex flex-col justify-between selection:bg-[#D90302] selection:text-white relative overflow-hidden">
      
      {/* Background radial glows and atmospheric embers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D90302]/12 blur-[220px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#EBFA00]/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

      {/* Header bar without active navigation links */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Tony's Grill"
            className="h-12 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(217,3,2,0.4)]"
          />
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Estado 503 • Mantenimiento Activo</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-3xl mx-auto px-6 py-12 flex flex-col items-center text-center relative z-10 my-auto">
        
        {/* Animated Ember Flame Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl relative">
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                filter: [
                  'drop-shadow(0 0 15px rgba(217,3,2,0.5))',
                  'drop-shadow(0 0 25px rgba(235,250,0,0.4))',
                  'drop-shadow(0 0 15px rgba(217,3,2,0.5))'
                ]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <Flame className="w-12 h-12 text-[#D90302]" />
            </motion.div>
            <div className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EBFA00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#EBFA00]"></span>
            </div>
          </div>
        </motion.div>

        {/* Headline requested by client */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#EBFA00] font-semibold block">
            Actualización de Infraestructura
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Estamos encendiendo el carbón. <br />
            <span className="text-[#D90302] italic">Volvemos pronto.</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            Estamos optimizando nuestros sistemas digitales para ofrecerte una experiencia en línea a la altura de nuestros cortes. La navegación web se encuentra temporalmente en pausa mientras finalizamos las mejoras.
          </p>
        </motion.div>

        {/* Live Operational Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 w-full max-w-xl p-5 rounded-2xl bg-[#121215]/80 border border-white/10 backdrop-blur-md shadow-2xl text-left"
        >
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/[0.08]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#03AF45] animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Nuestras instalaciones físicas en Chiquimula continúan abiertas:
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#EBFA00] shrink-0" />
              <span>{RESTAURANT_INFO.schedule}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D90302] shrink-0" />
              <span>{RESTAURANT_INFO.shortAddress}</span>
            </div>
          </div>
        </motion.div>

        {/* Immediate Call / WhatsApp CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20deseo%20ordenar%20mientras%20la%20web%20está%20en%20mantenimiento`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: '#03AF45' }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full hover:bg-[#029139] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#03AF45]/20 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#03AF45]" />
            <span>Ordenar por WhatsApp</span>
          </a>

          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs uppercase tracking-wider border border-white/15 hover:border-white/30 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#D90302]" />
            <span>Llamar al {RESTAURANT_INFO.phone}</span>
          </a>
        </motion.div>

      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 relative z-10">
        <p className="font-serif">
          Tony's Grill &copy; {new Date().getFullYear()} — La Mejor Carne de Chiquimula
        </p>

        <a
          href="/admin"
          className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1 font-mono"
        >
          <ShieldAlert className="w-3 h-3" />
          <span>Acceso Administrativo</span>
        </a>
      </footer>

    </div>
  );
};
