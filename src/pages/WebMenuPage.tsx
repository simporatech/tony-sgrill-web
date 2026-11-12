import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  Utensils, 
  Calendar, 
  Check, 
  Plus, 
  Database,
  Send,
  Coffee,
  Flame,
  Fish,
  UtensilsCrossed,
  Sandwich,
  Pizza,
  Heart
} from 'lucide-react';
import { MENU_CATEGORIES, EXACT_MENU_DATABASE, MenuItemRow } from '../data/menuSupabaseData';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const WebMenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [showJsonSchema, setShowJsonSchema] = useState<boolean>(false);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'desayunos': return Coffee;
      case 'carnes': return Flame;
      case 'mariscos': return Fish;
      case 'pastas': return UtensilsCrossed;
      case 'hamburguesas': return Sandwich;
      case 'antojitos': return Heart;
      case 'pizzas': return Pizza;
      default: return Utensils;
    }
  };

  const filteredItems = useMemo(() => {
    return EXACT_MENU_DATABASE.filter((item) => {
      const matchCat = selectedCategory === 'todos' || item.category_id === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category_name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Group items by category for the editorial luxury layout
  const groupedItems = useMemo(() => {
    const groups: { [key: string]: { name: string; items: MenuItemRow[] } } = {};
    
    MENU_CATEGORIES.filter(c => c.id !== 'todos').forEach((cat) => {
      const itemsInCat = filteredItems.filter(item => item.category_id === cat.id);
      if (itemsInCat.length > 0) {
        groups[cat.id] = {
          name: cat.label,
          items: itemsInCat,
        };
      }
    });

    return groups;
  }, [filteredItems]);

  const toggleSelectDish = (name: string) => {
    setSelectedDishes((prev) => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-28 pb-24 relative overflow-hidden font-sans">
      
      {/* Subtle Ambient Background Scrim */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D90302]/8 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium block mb-3">
            Carta Gastronómica Oficial
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight uppercase"
          >
            MENÚ <span className="text-[#D90302]">TONY'S GRILL</span>
          </motion.h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Consulte nuestra selección de desayunos, cortes a la parrilla, mariscos, pastas, hamburguesas, antojitos y pizzas preparadas al momento en Chiquimula.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono">
              Precios en Quetzales (Q) • IVA Incluido
            </span>
            <button
              onClick={() => setShowJsonSchema(!showJsonSchema)}
              className="text-[11px] text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/10"
              title="Ver esquema para Supabase"
            >
              <Database className="w-3 h-3 text-[#03AF45]" />
              <span>{showJsonSchema ? 'Ocultar JSON' : 'Estructura Supabase'}</span>
            </button>
          </div>
        </div>

        {/* Supabase Schema Preview Accordion */}
        <AnimatePresence>
          {showJsonSchema && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden"
            >
              <div className="p-6 rounded-2xl bg-[#111113] border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <Database className="w-4 h-4 text-[#03AF45]" />
                    <span>Dataset estructurado listo para migración a Supabase / PostgreSQL</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {EXACT_MENU_DATABASE.length} registros cargados
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-zinc-300 max-h-48 overflow-y-auto">
                  <pre>{JSON.stringify(EXACT_MENU_DATABASE.slice(0, 4), null, 2)}</pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter & Search Bar */}
        <div className="sticky top-20 z-30 mb-12 py-3.5 px-4 sm:px-6 rounded-2xl bg-[#0c0c0e]/95 border border-white/10 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 no-scrollbar">
              {MENU_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-[#D90302] text-white shadow-md shadow-[#D90302]/30 font-semibold'
                        : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.06]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative shrink-0 w-full lg:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar platillo..."
                className="w-full pl-8 pr-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302] transition-colors"
              />
            </div>

          </div>
        </div>

        {/* Pre-Selected Order Bar */}
        <AnimatePresence>
          {selectedDishes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-40 p-4 rounded-2xl bg-[#141416] border border-white/20 shadow-2xl flex items-center justify-between gap-4 backdrop-blur-xl"
            >
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#03AF45]" />
                  <span>{selectedDishes.length} platillos preseleccionados</span>
                </p>
                <p className="text-[11px] text-zinc-400 truncate max-w-xs mt-0.5">
                  {selectedDishes.join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(`Hola Tony's Grill, deseo ordenar o reservar los siguientes platillos del menú:\n- ${selectedDishes.join('\n- ')}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#03AF45] hover:bg-[#028a37] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Pedir</span>
                </a>

                <button
                  onClick={() => setSelectedDishes([])}
                  className="p-1.5 text-zinc-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* TEXT-ONLY EDITORIAL MENU LAYOUT (NO IMAGES, PURE TYPOGRAPHY) */}
        {/* ======================================================== */}
        <div className="space-y-16">
          {Object.entries(groupedItems).map(([categoryId, catGroup]) => {
            const CatIcon = getCategoryIcon(categoryId);
            return (
              <section key={categoryId} id={categoryId} className="scroll-mt-36">
                
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/[0.08]">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D90302]">
                    <CatIcon className="w-4 h-4" />
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                    {catGroup.name}
                  </h2>
                  <div className="flex-grow" />
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {catGroup.items.length} {catGroup.items.length === 1 ? 'platillo' : 'platillos'}
                  </span>
                </div>

                {/* Minimalist Grid of Dishes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                  {catGroup.items.map((item) => {
                    const isSelected = selectedDishes.includes(item.name);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        onClick={() => toggleSelectDish(item.name)}
                        className={`group p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#18181b] border-[#D90302]/60 shadow-lg'
                            : 'bg-[#101012] hover:bg-[#161619] border-white/[0.05] hover:border-white/15'
                        }`}
                      >
                        {/* Name and dot leader */}
                        <div className="flex-grow flex items-baseline gap-2 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#EBFA00] transition-colors truncate">
                            {item.name}
                          </h3>
                        </div>

                        {/* Price & Selection indicator */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-serif text-base sm:text-lg font-bold text-zinc-100 group-hover:text-[#EBFA00] transition-colors tracking-tight">
                            {item.formatted_price}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelectDish(item.name);
                            }}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                              isSelected
                                ? 'bg-[#03AF45] text-white'
                                : 'bg-white/5 text-zinc-500 group-hover:text-white group-hover:bg-white/10'
                            }`}
                            title="Seleccionar platillo"
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
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

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Utensils className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No se encontraron platillos con el término de búsqueda.</p>
            <button
              onClick={() => { setSelectedCategory('todos'); setSearchQuery(''); }}
              className="mt-3 text-xs text-[#D90302] hover:underline font-bold"
            >
              Restablecer filtros
            </button>
          </div>
        )}

        {/* Bottom Reservation Action */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#111113] border border-white/10 text-center max-w-3xl mx-auto shadow-2xl flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold block mb-2">
            Visítenos en Chiquimula
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            ¿Desea realizar una reservación?
          </h3>
          <p className="mt-2 text-zinc-400 text-xs sm:text-sm max-w-md">
            Reserve su mesa con anticipación o contáctenos directamente para pedidos especiales.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/#reservar"
              className="px-7 py-3 rounded-full bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#D90302]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Mesa</span>
            </a>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=Hola%20Tony's%20Grill,%20deseo%20hacer%20una%20consulta%20del%20menú`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs border border-white/10 transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-[#03AF45]" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
