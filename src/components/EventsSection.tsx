import React from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { useCmsData } from '../context/CmsContext';

export const EventsSection: React.FC = () => {
  const { data } = useCmsData();
  const events = data.events;
  const contact = data.contact;

  return (
    <section 
      id="eventos" 
      className="relative min-h-screen flex items-center justify-center bg-[#080808] text-white px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Editorial Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block mb-4">
            {events.eyebrow}
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {events.title} <span className="text-[#D90302]">{events.titleAccent}</span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            {events.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={`https://wa.me/${contact.whatsappRaw}?text=${encodeURIComponent("Hola Tony's Grill, deseo solicitar información sobre el servicio de banquetes y eventos especiales con menú personalizado.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#D90302] hover:bg-[#b00201] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#D90302]/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Cotizar Evento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${contact.phoneRaw}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>Tel: {contact.phone}</span>
            </a>
          </div>
        </div>

        {/* Right Clean Visual Block */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl h-[340px] sm:h-[420px] bg-[#121212]">
            <img
              src={events.imageUrl}
              alt="Servicio de banquetes Tony's Grill"
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
              <p className="text-white font-serif font-bold text-sm">{events.cardTitle}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{events.cardSubtitle}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
