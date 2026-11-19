# Tony's Grill Web (`https://tonysgrillgt.com`)

Sitio web oficial y carta digital 2026 para el restaurante **Tony's Grill** en Chiquimula, Guatemala. Construido como una aplicación **100% estática y ultra rápida** en **React + TypeScript + Vite**, sin dependencias de bases de datos externas, sin APIs backend y sin variables de entorno.

---

## Arquitectura y Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Enrutamiento**: React Router DOM v7 (`BrowserRouter` con rewrite SPA en `vercel.json`)
- **Estilos y Animación**: Tailwind CSS, Framer Motion y Lucide React
- **Capa de Datos Estática**:
  - `src/data/restaurantData.ts`: Información oficial del restaurante, textos de secciones (`hero`, `about`, `events`, `contact`), 3 cortes destacados y las **10 promociones Bento** activas.
  - `src/data/menuData.ts`: Catálogo completo auditado 2026 (`menuData`), 10 categorías filtrables, galerías visuales por sección (`CATEGORY_PDF_PAGES`) y la definición de los **4 menús en PDF**.
- **Activos Optimizados (`public/`)**:
  - `public/images/`: **40 fotografías reales** optimizadas (JPEG progresivo, `loading="lazy"` en toda la web excepto el Hero para proteger LCP).
  - `public/menu-pages/`: **40 láminas visuales** de las cartas impresas (Almuerzos 2026, Desayunos, Tony's Fresh Eats y Eventos 2026).
  - `public/pdfs/`: **4 PDFs independientes** comprimidos con Ghostscript (`menu-almuerzos-2026.pdf`, `menu-desayunos.pdf`, `menu-fresh-eats.pdf`, `menu-eventos-2026.pdf`).

---

## Identidad Visual

- **Primario**: `#D90302` (Rojo Parrilla)
- **Secundario**: `#EBFA00` (Amarillo Eléctrico)
- **Terciario**: `#03AF45` (Verde WhatsApp / Confirmación)
- **Superficies**: `#080808` y `#121212` con paneles de cristal (*glassmorphism*) y difuminados radiales.

---

## Rutas y Estructura de Páginas

| Ruta | Descripción |
| :--- | :--- |
| `/` | **Landing Page**: Hero con llamada directa, Nosotros (5 pilares), Eventos y Banquetes, Vista previa de Especialidades, Formulario de Reservas por WhatsApp, Contacto (Google Maps / Waze / WhatsApp) y Footer. |
| `/menu` | **Menú Interactivo y PDFs**: Buscador global en vivo, **10 tarjetas Bento** por sección que abren una ventana emergente con sus hojas del menú impreso (primero), fotografías individuales (después) y precios; soporta deep links `?categoria=<slug>` y `?tab=pdf&pdf=<id>`. |
| `/menu-pdf` | **Visor Unificado de PDFs**: Selector interactivo para visualizar y descargar por separado los 4 menús oficiales en PDF (Almuerzos 2026, Desayunos, Fresh Eats y Eventos 2026). |
| `/terminos-y-condiciones` | Términos y condiciones de servicio. |
| `/politicas-de-privacidad` | Políticas de privacidad. |
| `/mantenimiento` | Vista de mantenimiento (`noindex` vía `robots.txt`). |

---

## Conversión y SEO Técnico

- **Llamadas Directas (`CallOrderModal`)**: Selector global con las 3 líneas oficiales (`+502 7942-4777`, `+502 7942-4776`, `+502 5237-5638`) y lista preseleccionable de platillos desde `/menu`.
- **Reservas y Consultas**: Envío directo formateado hacia WhatsApp (`+502 5218-8115`).
- **SEO Dinámico**: `RouteSeoManager.tsx` actualiza `<title>`, meta `description`, OpenGraph y `<link rel="canonical">` por ruta y categoría, complementado con `public/robots.txt` y `public/sitemap.xml`.

---

## Comandos de Desarrollo y Build

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Verificar tipos TypeScript y compilar para producción (dist/)
npm run build

# Previsualizar el build de producción localmente
npm run preview
```
