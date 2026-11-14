export interface MenuItem {
  id: string;
  name: string;
  category: 'cortes' | 'pizzas' | 'pastas' | 'hamburguesas' | 'desayunos';
  price: string;
  description: string;
  tag?: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google Reviews';
  highlight?: string;
}

export interface Promo {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  validity: string;
  description: string;
  badge: string;
}

export const RESTAURANT_INFO = {
  name: "Tony's Grill",
  tagline: "El Arte del Fuego en Chiquimula",
  headline: "La Experiencia Definitiva de Fuego & Sabor en Chiquimula",
  subheadline: "Cortes de carne selectos madurados a la perfección, pizzas a la leña, pastas artesanales y recetas familiares que honran la tradición del buen comer.",
  address: "9 Calle, 15 Avenida, zona 6 colonia las lomas de Chiquimula, Frente a zona vial 8 Guatemala, Chiquimula 20001",
  shortAddress: "Zona 6, Col. Las Lomas, Chiquimula",
  phone: "+502 7942 4777",
  phoneRaw: "+50279424777",
  whatsapp: "+502 5218 8115",
  whatsappRaw: "50252188115",
  schedule: "Lunes a Domingo: 7:00 AM – 9:45 PM",
  hours: "7:00 AM - 9:45 PM",
  instagram: "@jariaga68",
  instagramUrl: "https://instagram.com/jariaga68",
  facebook: "/tonysgrillgt",
  facebookUrl: "https://facebook.com/tonysgrillgt",
  domain: "tonysgrillgt.com",
};

export const MENU_CATEGORIES = [
  { id: 'todos', name: 'Todo el Menú' },
  { id: 'cortes', name: 'Cortes a la Parrilla' },
  { id: 'pizzas', name: 'Pizzas Artesanales' },
  { id: 'pastas', name: 'Pastas Frescas' },
  { id: 'hamburguesas', name: 'Hamburguesas Gourmet' },
  { id: 'desayunos', name: 'Desayunos Tradicionales' },
];

export const FEATURED_DISHES: MenuItem[] = [
  {
    id: 'car-01',
    name: 'Lomito 8 Onzas',
    category: 'cortes',
    price: 'Q155.00',
    description: 'Corte clásico de la casa preparado a la parrilla.',
    tag: 'Carnes & Parrilladas',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'car-05',
    name: 'Parrillada para 2 Personas',
    category: 'cortes',
    price: 'Q219.00',
    description: 'Selección de carnes a la parrilla ideal para compartir.',
    tag: 'Carnes & Parrilladas',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'car-06',
    name: 'Entraña',
    category: 'cortes',
    price: 'Q165.00',
    description: 'Corte jugoso asado a la brasa.',
    tag: 'Carnes & Parrilladas',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'car-04',
    name: 'Mar y Tierra (Combo)',
    category: 'cortes',
    price: 'Q169.00',
    description: 'Combinación especial de corte a la parrilla y mariscos.',
    tag: 'Carnes & Parrilladas',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'pas-02',
    name: 'Pasta Alfredo con Pollo',
    category: 'pastas',
    price: 'Q99.00',
    description: 'Pasta en salsa Alfredo acompañada de pollo a la plancha.',
    tag: 'Pastas',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281728?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'des-05',
    name: 'Desayuno Típico',
    category: 'desayunos',
    price: 'Q48.00',
    description: 'Desayuno tradicional de la casa.',
    tag: 'Desayunos & Omelettes',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Ing. Carlos Mendoza',
    role: 'Cliente Frecuente',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Hace 3 días',
    highlight: 'El mejor Tomahawk de todo el oriente',
    text: 'Impresionante experiencia gastronómica en Chiquimula. El Ribeye y el Tomahawk tienen un sabor a fuego inigualable y la atención es de 5 estrellas. El ambiente familiar es cálido y distinguido.',
    source: 'Google Reviews'
  },
  {
    id: 'rev-2',
    author: 'Dra. María René Estrada',
    role: 'Local Guide Google • Nivel 7',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Hace 1 semana',
    highlight: 'Banquete para boda impecable',
    text: 'Contratamos a Tony\'s Grill para el banquete de aniversario de mis padres para 80 personas. La comida salió perfecta, caliente y el servicio fue de guante blanco. Todos los invitados quedaron fascinados.',
    source: 'Google Reviews'
  },
  {
    id: 'rev-3',
    author: 'Lic. Fernando Sagastume',
    role: 'Comensal Gourmet',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Hace 2 semanas',
    highlight: 'Pizzas a la leña insuperables',
    text: 'No solo son los reyes de la carne; la pizza artesanal supera a muchas de la capital. La masa es crujiente y ligera. Además los desayunos tradicionales un domingo por la mañana son una maravilla.',
    source: 'Google Reviews'
  },
  {
    id: 'rev-4',
    author: 'Sofía Lemus de Morales',
    role: 'Cliente Verificada',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Hace 3 semanas',
    highlight: 'Atención cálida y familiar',
    text: 'Un lugar donde se siente el cariño de familia en cada plato. La hamburguesa de picaña es fuera de este mundo. Los postres y cócteles también merecen mención honorífica. Volveremos siempre.',
    source: 'Google Reviews'
  },
  {
    id: 'rev-5',
    author: 'Arq. Roberto Monroy',
    role: 'Crítico Gastronómico Regional',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Hace 1 mes',
    highlight: 'Instalaciones y cortes de clase mundial',
    text: 'Chiquimula necesitaba un restaurante de este calibre. Tony\'s Grill eleva el estándar del buen comer en Guatemala: cortes madurados, cocción milimétrica al carbón y una carta de vinos sensacional.',
    source: 'Google Reviews'
  }
];

export const PROMOTIONS: Promo[] = [
  {
    id: 'promo-1',
    title: 'Noche de Cortes & Vino',
    subtitle: 'Jueves y Viernes a partir de las 6:00 PM',
    discount: '25% OFF',
    validity: 'Válido todo el mes',
    description: 'En la compra de cualquier corte Premium de 14oz o superior, obtén 25% de descuento en botellas seleccionadas de vino tinto de la cava.',
    badge: 'Jueves & Viernes'
  },
  {
    id: 'promo-2',
    title: 'Festival Pizza & Cerveza Artesanal',
    subtitle: 'Martes Gourmet',
    discount: '2x1',
    validity: 'Martes de 5:00 PM a 9:00 PM',
    description: 'Pide tu pizza artesanal favorita y la segunda va a mitad de precio o disfruta de 2x1 en cerveza de barril artesanal.',
    badge: 'Martes Familiar'
  },
  {
    id: 'promo-3',
    title: 'Desayunos de Fin de Semana en Familia',
    subtitle: 'Sábados y Domingos 7:00 AM - 11:30 AM',
    discount: 'Café & Refill Gratis',
    validity: 'Fines de semana',
    description: 'Por cada 4 desayunos campiranos en tu mesa, el postre de la casa y café de altura artesanal corren por nuestra cuenta.',
    badge: 'Fines de Semana'
  }
];

