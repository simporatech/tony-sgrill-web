-- ==============================================================================
-- TONY'S GRILL - SUPABASE MIGRATION SCRIPT (FULL DATABASE MENU & PDF SYNC)
-- ==============================================================================
-- Copia y pega este script completo en el SQL Editor de Supabase y presiona "Run".
-- Es 100% idempotente (puedes correrlo de forma segura sobre tu base existente).
-- ==============================================================================

-- 1. Asegurar columnas necesarias en menu_categories y menu_items
ALTER TABLE public.menu_categories
  ADD COLUMN IF NOT EXISTS pdf_pages JSONB DEFAULT '[]'::jsonb;

ALTER TABLE public.menu_items
  ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS destacado BOOLEAN DEFAULT false;

-- 2. Actualizar la dirección oficial en landing_content
UPDATE public.landing_content
SET contact = jsonb_set(
  contact,
  '{address}',
  '"9 Calle, 15 Avenida, Zona 6, Colonia Las Lomas de Chiquimula, frente a Zona Vial 8, Chiquimula 20001, Guatemala."'::jsonb
),
updated_at = timezone('utc'::text, now())
WHERE id = 'main';

-- 3. Insertar / Actualizar las 7 categorías oficiales con sus páginas del PDF
INSERT INTO public.menu_categories (id, name, display_order, pdf_pages)
VALUES
  (
    'desayunos',
    'Desayunos',
    1,
    '[
      {"title": "Portada Desayunos", "image": "/menu-pages/page-01.jpg"},
      {"title": "Omelettes & Desayunos", "image": "/menu-pages/page-02.jpg"},
      {"title": "Panqueques, Muffins & Kids", "image": "/menu-pages/page-03.jpg"},
      {"title": "Livianos & Extras", "image": "/menu-pages/page-04.jpg"}
    ]'::jsonb
  ),
  (
    'asados-y-carnes',
    'Asados y Carnes',
    2,
    '[
      {"title": "Asados & Carnes", "image": "/menu-pages/page-06.jpg"},
      {"title": "Combos Mar y Tierra", "image": "/menu-pages/page-07.jpg"},
      {"title": "Parrilladas Familiares", "image": "/menu-pages/page-08.jpg"},
      {"title": "Aire, Mar y Tierra & Entraña", "image": "/menu-pages/page-17.jpg"},
      {"title": "Sizzling Fajitas & Pinchos", "image": "/menu-pages/page-18.jpg"},
      {"title": "Pollo a la Parrilla", "image": "/menu-pages/page-19.jpg"}
    ]'::jsonb
  ),
  (
    'sopas',
    'Sopas',
    3,
    '[
      {"title": "Sopas, Tapado & Ceviches", "image": "/menu-pages/page-16.jpg"},
      {"title": "Mariscos Especiales", "image": "/menu-pages/page-14.jpg"}
    ]'::jsonb
  ),
  (
    'crepas',
    'Crepas',
    4,
    '[
      {"title": "Crepas Dulces, Saladas & Postres", "image": "/menu-pages/page-20.jpg"},
      {"title": "American Doughnuts", "image": "/menu-pages/page-26.jpg"}
    ]'::jsonb
  ),
  (
    'pizzas-y-lasanas',
    'Pizzas y Lasañas',
    5,
    '[
      {"title": "Pizzas Artesanales", "image": "/menu-pages/page-27.jpg"},
      {"title": "Combo Pizzas", "image": "/menu-pages/page-28.jpg"},
      {"title": "Lasaña Bolognesa & Calzones", "image": "/menu-pages/page-15.jpg"},
      {"title": "Pastas", "image": "/menu-pages/page-22.jpg"}
    ]'::jsonb
  ),
  (
    'bebidas',
    'Bebidas',
    6,
    '[
      {"title": "Tony''s Fresh • Refrescantes", "image": "/menu-pages/page-30.jpg"},
      {"title": "Cóctelería & 2x1", "image": "/menu-pages/page-31.jpg"},
      {"title": "Cócteles & Cubetazos", "image": "/menu-pages/page-32.jpg"}
    ]'::jsonb
  ),
  (
    'promociones',
    'Promociones',
    7,
    '[
      {"title": "Antojitos Dulces y Salados", "image": "/menu-pages/page-09.jpg"},
      {"title": "Antojitos Especiales", "image": "/menu-pages/page-10.jpg"},
      {"title": "Antojitos Tradicionales & Al Horno", "image": "/menu-pages/page-11.jpg"},
      {"title": "Antojitos Típicos & Sandwiches", "image": "/menu-pages/page-12.jpg"},
      {"title": "Hamburguesas", "image": "/menu-pages/page-23.jpg"},
      {"title": "Menú Infantil", "image": "/menu-pages/page-25.jpg"},
      {"title": "Antojitos Chapines", "image": "/menu-pages/page-33.jpg"},
      {"title": "Promos Cubetazo & Garnachas", "image": "/menu-pages/page-34.jpg"},
      {"title": "Sangría 2x1 & Carpaccio", "image": "/menu-pages/page-35.jpg"}
    ]'::jsonb
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  display_order = EXCLUDED.display_order,
  pdf_pages = EXCLUDED.pdf_pages;

-- 4. Insertar / Actualizar todos los platillos del menú vinculados a las categorías reales
INSERT INTO public.menu_items (id, category_id, name, description, price, destacado)
VALUES
  -- Desayunos
  ('des-01', 'desayunos', 'Desayuno Típico', 'Huevos al gusto acompañados de frijoles volteados, plátanos fritos, queso fresco, crema y tortillas calientes.', 48.00, true),
  ('des-02', 'desayunos', 'American Cheese Omelette', 'Esponjoso omelette relleno de queso americano derretido, servido con guarnición de la casa.', 45.00, false),
  ('des-03', 'desayunos', 'Spanish Omelette', 'Omelette clásico preparado con vegetales frescos de temporada, hierbas y queso fundido.', 48.00, false),
  ('des-04', 'desayunos', 'Desayuno Super', 'Combinación completa de huevos, proteína a elección, frijoles, plátanos y pan tostado o tortillas.', 45.00, false),
  ('des-05', 'desayunos', 'Desayuno Económico', 'Opción práctica y tradicional para comenzar la mañana con sabor casero.', 35.00, false),
  ('des-06', 'desayunos', 'Panqueques Simples (3 porciones)', 'Tres suaves panqueques dorados servidos con mantequilla y miel de maple.', 38.00, false),
  ('des-07', 'desayunos', 'Tostadas Francesas Simples (2 porciones)', 'Dos rebanadas doradas a la plancha con toque de canela, azúcar glass y miel.', 33.00, false),

  -- Asados y Carnes
  ('car-01', 'asados-y-carnes', 'Lomito 8 Onzas', 'Corte tierno de 8 oz sellado a la parrilla al término de tu elección con guarniciones de la casa.', 155.00, true),
  ('car-02', 'asados-y-carnes', 'Parrillada para 2 Personas', 'Generosa selección de cortes a la brasa ideal para compartir en familia o pareja.', 219.00, true),
  ('car-03', 'asados-y-carnes', 'Puyazo Americano', 'Corte jugoso con marmoleo equilibrado y cobertura de grasa dorada al carbón.', 140.00, true),
  ('car-04', 'asados-y-carnes', 'Entraña', 'Corte clásico de sabor intenso asado directamente sobre brasas vivas.', 165.00, false),
  ('car-05', 'asados-y-carnes', 'Mar y Tierra (Combo)', 'Combinación especial de corte selecto a la parrilla acompañado de camarones.', 169.00, false),
  ('car-06', 'asados-y-carnes', 'Churrasquito Económico', 'Porción personal de carne asada acompañada de arroz, frijoles y ensalada fresca.', 70.00, false),

  -- Sopas
  ('sop-01', 'sopas', 'Tapado', 'Tradicional caldo caribeño con mariscos frescos, leche de coco, plátano y yuca.', 165.00, true),
  ('sop-02', 'sopas', 'Sopa de Tortilla', 'Caldo especiado de tomate rostizado servido con tiras crujientes de maíz, aguacate y queso.', 45.00, false),
  ('sop-03', 'sopas', 'Crema de Tomate y Albahaca', 'Suave crema artesanal de tomates maduros con un toque de albahaca fresca y crutones.', 42.00, false),

  -- Crepas
  ('cre-01', 'crepas', 'Crepa de Nutella y Banano', 'Delicada crepa recién hecha rellena de crema de avellanas y rodajas de banano fresco.', 42.00, true),
  ('cre-02', 'crepas', 'Crepa de Fresa y Queso Crema', 'Rellena de queso crema suavizado con fresas frescas de temporada y coulis dulce.', 45.00, false),
  ('cre-03', 'crepas', 'Crepa Salada de Pollo Alfredo', 'Crepa gratinada rellena de pollo a la plancha en cremosa salsa Alfredo.', 55.00, false),

  -- Pizzas y Lasañas
  ('piz-01', 'pizzas-y-lasanas', 'Pizza Americana (Mediana)', 'Masa artesanal horneada con salsa pomodoro, queso mozzarella y combinación especial de carnes.', 119.00, true),
  ('piz-02', 'pizzas-y-lasanas', 'Pizza Margarita (Mediana)', 'Clásica receta italiana con salsa de tomate natural, mozzarella fundida y albahaca.', 75.00, false),
  ('piz-03', 'pizzas-y-lasanas', 'Pizza Peperoni (Mediana)', 'Crujiente masa artesanal cubierta con abundante pepperoni dorado y queso mozzarella.', 55.00, false),
  ('piz-04', 'pizzas-y-lasanas', 'Pollo Parmesano', 'Pechuga empanizada gratinada con mozzarella y salsa marinara acompañada de pasta.', 99.00, false),
  ('piz-05', 'pizzas-y-lasanas', 'Pasta Alfredo con Pollo', 'Fettuccine bañado en cremosa salsa Alfredo de queso parmesano con tiras de pollo asado.', 99.00, false),
  ('piz-06', 'pizzas-y-lasanas', 'Lasaña Bolognesa Gratinada', 'Capas de pasta fresca con carne molida en salsa bolognesa tradicional y queso gratinado.', 90.00, false),

  -- Bebidas
  ('beb-01', 'bebidas', 'Limonada con Soda / Hierbabuena', 'Refrescante limonada natural recién exprimida con toque de hierbabuena o agua mineral.', 22.00, false),
  ('beb-02', 'bebidas', 'Licuado de Fruta Natural', 'Preparado al instante con fruta fresca de temporada (fresa, papaya, piña o banano).', 25.00, false),
  ('beb-03', 'bebidas', 'Café Capuccino / Americano', 'Grano seleccionado de altura guatemalteca recién molido.', 20.00, false),

  -- Promociones
  ('pro-01', 'promociones', '2x1 en Desayuno Típico', 'Válido de lunes a jueves de 7:00 AM a 11:00 AM. Disfruta dos desayunos típicos al precio de uno.', 48.00, true),
  ('pro-02', 'promociones', 'Martes de Pizza 2x1', 'Todos los martes llévate dos pizzas artesanales medianas (Peperoni o Margarita).', 75.00, true),
  ('pro-03', 'promociones', 'Combo Parrillada Familiar + Bebidas', 'Parrillada para compartir acompañada de guarniciones y jarra de limonada natural.', 249.00, false)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  destacado = EXCLUDED.destacado;

-- 5. Limpiar categorías y platillos antiguos que ya no pertenecen a la estructura unificada
DELETE FROM public.menu_categories
WHERE id IN ('carnes', 'mariscos', 'pastas', 'hamburguesas', 'antojitos', 'pizzas');
