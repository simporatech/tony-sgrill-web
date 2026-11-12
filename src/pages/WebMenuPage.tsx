import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Search, 
  Sparkles, 
  Clock, 
  Utensils, 
  CalendarDays, 
  Check, 
  Plus, 
  Filter, 
  Database,
  ArrowRight,
  Send,
  Coffee,
  Pizza,
  Wine,
  Sandwich,
  UtensilsCrossed
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS_DATABASE, MenuItemRow } from '../data/menuSupabaseData';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const WebMenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlySignatures, setOnlySignatures] = useState<boolean>(false);
  const [selectedForOrder, setSelectedForOrder] = useState<string[]>([]);
  const [showDbInspector, setShowDbInspector] = useState<boolean>(false);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'carnes': return Flame;
      case 'pizzas': return Pizza;
      case 'desayunos': return Coffee;
      case 'pastas': return UtensilsCrossed;
      case 'hamburguesas': return Sandwich;
      case 'entradas': return Sparkles;
      case 'bebidas': return Wine;
      default: return Utensils;
    }
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS_DATABASE.filter((item) => {
      const matchCat = selectedCategory === 'todos' || item.category_id === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSignature = !onlySignatures || item.is_signature;
      return matchCat && matchSearch && matchSignature;
    });
  }, [selectedCategory, searchQuery, onlySignatures]);

  // Group items by category for an editorial menu experience
  const groupedItems = useMemo(() => {
    const groups: { [key: string]: { label: string; subtitle: string; items: MenuItemRow[] } } = {};
    
    MENU_CATEGORIES.forEach((cat) => {
      const itemsInCat = filteredItems.filter(item => item.category_id === cat.id);
      if (itemsInCat.length > 0) {
        groups[cat.id] = {
          label: cat.label,
          subtitle: cat.subtitle,
          items: itemsInCat,
        };
      }
    });

    return groups;
  }, [filteredItems]);

  const toggleSelectDish = (name: string) => {
    setSelectedForOrder((prev) => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-28 pb-24 relative overflow-hidden font-poppins">
      
      {/* Background radial luxury lighting */}
      <div className="absolute top-20 left-1/4 w-[700px] h-[500px] bg-[#D90302]/8 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-40 right-1/4 w-[600px] h-[500px] bg-[#EBFA00]/6 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#EBFA00] mb-4 shadow-lg backdrop-blur-md"
          >
            <Utensils className="w-3.5 h-3.5 fill-[#EBFA00]" />
            Carta Gastronómica Oficial • Chiquimula
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight"
          >
            NUESTRA <span className="gold-gradient-text">CARTA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Cada platillo es elaborado con ingredientes locales selectos, maduración óptima y el toque inconfundible del fuego al carbón y la leña.
          </motion.p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-xs text-zinc-500 font-medium tracking-widest uppercase">
              Precios en Quetzales (Q) • IVA Incluido
            </span>
            <button
              onClick={() => setShowDbInspector(!showDbInspector)}
              className="text-[11px] text-zinc-400 hover:text-[#EBFA00] transition-colors flex items-center gap-1 cursor-pointer bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/10"
              title="Ver esquema compatible con Supabase"
            >
              <Database className="w-3 h-3 text-[#03AF45]" />
              <span>{showDbInspector ? 'Ocultar JSON' : 'Estructura Supabase'}</span>
            </button>
          </div>
        </div>

        {/* Supabase Schema Modal / Preview Panel */}
        <AnimatePresence>
          {showDbInspector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 overflow-hidden"
            >
              <div className="p-6 rounded-3xl bg-[#0e0e11] border border-[#03AF45]/30 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#03AF45]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Dataset Listo para Migración a Supabase (PostgreSQL)
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {MENU_ITEMS_DATABASE.length} registros cargados
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mb-4">
                  Estructurado con UUID v4, tipos numéricos estables, llaves foráneas para categorías y atributos booleanos para migración directa vía SQL o Supabase Studio.
                </p>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-zinc-300 max-h-48 overflow-y-auto">
                  <pre>{JSON.stringify(MENU_ITEMS_DATABASE.slice(0, 3), null, 2)}</pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Filter & Search Control Panel */}
        <div className="sticky top-20 z-30 mb-14 py-4 px-4 sm:px-6 rounded-2xl glass-panel border border-white/15 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <button
                onClick={() => setSelectedCategory('todos')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === 'todos'
                    ? 'bg-[#D90302] text-white shadow-lg shadow-[#D90302]/30 scale-105'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                Todos los Platillos
              </button>

              {MENU_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                const IconComponent = getCategoryIcon(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-[#D90302] text-white shadow-lg shadow-[#D90302]/30 scale-105'
                        : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${active ? 'text-[#EBFA00]' : 'text-zinc-500'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side: Search & Signature Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar platillo o ingrediente..."
                  className="w-full pl-9 pr-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#EBFA00] transition-colors"
                />
              </div>

              <button
                onClick={() => setOnlySignatures(!onlySignatures)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  onlySignatures
                    ? 'bg-[#EBFA00] text-black shadow-md'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10'
                }`}
                title="Mostrar solo especialidades insignias"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Especialidades</span>
              </button>
            </div>

          </div>
        </div>

        {/* Selected Dishes Floating Bar for Quick WhatsApp or Reservation */}
        <AnimatePresence>
          {selectedForOrder.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-40 p-4 rounded-2xl bg-[#141418] border border-[#EBFA00]/40 shadow-2xl flex items-center justify-between gap-4 backdrop-blur-xl"
            >
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#03AF45]" />
                  <span>{selectedForOrder.length} platillos preseleccionados</span>
                </p>
                <p className="text-[11px] text-zinc-400 truncate max-w-xs mt-0.5">
                  {selectedForOrder.join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(`Hola Tony's Grill, deseo reservar y ordenar por adelantado los siguientes platillos del menú:\n- ${selectedForOrder.join('\n- ')}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#03AF45] hover:bg-[#029139] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ordenar</span>
                </a>

                <button
                  onClick={() => setSelectedForOrder([])}
                  className="p-2 text-zinc-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categorized Editorial Text Menu (NO IMAGES - PURE TYPOGRAPHY EXCELLENCE) */}
        <div className="space-y-20">
          {Object.entries(groupedItems).map(([categoryId, catData]) => {
            const CatIcon = getCategoryIcon(categoryId);
            return (
              <section key={categoryId} id={categoryId} className="scroll-mt-36">
                
                {/* Category Header with Editorial Line */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                    <CatIcon className="w-5 h-5 text-[#EBFA00]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
                      {catData.label}
                    </h2>
                    <p className="text-xs text-zinc-400 font-light mt-0.5">
                      {catData.subtitle}
                    </p>
                  </div>
                  <div className="flex-grow h-[1px] bg-gradient-to-r from-white/15 via-white/5 to-transparent ml-4 hidden md:block" />
                </div>

                {/* Items Grid (2 Columns, Typographic High-End Layout) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {catData.items.map((item) => {
                    const isSelected = selectedForOrder.includes(item.name);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className={`group relative p-5 rounded-2xl transition-all duration-300 border ${
                          isSelected
                            ? 'bg-[#18181b] border-[#EBFA00]/60 shadow-xl'
                            : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] hover:border-white/20'
                        }`}
                      >
                        {/* Title and Price with Classic Dot Leader effect */}
                        <div className="flex items-baseline justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#EBFA00] transition-colors leading-snug">
                              {item.name}
                            </h3>

                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase bg-[#D90302]/20 text-[#EBFA00] border border-[#D90302]/30">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {/* Price Tag in Gold/White */}
                          <div className="shrink-0 flex items-baseline gap-1">
                            <span className="text-xs font-semibold text-zinc-400">Q</span>
                            <span className="font-serif text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-[#EBFA00] transition-colors">
                              {item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Serving size or Preparation details */}
                        {item.serving_size && (
                          <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#03AF45]" />
                            {item.serving_size}
                          </p>
                        )}

                        {/* Dish Description with Elegant Spacing */}
                        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Bottom Metadata & Quick Add */}
                        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                          <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                            <Clock className="w-3 h-3 text-[#EBFA00]" />
                            {item.preparation_time_mins} mins
                          </span>

                          <button
                            onClick={() => toggleSelectDish(item.name)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#03AF45] text-white'
                                : 'bg-white/5 hover:bg-[#D90302] text-zinc-300 hover:text-white'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Seleccionado</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Agregar para reserva</span>
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </section>
            );
          })}
        </div>

        {Object.keys(groupedItems).length === 0 && (
          <div className="text-center py-20">
            <Utensils className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No se encontraron platillos con los filtros aplicados.</p>
            <button
              onClick={() => { setSelectedCategory('todos'); setSearchQuery(''); setOnlySignatures(false); }}
              className="mt-3 text-xs text-[#EBFA00] underline font-bold"
            >
              Restablecer búsqueda
            </button>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl glass-panel border border-white/15 text-center flex flex-col items-center max-w-4xl mx-auto shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D90302] to-[#800000] p-0.5 shadow-lg flex items-center justify-center mb-4">
            <Flame className="w-6 h-6 text-[#EBFA00]" />
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
            ¿Deseas degustar estos cortes hoy mismo?
          </h3>
          <p className="mt-2 text-zinc-400 text-xs sm:text-base max-w-lg">
            Haz tu reservación para asegurar tu mesa en el salón climatizado o en la terraza junto a la parrilla.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/#reservar"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D90302] to-[#b00201] text-white font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-[#D90302]/30 flex items-center gap-2"
            >
              <CalendarDays className="w-4 h-4 text-[#EBFA00]" />
              <span>Reservar Mesa</span>
            </a>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20deseo%20hacer%20un%20pedido%20de%20la%20carta`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#03AF45] hover:bg-[#029139] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

