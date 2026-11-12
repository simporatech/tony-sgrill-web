-- ==============================================================================
-- TONY'S GRILL - PRODUCTION DATABASE INITIALIZATION SCRIPT (SUPABASE POSTGRESQL)
-- ==============================================================================
-- Execute this entire script in the Supabase SQL Editor.
-- It creates all required tables, sets up Row Level Security (RLS),
-- creates the 'cms_images' storage bucket with security policies,
-- and seeds the complete initial dataset.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLE: landing_content
-- Stores editable Hero, About, Events, and Contact configurations
CREATE TABLE IF NOT EXISTS public.landing_content (
  id TEXT PRIMARY KEY,
  hero JSONB NOT NULL DEFAULT '{}'::jsonb,
  about JSONB NOT NULL DEFAULT '{}'::jsonb,
  events JSONB NOT NULL DEFAULT '{}'::jsonb,
  contact JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CREATE TABLE: menu_categories
CREATE TABLE IF NOT EXISTS public.menu_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CREATE TABLE: menu_items
CREATE TABLE IF NOT EXISTS public.menu_items (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CREATE TABLE: promotions
CREATE TABLE IF NOT EXISTS public.promotions (
  id TEXT PRIMARY KEY,
  emoji TEXT DEFAULT '🍳',
  badge TEXT DEFAULT '',
  badge_color TEXT DEFAULT '#D90302',
  title TEXT NOT NULL,
  highlight_price TEXT DEFAULT '',
  schedule TEXT DEFAULT '',
  description TEXT DEFAULT '',
  terms TEXT DEFAULT '',
  accent_color TEXT DEFAULT '#D90302',
  active_status BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.landing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to allow safe re-runs
DROP POLICY IF EXISTS "Public Read Landing Content" ON public.landing_content;
DROP POLICY IF EXISTS "Authenticated Manage Landing Content" ON public.landing_content;

DROP POLICY IF EXISTS "Public Read Menu Categories" ON public.menu_categories;
DROP POLICY IF EXISTS "Authenticated Manage Menu Categories" ON public.menu_categories;

DROP POLICY IF EXISTS "Public Read Menu Items" ON public.menu_items;
DROP POLICY IF EXISTS "Authenticated Manage Menu Items" ON public.menu_items;

DROP POLICY IF EXISTS "Public Read Promotions" ON public.promotions;
DROP POLICY IF EXISTS "Authenticated Manage Promotions" ON public.promotions;

-- Landing Content Policies: Read for everyone, Write ONLY for authenticated users
CREATE POLICY "Public Read Landing Content"
  ON public.landing_content FOR SELECT
  USING (true);

CREATE POLICY "Authenticated Manage Landing Content"
  ON public.landing_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Menu Categories Policies
CREATE POLICY "Public Read Menu Categories"
  ON public.menu_categories FOR SELECT
  USING (true);

CREATE POLICY "Authenticated Manage Menu Categories"
  ON public.menu_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Menu Items Policies
CREATE POLICY "Public Read Menu Items"
  ON public.menu_items FOR SELECT
  USING (true);

CREATE POLICY "Authenticated Manage Menu Items"
  ON public.menu_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Promotions Policies
CREATE POLICY "Public Read Promotions"
  ON public.promotions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated Manage Promotions"
  ON public.promotions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 7. SUPABASE STORAGE BUCKET: cms_images
-- ==============================================================================

-- Create the cms_images bucket (if not already existing)
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms_images', 'cms_images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS Policies for cms_images
DROP POLICY IF EXISTS "Public Read cms_images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload cms_images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update cms_images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete cms_images" ON storage.objects;

-- Allow public read access to all images inside cms_images
CREATE POLICY "Public Read cms_images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cms_images');

-- Allow authenticated users to upload, update, and delete images
CREATE POLICY "Authenticated Upload cms_images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'cms_images');

CREATE POLICY "Authenticated Update cms_images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'cms_images')
  WITH CHECK (bucket_id = 'cms_images');

CREATE POLICY "Authenticated Delete cms_images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'cms_images');

-- ==============================================================================
-- 8. SEED DATA GENERATION (MATCHING DEFAULT_CMS_DATA)
-- ==============================================================================

-- Seed Landing Content
INSERT INTO public.landing_content (id, hero, about, events, contact)
VALUES (
  'main',
  '{
    "tagline": "Chiquimula, Guatemala",
    "headlineMain": "LOS MEJORES CORTES",
    "headlineAccent": "A LA PARRILLA",
    "headlineCity": "EN CHIQUIMULA",
    "subheadline": "Restaurante familiar de referencia en Chiquimula, especializado en cortes de carne a la parrilla, pizzas artesanales, pastas, hamburguesas y desayunos tradicionales.",
    "bgImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80",
    "ctaMenuText": "Ver Menú",
    "ctaReserveText": "Reservar"
  }'::jsonb,
  '{
    "eyebrow": "Nuestra Casa",
    "title": "Restaurante familiar de referencia en",
    "titleAccent": "Chiquimula",
    "description": "Especializado en cortes de carne a la parrilla, pizzas artesanales, pastas, hamburguesas y desayunos tradicionales.",
    "pillars": [
      { "id": "1", "title": "Cortes a la Parrilla", "desc": "Cortes selectos asados a las brasas de carbón y leña.", "iconName": "Beef" },
      { "id": "2", "title": "Pizzas Artesanales", "desc": "Masa fermentada lentamente y horneada a la piedra.", "iconName": "Pizza" },
      { "id": "3", "title": "Pastas Frescas", "desc": "Elaboradas en casa con recetas tradicionales.", "iconName": "UtensilsCrossed" },
      { "id": "4", "title": "Hamburguesas", "desc": "Blend propio de carne selecta en pan brioche.", "iconName": "Sandwich" },
      { "id": "5", "title": "Desayunos Tradicionales", "desc": "Auténtico sabor regional servido desde las 7:00 AM.", "iconName": "Coffee" }
    ]
  }'::jsonb,
  '{
    "eyebrow": "Banquetes & Ocasiones",
    "title": "Servicio de banquetes y eventos especiales con",
    "titleAccent": "menú personalizado",
    "description": "Ofrecemos atención integral para sus eventos y banquetes. Diseñamos propuestas gastronómicas a la medida de su ocasión, con la calidad, el sabor y la hospitalidad que nos distingue en Chiquimula.",
    "imageUrl": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "cardTitle": "Menú a la Medida de su Evento",
    "cardSubtitle": "Asesoría directa y atención personalizada"
  }'::jsonb,
  '{
    "eyebrow": "Ubicación",
    "title": "Visítenos en",
    "titleAccent": "Chiquimula",
    "address": "9 Calle, 15 Avenida, zona 6 colonia las lomas de Chiquimula, Frente a zona vial 8 Guatemala, Chiquimula 20001",
    "phone": "+502 7942 4777",
    "phoneRaw": "+50279424777",
    "whatsapp": "+502 5218 8115",
    "whatsappRaw": "50252188115",
    "schedule": "7:00 AM - 9:45 PM",
    "reference": "Frente a zona vial 8",
    "instagramHandle": "@jariaga68",
    "instagramUrl": "https://instagram.com/jariaga68",
    "facebookHandle": "/tonysgrillgt",
    "facebookUrl": "https://facebook.com/tonysgrillgt",
    "domain": "tonysgrillgt.com"
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  hero = EXCLUDED.hero,
  about = EXCLUDED.about,
  events = EXCLUDED.events,
  contact = EXCLUDED.contact,
  updated_at = timezone('utc'::text, now());

-- Seed Menu Categories
INSERT INTO public.menu_categories (id, name, display_order)
VALUES
  ('carnes', 'Carnes & Parrilladas', 1),
  ('desayunos', 'Desayunos & Omelettes', 2),
  ('mariscos', 'Mariscos', 3),
  ('pastas', 'Pastas', 4),
  ('hamburguesas', 'Hamburguesas', 5),
  ('antojitos', 'Antojitos Típicos & Especiales', 6),
  ('pizzas', 'Pizzas', 7)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  display_order = EXCLUDED.display_order;

-- Seed Menu Items (All 35 official real items)
INSERT INTO public.menu_items (id, category_id, name, description, price)
VALUES
  -- Desayunos & Omelettes
  ('des-01', 'desayunos', 'American Cheese Omelette', '', 45.00),
  ('des-02', 'desayunos', 'Spanish Omelette', '', 48.00),
  ('des-03', 'desayunos', 'Desayuno Económico', '', 35.00),
  ('des-04', 'desayunos', 'Desayuno Super', '', 45.00),
  ('des-05', 'desayunos', 'Desayuno Típico', '', 48.00),
  ('des-06', 'desayunos', 'Panqueques Simples (3 porciones)', '', 38.00),
  ('des-07', 'desayunos', 'Tostadas Francesas Simples (2 porciones)', '', 33.00),

  -- Carnes & Parrilladas
  ('car-01', 'carnes', 'Lomito 8 Onzas', '', 155.00),
  ('car-02', 'carnes', 'Puyazo Americano', '', 140.00),
  ('car-03', 'carnes', 'Churrasquito Económico', '', 70.00),
  ('car-04', 'carnes', 'Mar y Tierra (Combo)', '', 169.00),
  ('car-05', 'carnes', 'Parrillada para 2 Personas', '', 219.00),
  ('car-06', 'carnes', 'Entraña', '', 165.00),

  -- Mariscos
  ('mar-01', 'mariscos', 'Salmón', '', 149.00),
  ('mar-02', 'mariscos', 'Róbalo', '', 125.00),
  ('mar-03', 'mariscos', 'Mojarra', '', 70.00),
  ('mar-04', 'mariscos', 'Ceviche Pequeño', '', 75.00),
  ('mar-05', 'mariscos', 'Tapado', '', 165.00),

  -- Pastas
  ('pas-01', 'pastas', 'Pollo Parmesano', '', 99.00),
  ('pas-02', 'pastas', 'Pasta Alfredo con Pollo', '', 99.00),
  ('pas-03', 'pastas', 'Pasta Bolognesa', '', 90.00),
  ('pas-04', 'pastas', 'Pasta al Ajillo con Camarones', '', 135.00),

  -- Hamburguesas
  ('ham-01', 'hamburguesas', 'Hamburguesa Gemelas', '', 59.00),
  ('ham-02', 'hamburguesas', 'Deluxe con Queso', '', 49.00),
  ('ham-03', 'hamburguesas', 'Torito', '', 59.00),
  ('ham-04', 'hamburguesas', 'Menú Infantil (Hamburguesa, Papas y Gaseosa)', '', 40.00),

  -- Antojitos Típicos & Especiales
  ('ant-01', 'antojitos', 'Mexican Quesadillas', '', 60.00),
  ('ant-02', 'antojitos', 'Burrito Chapín', '', 60.00),
  ('ant-03', 'antojitos', 'Chuchitos', '', 35.00),
  ('ant-04', 'antojitos', 'Rellenitos', '', 35.00),
  ('ant-05', 'antojitos', 'Enchiladas', '', 35.00),

  -- Pizzas
  ('piz-01', 'pizzas', 'Pizza Peperoni (Mediana)', '', 55.00),
  ('piz-02', 'pizzas', 'Pizza Margarita (Mediana)', '', 75.00),
  ('piz-03', 'pizzas', 'Pizza Americana (Mediana)', '', 119.00)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  category_id = EXCLUDED.category_id;

-- Seed Promotions
INSERT INTO public.promotions (id, emoji, badge, badge_color, title, highlight_price, schedule, description, terms, accent_color, active_status)
VALUES
  ('promo-1', '🍳', 'Lunes a Viernes', '#D90302', 'Desayuno Súper 2xQ59', '2x Q59', 'Lunes - Viernes en rest.', 'Dos desayunos completos con huevos al gusto, frijoles volteados, plátanos dulces, queso fresco, crema y café.', 'Válido exclusivamente para consumo en mesas del restaurante.', '#D90302', true),
  ('promo-2', '🍳', 'Toque Especial', '#03AF45', 'Huevos con Loroco', '+Q5 Omelet', 'Todos los días desde 7:00 AM', 'Huevos revueltos suavemente con auténtico loroco fresco regional salteado en mantequilla. Opción en Omelet por +Q5.', 'Incluye guarnición de frijoles, plátanos y queso de la región.', '#03AF45', true),
  ('promo-3', '🍲', 'Sólo Domingos', '#EBFA00', 'Caldo de Res Tradicional', 'Domingos', 'Domingos Familiares', 'Nuestra legendaria receta dominical: carne suave cocida a fuego lento con elote tierno, yuca, güisquil y hierbabuena.', 'Hasta agotar existencias dominicales.', '#EBFA00', true),
  ('promo-4', '🍝', '2x1 Especial', '#D90302', '2x1 Lasaña Q63', '2x Q63', 'Almuerzos & Cenas', '¡Doble porción de placer italiano! Pasta fresca artesanal, salsa boloñesa con carne estofada y gratín de quesos.', 'Pagas una lasaña y recibes la segunda gratis por solo Q63.', '#D90302', true),
  ('promo-5', '🍕', 'Temporada', '#03AF45', 'Pizza Loroco de temporada', 'Temporada', 'Toda la semana', 'Masa madre crujiente, salsa de tomates asados, abundante queso mozzarella fundido y fresco loroco chiquimulteco.', 'Disponible en tamaño Mediano y Familiar.', '#03AF45', true),
  ('promo-6', '☕🍷', 'Dúo Bebidas', '#EBFA00', 'Capuchino 2xQ29 | Sangría 2xQ49', 'Desde Q29', 'Tardes de Café & Cava', 'Dos Capuchinos con espresso de altura por Q29, o dos copas de Sangría de la Cava con vino tinto y frutas por Q49.', 'Aplica en consumo individual o para compartir en tu visita.', '#EBFA00', true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  highlight_price = EXCLUDED.highlight_price,
  schedule = EXCLUDED.schedule,
  description = EXCLUDED.description,
  terms = EXCLUDED.terms,
  active_status = EXCLUDED.active_status;

-- ==============================================================================
-- END OF SCRIPT. All tables, RLS policies, bucket, and seed data created.
-- ==============================================================================

