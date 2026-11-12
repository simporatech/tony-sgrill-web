import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const EventsSection: React.FC = () => {
  return (
    <section 
      id="eventos"
      className="relative h-screen min-h-screen snap-start flex items-center justify-center bg-[#080808] text-white px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Editorial Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block mb-4">
            Banquetes & Ocasiones
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Servicio de banquetes y eventos especiales con <span className="text-[#D90302]">menú personalizado</span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Ofrecemos atención integral para sus eventos y banquetes. Diseñamos propuestas gastronómicas a la medida de su ocasión, con la calidad, el sabor y la hospitalidad que nos distingue en Chiquimula.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent("Hola Tony's Grill, deseo solicitar información sobre el servicio de banquetes y eventos especiales con menú personalizado.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#D90302] hover:bg-[#b00201] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#D90302]/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Cotizar Evento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>Tel: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Right Clean Visual Block */}
        <div className="lg:col-span-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl h-[340px] sm:h-[420px] bg-[#121212]"
          >
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Servicio de banquetes Tony's Grill"
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
              <p className="text-white font-serif font-bold text-sm">Menú a la Medida de su Evento</p>
              <p className="text-xs text-zinc-400 mt-0.5">Asesoría directa y atención personalizada</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
