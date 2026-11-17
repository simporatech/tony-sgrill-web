# Tony's Grill Chiquimula — Project Context & AI Agent Map

> **Purpose of this file:** Give any AI agent or developer an instant, token-efficient map of the entire codebase, architecture, routing, database schema, and operational rules so you can locate and edit files without scanning the repository.

---

## 1. Project Overview & Business Rules

- **Brand:** Tony's Grill (Chiquimula, Guatemala)
- **Production Domain:** `https://tonysgrillgt.com` (Pre-launch: `https://prelanzamiento.tonysgrillgt.com`)
- **Official Address:** `9 Calle, 15 Avenida, Zona 6, Colonia Las Lomas de Chiquimula, frente a Zona Vial 8, Chiquimula 20001, Guatemala.`
- **Opening Hours:** Monday – Sunday, `7:00 AM – 9:45 PM`
- **Primary Conversion Metric:** **Phone Calls** (NOT WhatsApp ordering). Any "Order / Call" CTA opens `CallOrderModal` with the 3 official lines:
  - Line 1: `+502 7942-4777` (`tel:+50279424777`)
  - Line 2: `+502 7942-4776` (`tel:+50279424776`)
  - Line 3: `+502 5237-5638` (`tel:+50252375638`)
- **Secondary Channel (WhatsApp):** `+502 5218-8115` — strictly framed for menu inquiries (`"Hola Tony's Grill, tengo una consulta sobre el menú"`), reservations form, or event inquiries.
- **Hard Content Rules:**
  - **NEVER** include references to `"Pradera Zacapa"` anywhere.
  - Individual menu items in `/menu` are **text-only** (no per-dish photos); visual menu context is provided by the **official PDF page galleries** (`public/menu-pages/*.jpg`) per category.
  - Aesthetic: Charcoal Black (`#080808`, `#0a0a0a`, `#121215`), Primary Red (`#D90302`), Accent Yellow (`#EBFA00`), WhatsApp Green (`#03AF45`).

---

## 2. Tech Stack & Commands

- **Frontend:** React 18, TypeScript, Vite 5, Tailwind CSS, Framer Motion, React Router DOM v7, Lucide React
- **BaaS:** Supabase (`@supabase/supabase-js` v2 — PostgreSQL, Auth, Storage) + `browser-image-compression`
- **Hosting & Serverless:** Vercel (`vercel.json` + `api/keepalive.js` daily cron)
- **Commands:**
  - `npm run dev` — Start Vite dev server
  - `npm run build` — TypeScript check (`tsc -b`) + Vite production bundle (`dist/`)
- **Environment Variables (`.env`):**
  ```env
  VITE_SUPABASE_URL=https://your-project-ref.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-public-key
  VITE_MAINTENANCE_MODE=false # Optional: "true" enables 503 Maintenance Mode globally
  ```

---

## 3. Repository & File Map

```text
.
├── api/
│   └── keepalive.js                 # Vercel Serverless Function (Node.js): daily Supabase ping via process.env
├── public/
│   ├── images/                      # Real restaurant & promo photos (puyazo-importado, mar-y-tierra, etc.)
│   ├── menu-pages/                  # Rendered JPEG pages of printed menus:
│   │                                #   page-01.jpg .. page-35.jpg (from tonys-grill-menu.pdf)
│   │                                #   eventos-1.jpg .. eventos-4.jpg (from Eventos 2026 PDF)
│   ├── favicon.png                  # 512x512 circular black-background favicon
│   ├── logo.png                     # Transparent Tony's Grill logo (Navbar, Loading Screen, Admin)
│   ├── robots.txt                   # Allows public crawl, blocks /admin & /mantenimiento, points to sitemap
│   ├── sitemap.xml                  # Static sitemap with all routes + ?categoria= deep links
│   └── tonys-grill-menu.pdf         # Full 35-page printed restaurant menu PDF
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── CustomSelect.tsx     # Styled dropdown component for forms/CMS
│   │   │   └── ImageUploader.tsx    # Client-side WebP compression (<200KB, 1920px) -> Supabase Storage
│   │   ├── AboutSection.tsx         # Landing section: restaurant pillars (from CmsContext)
│   │   ├── AdminLoginGate.tsx       # Supabase Auth email/password login UI for /admin
│   │   ├── BrandLoadingScreen.tsx   # Minimalist logo-only splash screen while Supabase loads
│   │   ├── CallOrderModal.tsx       # Responsive Modal (desktop) / Bottom Drawer (mobile) with 3 phone lines
│   │   ├── Contact.tsx              # Dual-navigation location block (Google Maps + Waze SVGs), 3 lines, form
│   │   ├── DataErrorBoundary.tsx    # React ErrorBoundary wrapping <Routes>
│   │   ├── EventsSection.tsx        # Landing section: banquets & custom events (from CmsContext)
│   │   ├── Footer.tsx               # Standalone footer for non-landing pages
│   │   ├── Hero.tsx                 # Landing hero with "Llamar para Ordenar" + "Ver Menú"
│   │   ├── MenuSection.tsx          # Landing 3-card "Especialidades de la Casa" preview (reads CmsContext)
│   │   ├── MobileFloatingActionBar.tsx # Fixed mobile bottom bar ("Llamar para Ordenar" + WhatsApp inquiry)
│   │   ├── Navbar.tsx               # Top navigation (Inicio, Menú, Nosotros, Eventos, Contacto)
│   │   ├── ReservationForm.tsx      # Table reservation form redirecting formatted message to WhatsApp
│   │   ├── RouteSeoManager.tsx      # Dynamic per-route <title>, description, canonical, and OG tags
│   │   └── SupabaseDataErrorFallback.tsx # Branded fallback UI with "Reintentar" + phone/WhatsApp CTAs
│   ├── context/
│   │   ├── CallModalContext.tsx     # Global state for CallOrderModal (openCallModal(dishName?))
│   │   └── CmsContext.tsx           # Central data layer: fetches & mutates Supabase tables + localStorage cache
│   ├── data/
│   │   ├── menuData.ts              # Static schema types, 8 category filters, PDF page mappings, seed items
│   │   └── restaurantData.ts        # Core static constants (RESTAURANT_INFO, FEATURED_DISHES fallback)
│   ├── pages/
│   │   ├── AdminDashboard.tsx       # Protected /admin split-screen live-preview CMS (requires Supabase session)
│   │   ├── LandingPage.tsx          # Main "/" composition: Hero -> About -> Events -> MenuSection -> Reserve -> Contact
│   │   ├── MaintenancePage.tsx      # 503 Maintenance view ("Estamos encendiendo el carbón. Volvemos pronto.")
│   │   ├── NotFoundPage.tsx         # 404 luxury view ("Parece que te has alejado de las brasas")
│   │   ├── PdfMenuPage.tsx          # Dedicated /menu-pdf viewer & download page
│   │   ├── PrivacyPage.tsx          # /politicas-de-privacidad
│   │   ├── PromosPage.tsx           # /promos standalone promotions showcase
│   │   ├── TermsPage.tsx            # /terminos-y-condiciones
│   │   └── WebMenuPage.tsx          # Unified /menu hub: Interactive + PDF toggle, ?categoria= deep linking,
│   │                                # category PDF page lightbox, text-only dish cards + order builder
│   ├── services/
│   │   ├── storageService.ts        # Uploads compressed WebP files to Supabase Storage bucket "cms_images"
│   │   └── supabaseClient.ts        # Initializes @supabase/supabase-js with import.meta.env.VITE_SUPABASE_*
│   ├── utils/
│   │   └── imageCompression.ts      # browser-image-compression helper (max 200KB, max 1920px, WebP)
│   ├── App.tsx                      # Root router, Maintenance guard, BrandLoadingScreen, CallModalProvider
│   ├── index.css                    # Tailwind base + custom scrollbar (scroll-snap intentionally removed)
│   ├── main.tsx                     # ReactDOM entry point
│   └── vite-env.d.ts                # Vite import.meta.env TypeScript declarations
├── .env.example                     # Template for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
├── index.html                       # Master HTML with LocalBusiness, Restaurant, WebSite & FAQPage JSON-LD
├── package.json                     # Dependencies and build scripts
├── supabase_migration_menu_sync.sql # Idempotent SQL script syncing categories, Eventos 2026, Promos & photos
├── supabase_schema.sql              # Full initial PostgreSQL schema, RLS policies, bucket & seed script
├── tailwind.config.js               # Tailwind theme configuration
├── tsconfig.json                    # TypeScript configuration
├── vercel.json                      # Daily keep-alive cron ("0 10 * * *") + SPA rewrites
└── vite.config.ts                   # Vite configuration
```

---

## 4. Routing & Deep Linking (`?categoria=`)

All routes are defined in `src/App.tsx`:

| Route | Component | Notes |
|---|---|---|
| `/` | `LandingPage` | Full landing page (no scroll-snap; smooth natural scroll) |
| `/menu` | `WebMenuPage` | Unified menu (Supabase-driven), PDF gallery per category, PDF tab, deep linking |
| `/promos` | `PromosPage` | Standalone promotions page (reads `data.promos` from Supabase) |
| `/menu-pdf` | `PdfMenuPage` | Direct PDF viewer |
| `/admin` | `AdminDashboard` | Protected by `supabase.auth.getSession()` + `onAuthStateChange()` |
| `/mantenimiento` | `MaintenancePage` | 503 Maintenance view (disables public navigation when active) |
| `/terminos-y-condiciones` | `TermsPage` | Legal terms |
| `/politicas-de-privacidad` | `PrivacyPage` | Privacy policy |
| `*` | `NotFoundPage` | Custom 404 page |

### AI Agent Deep Linking Slugs (`/menu?categoria=<slug>`)
Handled in `src/pages/WebMenuPage.tsx` via `URLSearchParams` (SSR-safe `typeof window !== 'undefined'`):
- `todos` — All categories
- `desayunos` — Desayunos
- `asados-y-carnes` — Asados y Carnes
- `sopas` — Sopas
- `crepas` — Crepas
- `pizzas-y-lasanas` — Pizzas y Lasañas
- `bebidas` — Bebidas
- `promociones` — Promociones
- `eventos` — Menú de Eventos (2026)

---

## 5. Supabase Database Schema & Security Architecture

### Authentication & RLS Rules
- **Public (`anon`):** `SELECT` allowed on all 4 tables and `cms_images` storage bucket.
- **Authenticated (`authenticated`):** Full `INSERT`, `UPDATE`, `DELETE` access via Supabase Auth (`signInWithPassword` in `AdminLoginGate.tsx`, `signOut` in `AdminDashboard.tsx`).
- **Keep-Alive:** `api/keepalive.js` runs daily via Vercel Cron (`0 10 * * *`) executing `supabase.from('menu_categories').select('id').limit(1)` to prevent free-tier auto-pause.

### Tables Overview

1. **`public.landing_content`**
   - `id` (`TEXT PRIMARY KEY`, default `'main'`)
   - `hero` (`JSONB`): `{ tagline, headlineMain, headlineAccent, headlineCity, subheadline, bgImageUrl, ctaMenuText, ctaReserveText }`
   - `about` (`JSONB`): `{ eyebrow, title, titleAccent, description, pillars: [{ id, title, desc, iconName }] }`
   - `events` (`JSONB`): `{ eyebrow, title, titleAccent, description, imageUrl, cardTitle, cardSubtitle }`
   - `contact` (`JSONB`): `{ eyebrow, title, titleAccent, address, phone, phoneRaw, whatsapp, whatsappRaw, schedule, reference, instagramHandle, instagramUrl, facebookHandle, facebookUrl, domain }`
   - `updated_at` (`TIMESTAMPTZ`)

2. **`public.menu_categories`**
   - `id` (`TEXT PRIMARY KEY` — matches deep-link slug, e.g. `'asados-y-carnes'`, `'eventos'`)
   - `name` (`TEXT NOT NULL`)
   - `display_order` (`INTEGER DEFAULT 0`)
   - `pdf_pages` (`JSONB DEFAULT '[]'::jsonb` — array of `{ "title": string, "image": string }`)
   - `created_at` (`TIMESTAMPTZ`)

3. **`public.menu_items`**
   - `id` (`TEXT PRIMARY KEY`)
   - `category_id` (`TEXT NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE`)
   - `name` (`TEXT NOT NULL`)
   - `description` (`TEXT DEFAULT ''`)
   - `price` (`NUMERIC(10, 2) NOT NULL`)
   - `destacado` (`BOOLEAN DEFAULT false`)
   - `created_at` (`TIMESTAMPTZ`)

4. **`public.promotions`**
   - `id` (`TEXT PRIMARY KEY`)
   - `emoji`, `badge`, `badge_color`, `title`, `highlight_price`, `schedule`, `description`, `terms`, `accent_color` (`TEXT`)
   - `active_status` (`BOOLEAN DEFAULT true`)
   - `display_order` (`INTEGER DEFAULT 0`)
   - `created_at` (`TIMESTAMPTZ`)

5. **Storage Bucket: `cms_images`**
   - Public read (`SELECT`), authenticated write/delete (`INSERT`, `UPDATE`, `DELETE`).

### Complete Schema & RLS SQL Reference

> For initial setup from scratch, run `supabase_schema.sql`. To sync/update an existing database with all current categories, PDF page mappings, Eventos 2026, Promociones, and real photos, run `supabase_migration_menu_sync.sql`.

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.landing_content (
  id TEXT PRIMARY KEY,
  hero JSONB NOT NULL DEFAULT '{}'::jsonb,
  about JSONB NOT NULL DEFAULT '{}'::jsonb,
  events JSONB NOT NULL DEFAULT '{}'::jsonb,
  contact JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.menu_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  pdf_pages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.menu_items (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC(10, 2) NOT NULL,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

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

-- Enable RLS
ALTER TABLE public.landing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Public Read / Authenticated Write Policies (applied to all 4 tables)
CREATE POLICY "Public Read Landing Content" ON public.landing_content FOR SELECT USING (true);
CREATE POLICY "Authenticated Manage Landing Content" ON public.landing_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Menu Categories" ON public.menu_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated Manage Menu Categories" ON public.menu_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Menu Items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Authenticated Manage Menu Items" ON public.menu_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Promotions" ON public.promotions FOR SELECT USING (true);
CREATE POLICY "Authenticated Manage Promotions" ON public.promotions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage Bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms_images', 'cms_images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public Access to CMS Images" ON storage.objects FOR SELECT USING (bucket_id = 'cms_images');
CREATE POLICY "Authenticated Upload CMS Images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cms_images');
CREATE POLICY "Authenticated Update CMS Images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'cms_images');
CREATE POLICY "Authenticated Delete CMS Images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'cms_images');
```
