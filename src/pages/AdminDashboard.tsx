import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  RotateCcw, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Layout, 
  UtensilsCrossed, 
  Tag, 
  ArrowLeft,
  X,
  Sparkles,
  Phone,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { useCmsData, CmsMenuItem, CmsPromoItem } from '../context/CmsContext';
import { CustomSelect } from '../components/ui/CustomSelect';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    updateHero,
    updateAbout,
    updateEvents,
    updateContact,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addCategory,
    deleteCategory,
    addPromo,
    updatePromo,
    deletePromo,
    resetToDefaults,
  } = useCmsData();

  const [activeTab, setActiveTab] = useState<'settings' | 'landing' | 'menu' | 'promos'>('menu');
  const [showPanicConfirm, setShowPanicConfirm] = useState(false);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  // Landing form local states
  const [heroForm, setHeroForm] = useState(data.hero);
  const [aboutForm, setAboutForm] = useState(data.about);
  const [eventsForm, setEventsForm] = useState(data.events);
  const [contactForm, setContactForm] = useState(data.contact);

  // New Menu Item form
  const [newItemCategory, setNewItemCategory] = useState<string>(data.categories[0]?.id || 'carnes');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<string>('');

  // Editing menu item
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemName, setEditItemName] = useState('');
  const [editItemPrice, setEditItemPrice] = useState<string>('');
  const [editItemCategory, setEditItemCategory] = useState('');

  // New Category
  const [newCatId, setNewCatId] = useState('');
  const [newCatLabel, setNewCatLabel] = useState('');

  // Promo Form
  const [newPromoTitle, setNewPromoTitle] = useState('');
  const [newPromoPrice, setNewPromoPrice] = useState('');
  const [newPromoSchedule, setNewPromoSchedule] = useState('');
  const [newPromoDesc, setNewPromoDesc] = useState('');
  const [newPromoTerms, setNewPromoTerms] = useState('');
  const [newPromoBadge, setNewPromoBadge] = useState('');
  const [newPromoEmoji, setNewPromoEmoji] = useState('🍳');

  const showNotification = (msg: string) => {
    setSavedNotification(msg);
    setTimeout(() => setSavedNotification(null), 3000);
  };

  const handleSaveLanding = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroForm);
    updateAbout(aboutForm);
    updateEvents(eventsForm);
    updateContact(contactForm);
    showNotification('¡Textos y portada guardados correctamente!');
  };

  const handleCreateMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(newItemPrice);
    if (!newItemName.trim() || isNaN(priceNum) || priceNum < 0) return;

    const catObj = data.categories.find(c => c.id === newItemCategory);
    addMenuItem({
      name: newItemName.trim(),
      price: priceNum,
      category_id: newItemCategory,
      category_name: catObj?.label || 'General',
    });

    setNewItemName('');
    setNewItemPrice('');
    showNotification('Platillo añadido al menú');
  };

  const startEditItem = (item: CmsMenuItem) => {
    setEditingItemId(item.id);
    setEditItemName(item.name);
    setEditItemPrice(String(item.price));
    setEditItemCategory(item.category_id);
  };

  const handleSaveEditItem = () => {
    if (!editingItemId) return;
    const priceNum = parseFloat(editItemPrice);
    if (!editItemName.trim() || isNaN(priceNum)) return;

    const catObj = data.categories.find(c => c.id === editItemCategory);
    updateMenuItem(editingItemId, {
      name: editItemName.trim(),
      price: priceNum,
      category_id: editItemCategory,
      category_name: catObj?.label || 'General',
    });

    setEditingItemId(null);
    showNotification('Platillo actualizado');
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatLabel.trim()) return;
    const id = newCatId.trim() || newCatLabel.toLowerCase().replace(/[^a-z0-9]/g, '-');
    addCategory({ id, label: newCatLabel.trim() });
    setNewCatId('');
    setNewCatLabel('');
    showNotification('Categoría creada');
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoTitle.trim() || !newPromoPrice.trim()) return;

    addPromo({
      emoji: newPromoEmoji.trim() || '🔥',
      badge: newPromoBadge.trim() || 'Especial',
      badgeColor: '#D90302',
      title: newPromoTitle.trim(),
      highlightPrice: newPromoPrice.trim(),
      schedule: newPromoSchedule.trim() || 'Horario regular',
      description: newPromoDesc.trim(),
      terms: newPromoTerms.trim() || 'Aplican restricciones',
      accentColor: '#D90302',
    });

    setNewPromoTitle('');
    setNewPromoPrice('');
    setNewPromoSchedule('');
    setNewPromoDesc('');
    setNewPromoTerms('');
    setNewPromoBadge('');
    showNotification('Promoción creada');
  };

  const handlePanicReset = () => {
    resetToDefaults();
    setHeroForm(data.hero);
    setAboutForm(data.about);
    setEventsForm(data.events);
    setContactForm(data.contact);
    setShowPanicConfirm(false);
    showNotification('⚠️ Todo el sistema ha sido restablecido a los valores originales.');
  };

  const categoryOptions = data.categories.map(c => ({
    value: c.id,
    label: c.label,
  }));

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pt-24 pb-20">
      
      {/* Toast Notification */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#03AF45] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Top Banner Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D90302]/20 border border-[#D90302]/40 text-[#EBFA00] text-[10px] font-extrabold uppercase tracking-widest">
                Panel de Administración Local
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Modo React State + LocalStorage</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              CMS Tony's Grill
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Web en Vivo</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'menu'
                ? 'bg-[#D90302] text-white shadow-lg shadow-[#D90302]/30'
                : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Gestor de Menú ({data.menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('promos')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'promos'
                ? 'bg-[#D90302] text-white shadow-lg shadow-[#D90302]/30'
                : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Gestor de Promos ({data.promos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('landing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-[#D90302] text-white shadow-lg shadow-[#D90302]/30'
                : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Editor de Portada & Textos</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-zinc-800 text-white shadow-md'
                : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            <span>Ajustes & Botón de Pánico</span>
          </button>
        </div>
      </div>

      {/* Main CMS Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ======================================================== */}
        {/* MODULE 1: MENU MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'menu' && (
          <div className="space-y-8">
            {/* Add New Dish Box */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/10 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#03AF45]" />
                Agregar Nuevo Platillo al Menú
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                El precio debe ser un valor numérico exacto (se formateará automáticamente con "Q").
              </p>

              <form onSubmit={handleCreateMenuItem} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Categoría
                  </label>
                  <CustomSelect
                    value={newItemCategory}
                    onChange={(val) => setNewItemCategory(val)}
                    options={categoryOptions}
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Nombre del Platillo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Churrasco Especial 10oz"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Precio (Q)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      required
                      placeholder="0.00"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="w-full px-4 py-3 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-[#03AF45] hover:bg-[#028f39] text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-1.5 shadow-lg shadow-[#03AF45]/20 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Manage Categories Section */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/10 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-white mb-1">
                Categorías Activas ({data.categories.length})
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                Puedes añadir nuevas categorías para el menú web o eliminar las no deseadas.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {data.categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="px-3.5 py-1.5 rounded-full bg-[#18181b] border border-white/10 text-xs font-medium text-zinc-200 flex items-center gap-2"
                  >
                    <span>{cat.label}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`¿Eliminar la categoría "${cat.label}" y sus platillos asociados?`)) {
                          deleteCategory(cat.id);
                        }
                      }}
                      className="text-zinc-500 hover:text-red-400 text-xs cursor-pointer"
                      title="Eliminar categoría"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCreateCategory} className="flex gap-2 max-w-md pt-2">
                <input
                  type="text"
                  required
                  placeholder="Nombre de la nueva categoría"
                  value={newCatLabel}
                  onChange={(e) => setNewCatLabel(e.target.value)}
                  className="flex-grow px-3.5 py-2 bg-[#18181b] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  + Categoría
                </button>
              </form>
            </div>

            {/* List of Menu Items grouped by Category */}
            <div className="space-y-6">
              {data.categories.map((cat) => {
                const itemsInCat = data.menuItems.filter((i) => i.category_id === cat.id);
                return (
                  <div key={cat.id} className="p-6 rounded-2xl bg-[#121214] border border-white/10 shadow-lg">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
                      <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span>{cat.label}</span>
                        <span className="text-xs text-zinc-500 font-mono font-normal">
                          ({itemsInCat.length} platillos)
                        </span>
                      </h4>
                    </div>

                    {itemsInCat.length === 0 ? (
                      <p className="text-xs text-zinc-500 italic py-2">
                        No hay platillos registrados en esta categoría aún.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {itemsInCat.map((item) => {
                          const isEditing = editingItemId === item.id;
                          return (
                            <div
                              key={item.id}
                              className={`p-3.5 rounded-xl border transition-all ${
                                isEditing
                                  ? 'bg-[#1c1c20] border-[#D90302]'
                                  : 'bg-[#161619] border-white/[0.05] hover:border-white/15'
                              } flex items-center justify-between gap-3`}
                            >
                              {isEditing ? (
                                <div className="w-full flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={editItemName}
                                    onChange={(e) => setEditItemName(e.target.value)}
                                    className="flex-grow px-2.5 py-1.5 bg-[#121214] border border-white/20 rounded-lg text-xs text-white"
                                  />
                                  <input
                                    type="number"
                                    step="0.5"
                                    value={editItemPrice}
                                    onChange={(e) => setEditItemPrice(e.target.value)}
                                    className="w-20 px-2.5 py-1.5 bg-[#121214] border border-white/20 rounded-lg text-xs text-white"
                                  />
                                  <button
                                    onClick={handleSaveEditItem}
                                    className="p-1.5 bg-[#03AF45] text-white rounded-lg text-xs hover:bg-[#028a37]"
                                    title="Guardar"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setEditingItemId(null)}
                                    className="p-1.5 bg-zinc-700 text-zinc-300 rounded-lg text-xs hover:bg-zinc-600"
                                    title="Cancelar"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <div className="min-w-0 flex-grow">
                                    <p className="text-xs sm:text-sm font-semibold text-white truncate">
                                      {item.name}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="font-serif text-xs sm:text-sm font-bold text-white px-2 py-0.5 rounded bg-white/[0.04]">
                                      Q{item.price.toFixed(2)}
                                    </span>
                                    <button
                                      onClick={() => startEditItem(item)}
                                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                                      title="Editar platillo"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`¿Eliminar "${item.name}"?`)) {
                                          deleteMenuItem(item.id);
                                        }
                                      }}
                                      className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                                      title="Eliminar platillo"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 2: PROMOS MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'promos' && (
          <div className="space-y-8">
            {/* Create Promo Box */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/10 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#EBFA00]" />
                Crear Nueva Promoción
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Gestiona las promociones que aparecen en la página /promos.
              </p>

              <form onSubmit={handleCreatePromo} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Emoji
                    </label>
                    <input
                      type="text"
                      value={newPromoEmoji}
                      onChange={(e) => setNewPromoEmoji(e.target.value)}
                      placeholder="🍳"
                      className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-center text-sm text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Título de la Promoción
                    </label>
                    <input
                      type="text"
                      required
                      value={newPromoTitle}
                      onChange={(e) => setNewPromoTitle(e.target.value)}
                      placeholder="Ej. Desayuno Especial 2xQ60"
                      className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Precio Destacado
                    </label>
                    <input
                      type="text"
                      required
                      value={newPromoPrice}
                      onChange={(e) => setNewPromoPrice(e.target.value)}
                      placeholder="Ej. 2x Q60 o 25% OFF"
                      className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Insignia / Badge
                    </label>
                    <input
                      type="text"
                      value={newPromoBadge}
                      onChange={(e) => setNewPromoBadge(e.target.value)}
                      placeholder="Ej. Lunes a Viernes"
                      className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Horario / Días de Validez
                    </label>
                    <input
                      type="text"
                      value={newPromoSchedule}
                      onChange={(e) => setNewPromoSchedule(e.target.value)}
                      placeholder="Ej. De 7:00 AM a 11:30 AM"
                      className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Descripción
                  </label>
                  <textarea
                    rows={2}
                    value={newPromoDesc}
                    onChange={(e) => setNewPromoDesc(e.target.value)}
                    placeholder="Detalles sobre qué incluye la promoción..."
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#D90302] hover:bg-[#b00201] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer"
                  >
                    Crear Promoción
                  </button>
                </div>
              </form>
            </div>

            {/* List Active Promos */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">
                Promociones Vigentes ({data.promos.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.promos.map((promo) => (
                  <div
                    key={promo.id}
                    className="p-5 rounded-2xl bg-[#121214] border border-white/10 flex flex-col justify-between gap-3 shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xl">{promo.emoji}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D90302] text-white">
                          {promo.badge}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h4 className="font-serif text-base font-bold text-white">
                          {promo.title}
                        </h4>
                        <span className="text-sm font-black text-[#EBFA00]">
                          {promo.highlightPrice}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed mb-2">
                        {promo.description}
                      </p>
                      <p className="text-[11px] text-zinc-500 italic">
                        * {promo.terms}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex justify-end">
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar la promoción "${promo.title}"?`)) {
                            deletePromo(promo.id);
                          }
                        }}
                        className="text-xs text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 3: LANDING PAGE EDITOR */}
        {/* ======================================================== */}
        {activeTab === 'landing' && (
          <form onSubmit={handleSaveLanding} className="space-y-8">
            
            {/* HERO SETTINGS */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EBFA00]" />
                Sección Hero (Portada)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Sub-etiqueta (Tagline)
                  </label>
                  <input
                    type="text"
                    value={heroForm.tagline}
                    onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Titular Línea 1
                  </label>
                  <input
                    type="text"
                    value={heroForm.headlineMain}
                    onChange={(e) => setHeroForm({ ...heroForm, headlineMain: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Titular Línea Acento (Rojo)
                  </label>
                  <input
                    type="text"
                    value={heroForm.headlineAccent}
                    onChange={(e) => setHeroForm({ ...heroForm, headlineAccent: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Titular Línea Ciudad
                  </label>
                  <input
                    type="text"
                    value={heroForm.headlineCity}
                    onChange={(e) => setHeroForm({ ...heroForm, headlineCity: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Subtítulo Descriptivo
                </label>
                <textarea
                  rows={2}
                  value={heroForm.subheadline}
                  onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-[#03AF45]" />
                  URL de Imagen de Fondo (Pega un enlace válido)
                </label>
                <input
                  type="url"
                  value={heroForm.bgImageUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, bgImageUrl: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-[#D90302]"
                />
              </div>
            </div>

            {/* ABOUT US SETTINGS */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">
                Sección Nosotros
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={aboutForm.title}
                    onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Acento de Título (Rojo)
                  </label>
                  <input
                    type="text"
                    value={aboutForm.titleAccent}
                    onChange={(e) => setAboutForm({ ...aboutForm, titleAccent: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Descripción Oficial
                </label>
                <textarea
                  rows={2}
                  value={aboutForm.description}
                  onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                />
              </div>
            </div>

            {/* EVENTS SETTINGS */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">
                Sección Eventos & Banquetes
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Título Eventos
                  </label>
                  <input
                    type="text"
                    value={eventsForm.title}
                    onChange={(e) => setEventsForm({ ...eventsForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Acento Título (Rojo)
                  </label>
                  <input
                    type="text"
                    value={eventsForm.titleAccent}
                    onChange={(e) => setEventsForm({ ...eventsForm, titleAccent: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Descripción del Servicio
                </label>
                <textarea
                  rows={2}
                  value={eventsForm.description}
                  onChange={(e) => setEventsForm({ ...eventsForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-[#03AF45]" />
                  URL de Imagen de Banquetes (Pega un enlace válido)
                </label>
                <input
                  type="url"
                  value={eventsForm.imageUrl}
                  onChange={(e) => setEventsForm({ ...eventsForm, imageUrl: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-[#D90302]"
                />
              </div>
            </div>

            {/* CONTACT SETTINGS */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#03AF45]" />
                Datos de Contacto & Ubicación
              </h3>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Dirección Completa
                </label>
                <input
                  type="text"
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Teléfono Fijo
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={contactForm.whatsapp}
                    onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Horario de Servicio
                  </label>
                  <input
                    type="text"
                    value={contactForm.schedule}
                    onChange={(e) => setContactForm({ ...contactForm, schedule: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D90302]"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#03AF45] hover:bg-[#028f39] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios de Portada</span>
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* MODULE 4: GLOBAL SETTINGS & PANIC BUTTON */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            {/* System Status */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">
                Estado del Sistema (CMS Local)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-zinc-500 uppercase font-semibold">Platillos Activos</p>
                  <p className="text-xl font-bold text-white mt-1">{data.menuItems.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-zinc-500 uppercase font-semibold">Categorías</p>
                  <p className="text-xl font-bold text-white mt-1">{data.categories.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-zinc-500 uppercase font-semibold">Promociones</p>
                  <p className="text-xl font-bold text-white mt-1">{data.promos.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-zinc-500 uppercase font-semibold">Almacenamiento</p>
                  <p className="text-xl font-bold text-[#03AF45] mt-1">LocalStorage OK</p>
                </div>
              </div>
            </div>

            {/* THE PANIC BUTTON (PROMINENT RED BUTTON) */}
            <div className="p-8 rounded-2xl bg-red-950/20 border border-red-600/30 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-600/20 text-red-500 shrink-0">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-serif text-xl font-bold text-red-400">
                    Botón de Pánico: Restablecer a Valores por Defecto
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed max-w-2xl">
                    Si modificaste textos, precios o categorías y deseas regresar a la configuración original de fábrica (la "Semilla" de Tony's Grill), pulsa el botón a continuación. Esta acción limpia la clave de <code>localStorage</code> y recarga la aplicación con todos los datos oficiales.
                  </p>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setShowPanicConfirm(true)}
                      className="px-7 py-3.5 bg-[#D90302] hover:bg-[#b00201] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-red-900/40 flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Restablecer a Valores por Defecto</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Panic Confirmation Modal */}
            {showPanicConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="bg-[#161619] border border-red-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white mb-2">
                    ¿Confirmas el restablecimiento total?
                  </h4>
                  <p className="text-xs text-zinc-300 mb-6 leading-relaxed">
                    Se borrarán las modificaciones locales en menús, precios, portadas y promociones, volviendo a los datos iniciales predeterminados (DEFAULT_CMS_DATA).
                  </p>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowPanicConfirm(false)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-semibold transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handlePanicReset}
                      className="px-5 py-2.5 rounded-xl bg-[#D90302] hover:bg-red-700 text-xs text-white font-bold uppercase tracking-wider transition-colors shadow-lg"
                    >
                      Sí, Restablecer Todo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

