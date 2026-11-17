import React, { useMemo } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { useCmsData } from '../context/CmsContext';
import { SupabaseDataErrorFallback } from './SupabaseDataErrorFallback';

interface MenuSectionProps {
  onOpenPdfMenu: () => void;
  onSelectItemForReservation?: (dishName: string) => void;
}

const CATEGORY_FALLBACK_IMAGES: Record<string, string[]> = {
  'asados-y-carnes': [
    '/images/puyazo-importado.jpg',
    '/images/mar-y-tierra.jpg',
    '/images/churrasquito-res.jpg',
  ],
  'pizzas-y-lasanas': ['/images/promo-lasana.jpg'],
  desayunos: ['/images/promo-desayuno.jpg'],
  sopas: ['/images/costilla-ahumada.jpg'],
  crepas: ['/images/promo-capuchino.jpg'],
};

const SIGNATURE_IDS = ['car-03', 'car-05', 'car-06'];

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenPdfMenu }) => {
  const { data, dataError, isRetrying, refetchData } = useCmsData();

  // Select 3 real signature dishes directly from the active menu (Supabase / CMS)
  const previewDishes = useMemo(() => {
    const items = data.menuItems || [];
    const byId = SIGNATURE_IDS.map((id) => items.find((item) => item.id === id)).filter(
      (item): item is NonNullable<typeof item> => Boolean(item)
    );

    if (byId.length === 3) {
      return byId;
    }

    const carnes = items.filter((item) => item.category_id === 'asados-y-carnes');
    if (carnes.length >= 3) {
      return carnes.slice(0, 3);
    }

    return items.slice(0, 3);
  }, [data.menuItems]);

  const getDishImage = (categoryId: string, index: number) => {
    const pool = CATEGORY_FALLBACK_IMAGES[categoryId] || CATEGORY_FALLBACK_IMAGES['asados-y-carnes'];
    return pool[index % pool.length];
  };

  return (
    <section 
      id="menu" 
      className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block mb-2">
              Nuestra Cocina
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Especialidades de la <span className="text-[#D90302]">Casa</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPdfMenu}
              className="px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#EBFA00]" />
              <span>Menú en PDF</span>
            </button>

            <a
              href="/menu"
              className="px-5 py-2.5 rounded-full bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>Ver Menú Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Minimal Cards or Data Error Fallback */}
        {dataError ? (
          <div className="py-6">
            <SupabaseDataErrorFallback
              onRetry={refetchData}
              isRetrying={isRetrying}
              errorMessage={dataError}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {previewDishes.map((dish, idx) => (
              <div
                key={dish.id}
                className="group rounded-2xl overflow-hidden bg-[#121212] border border-white/[0.06] hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={getDishImage(dish.category_id, idx)}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium block mb-1.5">
                      {dish.category_name}
                    </span>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#EBFA00] transition-colors leading-snug">
                        {dish.name}
                      </h3>
                      <span className="text-sm font-bold text-[#EBFA00] shrink-0 font-serif">
                        Q{Number(dish.price).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <a
                      href="#reservar"
                      className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                    >
                      Reservar mesa para probarlo →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
