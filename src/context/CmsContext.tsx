import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

export interface CmsHeroData {
  tagline: string;
  headlineMain: string;
  headlineAccent: string;
  headlineCity: string;
  subheadline: string;
  bgImageUrl: string;
  ctaMenuText: string;
  ctaReserveText: string;
}

export interface PillarItem {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface CmsAboutData {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  pillars: PillarItem[];
}

export interface CmsEventsData {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  imageUrl: string;
  cardTitle: string;
  cardSubtitle: string;
}

export interface CmsContactData {
  eyebrow: string;
  title: string;
  titleAccent: string;
  address: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  schedule: string;
  reference: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookHandle: string;
  facebookUrl: string;
  domain: string;
}

export interface CmsCategory {
  id: string;
  label: string;
}

export interface CmsMenuItem {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  price: number;
}

export interface CmsPromoItem {
  id: string;
  emoji: string;
  badge: string;
  badgeColor: string;
  title: string;
  highlightPrice: string;
  schedule: string;
  description: string;
  terms: string;
  accentColor: string;
}

export interface CmsData {
  hero: CmsHeroData;
  about: CmsAboutData;
  events: CmsEventsData;
  contact: CmsContactData;
  categories: CmsCategory[];
  menuItems: CmsMenuItem[];
  promos: CmsPromoItem[];
}

export const DEFAULT_CMS_DATA: CmsData = {
  hero: {
    tagline: 'Chiquimula, Guatemala',
    headlineMain: 'LOS MEJORES CORTES',
    headlineAccent: 'A LA PARRILLA',
    headlineCity: 'EN CHIQUIMULA',
    subheadline: 'Restaurante familiar de referencia en Chiquimula, especializado en cortes de carne a la parrilla, pizzas artesanales, pastas, hamburguesas y desayunos tradicionales.',
    bgImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80',
    ctaMenuText: 'Ver Menú',
    ctaReserveText: 'Reservar',
  },
  about: {
    eyebrow: 'Nuestra Casa',
    title: 'Restaurante familiar de referencia en',
    titleAccent: 'Chiquimula',
    description: 'Especializado en cortes de carne a la parrilla, pizzas artesanales, pastas, hamburguesas y desayunos tradicionales.',
    pillars: [
      { id: '1', title: 'Cortes a la Parrilla', desc: 'Cortes selectos asados a las brasas de carbón y leña.', iconName: 'Beef' },
      { id: '2', title: 'Pizzas Artesanales', desc: 'Masa fermentada lentamente y horneada a la piedra.', iconName: 'Pizza' },
      { id: '3', title: 'Pastas Frescas', desc: 'Elaboradas en casa con recetas tradicionales.', iconName: 'UtensilsCrossed' },
      { id: '4', title: 'Hamburguesas', desc: 'Blend propio de carne selecta en pan brioche.', iconName: 'Sandwich' },
      { id: '5', title: 'Desayunos Tradicionales', desc: 'Auténtico sabor regional servido desde las 7:00 AM.', iconName: 'Coffee' },
    ]
  },
  events: {
    eyebrow: 'Banquetes & Ocasiones',
    title: 'Servicio de banquetes y eventos especiales con',
    titleAccent: 'menú personalizado',
    description: 'Ofrecemos atención integral para sus eventos y banquetes. Diseñamos propuestas gastronómicas a la medida de su ocasión, con la calidad, el sabor y la hospitalidad que nos distingue en Chiquimula.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    cardTitle: 'Menú a la Medida de su Evento',
    cardSubtitle: 'Asesoría directa y atención personalizada',
  },
  contact: {
    eyebrow: 'Ubicación',
    title: 'Visítenos en',
    titleAccent: 'Chiquimula',
    address: '9 Calle, 15 Avenida, zona 6 colonia las lomas de Chiquimula, Frente a zona vial 8 Guatemala, Chiquimula 20001',
    phone: '+502 7942 4777',
    phoneRaw: '+50279424777',
    whatsapp: '+502 5218 8115',
    whatsappRaw: '50252188115',
    schedule: '7:00 AM - 9:45 PM',
    reference: 'Frente a zona vial 8',
    instagramHandle: '@jariaga68',
    instagramUrl: 'https://instagram.com/jariaga68',
    facebookHandle: '/tonysgrillgt',
    facebookUrl: 'https://facebook.com/tonysgrillgt',
    domain: 'tonysgrillgt.com',
  },
  categories: [
    { id: 'carnes', label: 'Carnes & Parrilladas' },
    { id: 'desayunos', label: 'Desayunos & Omelettes' },
    { id: 'mariscos', label: 'Mariscos' },
    { id: 'pastas', label: 'Pastas' },
    { id: 'hamburguesas', label: 'Hamburguesas' },
    { id: 'antojitos', label: 'Antojitos Típicos & Especiales' },
    { id: 'pizzas', label: 'Pizzas' },
  ],
  menuItems: [
    // Desayunos & Omelettes
    { id: 'des-01', category_id: 'desayunos', category_name: 'Desayunos & Omelettes', name: 'American Cheese Omelette', price: 45.00 },
    { id: 'des-02', category_id: 'desayunos', category_name: 'Desayunos & Omelettes', name: 'Spanish Omelette', price: 48.00 },
    { id: 'des-03', category_id: 'desayunos', category_name: 'Desayunos & Omelettes', name: 'Desayuno Económico', price: 35.00 },
    { id: 'des-04', category_id: 'desayunos', category_name: 'Desayunos & Omelettes', name: 'Desayuno Super', price: 45.00 },
    { id: 'des-05', category_id: 'desayunos', category_name: 'Desayunos & Omelettes', name: 'Desayuno Típico', price: 48.00 },
    { id: 'des-06', category_id: 'desayunos', category_name: 'Desayunos & Omelettes', name: 'Panqueques Simples (3 porciones)', price: 38.00 },
    { id: 'des-07', category_id: 'desayunos', category_name: 'Desayunos & Omelettes', name: 'Tostadas Francesas Simples (2 porciones)', price: 33.00 },

    // Carnes & Parrilladas
    { id: 'car-01', category_id: 'carnes', category_name: 'Carnes & Parrilladas', name: 'Lomito 8 Onzas', price: 155.00 },
    { id: 'car-02', category_id: 'carnes', category_name: 'Carnes & Parrilladas', name: 'Puyazo Americano', price: 140.00 },
    { id: 'car-03', category_id: 'carnes', category_name: 'Carnes & Parrilladas', name: 'Churrasquito Económico', price: 70.00 },
    { id: 'car-04', category_id: 'carnes', category_name: 'Carnes & Parrilladas', name: 'Mar y Tierra (Combo)', price: 169.00 },
    { id: 'car-05', category_id: 'carnes', category_name: 'Carnes & Parrilladas', name: 'Parrillada para 2 Personas', price: 219.00 },
    { id: 'car-06', category_id: 'carnes', category_name: 'Carnes & Parrilladas', name: 'Entraña', price: 165.00 },

    // Mariscos
    { id: 'mar-01', category_id: 'mariscos', category_name: 'Mariscos', name: 'Salmón', price: 149.00 },
    { id: 'mar-02', category_id: 'mariscos', category_name: 'Mariscos', name: 'Róbalo', price: 125.00 },
    { id: 'mar-03', category_id: 'mariscos', category_name: 'Mariscos', name: 'Mojarra', price: 70.00 },
    { id: 'mar-04', category_id: 'mariscos', category_name: 'Mariscos', name: 'Ceviche Pequeño', price: 75.00 },
    { id: 'mar-05', category_id: 'mariscos', category_name: 'Mariscos', name: 'Tapado', price: 165.00 },

    // Pastas
    { id: 'pas-01', category_id: 'pastas', category_name: 'Pastas', name: 'Pollo Parmesano', price: 99.00 },
    { id: 'pas-02', category_id: 'pastas', category_name: 'Pastas', name: 'Pasta Alfredo con Pollo', price: 99.00 },
    { id: 'pas-03', category_id: 'pastas', category_name: 'Pastas', name: 'Pasta Bolognesa', price: 90.00 },
    { id: 'pas-04', category_id: 'pastas', category_name: 'Pastas', name: 'Pasta al Ajillo con Camarones', price: 135.00 },

    // Hamburguesas
    { id: 'ham-01', category_id: 'hamburguesas', category_name: 'Hamburguesas', name: 'Hamburguesa Gemelas', price: 59.00 },
    { id: 'ham-02', category_id: 'hamburguesas', category_name: 'Hamburguesas', name: 'Deluxe con Queso', price: 49.00 },
    { id: 'ham-03', category_id: 'hamburguesas', category_name: 'Hamburguesas', name: 'Torito', price: 59.00 },
    { id: 'ham-04', category_id: 'hamburguesas', category_name: 'Hamburguesas', name: 'Menú Infantil (Hamburguesa, Papas y Gaseosa)', price: 40.00 },

    // Antojitos Típicos & Especiales
    { id: 'ant-01', category_id: 'antojitos', category_name: 'Antojitos Típicos & Especiales', name: 'Mexican Quesadillas', price: 60.00 },
    { id: 'ant-02', category_id: 'antojitos', category_name: 'Antojitos Típicos & Especiales', name: 'Burrito Chapín', price: 60.00 },
    { id: 'ant-03', category_id: 'antojitos', category_name: 'Antojitos Típicos & Especiales', name: 'Chuchitos', price: 35.00 },
    { id: 'ant-04', category_id: 'antojitos', category_name: 'Antojitos Típicos & Especiales', name: 'Rellenitos', price: 35.00 },
    { id: 'ant-05', category_id: 'antojitos', category_name: 'Antojitos Típicos & Especiales', name: 'Enchiladas', price: 35.00 },

    // Pizzas
    { id: 'piz-01', category_id: 'pizzas', category_name: 'Pizzas', name: 'Pizza Peperoni (Mediana)', price: 55.00 },
    { id: 'piz-02', category_id: 'pizzas', category_name: 'Pizzas', name: 'Pizza Margarita (Mediana)', price: 75.00 },
    { id: 'piz-03', category_id: 'pizzas', category_name: 'Pizzas', name: 'Pizza Americana (Mediana)', price: 119.00 },
  ],
  promos: [
    {
      id: 'promo-1',
      emoji: '🍳',
      badge: 'Lunes a Viernes',
      badgeColor: '#D90302',
      title: 'Desayuno Súper 2xQ59',
      highlightPrice: '2x Q59',
      schedule: 'Lunes - Viernes en rest.',
      description: 'Dos desayunos completos con huevos al gusto, frijoles volteados de la casa, plátanos dulces, queso fresco, crema y café de altura.',
      terms: 'Válido exclusivamente para consumo en mesas del restaurante.',
      accentColor: '#D90302',
    },
    {
      id: 'promo-2',
      emoji: '🍳',
      badge: 'Toque Chiquimulteco',
      badgeColor: '#03AF45',
      title: 'Huevos con Loroco',
      highlightPrice: '+Q5 Omelet',
      schedule: 'Todos los días desde 7:00 AM',
      description: 'Huevos revueltos suavemente con auténtico loroco fresco regional salteado en mantequilla. Opción en Omelet dorado por +Q5 adicionales.',
      terms: 'Incluye guarnición de frijoles, plátanos y queso de la región.',
      accentColor: '#03AF45',
    },
    {
      id: 'promo-3',
      emoji: '🍲',
      badge: 'Sólo Domingos',
      badgeColor: '#EBFA00',
      title: 'Caldo de Res Tradicional',
      highlightPrice: 'Especial Dominical',
      schedule: 'Domingos Familiares',
      description: 'Nuestra legendaria receta dominical: carne suave cocida a fuego lento con elote tierno, yuca, güisquil, repollo y hierbabuena fresca.',
      terms: 'Hasta agotar existencias dominicales. Ideal para mesa familiar.',
      accentColor: '#EBFA00',
    },
    {
      id: 'promo-4',
      emoji: '🍝',
      badge: '2x1 Especial',
      badgeColor: '#D90302',
      title: '2x1 Lasaña Boloñesa Q63',
      highlightPrice: '2x Q63',
      schedule: 'Almuerzos & Cenas Seleccionadas',
      description: '¡Doble porción de placer italiano! Pasta fresca artesanal, salsa boloñesa con carne de res estofada y gratín dorado de quesos.',
      terms: 'Pagas una lasaña y recibes la segunda gratis por solo Q63 en total.',
      accentColor: '#D90302',
    },
    {
      id: 'promo-5',
      emoji: '🍕',
      badge: 'Temporada Especial',
      badgeColor: '#03AF45',
      title: 'Pizza Loroco de temporada',
      highlightPrice: 'Edición Limitada',
      schedule: 'Disponible Toda la Semana',
      description: 'Masa madre crujiente, salsa de tomates asados, abundante queso mozzarella fundido y fresco loroco chiquimulteco.',
      terms: 'Disponible en tamaño Mediano y Familiar por temporada de cosecha.',
      accentColor: '#03AF45',
    },
    {
      id: 'promo-6',
      emoji: '☕🍷',
      badge: 'Dúo de Bebidas',
      badgeColor: '#EBFA00',
      title: 'Capuchino 2xQ29 | Sangría 2xQ49',
      highlightPrice: 'Desde Q29',
      schedule: 'Tardes de Café & Cava',
      description: 'Combina como prefieras tu momento Tony\'s: Dos Capuchinos con café espresso por Q29, o dos copas de Sangría con vino tinto por Q49.',
      terms: 'Aplica en consumo individual o para compartir en tu visita.',
      accentColor: '#EBFA00',
    },
  ],
};

const STORAGE_FALLBACK_KEY = 'tonys_grill_cms_data';

export interface CmsContextType {
  data: CmsData;
  isLoading: boolean;
  isCloudSync: boolean;
  dataError: string | null;
  isRetrying: boolean;
  isMaintenanceMode: boolean;
  setMaintenanceMode: (active: boolean) => void;
  refetchData: () => Promise<void>;
  updateHero: (hero: Partial<CmsHeroData>) => void;
  updateAbout: (about: Partial<CmsAboutData>) => void;
  updateEvents: (events: Partial<CmsEventsData>) => void;
  updateContact: (contact: Partial<CmsContactData>) => void;
  addMenuItem: (item: Omit<CmsMenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<CmsMenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addCategory: (cat: CmsCategory) => void;
  deleteCategory: (id: string) => void;
  addPromo: (promo: Omit<CmsPromoItem, 'id'>) => void;
  updatePromo: (id: string, updates: Partial<CmsPromoItem>) => void;
  deletePromo: (id: string) => void;
  resetToDefaults: () => void;
  reloadFromDatabase: () => Promise<void>;
}

const CmsContext = createContext<CmsContextType | null>(null);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsData>(() => {
    // Initial sync read from local cache to prevent layout flicker
    try {
      const saved = localStorage.getItem(STORAGE_FALLBACK_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_CMS_DATA;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const isCloudSync = isSupabaseConfigured();

  const [isMaintenanceMode, setIsMaintenanceModeState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('tonys_maintenance_mode');
      if (stored !== null) return stored === 'true';
    } catch {}
    return import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  });

  const setMaintenanceMode = (active: boolean) => {
    setIsMaintenanceModeState(active);
    try {
      localStorage.setItem('tonys_maintenance_mode', String(active));
    } catch {}
  };

  // Keep local backup synchronized for instant renders and offline fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FALLBACK_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Local backup sync error:', err);
    }
  }, [data]);

  // Initial load directly from Supabase PostgreSQL tables
  const fetchSupabaseData = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      return;
    }

    setIsLoading(true);
    setIsRetrying(true);

    try {
      // 1. Fetch Landing Content
      const { data: landingRow, error: landingErr } = await supabase
        .from('landing_content')
        .select('*')
        .eq('id', 'main')
        .maybeSingle();

      // 2. Fetch Menu Categories
      const { data: categoriesData, error: catErr } = await supabase
        .from('menu_categories')
        .select('*')
        .order('display_order', { ascending: true });

      // 3. Fetch Menu Items
      const { data: menuItemsData, error: itemsErr } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: true });

      // 4. Fetch Promotions
      const { data: promosData, error: promosErr } = await supabase
        .from('promotions')
        .select('*')
        .order('display_order', { ascending: true });

      const firstErr = landingErr || catErr || itemsErr || promosErr;
      if (firstErr) {
        console.warn('Supabase query error:', firstErr);
        setDataError(firstErr.message || 'Error al obtener datos desde Supabase.');
        return;
      }

      if (landingRow) {
        setData((prev) => ({
          ...prev,
          hero: landingRow.hero || prev.hero,
          about: landingRow.about || prev.about,
          events: landingRow.events || prev.events,
          contact: landingRow.contact || prev.contact,
          categories: categoriesData && categoriesData.length > 0
            ? categoriesData.map(c => ({ id: c.id, label: c.name }))
            : prev.categories,
          menuItems: menuItemsData && menuItemsData.length > 0
            ? menuItemsData.map(item => ({
                id: item.id,
                category_id: item.category_id,
                category_name: categoriesData?.find(c => c.id === item.category_id)?.name || 'General',
                name: item.name,
                price: Number(item.price),
              }))
            : prev.menuItems,
          promos: promosData && promosData.length > 0
            ? promosData.map(p => ({
                id: p.id,
                emoji: p.emoji || '🍳',
                badge: p.badge || '',
                badgeColor: p.badge_color || '#D90302',
                title: p.title,
                highlightPrice: p.highlight_price || '',
                schedule: p.schedule || '',
                description: p.description || '',
                terms: p.terms || '',
                accentColor: p.accent_color || '#D90302',
              }))
            : prev.promos,
        }));
      }
      setDataError(null);
    } catch (err: any) {
      console.warn('Supabase fetch encountered an issue:', err);
      setDataError(err?.message || 'Error al conectar con la base de datos Supabase.');
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, []);

  useEffect(() => {
    fetchSupabaseData();
  }, [fetchSupabaseData]);

  // ========================================================
  // CRUD OPERATIONS WITH REAL-TIME SUPABASE DATABASE SYNC
  // ========================================================

  const updateHero = async (heroUpdates: Partial<CmsHeroData>) => {
    const updated = { ...data.hero, ...heroUpdates };
    setData((prev) => ({ ...prev, hero: updated }));

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('landing_content')
          .upsert({
            id: 'main',
            hero: updated,
            about: data.about,
            events: data.events,
            contact: data.contact,
            updated_at: new Date().toISOString(),
          });
      } catch (err) {
        console.error('Supabase updateHero failed:', err);
      }
    }
  };

  const updateAbout = async (aboutUpdates: Partial<CmsAboutData>) => {
    const updated = { ...data.about, ...aboutUpdates };
    setData((prev) => ({ ...prev, about: updated }));

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('landing_content')
          .upsert({
            id: 'main',
            hero: data.hero,
            about: updated,
            events: data.events,
            contact: data.contact,
            updated_at: new Date().toISOString(),
          });
      } catch (err) {
        console.error('Supabase updateAbout failed:', err);
      }
    }
  };

  const updateEvents = async (eventsUpdates: Partial<CmsEventsData>) => {
    const updated = { ...data.events, ...eventsUpdates };
    setData((prev) => ({ ...prev, events: updated }));

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('landing_content')
          .upsert({
            id: 'main',
            hero: data.hero,
            about: data.about,
            events: updated,
            contact: data.contact,
            updated_at: new Date().toISOString(),
          });
      } catch (err) {
        console.error('Supabase updateEvents failed:', err);
      }
    }
  };

  const updateContact = async (contactUpdates: Partial<CmsContactData>) => {
    const updated = { ...data.contact, ...contactUpdates };
    setData((prev) => ({ ...prev, contact: updated }));

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('landing_content')
          .upsert({
            id: 'main',
            hero: data.hero,
            about: data.about,
            events: data.events,
            contact: updated,
            updated_at: new Date().toISOString(),
          });
      } catch (err) {
        console.error('Supabase updateContact failed:', err);
      }
    }
  };

  const addMenuItem = async (item: Omit<CmsMenuItem, 'id'>) => {
    const newItem: CmsMenuItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      menuItems: [...prev.menuItems, newItem],
    }));

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('menu_items').insert({
          id: newItem.id,
          category_id: newItem.category_id,
          name: newItem.name,
          price: newItem.price,
        });
      } catch (err) {
        console.error('Supabase addMenuItem failed:', err);
      }
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<CmsMenuItem>) => {
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));

    if (isSupabaseConfigured()) {
      try {
        const payload: any = {};
        if (updates.name !== undefined) payload.name = updates.name;
        if (updates.price !== undefined) payload.price = updates.price;
        if (updates.category_id !== undefined) payload.category_id = updates.category_id;

        await supabase.from('menu_items').update(payload).eq('id', id);
      } catch (err) {
        console.error('Supabase updateMenuItem failed:', err);
      }
    }
  };

  const deleteMenuItem = async (id: string) => {
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.filter((item) => item.id !== id),
    }));

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('menu_items').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase deleteMenuItem failed:', err);
      }
    }
  };

  const addCategory = async (cat: CmsCategory) => {
    setData((prev) => ({
      ...prev,
      categories: [...prev.categories.filter((c) => c.id !== cat.id), cat],
    }));

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('menu_categories').upsert({
          id: cat.id,
          name: cat.label,
          display_order: data.categories.length + 1,
        });
      } catch (err) {
        console.error('Supabase addCategory failed:', err);
      }
    }
  };

  const deleteCategory = async (id: string) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
      menuItems: prev.menuItems.filter((item) => item.category_id !== id),
    }));

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('menu_categories').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase deleteCategory failed:', err);
      }
    }
  };

  const addPromo = async (promo: Omit<CmsPromoItem, 'id'>) => {
    const newPromo: CmsPromoItem = {
      ...promo,
      id: `promo-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      promos: [...prev.promos, newPromo],
    }));

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('promotions').insert({
          id: newPromo.id,
          emoji: newPromo.emoji,
          badge: newPromo.badge,
          badge_color: newPromo.badgeColor,
          title: newPromo.title,
          highlight_price: newPromo.highlightPrice,
          schedule: newPromo.schedule,
          description: newPromo.description,
          terms: newPromo.terms,
          accent_color: newPromo.accentColor,
          active_status: true,
        });
      } catch (err) {
        console.error('Supabase addPromo failed:', err);
      }
    }
  };

  const updatePromo = async (id: string, updates: Partial<CmsPromoItem>) => {
    setData((prev) => ({
      ...prev,
      promos: prev.promos.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));

    if (isSupabaseConfigured()) {
      try {
        const payload: any = {};
        if (updates.title !== undefined) payload.title = updates.title;
        if (updates.highlightPrice !== undefined) payload.highlight_price = updates.highlightPrice;
        if (updates.schedule !== undefined) payload.schedule = updates.schedule;
        if (updates.description !== undefined) payload.description = updates.description;
        if (updates.badge !== undefined) payload.badge = updates.badge;
        if (updates.emoji !== undefined) payload.emoji = updates.emoji;

        await supabase.from('promotions').update(payload).eq('id', id);
      } catch (err) {
        console.error('Supabase updatePromo failed:', err);
      }
    }
  };

  const deletePromo = async (id: string) => {
    setData((prev) => ({
      ...prev,
      promos: prev.promos.filter((p) => p.id !== id),
    }));

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('promotions').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase deletePromo failed:', err);
      }
    }
  };

  // Panic reset: restores DEFAULT_CMS_DATA and purges local storage
  const resetToDefaults = async () => {
    try {
      localStorage.removeItem(STORAGE_FALLBACK_KEY);
    } catch (err) {
      console.error('Error clearing local cache:', err);
    }
    setData(DEFAULT_CMS_DATA);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('landing_content').upsert({
          id: 'main',
          hero: DEFAULT_CMS_DATA.hero,
          about: DEFAULT_CMS_DATA.about,
          events: DEFAULT_CMS_DATA.events,
          contact: DEFAULT_CMS_DATA.contact,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Supabase resetToDefaults failed:', err);
      }
    }
  };

  return (
    <CmsContext.Provider
      value={{
        data,
        isLoading,
        isCloudSync,
        dataError,
        isRetrying,
        isMaintenanceMode,
        setMaintenanceMode,
        refetchData: fetchSupabaseData,
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
        reloadFromDatabase: fetchSupabaseData,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCmsData = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCmsData must be used within a CmsProvider');
  }
  return context;
};
