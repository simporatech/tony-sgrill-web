# Tony's Grill Web — Project Context & Architecture Guide

> **For AI Agents & Developers**: This document is the authoritative architectural map of **Tony's Grill Web** (`https://tonysgrillgt.com`). The site is a **100% static, ultra-fast React + TypeScript + Vite SPA** deployed on Vercel with **zero external databases, zero backend APIs, zero CMS/admin routes, and zero environment variable dependencies**.

---

## 1. Tech Stack & Build

- **Framework**: React 18 + TypeScript + Vite (`vite.config.ts`)
- **Routing**: `react-router-dom` v7 (`BrowserRouter`)
- **Styling & Animation**: Tailwind CSS + Framer Motion + `lucide-react`
- **Hosting**: Vercel (`vercel.json` with SPA rewrite `/(.*) -> /index.html`)
- **Commands**:
  - `npm run dev` — Start local Vite dev server
  - `npm run build` — Run `tsc -b && vite build` (outputs to `dist/`)
  - `npm run preview` — Preview production build locally

---

## 2. Architecture Overview (100% Static)

All restaurant copy, promotions, pillars, contact info, and menu items live in two typed local TypeScript modules under `src/data/`:

1. **`src/data/restaurantData.ts`**:
   - `RESTAURANT_INFO`: Brand name, phone numbers, WhatsApp, Chiquimula address, schedule, social links, domain (`https://tonysgrillgt.com`).
   - `SITE_CONTENT`: Typed static content for `hero`, `about` (including 5 pillars), `events`, `contact`, and `promos` (6 active promotional cards).
   - `FEATURED_DISHES`: Highlighted grill cuts.
2. **`src/data/menuData.ts`**:
   - `MENU_FILTER_CATEGORIES`: Category filters (`todos`, `desayunos`, `asados-y-carnes`, `sopas`, `crepas`, `pizzas-y-lasanas`, `bebidas`, `promociones`, `eventos`).
   - `menuData`: Complete static catalog (`MenuDataItem[]`) with `id`, `categoria`, `slugCategoria`, `nombre`, `descripcion`, `precioQ`, `imagen`, `destacado`.
   - `CATEGORY_PDF_PAGES`: Maps each menu category slug to the extracted JPEG pages in `public/menu-pages/`.
   - `OFFICIAL_PHONE_LINES`, `OFFICIAL_ADDRESS`, `OFFICIAL_EXTERNAL_MENU_URL`, `WHATSAPP_INQUIRY_TEXT`.

---

## 3. Folder & File Map

```text
/
├── index.html                        # Entry HTML, base Meta/OG tags, JSON-LD Restaurant schema
├── package.json                      # Dependencies & scripts (no DB SDKs)
├── vercel.json                       # SPA fallback rewrite rule
├── context.md                        # This file
├── public/
│   ├── favicon.png
│   ├── logo.png
│   ├── robots.txt                    # Allows crawling; points to sitemap.xml
│   ├── sitemap.xml                   # Static sitemap for https://tonysgrillgt.com
│   ├── tonys-grill-menu.pdf          # Optimized downloadable PDF menu (7.4 MB)
│   ├── images/                       # Optimized local photography (1.2 MB total)
│   │   ├── puyazo-importado.jpg      # Hero background (eager-loaded for LCP)
│   │   ├── churrasquito-res.jpg      # Lazy-loaded
│   │   ├── costilla-ahumada.jpg      # Lazy-loaded
│   │   ├── fajitas-mixtas.jpg        # Lazy-loaded
│   │   ├── mar-y-tierra.jpg          # Lazy-loaded
│   │   ├── promo-capuchino.jpg       # Lazy-loaded
│   │   ├── promo-desayuno.jpg        # Lazy-loaded
│   │   ├── promo-lasana.jpg          # Lazy-loaded
│   │   └── promo-sangria.jpg         # Lazy-loaded
│   └── menu-pages/                   # Optimized JPEG spreads from the printed menu (7.8 MB total)
│       ├── eventos-1.jpg .. eventos-4.jpg
│       └── page-01.jpg .. page-35.jpg
└── src/
    ├── main.tsx                      # React root mount
    ├── App.tsx                       # Router, Navbar, Footer, CallModalProvider, DataErrorBoundary
    ├── index.css                     # Global Tailwind & custom utilities
    ├── vite-env.d.ts                 # Vite client types
    ├── context/
    │   └── CallModalContext.tsx      # Global state for the Call-to-Order modal/drawer
    ├── data/
    │   ├── menuData.ts               # Full menu catalog, categories, PDF page mappings, phone lines
    │   └── restaurantData.ts         # Site copy, promos, pillars, contact & brand info
    ├── components/
    │   ├── Navbar.tsx                # Top navigation bar + mobile drawer
    │   ├── Hero.tsx                  # Above-the-fold Hero section (eager bg image for LCP)
    │   ├── AboutSection.tsx          # Brand story & 5 culinary pillars
    │   ├── MenuSection.tsx           # 3 featured grill dishes preview on LandingPage
    │   ├── EventsSection.tsx         # Private events & catering section (lazy-loaded image)
    │   ├── ReservationForm.tsx       # Table reservation form (opens WhatsApp with formatted details)
    │   ├── Contact.tsx               # Address, Google Maps/Waze links, WhatsApp contact form
    │   ├── Footer.tsx                # Multi-column footer with legal links
    │   ├── CallOrderModal.tsx        # Modal/drawer with 3 official phone lines for direct ordering
    │   ├── MobileFloatingActionBar.tsx # Mobile bottom CTA bar (Call / Menu / WhatsApp)
    │   ├── RouteSeoManager.tsx       # Dynamic document.title, meta description & canonical per route
    │   ├── DataErrorBoundary.tsx     # React ErrorBoundary with dark-mode reload fallback
    │   └── ui/
    │       └── CustomSelect.tsx      # Styled dropdown component
    └── pages/
        ├── LandingPage.tsx           # Home page composing Hero, About, Menu, Events, Reservation, Contact, Footer
        ├── WebMenuPage.tsx           # Interactive digital menu + category filters (?categoria=slug) + PDF spreads
        ├── PdfMenuPage.tsx           # Embedded/downloadable PDF menu viewer
        ├── PromosPage.tsx            # Bento-grid promotions page
        ├── TermsPage.tsx             # /terminos-y-condiciones
        ├── PrivacyPage.tsx           # /politicas-de-privacidad
        ├── MaintenancePage.tsx       # /mantenimiento & /maintenance
        └── NotFoundPage.tsx          # 404 catch-all page
```

---

## 4. Routes & SEO

| Route | Component | Indexed | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage` | Yes | Main restaurant showcase, reservations & contact |
| `/menu` | `WebMenuPage` | Yes | Searchable digital menu + `?categoria=<slug>` deep-links + PDF page zoom |
| `/menu-pdf` | `PdfMenuPage` | Yes | Official PDF menu viewer & download |
| `/promos` | `PromosPage` | Yes | Active promotions & family combos |
| `/terminos-y-condiciones` | `TermsPage` | Yes | Terms and conditions |
| `/politicas-de-privacidad` | `PrivacyPage` | Yes | Privacy policy |
| `/mantenimiento`, `/maintenance` | `MaintenancePage` | No (`robots.txt`) | Maintenance fallback view |
| `*` | `NotFoundPage` | No | Branded 404 page |

- **Sitemap**: `https://tonysgrillgt.com/sitemap.xml`
- **SEO Manager**: `src/components/RouteSeoManager.tsx` updates `<title>`, `<meta name="description">`, and `<link rel="canonical">` dynamically on route and `?categoria=` changes.

---

## 5. Performance & Asset Rules

- **Image Loading**: All `<img>` tags in `public/images/` and `public/menu-pages/` use `loading="lazy"` **except** the Hero background (`/images/puyazo-importado.jpg`) in `src/components/Hero.tsx`, which stays eager-loaded to protect LCP.
- **Asset Optimization**:
  - `public/images/*.jpg`: 1.2 MB total (progressive JPEG, `q=82`).
  - `public/menu-pages/*.jpg`: 7.8 MB total (progressive JPEG, `q=78`).
  - `public/tonys-grill-menu.pdf`: 7.4 MB (Ghostscript compressed, 110 DPI, JPEG `q=78`).
- **Conversion Flows**:
  - **Call to Order**: `CallModalContext` + `CallOrderModal` present the 3 official phone lines (`+502 7942-4777`, `+502 7942-2279`, `+502 5218-8115`).
  - **Reservations & Inquiries**: `ReservationForm.tsx` and `Contact.tsx` open pre-filled `https://wa.me/50252188115` links in a new tab.
