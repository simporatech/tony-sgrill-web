import React from 'react';
import { Beef, Pizza, UtensilsCrossed, Sandwich, Coffee } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const specialties = [
    {
      title: 'Cortes a la Parrilla',
      icon: Beef,
      desc: 'Cortes selectos asados a las brasas de carbón y leña.',
    },
    {
      title: 'Pizzas Artesanales',
      icon: Pizza,
      desc: 'Masa fermentada lentamente y horneada a la piedra.',
    },
    {
      title: 'Pastas Frescas',
      icon: UtensilsCrossed,
      desc: 'Elaboradas en casa con recetas tradicionales.',
    },
    {
      title: 'Hamburguesas',
      icon: Sandwich,
      desc: 'Blend propio de carne selecta en pan brioche.',
    },
    {
      title: 'Desayunos Tradicionales',
      icon: Coffee,
      desc: 'Auténtico sabor regional servido desde las 7:00 AM.',
    },
  ];

  return (
    <section 
      id="nosotros" 
      className="relative min-h-screen lg:h-screen snap-start flex items-center justify-center bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-center">
        
        {/* Header with High Negative Space */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block mb-3">
            Nuestra Casa
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Restaurante familiar de referencia en <span className="text-[#D90302]">Chiquimula</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            Especializado en cortes de carne a la parrilla, pizzas artesanales, pastas, hamburguesas y desayunos tradicionales.
          </p>
        </div>

        {/* Minimal Grid - 5 Clean Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {specialties.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[#121212] border border-white/[0.06] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center mb-4 text-[#D90302]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle Bottom Link */}
        <div className="mt-10 sm:mt-12 flex items-center justify-between border-t border-white/[0.06] pt-6">
          <span className="text-xs text-zinc-500 font-light">
            Ambiente acogedor para disfrutar en familia
          </span>
          <a
            href="/menu"
            className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            Explorar Menú Completo →
          </a>
        </div>

      </div>
    </section>
  );
};
