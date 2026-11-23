import React from 'react';
import { Link } from 'react-router-dom';
import { Beef, Pizza, Sandwich, Coffee, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { SITE_CONTENT } from '../data/restaurantData';

const QUICK_CATEGORY_LINKS = [
  { label: 'Cortes a la Parrilla', to: '/menu?categoria=asados-y-carnes', icon: Beef },
  { label: 'Pizzas & Pastas', to: '/menu?categoria=pizzas-y-lasanas', icon: Pizza },
  { label: 'Burgers & Antojitos', to: '/menu?categoria=antojitos-y-cenas', icon: Sandwich },
  { label: 'Desayunos (7–11 AM)', to: '/menu?categoria=desayunos', icon: Coffee },
  { label: 'Mariscos & Sopas', to: '/menu?categoria=mariscos-y-sopas', icon: UtensilsCrossed },
];

export const AboutSection: React.FC = () => {
  const about = SITE_CONTENT.about;

  return (
    <section
      id="nosotros"
      className="relative bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-t border-white/[0.05]"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Concise Brand Story */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block mb-3">
            {about.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {about.title} <span className="text-[#D90302]">{about.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            {about.description}
          </p>
        </div>

        {/* Functional Category Jump Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {QUICK_CATEGORY_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#121212] hover:bg-[#1a1a1f] border border-white/15 hover:border-[#D90302]/70 text-xs sm:text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Icon className="w-4 h-4 text-[#D90302]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Direct CTA Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
          <span className="text-xs text-zinc-500 font-light">
            Ambiente acogedor para disfrutar en familia en Chiquimula
          </span>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D90302] hover:bg-[#b00201] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#D90302]/25 self-start sm:self-auto"
          >
            <span>Explorar Menú Completo</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EBFA00]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
