import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  RotateCcw, 
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
  CheckCircle2,
  LogOut,
  Monitor,
  Smartphone,
  ExternalLink,
  RefreshCw,
  Search,
  Eye,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useCmsData, CmsMenuItem, CmsPromoItem } from '../context/CmsContext';
import { CustomSelect } from '../components/ui/CustomSelect';
import { ImageUploader } from '../components/ui/ImageUploader';
import { AdminLoginGate } from '../components/AdminLoginGate';
import { authService } from '../services/authService';

// Live preview component imports
import { LandingPage } from './LandingPage';
import { WebMenuPage } from './WebMenuPage';
import { PromosPage } from './PromosPage';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => authService.isAuthenticated());

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
    deletePromo,
    resetToDefaults,
  } = useCmsData();

  // Navigation & preview states
  const [activeTab, setActiveTab] = useState<'landing' | 'menu' | 'promos' | 'settings'>('landing');
  const [previewPage, setPreviewPage] = useState<'landing' | 'menu' | 'promos'>('landing');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [showPanicConfirm, setShowPanicConfirm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Menu Manager local states
  const [menuFilterCat, setMenuFilterCat] = useState<string>('todos');
  const [menuSearch, setMenuSearch] = useState<string>('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState(data.categories[0]?.id || 'carnes');

  // Promos Manager local states
  const [newPromoTitle, setNewPromoTitle] = useState('');
  const [newPromoPrice, setNewPromoPrice] = useState('');
  const [newPromoSchedule, setNewPromoSchedule] = useState('');
  const [newPromoDesc, setNewPromoDesc] = useState('');
  const [newPromoBadge, setNewPromoBadge] = useState('');
  const [newPromoEmoji, setNewPromoEmoji] = useState('🍳');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePanicReset = () => {
    resetToDefaults();
    setShowPanicConfirm(false);
    setPreviewKey(prev => prev + 1);
    showToast('⚠️ Plataforma restablecida a valores por defecto (DEFAULT_CMS_DATA).');
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
    showToast(`✓ Platillo "${newItemName.trim()}" agregado al menú`);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoTitle.trim()) return;

    addPromo({
      emoji: newPromoEmoji || '🔥',
      badge: newPromoBadge.trim() || 'Especial',
      badgeColor: '#D90302',
      title: newPromoTitle.trim(),
      highlightPrice: newPromoPrice.trim() || 'Oferta',
      schedule: newPromoSchedule.trim() || 'Por tiempo limitado',
      description: newPromoDesc.trim() || 'Promoción especial en Tony\'s Grill.',
      terms: 'Válido para consumo en restaurante.',
      accentColor: '#D90302',
    });

    setNewPromoTitle('');
    setNewPromoPrice('');
    setNewPromoSchedule('');
    setNewPromoDesc('');
    setNewPromoBadge('');
    showToast(`✓ Promoción "${newPromoTitle.trim()}" agregada`);
  };

  // If not authenticated, the entire CMS is completely unrendered and blocked
  if (!isAuthenticated) {
    return <AdminLoginGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const categoryOptions = data.categories.map(c => ({
    value: c.id,
    label: c.label,
  }));

  const filteredMenuItems = data.menuItems.filter(item => {
    const matchCat = menuFilterCat === 'todos' || item.category_id === menuFilterCat;
    const matchSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#0b0b0d] text-zinc-100 font-sans selection:bg-[#D90302] selection:text-white">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#03AF45] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOP HEADER BAR (56px) */}
      {/* ======================================================== */}
      <header className="h-14 border-b border-white/10 bg-[#121214] px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Tony's Grill" className="h-7 w-auto object-contain" />
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-sm uppercase tracking-wider text-white">
              CMS <span className="text-[#D90302]">Tony's Grill</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sincronizado en Vivo
            </span>
          </div>
        </div>

        {/* Center: Live Preview Viewport Controls */}
        <div className="hidden md:flex items-center gap-2 bg-[#09090b] p-1 rounded-xl border border-white/10">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2">
            Vista Previa:
          </span>

          <button
            onClick={() => setPreviewPage('landing')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              previewPage === 'landing'
                ? 'bg-[#D90302] text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Landing Page
          </button>

          <button
            onClick={() => setPreviewPage('menu')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              previewPage === 'menu'
                ? 'bg-[#D90302] text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Menú Web
          </button>

          <button
            onClick={() => setPreviewPage('promos')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              previewPage === 'promos'
                ? 'bg-[#D90302] text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Promociones
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Device Frame Switcher */}
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-lg transition-colors ${
              deviceMode === 'desktop' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Vista Escritorio"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-lg transition-colors ${
              deviceMode === 'mobile' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Vista Móvil"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
            title="Abrir sitio web público en nueva pestaña"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ver Sitio Web</span>
          </a>

          <button
            onClick={() => {
              authService.logout();
              setIsAuthenticated(false);
            }}
            className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-xs font-semibold text-red-300 hover:text-white border border-red-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>

      </header>

      {/* ======================================================== */}
      {/* SPLIT-SCREEN MAIN BODY (calc(100vh - 56px)) */}
      {/* ======================================================== */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        
        {/* ====================================================== */}
        {/* LEFT PANEL: CMS CONTROLS (32% - 35% WIDTH) */}
        {/* ====================================================== */}
        <aside className="w-full lg:w-[35%] xl:w-[32%] shrink-0 h-full flex flex-col border-r border-white/10 bg-[#101012] overflow-hidden">
          
          {/* Module Selector Sidebar/Tabs */}
          <div className="p-3 border-b border-white/10 bg-[#141417] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => {
                setActiveTab('landing');
                setPreviewPage('landing');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'landing'
                  ? 'bg-[#D90302] text-white shadow-md'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Portada</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('menu');
                setPreviewPage('menu');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'menu'
                  ? 'bg-[#D90302] text-white shadow-md'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Menú ({data.menuItems.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('promos');
                setPreviewPage('promos');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'promos'
                  ? 'bg-[#D90302] text-white shadow-md'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Promos ({data.promos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-zinc-800 text-white shadow-md'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span>Ajustes</span>
            </button>
          </div>

          {/* Controls Scrollable Body */}
          <div className="flex-grow overflow-y-auto p-4 space-y-6">
            
            {/* ---------------------------------------------------- */}
            {/* MODULE 1: LANDING EDITOR (HERO, ABOUT, EVENTS, CONTACT) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'landing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#EBFA00] mb-1">
                    Editor de Portada en Vivo
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Escriba directamente en los campos. Los cambios se actualizan en el panel derecho en tiempo real.
                  </p>
                </div>

                {/* Hero Section */}
                <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D90302]" />
                    <span>Sección Hero (Inicio)</span>
                  </h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Etiqueta Superior (Tagline)
                    </label>
                    <input
                      type="text"
                      value={data.hero.tagline}
                      onChange={(e) => updateHero({ tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Titular Principal (Línea 1)
                    </label>
                    <input
                      type="text"
                      value={data.hero.headlineMain}
                      onChange={(e) => updateHero({ headlineMain: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Titular con Acento Rojo (Línea 2)
                    </label>
                    <input
                      type="text"
                      value={data.hero.headlineAccent}
                      onChange={(e) => updateHero({ headlineAccent: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Ciudad / Cierre (Línea 3)
                    </label>
                    <input
                      type="text"
                      value={data.hero.headlineCity}
                      onChange={(e) => updateHero({ headlineCity: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Descripción del Hero
                    </label>
                    <textarea
                      rows={3}
                      value={data.hero.subheadline}
                      onChange={(e) => updateHero({ subheadline: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302] resize-none"
                    />
                  </div>

                  <div>
                    <ImageUploader
                      label="Imagen de Fondo del Hero"
                      value={data.hero.bgImageUrl}
                      onChange={(url) => updateHero({ bgImageUrl: url })}
                      helperText="Compresión automática WebP ≤ 200KB (1920px max)"
                    />
                  </div>
                </div>

                {/* About Us Section */}
                <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Layout className="w-3.5 h-3.5 text-[#03AF45]" />
                    <span>Sección Nosotros</span>
                  </h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={data.about.title}
                      onChange={(e) => updateAbout({ title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Palabra Destacada (Acento Rojo)
                    </label>
                    <input
                      type="text"
                      value={data.about.titleAccent}
                      onChange={(e) => updateAbout({ titleAccent: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Descripción Culinaria
                    </label>
                    <textarea
                      rows={2}
                      value={data.about.description}
                      onChange={(e) => updateAbout({ description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302] resize-none"
                    />
                  </div>
                </div>

                {/* Events Section */}
                <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#EBFA00]" />
                    <span>Sección Eventos & Banquetes</span>
                  </h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={data.events.title}
                      onChange={(e) => updateEvents({ title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Descripción de Banquetes
                    </label>
                    <textarea
                      rows={3}
                      value={data.events.description}
                      onChange={(e) => updateEvents({ description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302] resize-none"
                    />
                  </div>

                  <div>
                    <ImageUploader
                      label="Imagen de Fondo de Eventos"
                      value={data.events.imageUrl}
                      onChange={(url) => updateEvents({ imageUrl: url })}
                      helperText="Compresión automática WebP ≤ 200KB (1920px max)"
                    />
                  </div>
                </div>

                {/* Contact Section */}
                <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#03AF45]" />
                    <span>Información de Contacto</span>
                  </h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Dirección Completa
                    </label>
                    <input
                      type="text"
                      value={data.contact.address}
                      onChange={(e) => updateContact({ address: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        value={data.contact.phone}
                        onChange={(e) => updateContact({ phone: e.target.value })}
                        className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                        WhatsApp
                      </label>
                      <input
                        type="text"
                        value={data.contact.whatsapp}
                        onChange={(e) => updateContact({ whatsapp: e.target.value })}
                        className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Horario de Atención
                    </label>
                    <input
                      type="text"
                      value={data.contact.schedule}
                      onChange={(e) => updateContact({ schedule: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* MODULE 2: MENU MANAGER */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'menu' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#EBFA00] mb-1">
                    Gestor de Platillos & Precios
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Agregue o edite platillos. Los precios son numéricos y se formatean en la carta pública como "Q".
                  </p>
                </div>

                {/* Add New Dish Box */}
                <form onSubmit={handleCreateMenuItem} className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Plus className="w-3.5 h-3.5 text-[#03AF45]" />
                    <span>Agregar Platillo a la Carta</span>
                  </h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Categoría
                    </label>
                    <CustomSelect
                      value={newItemCategory}
                      onChange={(val) => setNewItemCategory(String(val))}
                      options={categoryOptions}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Nombre del Platillo
                    </label>
                    <input
                      type="text"
                      required
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="Ej. Ribeye Angus 12oz"
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Precio en Quetzales (Q)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400">Q</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                        placeholder="145.00"
                        className="w-full pl-8 pr-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302] font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Guardar Platillo</span>
                  </button>
                </form>

                {/* Filter and Search */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-300">
                      Platillos Registrados ({filteredMenuItems.length})
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Edición en vivo</span>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      placeholder="Filtrar por nombre..."
                      className="w-full pl-8 pr-3 py-2 bg-[#141416] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D90302]"
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {filteredMenuItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[#141416] border border-white/10 flex items-center justify-between gap-3 group hover:border-white/20 transition-all"
                    >
                      <div className="min-w-0 flex-grow">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateMenuItem(item.id, { name: e.target.value })}
                          className="w-full bg-transparent text-xs font-medium text-white focus:outline-none focus:bg-[#1b1b1e] px-1 py-0.5 rounded"
                        />
                        <span className="text-[10px] text-zinc-500 block px-1">
                          {item.category_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="relative w-20">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400">Q</span>
                          <input
                            type="number"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              if (!isNaN(val)) updateMenuItem(item.id, { price: val });
                            }}
                            className="w-full pl-6 pr-1.5 py-1 bg-[#1b1b1e] border border-white/10 rounded text-xs font-mono text-right text-white focus:outline-none focus:border-[#D90302]"
                          />
                        </div>

                        <button
                          onClick={() => {
                            deleteMenuItem(item.id);
                            showToast(`Eliminado: ${item.name}`);
                          }}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Eliminar platillo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* MODULE 3: PROMOS MANAGER */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'promos' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#EBFA00] mb-1">
                    Gestor de Promociones
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Cree ofertas y banners de temporada. Se actualizan automáticamente en la página /promos.
                  </p>
                </div>

                {/* Create Promo Form */}
                <form onSubmit={handleCreatePromo} className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#D90302]" />
                    <span>Crear Nueva Promoción</span>
                  </h4>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1">
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                        Emoji
                      </label>
                      <input
                        type="text"
                        value={newPromoEmoji}
                        onChange={(e) => setNewPromoEmoji(e.target.value)}
                        className="w-full px-2 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-center text-base text-white focus:outline-none focus:border-[#D90302]"
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                        Distintivo / Badge
                      </label>
                      <input
                        type="text"
                        value={newPromoBadge}
                        onChange={(e) => setNewPromoBadge(e.target.value)}
                        placeholder="Ej. 2x1 Especial"
                        className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Título de la Promo
                    </label>
                    <input
                      type="text"
                      required
                      value={newPromoTitle}
                      onChange={(e) => setNewPromoTitle(e.target.value)}
                      placeholder="Ej. 2x1 Lasaña Especial"
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                        Precio Destacado
                      </label>
                      <input
                        type="text"
                        value={newPromoPrice}
                        onChange={(e) => setNewPromoPrice(e.target.value)}
                        placeholder="2x Q63"
                        className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                        Horario / Días
                      </label>
                      <input
                        type="text"
                        value={newPromoSchedule}
                        onChange={(e) => setNewPromoSchedule(e.target.value)}
                        placeholder="Lunes a Viernes"
                        className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Descripción
                    </label>
                    <textarea
                      rows={2}
                      value={newPromoDesc}
                      onChange={(e) => setNewPromoDesc(e.target.value)}
                      placeholder="Detalles sobre lo que incluye la promoción..."
                      className="w-full px-3 py-2 bg-[#1b1b1e] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D90302] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#D90302] hover:bg-[#b00201] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Publicar Promoción</span>
                  </button>
                </form>

                {/* Existing Promos List */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-zinc-300 block">
                    Promociones Activas ({data.promos.length})
                  </span>

                  {data.promos.map((promo) => (
                    <div
                      key={promo.id}
                      className="p-3 rounded-xl bg-[#141416] border border-white/10 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="text-xl p-1.5 rounded-lg bg-white/5">{promo.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{promo.title}</p>
                          <p className="text-[11px] text-[#EBFA00] font-mono">{promo.highlightPrice}</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{promo.description}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          deletePromo(promo.id);
                          showToast(`Eliminada: ${promo.title}`);
                        }}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0 cursor-pointer"
                        title="Eliminar promoción"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* MODULE 4: GLOBAL SETTINGS & THE PANIC BUTTON */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
                    Ajustes Globales & Restablecimiento
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Administre el almacenamiento local de la aplicación o restaure todos los valores a los iniciales de fábrica.
                  </p>
                </div>

                {/* System Info Box */}
                <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Motor de Persistencia:</span>
                    <span className="text-white font-mono font-bold">LocalStorage (Client-side)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Platillos en Base Local:</span>
                    <span className="text-white font-mono font-bold">{data.menuItems.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Promociones Activas:</span>
                    <span className="text-white font-mono font-bold">{data.promos.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Seguridad de Sesión:</span>
                    <span className="text-[#03AF45] font-mono font-bold">SessionStorage (Activo)</span>
                  </div>
                </div>

                {/* THE PANIC BUTTON */}
                <div className="p-5 rounded-2xl bg-red-950/25 border border-red-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span>Botón de Emergencia (Panic Button)</span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    Hacer clic en este botón purga la clave de <code>localStorage</code> y recarga de inmediato toda la plataforma utilizando la semilla oficial (<strong>DEFAULT_CMS_DATA</strong>).
                  </p>

                  <button
                    onClick={() => setShowPanicConfirm(true)}
                    className="w-full py-3 px-4 rounded-xl bg-[#D90302] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-900/30"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restablecer a Valores por Defecto</span>
                  </button>
                </div>

                {/* Modal de Confirmación del Botón de Pánico */}
                {showPanicConfirm && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="max-w-md w-full p-6 rounded-3xl bg-[#141416] border border-red-500/40 shadow-2xl">
                      <div className="w-12 h-12 rounded-full bg-red-900/40 border border-red-500/40 text-red-400 flex items-center justify-center mb-4">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-white mb-2">
                        ¿Confirmas el restablecimiento total?
                      </h4>
                      <p className="text-xs text-zinc-300 mb-6 leading-relaxed">
                        Se borrarán todas las modificaciones guardadas localmente en menús, precios, portadas y promociones, volviendo a los datos iniciales predeterminados (DEFAULT_CMS_DATA).
                      </p>
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => setShowPanicConfirm(false)}
                          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-semibold transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handlePanicReset}
                          className="px-5 py-2.5 rounded-xl bg-[#D90302] hover:bg-red-700 text-xs text-white font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
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
        </aside>

        {/* ====================================================== */}
        {/* RIGHT PANEL: LIVE INTERACTIVE PREVIEW (65% - 70% WIDTH) */}
        {/* ====================================================== */}
        <main className="w-full lg:w-[65%] xl:w-[68%] flex flex-col h-full bg-[#050505] overflow-hidden">
          
          {/* Simulated Browser Bar */}
          <div className="h-10 px-4 bg-[#0d0d10] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="text-[10px] text-zinc-500 font-mono ml-2 hidden sm:inline">
                Preview Mode
              </span>
            </div>

            {/* URL Display */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-zinc-300 max-w-sm w-full justify-center">
              <span className="text-zinc-500">https://</span>
              <span>tonysgrillgt.com</span>
              <span className="text-[#EBFA00]">{previewPage === 'landing' ? '/' : `/${previewPage}`}</span>
            </div>

            {/* Reload preview action */}
            <button
              onClick={() => setPreviewKey(prev => prev + 1)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Refrescar renderizado de vista previa"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Live Component Preview Viewport */}
          <div className="flex-grow overflow-y-auto bg-[#070709] flex justify-center p-2 sm:p-4">
            <div 
              key={previewKey}
              className={`transition-all duration-300 h-full ${
                deviceMode === 'mobile'
                  ? 'w-[390px] max-w-[390px] rounded-3xl border-4 border-zinc-800 shadow-2xl overflow-y-auto bg-[#080808]'
                  : 'w-full rounded-2xl border border-white/10 shadow-2xl overflow-y-auto bg-[#080808]'
              }`}
            >
              {/* Render the actual live components */}
              {previewPage === 'landing' && <LandingPage />}
              {previewPage === 'menu' && <WebMenuPage />}
              {previewPage === 'promos' && <PromosPage />}
            </div>
          </div>

        </main>

      </div>
    </div>
  );
};
