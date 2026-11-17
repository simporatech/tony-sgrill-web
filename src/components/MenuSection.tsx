import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  FileText,
  ExternalLink,
  Sparkles,
  Utensils,
  X,
  Download,
} from 'lucide-react';
import {
  menuData,
  MENU_FILTER_CATEGORIES,
  OFFICIAL_EXTERNAL_MENU_URL,
  MenuDataItem,
} from '../data/menuData';
import { useCallModal } from '../context/CallModalContext';
import { useCmsData } from '../context/CmsContext';
import { SupabaseDataErrorFallback } from './SupabaseDataErrorFallback';

interface MenuSectionProps {
  onOpenPdfMenu?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = () => {
  const { openCallModal } = useCallModal();
  const { dataError, isRetrying, refetchData } = useCmsData();

  const [activeTab, setActiveTab] = useState<'interactive' | 'pdf'>('interactive');
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('todos');
  const [isDeepLinked, setIsDeepLinked] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Requirement 2: AI Agent Deep Linking (?categoria=<slug>)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const categoriaParam = params.get('categoria')?.trim().toLowerCase();

    if (categoriaParam) {
      const matched = MENU_FILTER_CATEGORIES.find(
        (c) => c.slug.toLowerCase() === categoriaParam
      );

      if (matched) {
        setActiveCategorySlug(matched.slug);
        setActiveTab('interactive');
        setIsDeepLinked(matched.slug !== 'todos');

        // Smooth scroll directly to the Menu section wrapper after initial layout
        const timer = setTimeout(() => {
          const el = sectionRef.current || document.getElementById('menu');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 180);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleSelectCategory = (slug: string) => {
    setActiveCategorySlug(slug);
    setIsDeepLinked(false);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (slug === 'todos') {
        url.searchParams.delete('categoria');
      } else {
        url.searchParams.set('categoria', slug);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleClearFilter = () => {
    setActiveCategorySlug('todos');
    setIsDeepLinked(false);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('categoria');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const activeCategoryLabel = useMemo(() => {
    return (
      MENU_FILTER_CATEGORIES.find((c) => c.slug === activeCategorySlug)?.label ||
      'Todos'
    );
  }, [activeCategorySlug]);

  const filteredItems: MenuDataItem[] = useMemo(() => {
    if (activeCategorySlug === 'todos') return menuData;
    return menuData.filter((item) => item.slugCategoria === activeCategorySlug);
  }, [activeCategorySlug]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header + Official External Link */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#EBFA00] font-semibold block mb-2">
              Nuestra Cocina al Carbón
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Menú <span className="text-[#D90302]">Tony&apos;s Grill</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
              Explora nuestras especialidades y ordena directamente por teléfono con atención inmediata.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Prominent External Link Button: Abrir Menú Oficial */}
            <a
              href={OFFICIAL_EXTERNAL_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-white uppercase tracking-wider border border-white/15 hover:border-[#EBFA00]/60 transition-all flex items-center gap-2 shadow-lg"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#EBFA00]" />
              <span>Abrir Menú Oficial</span>
            </a>
          </div>
        </div>

        {/* Toggle / Tab System: Menú Interactivo vs Ver Menú Original (PDF) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex p-1 rounded-full bg-[#141416] border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'interactive'
                  ? 'bg-[#D90302] text-white shadow-md shadow-[#D90302]/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Menú Interactivo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pdf'
                  ? 'bg-[#D90302] text-white shadow-md shadow-[#D90302]/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Menú Original (PDF)</span>
            </button>
          </div>
        </div>

        {/* Error Boundary Fallback */}
        {dataError ? (
          <div className="py-6">
            <SupabaseDataErrorFallback
              onRetry={refetchData}
              isRetrying={isRetrying}
              errorMessage={dataError}
            />
          </div>
        ) : activeTab === 'interactive' ? (
          <>
            {/* Sticky Horizontal Scrolling Category Filter */}
            <div className="sticky top-16 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] mb-6">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {MENU_FILTER_CATEGORIES.map((cat) => {
                  const isActive = activeCategorySlug === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => handleSelectCategory(cat.slug)}
                      className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#D90302] text-white border-[#D90302] shadow-md shadow-[#D90302]/25'
                          : 'bg-[#141416] text-zinc-400 hover:text-white border-white/10 hover:border-white/25'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Deep-Link / Filter Banner Indicator */}
            <AnimatePresence>
              {activeCategorySlug !== 'todos' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-[#141417] border border-[#D90302]/40 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#D90302] animate-pulse" />
                    <span className="text-zinc-300">
                      Mostrando:{' '}
                      <strong className="text-white font-bold">
                        {activeCategoryLabel}
                      </strong>
                      {isDeepLinked && (
                        <span className="ml-2 text-[11px] text-[#EBFA00] font-mono">
                          (Filtro directo)
                        </span>
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleClearFilter}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-xs font-semibold text-white border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 text-[#D90302]" />
                    <span>Ver menú completo</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Menu Item Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredItems.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-2xl overflow-hidden bg-[#121215] border border-white/[0.07] hover:border-[#D90302]/40 transition-all duration-300 flex flex-col shadow-xl"
                >
                  {/* Dish Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-80" />

                    {/* Destacado Badge */}
                    {item.destacado && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D90302] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        <Sparkles className="w-3 h-3 text-[#EBFA00]" />
                        <span>Destacado</span>
                      </span>
                    )}

                    {/* Price Pill */}
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 font-serif text-sm font-bold text-[#EBFA00]">
                      Q{item.precioQ.toFixed(2)}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold block mb-1">
                        {item.categoria}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#EBFA00] transition-colors leading-snug">
                        {item.nombre}
                      </h3>
                      <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
                        {item.descripcion}
                      </p>
                    </div>

                    {/* Primary CTA: Ordenar por Llamada */}
                    <div className="mt-5 pt-4 border-t border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => openCallModal(item.nombre)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#D90302]/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#EBFA00]" />
                        <span>📞 Ordenar por Llamada</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        ) : (
          /* Ver Menú Original (PDF) Tab */
          <div className="rounded-3xl bg-[#121215] border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Menú Original en PDF
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Visualiza o descarga el menú impreso completo de Tony&apos;s Grill.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="/menu.pdf"
                  download="Menu_Tonys_Grill.pdf"
                  className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-white border border-white/15 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#EBFA00]" />
                  <span>Descargar PDF</span>
                </a>

                <a
                  href={OFFICIAL_EXTERNAL_MENU_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir Menú Oficial</span>
                </a>
              </div>
            </div>

            <div className="w-full h-[65vh] min-h-[460px] bg-[#0a0a0c]">
              <iframe
                src="/menu.pdf#view=FitH"
                title="Menú Original Tony's Grill PDF"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
