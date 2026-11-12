import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Instagram, 
  Facebook, 
  ArrowUp, 
  MapPin, 
  Phone, 
  Clock
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-20 pb-12 border-t border-white/10 overflow-hidden">
      
      {/* Glow elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-b from-[#D90302]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <img 
                src="/logo.png" 
                alt="Tony's Grill" 
                className="h-12 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(217,3,2,0.4)] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-2xl font-black text-white uppercase leading-none">
                  TONY'S <span className="text-[#D90302]">GRILL</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-medium uppercase mt-1">
                  Chiquimula • Est. Grill
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Restaurante familiar de referencia en Chiquimula. Cortes de carne madurados a la brasa, pizzas a la leña, pastas artesanales, hamburguesas gourmet y banquetes para ocasiones inolvidables.
            </p>

            {/* Social links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#D90302] border border-white/10 text-white transition-all hover:scale-105 group"
                aria-label="Instagram Tony's Grill"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#1877F2] border border-white/10 text-white transition-all hover:scale-105 group"
                aria-label="Facebook Tony's Grill"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#03AF45] border border-white/10 text-white transition-all hover:scale-105 group"
                aria-label="WhatsApp Tony's Grill"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            
            <div className="text-xs text-zinc-500 pt-1 space-y-1">
              <p>Instagram: <a href={RESTAURANT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-[#EBFA00]">{RESTAURANT_INFO.instagram}</a></p>
              <p>Facebook: <a href={RESTAURANT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-[#EBFA00]">{RESTAURANT_INFO.facebook}</a></p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/promos" className="hover:text-[#EBFA00] transition-colors">
                  Promociones Activas
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Menú Web (Sin fotos)
                </Link>
              </li>
              <li>
                <Link to="/menu-pdf" className="hover:text-[#EBFA00] transition-colors">
                  Menú Digital (PDF)
                </Link>
              </li>
              <li>
                <a href="/#nosotros" className="hover:text-white transition-colors">Nosotros</a>
              </li>
              <li>
                <a href="/#eventos" className="hover:text-white transition-colors">Eventos & Banquetes</a>
              </li>
              <li>
                <a href="/#reservar" className="hover:text-white transition-colors">Reservar Mesa</a>
              </li>
              <li>
                <a href="/#contacto" className="hover:text-white transition-colors">Ubicación</a>
              </li>
              <li>
                <Link to="/admin" className="text-zinc-500 hover:text-[#EBFA00] transition-colors flex items-center gap-1 pt-1 font-mono text-[11px]">
                  <span>⚙ Panel CMS</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D90302]" />
                <span>Cortes Tomahawk, Ribeye & Picaña</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EBFA00]" />
                <span>Pizzas Artesanales al Horno de Leña</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#03AF45]" />
                <span>Pastas Frescas & Salsas Caseras</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D90302]" />
                <span>Hamburguesas Angus en Pan Brioche</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EBFA00]" />
                <span>Desayunos Típicos desde las 7:00 AM</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#03AF45]" />
                <span>Servicio VIP de Banquetes y Eventos</span>
              </li>
            </ul>
          </div>

          {/* Location & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Visítanos
            </h4>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D90302] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {RESTAURANT_INFO.address}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#03AF45] shrink-0" />
                <p>Tel: {RESTAURANT_INFO.phone} | WA: {RESTAURANT_INFO.whatsapp}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#EBFA00] shrink-0" />
                <p>{RESTAURANT_INFO.schedule}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Volver Arriba</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {RESTAURANT_INFO.domain}. Todos los derechos reservados.</p>
            <span className="hidden sm:inline">•</span>
            <p className="text-[11px] text-zinc-500">
              Hecho por{' '}
              <a
                href="https://simpora.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-[#EBFA00] transition-colors underline decoration-zinc-700 underline-offset-2 font-medium"
              >
                SIMPORA
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/politicas-de-privacidad" className="hover:text-zinc-300 transition-colors">
              Políticas de Privacidad
            </Link>
            <span>•</span>
            <Link to="/terminos-y-condiciones" className="hover:text-zinc-300 transition-colors">
              Términos y Condiciones
            </Link>
            <span>•</span>
            <span className="text-[#EBFA00]">Chiquimula, GT</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
