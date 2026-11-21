import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  Utensils,
  FileText,
  ExternalLink,
  Phone,
  X,
  Download,
  ZoomIn,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
} from 'lucide-react';
import {
  CATEGORY_PDF_PAGES,
  MENU_FILTER_CATEGORIES,
  PDF_MENUS,
  PdfMenuDocument,
  menuData,
  MenuDataItem,
} from '../data/menuData';
import { SITE_CONTENT } from '../data/restaurantData';
import { useCallModal } from '../context/CallModalContext';

const OPEN_CATEGORIES = MENU_FILTER_CATEGORIES.filter((c) => c.slug !== 'todos');

const CATEGORY_ALIASES: Record<string, string> = {
  asados: 'asados-y-carnes',
  carnes: 'asados-y-carnes',
  sopas: 'mariscos-y-sopas',
  mariscos: 'mariscos-y-sopas',
  crepas: 'crepas-y-postres',
  postres: 'crepas-y-postres',
  bebidas: 'bebidas-y-fresh',
  fresh: 'bebidas-y-fresh',
  pizzas: 'pizzas-y-lasanas',
  lasanas: 'pizzas-y-lasanas',
  antojitos: 'antojitos-y-cenas',
  hamburguesas: 'antojitos-y-cenas',
  cenas: 'antojitos-y-cenas',
  promos: 'promociones',
};

interface CompactMenuRow {
  id: string;
  name: string;
  description: string;
  priceDisplay: string;
  featured?: boolean;
  badge?: string;
}

export const WebMenuPage: React.FC = () => {
  const { openCallModal } = useCallModal();

  const [activeTab, setActiveTab] = useState<'interactive' | 'pdf'>('interactive');
  const [activeModalPdf, setActiveModalPdf] = useState<PdfMenuDocument | null>(null);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('todos');
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomedPage, setZoomedPage] = useState<{ title: string; image: string } | null>(null);

  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToCategorySection = (slug: string, highlight = true) => {
    setActiveCategorySlug(slug);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (slug === 'todos') {
        url.searchParams.delete('categoria');
      } else {
        url.searchParams.set('categoria', slug);
      }
      window.history.replaceState({}, '', url.toString());
    }

    if (slug === 'todos') {
      setHighlightedSlug(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (highlight) {
        setHighlightedSlug(slug);
      }
    }
  };

  // Deep Linking (?categoria=<slug>, ?tab=pdf, ?pdf=<id>)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab')?.trim().toLowerCase();
    const pdfParam = params.get('pdf')?.trim().toLowerCase();
    const rawCat = params.get('categoria')?.trim().toLowerCase();
    const categoriaParam = rawCat ? CATEGORY_ALIASES[rawCat] || rawCat : '';

    if (tabParam === 'pdf') {
      setActiveTab('pdf');
      if (pdfParam) {
        const foundPdf = PDF_MENUS.find((p) => p.id === pdfParam);
        if (foundPdf) setActiveModalPdf(foundPdf);
      }
      return;
    }

    if (categoriaParam && categoriaParam !== 'todos') {
      const matched = OPEN_CATEGORIES.find(
        (c) => c.slug.toLowerCase() === categoriaParam
      );
      if (matched) {
        setActiveTab('interactive');
        setActiveCategorySlug(matched.slug);
        setHighlightedSlug(matched.slug);
        const timer = window.setTimeout(() => {
          const el = document.getElementById(matched.slug);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
        return () => window.clearTimeout(timer);
      }
    }
  }, []);

  // Close lightbox or PDF modal with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedPage) setZoomedPage(null);
        if (activeModalPdf) setActiveModalPdf(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedPage, activeModalPdf]);

  const scrollCarousel = (slug: string, direction: 'left' | 'right') => {
    const container = carouselRefs.current[slug];
    if (!container) return;
    const offset = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const toggleExpandCategory = (slug: string) => {
    setExpandedCategories((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const getRowsForCategory = (slug: string): CompactMenuRow[] => {
    const q = searchQuery.trim().toLowerCase();

    if (slug === 'promociones') {
      return SITE_CONTENT.promos
        .filter(
          (p) =>
            !q ||
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.badge.toLowerCase().includes(q) ||
            p.schedule.toLowerCase().includes(q)
        )
        .map((p) => ({
          id: p.id,
          name: p.title,
          description: `${p.schedule ? `${p.schedule} · ` : ''}${p.description}`,
          priceDisplay: p.highlightPrice,
          featured: true,
          badge: p.badge,
        }));
    }

    return menuData
      .filter((item: MenuDataItem) => {
        if (item.slugCategoria !== slug) return false;
        if (!q) return true;
        return (
          item.nombre.toLowerCase().includes(q) ||
          (item.descripcion && item.descripcion.toLowerCase().includes(q)) ||
          (item.categoria && item.categoria.toLowerCase().includes(q))
        );
      })
      .map((item) => ({
        id: item.id,
        name: item.nombre,
        description: item.descripcion,
        priceDisplay: item.precioLabel || `Q${Number(item.precioQ).toFixed(2)}`,
        featured: item.destacado,
      }));
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-28 pb-28 relative overflow-x-clip font-sans">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D90302]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#EBFA00]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-semibold uppercase tracking-widest text-[#EBFA00] mb-3">
              <Utensils className="w-3 h-3 text-[#D90302]" />
              <span>Carta Digital 2026 • Chiquimula</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Nuestro <span className="text-[#D90302]">Menú</span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
              Desliza las fotos de cada sección, consulta precios en segundos y ordena por teléfono al instante.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openCallModal()}
            className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#D90302]/30 cursor-pointer shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#EBFA00]" />
            <span>Ordenar por Llamada</span>
          </button>
        </div>

        {/* Toggle / Tab System + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="inline-flex p-1 rounded-full bg-[#121212] border border-white/10 self-start">
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
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
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pdf'
                  ? 'bg-[#D90302] text-white shadow-md shadow-[#D90302]/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Menú Original (PDF)</span>
            </button>
          </div>

          {activeTab === 'interactive' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar platillo, bebida o promo..."
                className="w-full pl-10 pr-8 py-2 bg-[#121212] border border-white/10 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content Area */}
        {activeTab === 'interactive' ? (
          <>
            {/* Sticky Category Jump-Bar (High-Contrast Mobile Touch Targets) */}
            <div className="sticky top-[68px] sm:top-[76px] z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-1 bg-[#080808]/95 backdrop-blur-xl border-b border-white/15 mb-8">
              <div className="flex items-center overflow-x-auto gap-3 py-3 no-scrollbar">
                {MENU_FILTER_CATEGORIES.map((cat) => {
                  const isActive = activeCategorySlug === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => scrollToCategorySection(cat.slug)}
                      className={`shrink-0 px-5 py-3 rounded-full text-sm sm:text-base font-bold uppercase tracking-wide transition-all cursor-pointer border-[1.5px] ${
                        isActive
                          ? 'bg-[#D90302] text-white border-[#EBFA00] ring-2 ring-[#EBFA00]/60 shadow-lg shadow-[#D90302]/40'
                          : 'bg-[#242424] hover:bg-[#303030] text-white border-white/35 hover:border-[#EBFA00]/70 shadow-md'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compact Visual Showcase Cards Stacked Vertically */}
            <div className="space-y-8">
              {OPEN_CATEGORIES.map((cat) => {
                const isPromos = cat.slug === 'promociones';
                const allRows = getRowsForCategory(cat.slug);
                const gallery = CATEGORY_PDF_PAGES[cat.slug] || [];
                const isHighlighted = highlightedSlug === cat.slug;
                const isSearching = searchQuery.trim() !== '';
                const isExpanded = Boolean(expandedCategories[cat.slug]) || isSearching;
                const visibleRows = isExpanded ? allRows : allRows.slice(0, 5);
                const hasMore = allRows.length > 5 && !isSearching;

                if (isSearching && allRows.length === 0) {
                  return null;
                }

                return (
                  <section
                    key={cat.slug}
                    id={cat.slug}
                    className={`scroll-mt-36 rounded-3xl bg-[#121212] border transition-all duration-300 overflow-hidden ${
                      isHighlighted
                        ? 'border-[#D90302]/70 shadow-2xl shadow-[#D90302]/15'
                        : 'border-white/[0.07] hover:border-white/15'
                    }`}
                  >
                    {/* Section Header */}
                    <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.06] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isPromos ? 'bg-[#EBFA00]' : 'bg-[#D90302]'
                          }`}
                        />
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {cat.label}
                        </h2>
                        {isPromos && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EBFA00]/10 border border-[#EBFA00]/30 text-[#EBFA00] text-[10px] font-bold uppercase tracking-wider">
                            <Tag className="w-2.5 h-2.5" />
                            <span>Vigentes</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-zinc-500 font-mono">
                          {allRows.length} {allRows.length === 1 ? 'opción' : 'opciones'}
                        </span>

                        {gallery.length > 0 && !isSearching && (
                          <div className="hidden md:flex items-center gap-1 ml-1">
                            <button
                              type="button"
                              onClick={() => scrollCarousel(cat.slug, 'left')}
                              aria-label={`Deslizar ${cat.label} a la izquierda`}
                              className="p-1.5 rounded-full bg-white/[0.04] hover:bg-[#D90302] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => scrollCarousel(cat.slug, 'right')}
                              aria-label={`Deslizar ${cat.label} a la derecha`}
                              className="p-1.5 rounded-full bg-white/[0.04] hover:bg-[#D90302] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Horizontal Swipeable Image Strip (Hero of each section, uniform h-56 sm:h-64) */}
                    {gallery.length > 0 && !isSearching && (
                      <div className="px-5 sm:px-6 pt-4 pb-3 border-b border-white/[0.05] bg-[#0d0d0f]">
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mb-2.5">
                          <BookOpen className="w-3 h-3 text-[#EBFA00]" />
                          <span>Desliza Carta & Platillos ({gallery.length} fotos • Toca para ampliar)</span>
                        </div>

                        <div
                          ref={(el) => {
                            carouselRefs.current[cat.slug] = el;
                          }}
                          className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 no-scrollbar scroll-smooth"
                        >
                          {gallery.map((page) => (
                            <button
                              key={`${cat.slug}-${page.image}-${page.title}`}
                              type="button"
                              onClick={() => setZoomedPage(page)}
                              className="snap-start group relative shrink-0 h-56 sm:h-64 aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#D90302]/70 transition-all cursor-pointer text-left"
                            >
                              <img
                                src={page.image}
                                alt={page.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                                <p className="text-[11px] font-medium text-white truncate">
                                  {page.title}
                                </p>
                              </div>
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-black/75 border border-white/15">
                                <ZoomIn className="w-3 h-3 text-[#EBFA00]" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Minimalist, Collapsible Price List (Top 5 by default) */}
                    <div className="px-5 sm:px-6 py-2 divide-y divide-white/[0.06]">
                      {visibleRows.map((row) => (
                        <div
                          key={row.id}
                          className="py-3.5 flex items-center justify-between gap-3 group"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#EBFA00] transition-colors truncate">
                                {row.name}
                              </h3>
                              {row.featured && !row.badge && (
                                <Sparkles className="w-3 h-3 text-[#EBFA00] shrink-0" />
                              )}
                              {row.badge && (
                                <span className="px-2 py-0.5 rounded-full bg-[#D90302]/20 border border-[#D90302]/40 text-[#EBFA00] text-[10px] font-bold uppercase tracking-wider shrink-0">
                                  {row.badge}
                                </span>
                              )}
                            </div>
                            {row.description && (
                              <p className="text-xs text-zinc-400 font-light line-clamp-1 mt-0.5">
                                {row.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            <span className="font-serif text-sm sm:text-base font-bold text-[#EBFA00] whitespace-nowrap">
                              {row.priceDisplay}
                            </span>

                            <button
                              type="button"
                              onClick={() => openCallModal(row.name)}
                              title={`Ordenar ${row.name} por llamada`}
                              aria-label={`Ordenar ${row.name} por llamada`}
                              className="p-2 rounded-full bg-white/[0.05] hover:bg-[#D90302] border border-white/10 hover:border-[#D90302] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Anti-Overwhelm Expand Toggle */}
                    {hasMore && (
                      <div className="px-5 sm:px-6 py-3 border-t border-white/[0.06] bg-white/[0.015]">
                        <button
                          type="button"
                          onClick={() => toggleExpandCategory(cat.slug)}
                          className="w-full py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-[#EBFA00] hover:bg-white/[0.04] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              <span>Mostrar menos</span>
                              <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Ver todos los platillos ({allRows.length})</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </>
        ) : (
          /* Ver Menú Original (PDF) Tab — 4 Compact Cards opening Full-Screen Modal */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PDF_MENUS.map((pdf) => (
              <button
                key={pdf.id}
                type="button"
                onClick={() => setActiveModalPdf(pdf)}
                className="group p-5 rounded-2xl border border-white/10 hover:border-[#D90302]/70 bg-[#121212] hover:bg-[#17171c] text-left transition-all cursor-pointer flex flex-col justify-between gap-4 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D90302]/20 border border-[#D90302]/40 text-[#EBFA00]">
                      {pdf.badge}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {pdf.pagesLabel} • {pdf.sizeLabel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#EBFA00] transition-colors leading-snug">
                    {pdf.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                    {pdf.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold">
                  <span className="text-zinc-200 group-hover:text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#D90302]" />
                    <span>Abrir Menú en Pantalla Completa</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#EBFA00]" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full-Screen Dark Modal for Active PDF */}
      <AnimatePresence>
        {activeModalPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#080808] flex flex-col"
          >
            {/* Sticky Modal Top Bar */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#121212] border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#EBFA00] truncate">
                  {activeModalPdf.pagesLabel} • {activeModalPdf.sizeLabel}
                </p>
                <h2 className="font-serif text-sm sm:text-lg font-bold text-white truncate">
                  {activeModalPdf.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeModalPdf.file}
                  download={activeModalPdf.downloadName}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#D90302]/30 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#EBFA00]" />
                  <span>Descargar PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveModalPdf(null)}
                  aria-label="Cerrar visor PDF"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Cerrar</span>
                </button>
              </div>
            </div>

            {/* Full-Screen PDF Viewer */}
            <div className="flex-1 w-full bg-[#0a0a0c]">
              <object
                key={activeModalPdf.file}
                data={`${activeModalPdf.file}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full h-full border-0"
              >
                <iframe
                  src={`${activeModalPdf.file}#toolbar=1&navpanes=0&scrollbar=1`}
                  title={activeModalPdf.title}
                  className="w-full h-full border-0"
                />
              </object>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for Zoomed Image */}
      <AnimatePresence>
        {zoomedPage && (
          <div
            onClick={() => setZoomedPage(null)}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] bg-[#121212] rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
            >
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-white">
                  {zoomedPage.title}
                </span>
                <button
                  type="button"
                  onClick={() => setZoomedPage(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-y-auto p-2 bg-black flex justify-center">
                <img
                  src={zoomedPage.image}
                  alt={zoomedPage.title}
                  loading="lazy"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
