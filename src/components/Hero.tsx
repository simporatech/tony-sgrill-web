import React from 'react';
import { Utensils, Calendar } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section 
      id="inicio"
      className="relative min-h-screen lg:h-screen snap-start flex items-center justify-center overflow-hidden bg-[#080808] px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image with Dark Minimal Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"
          alt="Tony's Grill Cortes a la Brasa"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Main Headline */}
        <div>
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-zinc-400 mb-4 block">
            Chiquimula, Guatemala
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
            LOS MEJORES CORTES <br />
            <span className="text-[#D90302]">A LA PARRILLA</span> <br />
            <span className="font-serif italic font-light text-3xl sm:text-5xl md:text-6xl text-zinc-200">
              EN CHIQUIMULA
            </span>
          </h1>
        </div>

        {/* Grounded & Elegant Subheadline */}
        <p className="mt-6 sm:mt-8 text-sm sm:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed text-balance">
          Restaurante familiar de referencia en Chiquimula, especializado en cortes de carne a la parrilla, pizzas artesanales, pastas, hamburguesas y desayunos tradicionales.
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="/menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <Utensils className="w-4 h-4 text-[#EBFA00]" />
            <span>Ver Menú</span>
          </a>

          <a
            href="#reservar"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#D90302]/30"
          >
            <Calendar className="w-4 h-4" />
            <span>Reservar</span>
          </a>
        </div>

      </div>
    </section>
  );
};
