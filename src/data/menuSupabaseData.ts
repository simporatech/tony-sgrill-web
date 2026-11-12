/**
 * Supabase-ready Menu Schema and Dataset
 * Formatted as an array of objects with PostgreSQL / Supabase column conventions:
 * uuid, category, name, description, price, is_available, is_signature, badge, allergens, etc.
 */

export interface MenuItemRow {
  id: string; // UUID format
  category_id: 'carnes' | 'pizzas' | 'desayunos' | 'pastas' | 'hamburguesas' | 'entradas' | 'bebidas';
  category_name: string;
  name: string;
  description: string;
  price: number; // numeric(10,2) in Supabase
  currency: string;
  badge?: string | null;
  serving_size?: string | null;
  is_signature: boolean;
  is_spicy?: boolean;
  is_available: boolean;
  preparation_time_mins?: number;
  dietary_tags?: string[];
  sort_order: number;
}

export const MENU_CATEGORIES = [
  { id: 'carnes', label: 'Cortes & Brasa', iconName: 'Flame', subtitle: 'Selección Angus al carbón de quebracho y leña' },
  { id: 'pizzas', label: 'Pizzas Artesanales', iconName: 'Pizza', subtitle: 'Masa madre 48h horneada a la piedra' },
  { id: 'desayunos', label: 'Desayunos Tradicionales', iconName: 'Coffee', subtitle: 'Desde las 7:00 AM con auténtico sabor chiquimulteco' },
  { id: 'pastas', label: 'Pastas Frescas', iconName: 'UtensilsCrossed', subtitle: 'Amasadas en casa con queso Grana Padano' },
  { id: 'hamburguesas', label: 'Hamburguesas Gourmet', iconName: 'Sandwich', subtitle: 'Blend artesanal de picaña y pan brioche dorado' },
  { id: 'entradas', label: 'Entradas & Botanas', iconName: 'Sparkles', subtitle: 'Ideales para compartir en familia' },
  { id: 'bebidas', label: 'Bebidas & Cava', iconName: 'Wine', subtitle: 'Café de altura, sangrías y vinos selectos' },
] as const;

export const MENU_ITEMS_DATABASE: MenuItemRow[] = [
  // --- CARNES & BRASA ---
  {
    id: 'c0a80101-0001-4000-8000-000000000001',
    category_id: 'carnes',
    category_name: 'Cortes & Brasa',
    name: 'Tomahawk Grill Master',
    description: 'Corte colosal con hueso largo sellado a la brasa viva. Mantequilla noisette de romero y ajo rostizado, sal de grano de Colima y escamas ahumadas. Acompañado de papas doradas con trufa y vegetales a la parrilla.',
    price: 345.00,
    currency: 'GTQ',
    serving_size: '32 oz (Ideal para 2)',
    badge: 'Corte Insignia',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 25,
    sort_order: 1
  },
  {
    id: 'c0a80101-0001-4000-8000-000000000002',
    category_id: 'carnes',
    category_name: 'Cortes & Brasa',
    name: 'Ribeye Prime Angus Reserva',
    description: 'Marmoleo grado Choice Superior. Jugosidad extraordinaria con costra crocante al carbón, mantequilla de finas hierbas y chimichurri rústico de la casa.',
    price: 220.00,
    currency: 'GTQ',
    serving_size: '14 oz',
    badge: 'Favorito de la Casa',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 20,
    sort_order: 2
  },
  {
    id: 'c0a80101-0001-4000-8000-000000000003',
    category_id: 'carnes',
    category_name: 'Cortes & Brasa',
    name: 'Picaña Brasileña al Espeto',
    description: 'Tiras gruesas de picaña con su capa de grasa caramelizada y crujiente al punto exacto. Servida con mandioca frita, frijoles volteados y pico de gallo chiquimulteco.',
    price: 185.00,
    currency: 'GTQ',
    serving_size: '12 oz',
    badge: 'Recomendado',
    is_signature: false,
    is_available: true,
    preparation_time_mins: 18,
    sort_order: 3
  },
  {
    id: 'c0a80101-0001-4000-8000-000000000004',
    category_id: 'carnes',
    category_name: 'Cortes & Brasa',
    name: 'Puyazo Tradicional Tony\'s',
    description: 'El corte rey de las parrilladas guatemaltecas. Carne de res tierna y de sabor concentrado, con cebollitas cambray asadas, guacamol de la casa y tortillas calientes al comal.',
    price: 165.00,
    currency: 'GTQ',
    serving_size: '12 oz',
    badge: 'Tradición',
    is_signature: false,
    is_available: true,
    preparation_time_mins: 18,
    sort_order: 4
  },
  {
    id: 'c0a80101-0001-4000-8000-000000000005',
    category_id: 'carnes',
    category_name: 'Cortes & Brasa',
    name: 'Entraña Fina al Quebracho',
    description: 'Textura suave, fibra abierta y sabor profundo. Marinada ligeramente en oliva virgen, ajo confitado y orégano fresco.',
    price: 195.00,
    currency: 'GTQ',
    serving_size: '12 oz',
    badge: null,
    is_signature: false,
    is_available: true,
    preparation_time_mins: 15,
    sort_order: 5
  },
  {
    id: 'c0a80101-0001-4000-8000-000000000006',
    category_id: 'carnes',
    category_name: 'Cortes & Brasa',
    name: 'Parrillada Familiar Las Lomas',
    description: 'Surtido abundante para 4 comensales: Puyazo, entraña, pechuga a la parrilla, chorizos artesanales, longanizas asadas, chirmol fresco, plátanos asados y queso chancol.',
    price: 460.00,
    currency: 'GTQ',
    serving_size: 'Para 4 personas',
    badge: 'Banquete Familiar',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 30,
    sort_order: 6
  },

  // --- PIZZAS ARTESANALES ---
  {
    id: 'c0a80101-0002-4000-8000-000000000001',
    category_id: 'pizzas',
    category_name: 'Pizzas Artesanales',
    name: 'Pizza Especial de Loroco de Temporada',
    description: 'Homenaje a los aromas de Chiquimula: base de salsa blanca de crema artesanal, mozzarella fresca, loroco fresco tierno salteado a la mantequilla y un toque de parmesano curado.',
    price: 110.00,
    currency: 'GTQ',
    serving_size: 'Familiar 8 Porciones',
    badge: 'Edición Limitada',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 15,
    sort_order: 1
  },
  {
    id: 'c0a80101-0002-4000-8000-000000000002',
    category_id: 'pizzas',
    category_name: 'Pizzas Artesanales',
    name: 'Pizza Tony\'s Brasa & Prosciutto',
    description: 'Salsa pomodoro San Marzano, mozzarella Fior di Latte, tiras finas de puyazo ahumado al carbón, prosciutto di Parma crocante y hojas de rúcula con reducción balsámica.',
    price: 125.00,
    currency: 'GTQ',
    serving_size: 'Familiar 8 Porciones',
    badge: 'Firma Tony\'s',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 15,
    sort_order: 2
  },
  {
    id: 'c0a80101-0002-4000-8000-000000000003',
    category_id: 'pizzas',
    category_name: 'Pizzas Artesanales',
    name: 'Pizza Cuatro Quesos & Miel Picante',
    description: 'Mezcla balanceada de mozzarella, queso azul, provolone ahumado y queso de capas regional, terminada con un hilo de miel orgánica infusionada con chile cobanero.',
    price: 115.00,
    currency: 'GTQ',
    serving_size: 'Familiar 8 Porciones',
    badge: null,
    is_signature: false,
    is_available: true,
    preparation_time_mins: 15,
    sort_order: 3
  },
  {
    id: 'c0a80101-0002-4000-8000-000000000004',
    category_id: 'pizzas',
    category_name: 'Pizzas Artesanales',
    name: 'Pizza Carnívora Suprema',
    description: 'Pepperoni artesanal italiano, tocino ahumado al nogal, carne molida especiada y salchicha italiana con un toque de orégano silvestre.',
    price: 120.00,
    currency: 'GTQ',
    serving_size: 'Familiar 8 Porciones',
    badge: null,
    is_signature: false,
    is_available: true,
    preparation_time_mins: 15,
    sort_order: 4
  },

  // --- DESAYUNOS TRADICIONALES ---
  {
    id: 'c0a80101-0003-4000-8000-000000000001',
    category_id: 'desayunos',
    category_name: 'Desayunos Tradicionales',
    name: 'Desayuno Súper 2xQ59 (Promoción Rest.)',
    description: 'Promoción disponible de lunes a viernes en restaurante: Dos platos completos con huevos al gusto (estrellados o revueltos), frijoles colados caseros, plátanos dulces fritos, crema pura de la región y pan tostado con café artesanal.',
    price: 59.00,
    currency: 'GTQ',
    serving_size: 'Para 2 personas',
    badge: 'Promo Destacada',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 12,
    sort_order: 1
  },
  {
    id: 'c0a80101-0003-4000-8000-000000000002',
    category_id: 'desayunos',
    category_name: 'Desayunos Tradicionales',
    name: 'Huevos Revueltos con Loroco Fresco',
    description: 'Dos huevos de granja revueltos suavemente con abundante loroco recién cosechado y salteado al aroma de la mantequilla. Opción de preparación en Omelet dorado (+Q5). Servidos con frijoles y queso chiquimulteco.',
    price: 45.00,
    currency: 'GTQ',
    serving_size: 'Individual',
    badge: 'Sabor Chiquimula',
    is_signature: false,
    is_available: true,
    preparation_time_mins: 10,
    sort_order: 2
  },
  {
    id: 'c0a80101-0003-4000-8000-000000000003',
    category_id: 'desayunos',
    category_name: 'Desayunos Tradicionales',
    name: 'Desayuno Campirano Tony\'s Especial',
    description: 'Dos huevos al gusto acompañados de un jugoso corte de puyazo de 6 oz asado al carbón, longaniza casera, frijoles volteados con queso espolvoreado, plátanos y tortillas recién hechas.',
    price: 85.00,
    currency: 'GTQ',
    serving_size: 'Individual Generoso',
    badge: 'Firma de la Casa',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 15,
    sort_order: 3
  },
  {
    id: 'c0a80101-0003-4000-8000-000000000004',
    category_id: 'desayunos',
    category_name: 'Desayunos Tradicionales',
    name: 'Omelet Supremo de la Granja',
    description: 'Omelet esponjoso relleno de queso gouda fundido, jamón de pechuga ahumado, champiñones frescos y pimientos caramelizados, coronado con aguacate fresco.',
    price: 48.00,
    currency: 'GTQ',
    serving_size: 'Individual',
    badge: null,
    is_signature: false,
    is_available: true,
    preparation_time_mins: 12,
    sort_order: 4
  },

  // --- PASTAS FRESCAS ---
  {
    id: 'c0a80101-0004-4000-8000-000000000001',
    category_id: 'pastas',
    category_name: 'Pastas Frescas',
    name: 'Lasaña Tradicional Boloñesa (Promo 2x1 Q63)',
    description: 'Capas intercaladas de pasta al huevo hecha en casa, carne de res cocinada a fuego lento durante 6 horas con vino tinto y pomodoro, bechamel cremosa y gratín dorado de mozzarella y parmesano.',
    price: 63.00,
    currency: 'GTQ',
    serving_size: '2 Platos en Promo',
    badge: 'Promo 2x1 Activa',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 18,
    sort_order: 1
  },
  {
    id: 'c0a80101-0004-4000-8000-000000000002',
    category_id: 'pastas',
    category_name: 'Pastas Frescas',
    name: 'Fettuccine Alfredo con Entraña a la Brasa',
    description: 'Cintas de fettuccine en salsa emulsionada con crema espesa, mantequilla y queso Parmigiano-Reggiano, coronadas con medallones de entraña asada al carbón de quebracho.',
    price: 145.00,
    currency: 'GTQ',
    serving_size: 'Plato Fuerte',
    badge: 'Chef Selection',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 18,
    sort_order: 2
  },
  {
    id: 'c0a80101-0004-4000-8000-000000000003',
    category_id: 'pastas',
    category_name: 'Pastas Frescas',
    name: 'Ravioles Rellenos de Ricotta & Espinaca',
    description: 'Ravioles artesanales sellados a mano bañados en pomodoro rústico con albahaca genovesa y lluvia de queso parmesano.',
    price: 95.00,
    currency: 'GTQ',
    serving_size: 'Plato Fuerte',
    badge: 'Vegetariano',
    is_signature: false,
    is_available: true,
    preparation_time_mins: 15,
    sort_order: 3
  },

  // --- HAMBURGUESAS GOURMET ---
  {
    id: 'c0a80101-0005-4000-8000-000000000001',
    category_id: 'hamburguesas',
    category_name: 'Hamburguesas Gourmet',
    name: 'Tony\'s Black Angus Master Burger',
    description: '220 gramos de carne molida artesanal de puyazo y picaña, queso gouda ahumado, mermelada espesa de tocino al bourbon, cebolla crocante frita y mayonesa de ajo negro en pan brioche horneado a diario.',
    price: 95.00,
    currency: 'GTQ',
    serving_size: 'Incluye Papas Trufadas',
    badge: 'La Más Pedida',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 15,
    sort_order: 1
  },
  {
    id: 'c0a80101-0005-4000-8000-000000000002',
    category_id: 'hamburguesas',
    category_name: 'Hamburguesas Gourmet',
    name: 'Doble Smash Burger Queso Fundido',
    description: 'Doble torta de carne prensada a la plancha de hierro con costra crispy caramelizada, doble queso cheddar americano, pepinillos encurtidos y salsa secreta Tony\'s.',
    price: 78.00,
    currency: 'GTQ',
    serving_size: 'Incluye Papas Rústicas',
    badge: null,
    is_signature: false,
    is_available: true,
    preparation_time_mins: 12,
    sort_order: 2
  },

  // --- ENTRADAS & PLATOS DOMINICALES ---
  {
    id: 'c0a80101-0006-4000-8000-000000000001',
    category_id: 'entradas',
    category_name: 'Entradas & Botanas',
    name: 'Caldo de Res Tradicional Dominical',
    description: 'Receta ancestral de la casa preparada exclusivamente los domingos: caldo robusto y aromático de hueso con carne suave de res, elote tierno, güisquil, yuca, zanahoria y repollo. Acompañado de arroz con vegetales y chirmol picante.',
    price: 65.00,
    currency: 'GTQ',
    serving_size: 'Tazón Grande (Sólo Domingos)',
    badge: 'Especial Dominical',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 10,
    sort_order: 1
  },
  {
    id: 'c0a80101-0006-4000-8000-000000000002',
    category_id: 'entradas',
    category_name: 'Entradas & Botanas',
    name: 'Carpaccio de Res con Parmesano & Alcaparras',
    description: 'Láminas ultrafinas de lomo sellado brevemente al humo, rociadas con aceite de oliva extra virgen, limón mandarina, lajas de queso parmesano y alcaparras fritas.',
    price: 88.00,
    currency: 'GTQ',
    serving_size: 'Para Compartir',
    badge: null,
    is_signature: false,
    is_available: true,
    preparation_time_mins: 10,
    sort_order: 2
  },
  {
    id: 'c0a80101-0006-4000-8000-000000000003',
    category_id: 'entradas',
    category_name: 'Entradas & Botanas',
    name: 'Chorizos & Longanizas Artesanales al Carbón',
    description: 'Tres unidades de embutidos típicos de la región con receta secreta familiar asados a la brasa, servidos con frijoles colados calientes y tostadas de maíz criollo.',
    price: 60.00,
    currency: 'GTQ',
    serving_size: '3 Unidades con Guarnición',
    badge: null,
    is_signature: false,
    is_available: true,
    preparation_time_mins: 12,
    sort_order: 3
  },

  // --- BEBIDAS & CAVA ---
  {
    id: 'c0a80101-0007-4000-8000-000000000001',
    category_id: 'bebidas',
    category_name: 'Bebidas & Cava',
    name: 'Capuchino Artesanal de Altura (Promo 2xQ29)',
    description: 'Dos tazas de café espresso doble elaborado con granos estrictamente duros de altura guatemalteca, leche vaporizada a textura aterciopelada y lluvia de canela fina.',
    price: 29.00,
    currency: 'GTQ',
    serving_size: '2 Capuchinos',
    badge: 'Promo Café 2xQ29',
    is_signature: false,
    is_available: true,
    preparation_time_mins: 6,
    sort_order: 1
  },
  {
    id: 'c0a80101-0007-4000-8000-000000000002',
    category_id: 'bebidas',
    category_name: 'Bebidas & Cava',
    name: 'Sangría de la Cava con Frutas de Temporada (Promo 2xQ49)',
    description: 'Dos copas de sangría fresca con vino tinto seleccionado de la cava, macerada con manzanas, naranja, licor de naranja y un toque burbujeante refrescante.',
    price: 49.00,
    currency: 'GTQ',
    serving_size: '2 Copas en Promo',
    badge: 'Promo Sangría 2xQ49',
    is_signature: true,
    is_available: true,
    preparation_time_mins: 5,
    sort_order: 2
  },
  {
    id: 'c0a80101-0007-4000-8000-000000000003',
    category_id: 'bebidas',
    category_name: 'Bebidas & Cava',
    name: 'Limonada con Hierbabuena & Chía Natural',
    description: 'Jugo de limones recién exprimidos, jarabe de caña artesanal, hojas de hierbabuena maceradas y semillas de chía hidratadas.',
    price: 24.00,
    currency: 'GTQ',
    serving_size: 'Vaso 16 oz',
    badge: null,
    is_signature: false,
    is_available: true,
    preparation_time_mins: 5,
    sort_order: 3
  }
];

