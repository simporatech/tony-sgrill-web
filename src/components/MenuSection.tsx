import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UtensilsCrossed, 
  Flame, 
  FileText, 
  Search, 
  Sparkles, 
  Clock, 
  PlusCircle,
  Check
} from 'lucide-react';
import { FEATURED_DISHES, MENU_CATEGORIES, MenuItem } from '../data/restaurantData';

interface MenuSectionProps {
  onOpenPdfMenu: () => void;
  onSelectItemForReservation?: (dishName: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenPdfMenu, onSelectItemForReservation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const filteredDishes = FEATURED_DISHES.filter((dish) => {
    const matchesCategory = selectedCategory === 'todos' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectDish = (dish: MenuItem) => {
    setAddedItem(dish.id);
    if (onSelectItemForReservation) {
      onSelectItemForReservation(dish.name);
    }
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-[#080808] text-white">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#D90302]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#EBFA00] mb-3">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Carta Gastronómica Selecta
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Placeres al <span className="fire-gradient-text">Fuego Vivo</span>
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl">
              Deleita tus sentidos con nuestra cuidada selección de carnes asadas, masas artesanales y creaciones del chef preparadas en el acto.
            </p>
          </div>

          {/* Quick PDF CTA button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPdfMenu}
              className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 group cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#EBFA00] group-hover:scale-110 transition-transform" />
              <span>Ver Menú Digital (PDF)</span>
            </button>
          </div>
        </div>

        {/* Filter controls bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {MENU_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#D90302] text-white shadow-md shadow-[#D90302]/30 scale-105'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar corte o platillo..."
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#EBFA00] transition-colors"
            />
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden glass-card hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                  
                  {dish.tag && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#EBFA00] border border-white/10 shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#EBFA00]" />
                      {dish.tag}
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-sm font-black bg-[#D90302] text-white shadow-xl">
                    {dish.price}
                  </span>
                </div>

                {/* Dish Info */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#EBFA00] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-light">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#03AF45]" /> Hecho al momento
                    </span>

                    <button
                      onClick={() => handleSelectDish(dish)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                        addedItem === dish.id
                          ? 'bg-[#03AF45] text-white'
                          : 'bg-white/5 hover:bg-[#D90302] text-white'
                      }`}
                    >
                      {addedItem === dish.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>¡Agregado!</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Pedir al reservar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-16">
            <UtensilsCrossed className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No encontramos platillos con ese término de búsqueda.</p>
            <button
              onClick={() => { setSelectedCategory('todos'); setSearchQuery(''); }}
              className="mt-3 text-xs text-[#EBFA00] underline font-bold"
            >
              Restablecer filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

