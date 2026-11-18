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
  ArrowRight,
  Images,
} from 'lucide-react';
import {
  CATEGORY_PDF_PAGES,
  MENU_FILTER_CATEGORIES,
  PDF_MENUS,
  menuData,
  MenuDataItem,
} from '../data/menuData';
import { RESTAURANT_INFO, SITE_CONTENT, PromoItem } from '../data/restaurantData';
import { useCallModal } from '../context/CallModalContext';

interface CategoryCardMeta {
  id: string;
  label: string;
  emoji: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  description: string;
  coverImage: string;
}

const CATEGORY_CARDS: CategoryCardMeta[] = [
  {
    id: 'asados-y-carnes',
    label: 'Asados, Combos y Pollo',
    emoji: '🥩',
    badge: 'Especialidad de la Casa',
    badgeColor: '#D90302',
    accentColor: '#D90302',
    description: 'Puyazo americano, lomito 8 oz, entraña, parrilladas familiares, combos Mar y Tierra, fajitas y pollo a la parrilla.',
    coverImage: '/images/puyazo-importado.jpg',
  },
  {
    id: 'desayunos',
    label: 'Desayunos',
    emoji: '🍳',
    badge: '7:00 – 11:00 AM',
    badgeColor: '#EBFA00',
    accentColor: '#D90302',
    description: 'Desayuno típico, omelettes, panqueques, tostadas francesas, muffins, opciones livianas y menú kids.',
    coverImage: '/images/promo-desayuno.jpg',
  },
  {
    id: 'mariscos-y-sopas',
    label: 'Mariscos y Sopas',
    emoji: '🦐',
    badge: 'Fresco del Día',
    badgeColor: '#03AF45',
    accentColor: '#03AF45',
    description: 'Salmón, róbalo, camarones jumbo y empanizados, mojarra frita, ceviches, tapado y sopa de mariscos.',
    coverImage: '/images/ceviche-camaron.jpg',
  },
  {
    id: 'pizzas-y-lasanas',
    label: 'Pizzas, Pastas y Lasañas',
    emoji: '🍕',
    badge: '4 Tamaños & Combos',
    badgeColor: '#D90302',
    accentColor: '#D90302',
    description: '17 especialidades de pizza, súper combos familiares, lasaña boloñesa, calzone supremo y pastas artesanales.',
    coverImage: '/images/lasana-bolonesa.jpg',
  },
  {
    id: 'antojitos-y-cenas',
    label: 'Antojitos, Burgers y Cenas',
    emoji: '🍔',
    badge: 'Para Compartir',
    badgeColor: '#EBFA00',
    accentColor: '#D90302',
    description: 'Carpaccio, hamburguesas, tacos mexicanos, burritos, garnachas, sándwiches, cenas y menú infantil.',
    coverImage: '/images/carpaccio.jpg',
  },
  {
    id: 'ensaladas',
    label: 'Ensaladas',
    emoji: '🥗',
    badge: 'Natural & Fresco',
    badgeColor: '#03AF45',
    accentColor: '#03AF45',
    description: 'Ensalada Californiana, César, Mediterránea, Del Mar, Garden Salad y Tony\'s Grill con pan incluido.',
    coverImage: '/images/ensalada-californiana.jpg',
  },
  {
    id: 'crepas-y-postres',
    label: 'Crepas y Postres',
    emoji: '🥞',
    badge: 'Incluyen Café',
    badgeColor: '#EBFA00',
    accentColor: '#D90302',
    description: 'Crepas dulces y saladas, canelitas, hojuelas, canoa, pasteles y combos American Doughnuts.',
    coverImage: '/menu-pages/almuerzo-17.jpg',
  },
  {
    id: 'bebidas-y-fresh',
    label: "Bebidas y Tony's Fresh",
    emoji: '🍹',
    badge: 'Coctelería 2x1',
    badgeColor: '#03AF45',
    accentColor: '#03AF45',
    description: 'Cafés, frapuchinos, smoothies, mojitos y sangrías 2x1, cubetazos, cervezas, vinos y licores.',
    coverImage: '/images/cocteleria-fresh.jpg',
  },
  {
    id: 'promociones',
    label: 'Promociones',
    emoji: '🔥',
    badge: 'Ofertas Vigentes',
    badgeColor: '#EBFA00',
    accentColor: '#D90302',
    description: 'Desayunos 2x1, Lasañas 2x1 a Q63, Pizzas 2x1 martes y jueves, cócteles 2x1 y súper combos.',
    coverImage: '/images/promo-lasana.jpg',
  },
  {
    id: 'eventos',
    label: 'Menú de Eventos',
    emoji: '🥂',
    badge: 'Banquetes 2026',
    badgeColor: '#D90302',
    accentColor: '#D90302',
    description: 'Platillos fuertes, opciones V.I.P., menú infantil, refacciones saladas y condiciones de salón.',
    coverImage: '/menu-pages/eventos-1.jpg',
  },
];

const CATEGORY_ALIASES: Record<string, string> = {
  sopas: 'mariscos-y-sopas',
  crepas: 'crepas-y-postres',
  bebidas: 'bebidas-y-fresh',
};

export const WebMenuPage: React.FC = () => {
  const { openCallModal } = useCallModal();

  const [activeTab, setActiveTab] = useState<'interactive' | 'pdf'>('interactive');
  const [selectedPdfId, setSelectedPdfId] = useState<string>(PDF_MENUS[0].id);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrderItems, setSelectedOrderItems] = useState<string[]>([]);
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);
  const [zoomedPage, setZoomedPage] = useState<{ title: string; image: string } | null>(null);

  const selectedPdf = useMemo(() => {
    return PDF_MENUS.find((p) => p.id === selectedPdfId) || PDF_MENUS[0];
  }, [selectedPdfId]);

  const activeCategoryCard = useMemo(() => {
    if (!openCategoryId) return null;
    return CATEGORY_CARDS.find((c) => c.id === openCategoryId) || null;
  }, [openCategoryId]);

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
      if (pdfParam && PDF_MENUS.some((p) => p.id === pdfParam)) {
        setSelectedPdfId(pdfParam);
      }
      return;
    }

    if (categoriaParam && categoriaParam !== 'todos') {
      const matched = MENU_FILTER_CATEGORIES.find(
        (c) => c.slug.toLowerCase() === categoriaParam
      );
      if (matched) {
        setActiveTab('interactive');
        setOpenCategoryId(matched.slug);
      }
    }
  }, []);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedPage) {
          setZoomedPage(null);
        } else if (openCategoryId) {
          handleCloseCategory();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedPage, openCategoryId]);

  const handleOpenCategory = (slug: string) => {
    setOpenCategoryId(slug);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('categoria', slug);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleCloseCategory = () => {
    setOpenCategoryId(null);
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

  const getCategoryItemCount = (categoryId: string): number => {
    if (categoryId === 'promociones') return SITE_CONTENT.promos.length;
    return menuData.filter((item) => item.slugCategoria === categoryId).length;
  };

  const modalDishes: MenuDataItem[] = useMemo(() => {
    if (!openCategoryId || openCategoryId === 'promociones') return [];
    return menuData.filter((item) => item.slugCategoria === openCategoryId);
  }, [openCategoryId]);

  const modalGallery = useMemo(() => {
    if (!openCategoryId) return [];
    return CATEGORY_PDF_PAGES[openCategoryId] || [];
  }, [openCategoryId]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { dishes: [] as MenuDataItem[], promos: [] as PromoItem[] };
    return {
      dishes: menuData.filter(
        (item) =>
          item.slugCategoria !== 'promociones' &&
          (item.nombre.toLowerCase().includes(q) ||
            item.descripcion.toLowerCase().includes(q) ||
            item.categoria.toLowerCase().includes(q))
      ),
      promos: SITE_CONTENT.promos.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.badge.toLowerCase().includes(q)
      ),
    };
  }, [searchQuery]);

  const getBentoColSpan = (index: number) => {
    const pattern = [
      'lg:col-span-6',
      'lg:col-span-6',
      'lg:col-span-4',
      'lg:col-span-4',
      'lg:col-span-4',
      'lg:col-span-5',
      'lg:col-span-7',
      'lg:col-span-4',
      'lg:col-span-4',
      'lg:col-span-4',
    ];
    return pattern[index % pattern.length];
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-28 pb-32 relative overflow-hidden font-sans">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D90302]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#EBFA00]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
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
              Toca cualquier sección para abrir sus platillos, precios y fotografías reales, o busca directamente lo que se te antoja.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
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

        {/* Toggle / Tab System: Menú Interactivo vs Ver Menús PDF (4) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
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
              <span>Menú por Secciones</span>
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
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar platillo, bebida o promo..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#121215] border border-white/10 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors"
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
          searchQuery.trim() !== '' ? (
            /* Direct Search Results View */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <p className="text-xs sm:text-sm text-zinc-300">
                  Resultados para <strong className="text-white">&quot;{searchQuery}&quot;</strong>:{' '}
                  <span className="text-[#EBFA00] font-mono">
                    {searchResults.promos.length + searchResults.dishes.length} coincidencias
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  Volver a secciones
                </button>
              </div>

              {searchResults.promos.length === 0 && searchResults.dishes.length === 0 ? (
                <div className="p-10 rounded-3xl bg-[#121215] border border-white/10 text-center">
                  <p className="text-sm text-zinc-400">
                    No encontramos platillos con ese nombre. Prueba buscando &quot;puyazo&quot;, &quot;pizza&quot;, &quot;camarones&quot; o &quot;2x1&quot;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.promos.map((promo) => {
                    const isAdded = selectedOrderItems.includes(promo.title);
                    return (
                      <div
                        key={promo.id}
                        className="p-5 rounded-2xl glass-panel border border-[#EBFA00]/25 flex flex-col justify-between gap-3 relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EBFA00]">
                              {promo.emoji} Promoción • {promo.schedule}
                            </span>
                            <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                              {promo.title}
                            </h3>
                          </div>
                          <span className="font-serif text-base font-black text-[#EBFA00] shrink-0">
                            {promo.highlightPrice}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-light">{promo.description}</p>
                        <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleOrderItem(promo.title)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border cursor-pointer flex items-center justify-center gap-1.5 ${
                              isAdded
                                ? 'bg-[#03AF45]/20 border-[#03AF45]/50 text-[#03AF45]'
                                : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-zinc-300'
                            }`}
                          >
                            {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{isAdded ? 'En tu pedido' : 'Agregar'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => openCallModal(promo.title)}
                            className="py-2 px-3.5 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs cursor-pointer flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#EBFA00]" />
                            <span>Llamar</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {searchResults.dishes.map((item) => {
                    const isAdded = selectedOrderItems.includes(item.nombre);
                    const displayPrice = item.precioLabel || `Q${Number(item.precioQ).toFixed(2)}`;
                    return (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-[#101013] border border-white/[0.08] flex flex-col justify-between gap-3"
                      >
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                            {item.categoria}
                          </span>
                          <div className="flex items-start justify-between gap-3 mt-0.5">
                            <h3 className="font-serif text-base font-bold text-white leading-snug">
                              {item.nombre}
                            </h3>
                            <span className="font-serif text-base font-bold text-[#EBFA00] shrink-0">
                              {displayPrice}
                            </span>
                          </div>
                          {item.descripcion && (
                            <p className="mt-1.5 text-xs text-zinc-400 font-light leading-relaxed">
                              {item.descripcion}
                            </p>
                          )}
                        </div>
                        <div className="pt-3 border-t border-white/[0.05] flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleOrderItem(item.nombre)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border cursor-pointer flex items-center justify-center gap-1.5 ${
                              isAdded
                                ? 'bg-[#03AF45]/20 border-[#03AF45]/50 text-[#03AF45]'
                                : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-zinc-300'
                            }`}
                          >
                            {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{isAdded ? 'En tu pedido' : 'Agregar'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => openCallModal(item.nombre)}
                            className="py-2 px-3.5 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs cursor-pointer flex items-center gap-1.5"
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
            </div>
          ) : (
            /* Clean Bento Grid of Category Cards (Promos-style Glow Aesthetic) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
              {CATEGORY_CARDS.map((card, index) => {
                const colSpan = getBentoColSpan(index);
                const itemCount = getCategoryItemCount(card.id);
                const photoCount = (CATEGORY_PDF_PAGES[card.id] || []).length;

                return (
                  <motion.button
                    key={card.id}
                    type="button"
                    onClick={() => handleOpenCategory(card.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`${colSpan} group relative rounded-3xl p-6 sm:p-7 glass-panel border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl text-left cursor-pointer`}
                    style={{
                      boxShadow: `0 10px 40px -15px ${card.accentColor}40`,
                    }}
                  >
                    {/* Glow accent corner */}
                    <div
                      className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[80px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: card.accentColor }}
                    />

                    <div>
                      {/* Top Bar: Emoji + Badge + Preview Thumbnail */}
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-2xl p-2 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
                            {card.emoji}
                          </span>
                          <span
                            className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md"
                            style={{
                              backgroundColor: card.badgeColor,
                              color: card.badgeColor === '#EBFA00' ? '#080808' : '#ffffff',
                            }}
                          >
                            {card.badge}
                          </span>
                        </div>

                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/15 shrink-0 bg-zinc-900 shadow-lg">
                          <img
                            src={card.coverImage}
                            alt={card.label}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Category Title & Description */}
                      <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#EBFA00] transition-colors leading-tight mb-2.5">
                        {card.label}
                      </h2>

                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light mb-5">
                        {card.description}
                      </p>
                    </div>

                    {/* Footer: Counts + CTA */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
                        <span>{itemCount} opciones</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Images className="w-3.5 h-3.5 text-[#EBFA00]" />
                          {photoCount} fotos
                        </span>
                      </div>

                      <span
                        className="px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center gap-1.5 group-hover:scale-105 shadow-lg shrink-0"
                        style={{
                          backgroundColor:
                            card.accentColor === '#03AF45' ? '#03AF45' : '#D90302',
                        }}
                      >
                        <span>Ver sección</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#EBFA00]" />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )
        ) : (
          /* Ver Menús en PDF Tab (4 PDFs separados dentro de la misma pestaña) */
          <div className="space-y-6">
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

            <div className="rounded-3xl bg-[#121215] border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-5 sm:p-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#EBFA00]">
                    {selectedPdf.pagesLabel} • {selectedPdf.sizeLabel}
                  </span>
                  <h2 className="font-serif text-xl font-bold text-white mt-0.5">
                    {selectedPdf.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">{selectedPdf.subtitle}</p>
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
                    className="px-4 py-2 rounded-full bg-[#D90302] hover:bg-[#b00201] text-xs font-bold text-white uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Abrir PDF</span>
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

      {/* Category Detail Popup Modal (Opened by card click OR ?categoria=<slug>) */}
      <AnimatePresence>
        {activeCategoryCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseCategory}
            className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0c0f] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Ambient Top Glow */}
              <div
                className="absolute -top-24 right-10 w-64 h-64 rounded-full blur-[110px] pointer-events-none opacity-35"
                style={{ backgroundColor: activeCategoryCard.accentColor }}
              />

              {/* Sticky Modal Header */}
              <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-white/10 bg-[#101014]/95 backdrop-blur-xl flex items-center justify-between gap-4 relative z-10 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl p-2 rounded-xl bg-white/[0.05] border border-white/10 shrink-0">
                    {activeCategoryCard.emoji}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-serif text-xl sm:text-2xl font-black text-white truncate">
                        {activeCategoryCard.label}
                      </h2>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                        style={{
                          backgroundColor: activeCategoryCard.badgeColor,
                          color:
                            activeCategoryCard.badgeColor === '#EBFA00' ? '#080808' : '#ffffff',
                        }}
                      >
                        {activeCategoryCard.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">
                      {activeCategoryCard.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseCategory}
                  aria-label="Cerrar sección"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[#D90302] text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="overflow-y-auto p-5 sm:p-7 space-y-8 relative z-10">
                {/* Visual Gallery Strip for this Section */}
                {modalGallery.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                      <BookOpen className="w-3.5 h-3.5 text-[#EBFA00]" />
                      <span className="uppercase tracking-wider font-semibold text-[11px]">
                        Fotografías & Páginas Oficiales ({modalGallery.length} • Toca para ampliar)
                      </span>
                    </div>

                    <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar">
                      {modalGallery.map((page) => (
                        <button
                          key={`${activeCategoryCard.id}-${page.image}-${page.title}`}
                          type="button"
                          onClick={() => setZoomedPage(page)}
                          className="group relative shrink-0 w-36 sm:w-44 rounded-2xl overflow-hidden bg-[#141418] border border-white/10 hover:border-[#D90302]/60 transition-all shadow-lg cursor-pointer text-left"
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
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-full bg-black/80 text-white text-[10px] font-semibold flex items-center gap-1 border border-white/15">
                              <ZoomIn className="w-3 h-3 text-[#EBFA00]" />
                              <span>Ampliar</span>
                            </span>
                          </div>
                          <div className="p-2 bg-[#141418] border-t border-white/[0.06]">
                            <p className="text-[11px] font-medium text-zinc-300 truncate">
                              {page.title}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section Content: Promociones (Bento Glow Cards) OR Dishes Grid */}
                {activeCategoryCard.id === 'promociones' ? (
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
                      <Tag className="w-3.5 h-3.5 text-[#EBFA00]" />
                      <span className="uppercase tracking-wider font-semibold text-[11px]">
                        Promociones Activas ({SITE_CONTENT.promos.length})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {SITE_CONTENT.promos.map((promo) => {
                        const accentColor = promo.accentColor || '#D90302';
                        const badgeColor = promo.badgeColor || '#D90302';
                        const isAdded = selectedOrderItems.includes(promo.title);

                        return (
                          <div
                            key={promo.id}
                            className="group relative rounded-3xl p-6 glass-panel border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
                            style={{
                              boxShadow: `0 10px 35px -15px ${accentColor}40`,
                            }}
                          >
                            <div
                              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[75px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"
                              style={{ backgroundColor: accentColor }}
                            />

                            <div>
                              <div className="flex items-center justify-between gap-2 mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl p-1.5 rounded-xl bg-white/[0.05] border border-white/10">
                                    {promo.emoji || '🔥'}
                                  </span>
                                  {promo.badge && (
                                    <span
                                      className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
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
                                  title="Copiar detalles"
                                >
                                  {copiedPromoId === promo.id ? (
                                    <Check className="w-3.5 h-3.5 text-[#03AF45]" />
                                  ) : (
                                    <Share2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>

                              <div className="flex items-baseline justify-between gap-2 mb-2">
                                <h3 className="font-serif text-lg sm:text-xl font-extrabold text-white group-hover:text-[#EBFA00] transition-colors">
                                  {promo.title}
                                </h3>
                                <span
                                  className="text-base sm:text-lg font-black shrink-0"
                                  style={{ color: badgeColor === '#EBFA00' ? '#EBFA00' : '#ffffff' }}
                                >
                                  {promo.highlightPrice}
                                </span>
                              </div>

                              {promo.schedule && (
                                <p className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5 mb-2.5">
                                  <Clock className="w-3 h-3 text-[#EBFA00]" />
                                  <span>{promo.schedule}</span>
                                </p>
                              )}

                              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                                {promo.description}
                              </p>
                            </div>

                            <div className="pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] text-zinc-500 italic">
                                {promo.terms ? `* ${promo.terms}` : '* Aplica en restaurante.'}
                              </span>

                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => toggleOrderItem(promo.title)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer flex items-center gap-1 ${
                                    isAdded
                                      ? 'bg-[#03AF45]/20 border-[#03AF45]/50 text-[#03AF45]'
                                      : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-zinc-300'
                                  }`}
                                >
                                  {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                  <span>{isAdded ? 'Agregada' : 'Agregar'}</span>
                                </button>

                                <a
                                  href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(`Hola Tony's Grill, deseo aprovechar la promoción: ${promo.title}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5 shadow-md"
                                  style={{
                                    backgroundColor:
                                      accentColor === '#03AF45' ? '#03AF45' : '#D90302',
                                  }}
                                >
                                  <Send className="w-3 h-3 text-[#EBFA00]" />
                                  <span>Aprovechar</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
                      <Utensils className="w-3.5 h-3.5 text-[#D90302]" />
                      <span className="uppercase tracking-wider font-semibold text-[11px]">
                        Platillos & Precios ({modalDishes.length} opciones)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {modalDishes.map((item) => {
                        const isAdded = selectedOrderItems.includes(item.nombre);
                        const displayPrice =
                          item.precioLabel || `Q${Number(item.precioQ).toFixed(2)}`;
                        return (
                          <div
                            key={item.id}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                              isAdded
                                ? 'bg-[#17171b] border-[#D90302]/60 shadow-lg'
                                : 'bg-[#121216] hover:bg-[#16161b] border-white/[0.07] hover:border-white/20'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-serif text-base font-bold text-white leading-snug">
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
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pre-Selected Order Floating Summary */}
      <AnimatePresence>
        {selectedOrderItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-20 md:bottom-24 inset-x-4 sm:inset-x-auto sm:left-6 sm:max-w-md z-[95] p-4 rounded-2xl bg-[#141418]/95 border border-[#D90302]/40 shadow-2xl flex items-center justify-between gap-4 backdrop-blur-xl"
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
