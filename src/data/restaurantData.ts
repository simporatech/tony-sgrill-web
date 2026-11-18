import { OFFICIAL_ADDRESS } from './menuData';

export interface MenuItem {
  id: string;
  name: string;
  category: 'cortes' | 'pizzas' | 'pastas' | 'hamburguesas' | 'desayunos';
  price: string;
  description: string;
  tag?: string;
  image: string;
}

export interface PromoItem {
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

export interface PillarItem {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export const RESTAURANT_INFO = {
  name: "Tony's Grill",
  tagline: 'El Arte del Fuego en Chiquimula',
  headline: 'La Experiencia Definitiva de Fuego & Sabor en Chiquimula',
  subheadline:
    'Cortes de carne selectos madurados a la perfección, pizzas a la leña, pastas artesanales y recetas familiares que honran la tradición del buen comer.',
  address: OFFICIAL_ADDRESS,
  shortAddress: 'Zona 6, Col. Las Lomas, Chiquimula',
  phone: '+502 7942 4777',
  phoneRaw: '+50279424777',
  whatsapp: '+502 5218 8115',
  whatsappRaw: '50252188115',
  schedule: 'Lunes a Domingo: 7:00 AM – 9:45 PM',
  hours: '7:00 AM - 9:45 PM',
  instagram: '@jariaga68',
  instagramUrl: 'https://instagram.com/jariaga68',
  facebook: '/tonysgrillgt',
  facebookUrl: 'https://facebook.com/tonysgrillgt',
  domain: 'tonysgrillgt.com',
};

export const SITE_CONTENT = {
  hero: {
    tagline: 'Chiquimula, Guatemala',
    headlineMain: 'LOS MEJORES CORTES',
    headlineAccent: 'A LA PARRILLA',
    headlineCity: 'EN CHIQUIMULA',
    subheadline:
      'Restaurante familiar de referencia en Chiquimula, especializado en cortes de carne a la parrilla, pizzas artesanales, pastas, hamburguesas y desayunos tradicionales.',
    bgImageUrl: '/images/puyazo-importado.jpg',
    ctaMenuText: 'Ver Menú',
    ctaReserveText: 'Reservar',
  },
  about: {
    eyebrow: 'Nuestra Casa',
    title: 'Restaurante familiar de referencia en',
    titleAccent: 'Chiquimula',
    description:
      'Especializado en cortes de carne a la parrilla, pizzas artesanales, pastas, hamburguesas y desayunos tradicionales.',
    pillars: [
      { id: '1', title: 'Cortes a la Parrilla', desc: 'Cortes selectos asados a las brasas de carbón y leña.', iconName: 'Beef' },
      { id: '2', title: 'Pizzas Artesanales', desc: 'Masa fermentada lentamente y horneada a la piedra.', iconName: 'Pizza' },
      { id: '3', title: 'Pastas Frescas', desc: 'Elaboradas en casa con recetas tradicionales.', iconName: 'UtensilsCrossed' },
      { id: '4', title: 'Hamburguesas', desc: 'Blend propio de carne selecta en pan brioche.', iconName: 'Sandwich' },
      { id: '5', title: 'Desayunos Tradicionales', desc: 'Auténtico sabor regional servido desde las 7:00 AM.', iconName: 'Coffee' },
    ] as PillarItem[],
  },
  events: {
    eyebrow: 'Banquetes & Ocasiones',
    title: 'Servicio de banquetes y eventos especiales con',
    titleAccent: 'menú personalizado',
    description:
      'Ofrecemos atención integral para sus eventos y banquetes. Diseñamos propuestas gastronómicas a la medida de su ocasión, con la calidad, el sabor y la hospitalidad que nos distingue en Chiquimula.',
    imageUrl: '/images/fajitas-mixtas.jpg',
    cardTitle: 'Menú a la Medida de su Evento',
    cardSubtitle: 'Asesoría directa y atención personalizada',
  },
  contact: {
    eyebrow: 'Ubicación',
    title: 'Visítenos en',
    titleAccent: 'Chiquimula',
    address: OFFICIAL_ADDRESS,
    phone: '+502 7942 4777',
    phoneRaw: '+50279424777',
    whatsapp: '+502 5218 8115',
    whatsappRaw: '50252188115',
    schedule: 'Lunes a Domingo: 7:00 AM – 9:45 PM',
    reference: 'Frente a Zona Vial 8, Chiquimula',
    instagramHandle: '@jariaga68',
    instagramUrl: 'https://instagram.com/jariaga68',
    facebookHandle: '/tonysgrillgt',
    facebookUrl: 'https://facebook.com/tonysgrillgt',
    domain: 'tonysgrillgt.com',
  },
  promos: [
    {
      id: 'promo-1',
      emoji: '🍳',
      badge: 'Lunes a Viernes',
      badgeColor: '#D90302',
      title: 'Desayuno Súper 2x1',
      highlightPrice: 'Q59.00',
      schedule: 'Lunes - Viernes en rest.',
      description:
        'Dos desayunos completos con huevos al gusto, frijoles volteados de la casa, plátanos dulces, queso fresco, crema y café de altura.',
      terms: 'Válido exclusivamente para consumo en restaurante.',
      accentColor: '#D90302',
    },
    {
      id: 'promo-2',
      emoji: '🍳',
      badge: 'Lunes a Viernes',
      badgeColor: '#03AF45',
      title: 'Desayuno de Loroco',
      highlightPrice: 'Q59.00',
      schedule: 'Lunes a Viernes',
      description:
        'Huevos revueltos con loroco fresco de temporada, acompañados de frijoles, plátanos y café recién chorreado.',
      terms: 'Disponible de lunes a viernes en horario de desayunos.',
      accentColor: '#03AF45',
    },
    {
      id: 'promo-3',
      emoji: '🍝',
      badge: 'Especial de la Semana',
      badgeColor: '#D90302',
      title: 'Lasañas 2x1',
      highlightPrice: 'Q63.00',
      schedule: 'Lunes a Viernes',
      description:
        '¡Doble porción de placer italiano! Pasta fresca artesanal, salsa boloñesa con carne estofada y gratín de quesos.',
      terms: 'Aplica solo en restaurante o autoservicio.',
      accentColor: '#D90302',
    },
    {
      id: 'promo-4',
      emoji: '🍕',
      badge: 'Martes y Jueves',
      badgeColor: '#D90302',
      title: 'Pizzas 2x1',
      highlightPrice: '2x1',
      schedule: 'Martes y Jueves',
      description:
        'Dos pizzas artesanales medianas seleccionadas horneadas con ingredientes frescos.',
      terms: 'Aplica martes y jueves todo el día.',
      accentColor: '#D90302',
    },
    {
      id: 'promo-5',
      emoji: '☕',
      badge: 'Todos los días',
      badgeColor: '#D90302',
      title: 'Capuchino 2x1',
      highlightPrice: 'Q29.00',
      schedule: 'Todos los días',
      description:
        'Dos capuchinos recién preparados con grano seleccionado de altura.',
      terms: 'Promoción válida solo para restaurante.',
      accentColor: '#D90302',
    },
    {
      id: 'promo-6',
      emoji: '🍷',
      badge: 'Todos los días',
      badgeColor: '#D90302',
      title: 'Sangría 2x1',
      highlightPrice: 'Q49.00',
      schedule: 'Todos los días',
      description:
        'Dos copas de sangría preparada con fruta fresca de temporada.',
      terms: 'Válido todos los días en restaurante.',
      accentColor: '#D90302',
    },
  ] as PromoItem[],
};

export const FEATURED_DISHES: MenuItem[] = [
  {
    id: 'car-03',
    name: 'Puyazo Americano',
    category: 'cortes',
    price: 'Q140.00',
    description: 'Corte jugoso con marmoleo equilibrado y cobertura de grasa dorada al carbón.',
    tag: 'Asados y Carnes',
    image: '/images/puyazo-importado.jpg',
  },
  {
    id: 'car-05',
    name: 'Mar y Tierra (Combo)',
    category: 'cortes',
    price: 'Q169.00',
    description: 'Combinación especial de corte selecto a la parrilla acompañado de camarones.',
    tag: 'Asados y Carnes',
    image: '/images/mar-y-tierra.jpg',
  },
  {
    id: 'car-06',
    name: 'Churrasquito Económico',
    category: 'cortes',
    price: 'Q70.00',
    description: 'Porción personal de carne asada acompañada de arroz, frijoles y ensalada fresca.',
    tag: 'Asados y Carnes',
    image: '/images/churrasquito-res.jpg',
  },
];
