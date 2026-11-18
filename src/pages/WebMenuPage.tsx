import React, { useState, useEffect, useMemo } from 'react';
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
  Plus,
  Check,
  ZoomIn,
  BookOpen,
  Clock,
  Share2,
  Send,
  Tag,
} from 'lucide-react';
import {
  CATEGORY_PDF_PAGES,
  MENU_FILTER_CATEGORIES,
  PDF_MENUS,
  menuData,
  MenuDataItem,
  OFFICIAL_EXTERNAL_MENU_URL,
} from '../data/menuData';
import { RESTAURANT_INFO, SITE_CONTENT, PromoItem } from '../data/restaurantData';
import { useCallModal } from '../context/CallModalContext';

const STATIC_CATEGORIES = MENU_FILTER_CATEGORIES.filter((c) => c.slug !== 'todos').map(
  (c) => ({ id: c.slug, label: c.label })
);

const CATEGORY_ALIASES: Record<string, string> = {
  sopas: 'mariscos-y-sopas',
  crepas: 'crepas-y-postres',
  bebidas: 'bebidas-y-fresh',
};

export const WebMenuPage: React.FC = () => {
  const { openCallModal } = useCallModal();

  const [activeTab, setActiveTab] = useState<'interactive' | 'pdf'>('interactive');
  const [selectedPdfId, setSelectedPdfId] = useState<string>(PDF_MENUS[0].id);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDeepLinked, setIsDeepLinked] = useState<boolean>(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState<string[]>([]);
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);
  const [zoomedPage, setZoomedPage] = useState<{ title: string; image: string } | null>(null);

  const filterCategories = useMemo(() => {
    return [{ id: 'todos', label: 'Todos' }, ...STATIC_CATEGORIES];
  }, []);

  const selectedPdf = useMemo(() => {
    return PDF_MENUS.find((p) => p.id === selectedPdfId) || PDF_MENUS[0];
  }, [selectedPdfId]);

  // Deep Linking (?categoria=<slug> & ?tab=pdf)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab')?.trim().toLowerCase();
    const pdfParam = params.get('pdf')?.trim().toLowerCase();
    const rawCat = params.get('categoria')?.trim().toLowerCase();
    const categoriaParam = rawCat ? CATEGORY_ALIASES[rawCat] || rawCat : '';

    if (tabParam === 'pdf') {
      setActiveTab('pdf');
      if (pdfParam && PDF_MENUS.some((p) => p.id === pdfParam)) {
        setSelectedPdfId(pdfParam);
      }
      return;
    }

    if (categoriaParam) {
      const matched = filterCategories.find(
        (c) => c.id.toLowerCase() === categoriaParam
      );

      if (matched) {
        setActiveCategorySlug(matched.id);
        setActiveTab('interactive');
        setIsDeepLinked(matched.id !== 'todos');
      }
    }
  }, [filterCategories]);

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
    setSearchQuery('');
    setIsDeepLinked(false);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('categoria');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const toggleOrderItem = (dishName: string) => {
    setSelectedOrderItems((prev) =>
      prev.includes(dishName)
        ? prev.filter((item) => item !== dishName)
        : [...prev, dishName]
    );
  };

  const handleSharePromo = (promo: PromoItem) => {
    const text = `¡Mira esta promo en Tony's Grill Chiquimula! ${promo.emoji || '🔥'} ${promo.title} (${promo.highlightPrice}) - ${promo.schedule}.`;
    navigator.clipboard.writeText(text);
    setCopiedPromoId(promo.id);
    setTimeout(() => setCopiedPromoId(null), 2500);
  };

  const activeCategoryLabel = useMemo(() => {
    return (
      filterCategories.find((c) => c.id === activeCategorySlug)?.label || 'Todos'
    );
  }, [filterCategories, activeCategorySlug]);

  const visibleCategories = useMemo(() => {
    if (activeCategorySlug === 'todos') return STATIC_CATEGORIES;
    return STATIC_CATEGORIES.filter((c) => c.id === activeCategorySlug);
  }, [activeCategorySlug]);

  const filterDishesForCategory = (categoryId: string): MenuDataItem[] => {
    const q = searchQuery.trim().toLowerCase();
    return menuData.filter((item) => {
      if (item.slugCategoria !== categoryId) return false;
      if (!q) return true;
      return (
        item.nombre.toLowerCase().includes(q) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(q)) ||
        (item.categoria && item.categoria.toLowerCase().includes(q))
      );
    });
  };

  const filteredPromos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SITE_CONTENT.promos;
    return SITE_CONTENT.promos.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.schedule.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const getPromoColSpan = (index: number) => {
    const pattern = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-6', 'lg:col-span-6', 'lg:col-span-6', 'lg:col-span-6'];
    return pattern[index % pattern.length];
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-28 pb-32 relative overflow-hidden font-sans">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D90302]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#EBFA00]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header + External Official Menu Link */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 border-b border-white/[0.08] pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold uppercase tracking-widest text-[#EBFA00] mb-4">
              <Utensils className="w-3.5 h-3.5 text-[#D90302]" />
              <span>Carta Digital 2026 • Chiquimula</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Nuestro <span className="text-[#D90302]">Menú</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Explora nuestras fotografías reales de platillos y cartas oficiales por sección, selecciona lo que deseas y llama directo para ordenar sin esperas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={OFFICIAL_EXTERNAL_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-xs font-semibold text-zinc-200 hover:text-white border border-white/15 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#EBFA00]" />
              <span>Ver Menú Original en Línea</span>
            </a>

            <button
              type="button"
              onClick={() => openCallModal()}
              className="px-5 py-3 rounded-full bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#D90302]/30 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#EBFA00]" />
              <span>Llamar para Ordenar</span>
            </button>
          </div>
        </div>

        {/* Toggle / Tab System: Menú Interactivo vs Ver Menú Original (PDFs) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="inline-flex p-1 rounded-full bg-[#141416] border border-white/10 self-start">
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
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
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pdf'
                  ? 'bg-[#D90302] text-white shadow-md shadow-[#D90302]/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Menús PDF (4)</span>
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
                className="w-full pl-10 pr-4 py-2.5 bg-[#121215] border border-white/10 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors"
              />
            </div>
          )}
        </div>

        {/* Content Area */}
        {activeTab === 'interactive' ? (
          <>
            {/* Sticky Horizontal Scrolling Category Filter */}
            <div className="sticky top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.06] mb-8">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {filterCategories.map((cat) => {
                  const isActive = activeCategorySlug === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#D90302] text-white border-[#D90302] shadow-md shadow-[#D90302]/30'
                          : 'bg-[#121215] text-zinc-400 hover:text-white border-white/10 hover:border-white/25'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Filter Banner */}
            <AnimatePresence>
              {(activeCategorySlug !== 'todos' || searchQuery.trim() !== '') && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-8 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-wrap items-center justify-between gap-3"
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

            {/* Category Sections */}
            <div className="space-y-16">
              {visibleCategories.map((cat) => {
                const itemsInCat = filterDishesForCategory(cat.id);
                const pdfPages = CATEGORY_PDF_PAGES[cat.id] || [];
                const isPromos = cat.id === 'promociones';

                if (searchQuery.trim() && itemsInCat.length === 0 && (!isPromos || filteredPromos.length === 0)) {
                  return null;
                }

                return (
                  <section key={cat.id} id={cat.id} className="scroll-mt-36">
                    {/* Category Title Bar */}
                    <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${isPromos ? 'bg-[#EBFA00]' : 'bg-[#D90302]'}`} />
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          {cat.label}
                        </h2>
                        {isPromos && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBFA00]/10 border border-[#EBFA00]/30 text-[#EBFA00] text-[10px] font-bold uppercase tracking-wider">
                            <Tag className="w-3 h-3" />
                            <span>Vigentes</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {isPromos ? `${filteredPromos.length} promos` : `${itemsInCat.length} ${itemsInCat.length === 1 ? 'opción' : 'opciones'}`}
                      </span>
                    </div>

                    {/* Categorized Photo Strip (Real Dish Photos + Printed 2026 Pages) */}
                    {pdfPages.length > 0 && !searchQuery.trim() && (
                      <div className="mb-8">
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                          <BookOpen className="w-3.5 h-3.5 text-[#EBFA00]" />
                          <span className="uppercase tracking-wider font-semibold text-[11px]">
                            Galería de Platillos & Páginas Oficiales ({pdfPages.length} imágenes • Toca para ampliar)
                          </span>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
                          {pdfPages.map((page) => (
                            <button
                              key={`${cat.id}-${page.image}-${page.title}`}
                              type="button"
                              onClick={() => setZoomedPage(page)}
                              className="group relative shrink-0 w-44 sm:w-52 rounded-2xl overflow-hidden bg-[#121215] border border-white/10 hover:border-[#D90302]/60 transition-all shadow-xl cursor-pointer text-left"
                            >
                              <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                                <img
                                  src={page.image}
                                  alt={page.title}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-black/80 text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/15">
                                  <ZoomIn className="w-3.5 h-3.5 text-[#EBFA00]" />
                                  <span>Ampliar</span>
                                </span>
                              </div>
                              <div className="p-2.5 bg-[#121215] border-t border-white/[0.06]">
                                <p className="text-[11px] font-medium text-zinc-300 truncate">
                                  {page.title}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bento Glow Grid specifically for Promociones category */}
                    {isPromos && filteredPromos.length > 0 && (
                      <div className="relative mb-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
                          {filteredPromos.map((promo, index) => {
                            const colSpan = getPromoColSpan(index);
                            const accentColor = promo.accentColor || '#D90302';
                            const badgeColor = promo.badgeColor || '#D90302';
                            const isAdded = selectedOrderItems.includes(promo.title);

                            return (
                              <motion.div
                                key={promo.id}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className={`${colSpan} group relative rounded-3xl p-6 sm:p-7 glass-panel border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl`}
                                style={{
                                  boxShadow: `0 10px 40px -15px ${accentColor}40`,
                                }}
                              >
                                {/* Glow accent corner */}
                                <div
                                  className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[80px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"
                                  style={{ backgroundColor: accentColor }}
                                />

                                <div>
                                  {/* Top Bar of Card */}
                                  <div className="flex items-center justify-between gap-3 mb-5">
                                    <div className="flex items-center gap-2">
                                      <span className="text-2xl p-2 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
                                        {promo.emoji || '🔥'}
                                      </span>
                                      {promo.badge && (
                                        <span
                                          className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md"
                                          style={{
                                            backgroundColor: badgeColor,
                                            color: badgeColor === '#EBFA00' ? '#080808' : '#ffffff',
                                          }}
                                        >
                                          {promo.badge}
                                        </span>
                                      )}
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleSharePromo(promo)}
                                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                      title="Copiar detalles de la promo"
                                    >
                                      {copiedPromoId === promo.id ? (
                                        <Check className="w-4 h-4 text-[#03AF45]" />
                                      ) : (
                                        <Share2 className="w-4 h-4" />
                                      )}
                                    </button>
                                  </div>

                                  {/* Title & Highlight Price */}
                                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                                    <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#EBFA00] transition-colors">
                                      {promo.title}
                                    </h3>
                                    {promo.highlightPrice && (
                                      <span
                                        className="text-lg sm:text-2xl font-black shrink-0 tracking-tight"
                                        style={{ color: badgeColor === '#EBFA00' ? '#EBFA00' : '#ffffff' }}
                                      >
                                        {promo.highlightPrice}
                                      </span>
                                    )}
                                  </div>

                                  {/* Schedule */}
                                  {promo.schedule && (
                                    <p className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 mb-3">
                                      <Clock className="w-3.5 h-3.5 text-[#EBFA00]" />
                                      <span>{promo.schedule}</span>
                                    </p>
                                  )}

                                  {/* Description */}
                                  <p className="text-zinc-300 text-sm leading-relaxed font-light mb-5">
                                    {promo.description}
                                  </p>
                                </div>

                                {/* Bottom Terms & CTAs */}
                                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <span className="text-[11px] text-zinc-500 font-medium italic">
                                    {promo.terms ? `* ${promo.terms}` : '* Válido por tiempo limitado.'}
                                  </span>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => toggleOrderItem(promo.title)}
                                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                                        isAdded
                                          ? 'bg-[#03AF45]/20 border-[#03AF45]/50 text-[#03AF45]'
                                          : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-zinc-300 hover:text-white'
                                      }`}
                                    >
                                      {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                      <span>{isAdded ? 'Agregada' : 'Agregar'}</span>
                                    </button>

                                    <a
                                      href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(`Hola Tony's Grill, deseo consultar o aprovechar la promoción: ${promo.title}`)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-1.5 hover:scale-[1.03] shadow-lg shrink-0 cursor-pointer"
                                      style={{ backgroundColor: accentColor === '#03AF45' ? '#03AF45' : '#D90302' }}
                                    >
                                      <Send className="w-3.5 h-3.5 text-[#EBFA00]" />
                                      <span>Aprovechar</span>
                                    </a>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Clean Text-Only Interactive Menu List for Ordering */}
                    {itemsInCat.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {itemsInCat.map((item) => {
                          const isAdded = selectedOrderItems.includes(item.nombre);
                          const displayPrice =
                            item.precioLabel || `Q${Number(item.precioQ).toFixed(2)}`;
                          return (
                            <div
                              key={item.id}
                              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                                isAdded
                                  ? 'bg-[#17171b] border-[#D90302]/60 shadow-lg'
                                  : 'bg-[#101013] hover:bg-[#141418] border-white/[0.06] hover:border-white/15'
                              }`}
                            >
                              <div>
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                                      {item.nombre}
                                    </h3>
                                    {item.destacado && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D90302]/20 border border-[#D90302]/40 text-[#EBFA00] text-[10px] font-bold uppercase tracking-wider">
                                        <Sparkles className="w-2.5 h-2.5" />
                                        <span>Destacado</span>
                                      </span>
                                    )}
                                  </div>

                                  <span className="font-serif text-sm sm:text-base font-bold text-[#EBFA00] shrink-0">
                                    {displayPrice}
                                  </span>
                                </div>

                                {item.descripcion && (
                                  <p className="mt-1.5 text-xs text-zinc-400 font-light leading-relaxed">
                                    {item.descripcion}
                                  </p>
                                )}
                              </div>

                              {/* Actions: Agregar al pedido + Pedir por Llamada */}
                              <div className="pt-3 border-t border-white/[0.05] flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleOrderItem(item.nombre)}
                                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                                    isAdded
                                      ? 'bg-[#03AF45]/20 border-[#03AF45]/50 text-[#03AF45]'
                                      : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-zinc-300 hover:text-white'
                                  }`}
                                >
                                  {isAdded ? (
                                    <>
                                      <Check className="w-3.5 h-3.5" />
                                      <span>En tu pedido</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>Agregar al pedido</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openCallModal(item.nombre)}
                                  className="py-2 px-3.5 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#D90302]/20 shrink-0"
                                >
                                  <Phone className="w-3.5 h-3.5 text-[#EBFA00]" />
                                  <span>Pedir por Llamada</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </>
        ) : (
          /* Ver Menús en PDF Tab (4 PDFs separados dentro de la misma pestaña) */
          <div className="space-y-6">
            {/* 4 Separate PDF Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {PDF_MENUS.map((pdf) => {
                const isSelected = pdf.id === selectedPdf.id;
                return (
                  <button
                    key={pdf.id}
                    type="button"
                    onClick={() => setSelectedPdfId(pdf.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#1a1012] border-[#D90302] shadow-lg shadow-[#D90302]/20'
                        : 'bg-[#121215] hover:bg-[#17171b] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isSelected
                              ? 'bg-[#D90302] text-white'
                              : 'bg-white/10 text-[#EBFA00]'
                          }`}
                        >
                          {pdf.badge}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {pdf.pagesLabel} • {pdf.sizeLabel}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-white leading-snug">
                        {pdf.title}
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-light mt-1 leading-relaxed">
                        {pdf.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-semibold">
                      <span className={isSelected ? 'text-[#EBFA00]' : 'text-zinc-400'}>
                        {isSelected ? 'Visualizando ahora' : 'Seleccionar PDF'}
                      </span>
                      <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D90302]' : 'text-zinc-500'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active PDF Viewer */}
            <div className="rounded-3xl bg-[#121215] border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-5 sm:p-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#EBFA00]">
                      {selectedPdf.pagesLabel} • {selectedPdf.sizeLabel}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-white">
                    {selectedPdf.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    {selectedPdf.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={selectedPdf.file}
                    download={selectedPdf.downloadName}
                    className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-white border border-white/15 transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#EBFA00]" />
                    <span>Descargar PDF ({selectedPdf.sizeLabel})</span>
                  </a>

                  <a
                    href={selectedPdf.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-white border border-white/15 transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#EBFA00]" />
                    <span>Abrir PDF</span>
                  </a>

                  <a
                    href={OFFICIAL_EXTERNAL_MENU_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Menú QR Oficial</span>
                  </a>
                </div>
              </div>

              <div className="w-full h-[72vh] min-h-[520px] bg-[#0a0a0c]">
                <iframe
                  key={selectedPdf.file}
                  src={`${selectedPdf.file}#view=FitH`}
                  title={selectedPdf.title}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pre-Selected Order Floating Summary (above mobile action bar) */}
      <AnimatePresence>
        {selectedOrderItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-20 md:bottom-24 inset-x-4 sm:inset-x-auto sm:left-6 sm:max-w-md z-40 p-4 rounded-2xl bg-[#141418]/95 border border-[#D90302]/40 shadow-2xl flex items-center justify-between gap-4 backdrop-blur-xl"
          >
            <div className="min-w-0">
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#03AF45] shrink-0" />
                <span>
                  {selectedOrderItems.length}{' '}
                  {selectedOrderItems.length === 1 ? 'ítem en tu pedido' : 'ítems en tu pedido'}
                </span>
              </p>
              <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                {selectedOrderItems.join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => openCallModal(selectedOrderItems.join(', '))}
                className="px-3.5 py-2 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#EBFA00]" />
                <span>Llamar</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOrderItems([])}
                aria-label="Limpiar pedido"
                className="p-1.5 text-zinc-400 hover:text-white text-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
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
              className="relative max-w-3xl w-full max-h-[90vh] bg-[#121215] rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
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
