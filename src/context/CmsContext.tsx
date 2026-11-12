import React, { createContext, useContext, useState, useEffect } from 'react';

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
    { id: 'desayunos', label: 'Desayunos & Omelettes' },
    { id: 'carnes', label: 'Carnes & Parrilladas' },
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
      schedule: 'Lunes a Viernes (Consumo en Restaurante)',
      description: 'Inicia tus mañanas en grande: dos desayunos completos con huevos al gusto, frijoles volteados de la casa, plátanos dulces, queso fresco chiquimulteco, crema artesanal, pan tostado y café caliente de altura.',
      terms: 'Válido exclusivamente para consumo en mesas del restaurante de 7:00 AM a 11:30 AM.',
      accentColor: '#D90302',
    },
    {
      id: 'promo-2',
      emoji: '🍳',
      badge: 'Toque Chiquimulteco',
      badgeColor: '#03AF45',
      title: 'Huevos con Loroco',
      highlightPrice: '+Q5 Omelet',
      schedule: 'Todos los días desde las 7:00 AM',
      description: 'Huevos de granja revueltos suavemente con auténtico loroco fresco regional salteado en mantequilla. ¡Pídelo preparado en Omelet dorado por solo +Q5 adicionales!',
      terms: 'Incluye guarnición tradicional de frijoles, plátanos y queso de la región.',
      accentColor: '#03AF45',
    },
    {
      id: 'promo-3',
      emoji: '🍲',
      badge: 'Sólo Domingos',
      badgeColor: '#EBFA00',
      title: 'Caldo de Res Tradicional',
      highlightPrice: 'Especial Dominical',
      schedule: 'Domingos Familiares desde las 11:30 AM',
      description: 'Nuestra receta dominical: tazón humeante de carne suave cocida a fuego lento con elote tierno, yuca, güisquil, repollo y hierbabuena fresca. Servido con arroz y chirmol asado.',
      terms: 'Hasta agotar existencias dominicales. Ideal para compartir en mesa familiar.',
      accentColor: '#EBFA00',
    },
    {
      id: 'promo-4',
      emoji: '🍝',
      badge: '2x1 Especial',
      badgeColor: '#D90302',
      title: '2x1 Lasaña Q63',
      highlightPrice: '2x Q63',
      schedule: 'Almuerzos & Cenas Seleccionadas',
      description: 'Doble porción de placer: capas abundantes de pasta artesanal, salsa boloñesa con carne de res estofada, bechamel cremosa y gratín dorado de quesos mozzarella y parmesano.',
      terms: 'Pagas una lasaña y recibes la segunda gratis por solo Q63 en total.',
      accentColor: '#D90302',
    },
    {
      id: 'promo-5',
      emoji: '🍕',
      badge: 'Edición Temporada',
      badgeColor: '#03AF45',
      title: 'Pizza Loroco de temporada',
      highlightPrice: 'Receta Exclusiva',
      schedule: 'Disponible todo el día al horno de leña',
      description: 'Masa madre fermentada 48 horas, salsa blanca artesanal, mozzarella abundante y flores tiernas de loroco fresco recién traídas del campo chiquimulteco.',
      terms: 'Disponible por tiempo limitado durante la temporada de cosecha de loroco.',
      accentColor: '#03AF45',
    },
    {
      id: 'promo-6',
      emoji: '☕ 🍷',
      badge: 'Dúo de Especialidad',
      badgeColor: '#EBFA00',
      title: 'Capuchino 2xQ29 | Sangría 2xQ49',
      highlightPrice: 'Doble Deleite',
      schedule: 'Tardes de Café & Noches de Brasa',
      description: 'Combina como prefieras: Dos Capuchinos con café espresso de altura y leche sedosa por Q29, o dos copas de Sangría de la Cava con vino tinto y frutas maceradas por solo Q49.',
      terms: 'Aplica en consumo individual o para compartir en tu visita.',
      accentColor: '#EBFA00',
    },
  ],
};

const STORAGE_KEY = 'tonys_grill_cms_data';

export interface CmsContextType {
  data: CmsData;
  updateHero: (hero: Partial<CmsHeroData>) => void;
  updateAbout: (about: Partial<CmsAboutData>) => void;
  updateEvents: (events: Partial<CmsEventsData>) => void;
  updateContact: (contact: Partial<CmsContactData>) => void;
  addMenuItem: (item: Omit<CmsMenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<CmsMenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addCategory: (cat: CmsCategory) => void;
  deleteCategory: (id: string) => void;
  addPromo: (promo: Omit<CmsPromoItem, 'id'>) => void;
  updatePromo: (id: string, promo: Partial<CmsPromoItem>) => void;
  deletePromo: (id: string) => void;
  resetToDefaults: () => void;
}

const CmsContext = createContext<CmsContextType | null>(null);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all required top-level keys exist, merging with defaults if needed
        return {
          ...DEFAULT_CMS_DATA,
          ...parsed,
          hero: { ...DEFAULT_CMS_DATA.hero, ...(parsed.hero || {}) },
          about: { ...DEFAULT_CMS_DATA.about, ...(parsed.about || {}) },
          events: { ...DEFAULT_CMS_DATA.events, ...(parsed.events || {}) },
          contact: { ...DEFAULT_CMS_DATA.contact, ...(parsed.contact || {}) },
          categories: parsed.categories?.length ? parsed.categories : DEFAULT_CMS_DATA.categories,
          menuItems: parsed.menuItems?.length ? parsed.menuItems : DEFAULT_CMS_DATA.menuItems,
          promos: parsed.promos?.length ? parsed.promos : DEFAULT_CMS_DATA.promos,
        };
      }
    } catch (err) {
      console.error('Error loading CMS data from localStorage:', err);
    }
    return DEFAULT_CMS_DATA;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Error saving CMS data to localStorage:', err);
    }
  }, [data]);

  const updateHero = (heroUpdates: Partial<CmsHeroData>) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates }
    }));
  };

  const updateAbout = (aboutUpdates: Partial<CmsAboutData>) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, ...aboutUpdates }
    }));
  };

  const updateEvents = (eventsUpdates: Partial<CmsEventsData>) => {
    setData((prev) => ({
      ...prev,
      events: { ...prev.events, ...eventsUpdates }
    }));
  };

  const updateContact = (contactUpdates: Partial<CmsContactData>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactUpdates }
    }));
  };

  const addMenuItem = (item: Omit<CmsMenuItem, 'id'>) => {
    const newItem: CmsMenuItem = {
      ...item,
      id: `item-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      menuItems: [...prev.menuItems, newItem]
    }));
  };

  const updateMenuItem = (id: string, updates: Partial<CmsMenuItem>) => {
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item))
    }));
  };

  const deleteMenuItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.filter((item) => item.id !== id)
    }));
  };

  const addCategory = (cat: CmsCategory) => {
    setData((prev) => ({
      ...prev,
      categories: [...prev.categories.filter((c) => c.id !== cat.id), cat]
    }));
  };

  const deleteCategory = (id: string) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
      menuItems: prev.menuItems.filter((item) => item.category_id !== id)
    }));
  };

  const addPromo = (promo: Omit<CmsPromoItem, 'id'>) => {
    const newPromo: CmsPromoItem = {
      ...promo,
      id: `promo-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      promos: [...prev.promos, newPromo]
    }));
  };

  const updatePromo = (id: string, updates: Partial<CmsPromoItem>) => {
    setData((prev) => ({
      ...prev,
      promos: prev.promos.map((p) => (p.id === id ? { ...p, ...updates } : p))
    }));
  };

  const deletePromo = (id: string) => {
    setData((prev) => ({
      ...prev,
      promos: prev.promos.filter((p) => p.id !== id)
    }));
  };

  // The Panic Button logic: clears localStorage and resets to DEFAULT_CMS_DATA
  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
    setData(DEFAULT_CMS_DATA);
  };

  return (
    <CmsContext.Provider
      value={{
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
