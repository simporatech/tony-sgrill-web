import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, ChevronDown, Utensils, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservationModal?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section 
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808] pt-20 pb-16"
    >
      {/* Background Image with Dark Vignette & Parallax feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="Tony's Grill Cortes a la Brasa"
          className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.15] scale-105 animate-pulse-glow"
        />
        {/* Gradients to guarantee high-contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#080808_95%)]" />
        {/* Subtle ember glow points */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D90302]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[250px] bg-[#EBFA00]/10 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6 sm:mb-8"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EBFA00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D90302]"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-zinc-300">
            Chiquimula, Guatemala
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-xs sm:text-sm font-bold text-[#EBFA00] flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-[#EBFA00]" /> El Rey del Carbón
          </span>
        </motion.div>

        {/* High-Impact Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-4xl"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08] drop-shadow-2xl">
            LOS MEJORES <br />
            <span className="gold-gradient-text relative inline-block">
              CORTES A LA PARRILLA
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D90302] to-transparent opacity-80"></span>
            </span>
            <br />
            <span className="text-white text-3xl sm:text-5xl md:text-6xl font-light italic font-serif">
              EN CHIQUIMULA
            </span>
          </h1>
        </motion.div>

        {/* Subtitle / Value Prop */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 sm:mt-8 text-base sm:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed text-balance"
        >
          Bienvenido a <strong className="text-white font-semibold">Tony's Grill</strong>. 
          Donde la brasa ardiente se encuentra con carnes maduradas de calidad mundial, 
          pizzas rústicas, pastas frescas y la hospitalidad cálida que tu familia merece.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* CTA: Ver Menú */}
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm uppercase tracking-wider border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md group shadow-xl"
          >
            <Utensils className="w-4 h-4 text-[#EBFA00] group-hover:scale-110 transition-transform" />
            <span>Ver Menú Completo</span>
          </a>

          {/* CTA: Reservar */}
          <a
            href="#reservar"
            className="w-full sm:w-auto relative group overflow-hidden rounded-xl p-[2px] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-[#D90302]/40"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#D90302] via-[#EBFA00] to-[#D90302] animate-pulse" />
            <div className="relative px-8 py-4 rounded-[10px] bg-[#D90302] group-hover:bg-[#b50201] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-colors">
              <Calendar className="w-4 h-4 text-[#EBFA00]" />
              <span>Reservar una Mesa</span>
            </div>
          </a>
        </motion.div>

        {/* Floating Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl"
        >
          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 text-[#EBFA00] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#EBFA00]" />
              ))}
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">4.9 / 5.0</span>
            <span className="text-[11px] text-zinc-400 font-medium">Google Reviews</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center">
            <ShieldCheck className="w-5 h-5 text-[#D90302] mb-1" />
            <span className="text-lg sm:text-xl font-bold text-white">100% Angus</span>
            <span className="text-[11px] text-zinc-400 font-medium">Cortes Certificados</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-[#EBFA00] mb-1" />
            <span className="text-lg sm:text-xl font-bold text-white">Carbón & Leña</span>
            <span className="text-[11px] text-zinc-400 font-medium">Fuego Auténtico</span>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center">
            <MapPin className="w-5 h-5 text-[#03AF45] mb-1" />
            <span className="text-lg sm:text-xl font-bold text-white">Chiquimula</span>
            <span className="text-[11px] text-zinc-400 font-medium">Zona 6 Las Lomas</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-10 sm:mt-12 hidden md:flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => {
            document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">Descubre Más</span>
          <ChevronDown className="w-4 h-4 text-[#EBFA00]" />
        </motion.div>

      </div>
    </section>
  );
};

