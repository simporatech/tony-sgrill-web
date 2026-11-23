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
  image?: string;
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
  instagram: '@tonysgrill.gt',
  instagramUrl: 'https://instagram.com/tonysgrill.gt',
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
    bgImageUrl: '/images/hero-tonys-grill.jpg',
    ctaMenuText: 'Ver Menú',
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
    instagramHandle: '@tonysgrill.gt',
    instagramUrl: 'https://instagram.com/tonysgrill.gt',
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
      schedule: 'Lunes a Viernes • 7:00 – 11:00 AM',
      description:
        'Dos desayunos completos con huevos al gusto, frijoles volteados de la casa, plátanos fritos, queso fresco, crema y café de altura.',
      terms: 'Válido exclusivamente para consumo en restaurante.',
      accentColor: '#D90302',
      image: '/images/promo-desayuno.jpg',
    },
    {
      id: 'promo-2',
      emoji: '🌼',
      badge: 'Lunes a Viernes',
      badgeColor: '#03AF45',
      title: 'Desayuno de Loroco',
      highlightPrice: 'Q59.00',
      schedule: 'Lunes a Viernes • 7:00 – 11:00 AM',
      description:
        'Huevos revueltos con loroco fresco de temporada, acompañados de frijoles, plátanos y café recién chorreado.',
      terms: 'Disponible de lunes a viernes en horario de desayunos.',
      accentColor: '#03AF45',
      image: '/images/desayuno-loroco.jpg',
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
        '¡Doble porción de placer italiano! Pasta artesanal, salsa boloñesa con carne molida, queso mozzarella y parmesano gratinado con ensalada verde.',
      terms: 'Aplica solo en restaurante o autoservicio.',
      accentColor: '#D90302',
      image: '/images/promo-lasana.jpg',
    },
    {
      id: 'promo-4',
      emoji: '🍕',
      badge: 'Martes y Jueves',
      badgeColor: '#EBFA00',
      title: 'Pizzas Medianas 2x1',
      highlightPrice: '2x1',
      schedule: 'Martes y Jueves',
      description:
        'Disfruta dos pizzas artesanales medianas horneadas al momento con nuestros ingredientes frescos seleccionados.',
      terms: 'Aplica martes y jueves todo el día. 2x1 no incluye soda.',
      accentColor: '#D90302',
      image: '/images/promo-pizza-2x1.jpg',
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
      image: '/images/promo-capuchino.jpg',
    },
    {
      id: 'promo-6',
      emoji: '🍹',
      badge: 'Tony\'s Fresh • Todos los días',
      badgeColor: '#03AF45',
      title: 'Sangría & Cócteles 2x1',
      highlightPrice: 'Q49.00',
      schedule: 'Todos los días',
      description:
        'Sangría 2xQ49, Mojito de Fresa 2xQ49, Sangría Blanca 2xQ49, Daiquiri/Mojito/Piña Colada 2xQ49 y Vino de la Casa 2xQ46.',
      terms: 'Válido todos los días en restaurante.',
      accentColor: '#03AF45',
      image: '/images/promo-sangria.jpg',
    },
    {
      id: 'promo-7',
      emoji: '🍺',
      badge: 'Combo Tony\'s Fresh',
      badgeColor: '#EBFA00',
      title: 'Cubetazo + 6 Garnachas',
      highlightPrice: 'Q150.00',
      schedule: 'Todos los días',
      description:
        'Cubetazo de cervezas bien frías acompañado de 6 crujientes garnachas tradicionales con carne y curtido.',
      terms: 'Disponible en Tony\'s Fresh.',
      accentColor: '#D90302',
      image: '/images/fresh-combo-antojitos.jpg',
    },
    {
      id: 'promo-8',
      emoji: '👨‍👩‍👧‍👦',
      badge: 'Súper Combos Familiares',
      badgeColor: '#D90302',
      title: 'Combo Pizzas #1, #2 y #3',
      highlightPrice: 'Q149 – Q175',
      schedule: 'Todos los días',
      description:
        '1, 2 o 3 Pizzas Medianas de 1 ingrediente + alitas a la barbacoa + papas fritas + ensalada + pichel de gaseosa.',
      terms: 'Combo #1: Q149 | Combo #2: Q165 | Combo #3: Q175.',
      accentColor: '#03AF45',
      image: '/menu-pages/almuerzo-28.jpg',
    },
    {
      id: 'promo-9',
      emoji: '🍔',
      badge: 'Para el Antojo',
      badgeColor: '#D90302',
      title: 'Hamburguesas Gemelas + Papas',
      highlightPrice: 'Q59.00',
      schedule: 'Todos los días',
      description:
        'Dos hamburguesas clásicas a la parrilla acompañadas de ensalada de repollo y papas fritas.',
      terms: 'Incluye papas fritas. No incluye refill.',
      accentColor: '#D90302',
      image: '/menu-pages/almuerzo-20.jpg',
    },
    {
      id: 'promo-10',
      emoji: '🍕',
      badge: 'Precio Especial',
      badgeColor: '#EBFA00',
      title: 'Pizza Mediana Peperoni',
      highlightPrice: 'Q55.00',
      schedule: 'Todos los días',
      description:
        'Pizza artesanal mediana de peperoni con abundante queso mozzarella fundido.',
      terms: 'Promoción especial por tiempo limitado.',
      accentColor: '#D90302',
      image: '/menu-pages/almuerzo-29.jpg',
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
