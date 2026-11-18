import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://tonysgrillgt.com';

interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
}

const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  desayunos: {
    title: "Desayunos Tradicionales en Chiquimula | Tony's Grill",
    description: "Disfruta desayunos típicos, omelettes, panqueques y promociones 2x1 desde las 7:00 AM en Tony's Grill Chiquimula. Ordena al +502 7942-4777.",
  },
  'asados-y-carnes': {
    title: "Cortes de Carne, Combos y Parrilladas en Chiquimula | Tony's Grill",
    description: "Puyazo importado, lomito 8 oz, entraña, combos y parrilladas familiares al carbón en Tony's Grill Chiquimula. Llama al +502 7942-4777.",
  },
  'mariscos-y-sopas': {
    title: "Mariscos, Ceviches, Tapado y Sopas en Chiquimula | Tony's Grill",
    description: "Tapado tradicional, sopa de mariscos, salmón, róbalo, camarones y ceviches frescos en Tony's Grill Chiquimula.",
  },
  'antojitos-y-cenas': {
    title: "Antojitos Típicos, Hamburguesas, Carpaccio y Cenas | Tony's Grill Chiquimula",
    description: "Carpaccio, garnachas, burritos, tacos mexicanos, hamburguesas, cenas y menú infantil en Tony's Grill Chiquimula.",
  },
  ensaladas: {
    title: "Ensaladas Frescas en Chiquimula | Tony's Grill",
    description: "Ensalada Californiana, César, Mediterránea, Del Mar y Garden Salad con pollo a la parrilla o camarones en Tony's Grill Chiquimula.",
  },
  'crepas-y-postres': {
    title: "Crepas Dulces, Saladas, Postres y Doughnuts | Tony's Grill Chiquimula",
    description: "Crepas dulces y saladas, canelitas, hojuelas, canoas, pasteles y combos American Doughnuts en Tony's Grill Chiquimula.",
  },
  'pizzas-y-lasanas': {
    title: "Pizzas Artesanales, Pastas y Lasañas en Chiquimula | Tony's Grill",
    description: "Pizzas en 4 tamaños, combos familiares, pastas artesanales y lasaña boloñesa 2x1 en Tony's Grill Chiquimula.",
  },
  'bebidas-y-fresh': {
    title: "Bebidas y Coctelería Tony's Fresh 2x1 | Tony's Grill Chiquimula",
    description: "Cafés, smoothies, sangría 2x1, mojitos 2x1, cubetazos, cervezas y vinos en Tony's Grill Chiquimula.",
  },
  promociones: {
    title: "Promociones Oficiales 2x1 y Combos | Tony's Grill Chiquimula",
    description: "Aprovecha 2x1 en desayunos, lasañas 2x1 a Q63, pizzas 2x1 martes y jueves, cócteles 2x1 y súper combos familiares en Tony's Grill.",
  },
  eventos: {
    title: "Menú de Eventos 2026 y Banquetes en Chiquimula | Tony's Grill",
    description: "Cotiza tu evento social o empresarial con nuestro Menú de Eventos 2026, opciones V.I.P. y salón privado en Tony's Grill Chiquimula.",
  },
};

function getSeoForLocation(pathname: string, search: string): SeoConfig {
  if (pathname === '/menu') {
    const params = new URLSearchParams(search);
    const cat = params.get('categoria')?.toLowerCase() || '';
    if (cat && CATEGORY_SEO[cat]) {
      return {
        title: CATEGORY_SEO[cat].title,
        description: CATEGORY_SEO[cat].description,
        canonical: `${BASE_URL}/menu?categoria=${cat}`,
      };
    }
    return {
      title: "Menú Completo Interactivo y PDFs 2026 | Tony's Grill Chiquimula",
      description: "Explora el menú completo 2026 de Tony's Grill Chiquimula: asados, mariscos, pizzas, lasañas, desayunos, Tony's Fresh y eventos.",
      canonical: `${BASE_URL}/menu`,
    };
  }

  if (pathname === '/menu-pdf') {
    return {
      title: "Menús Oficiales en PDF (Almuerzos, Desayunos, Fresh Eats, Eventos) | Tony's Grill",
      description: "Visualiza y descarga nuestros 4 menús oficiales en PDF 2026 de Tony's Grill Chiquimula.",
      canonical: `${BASE_URL}/menu-pdf`,
    };
  }

  if (pathname === '/terminos-y-condiciones') {
    return {
      title: "Términos y Condiciones | Tony's Grill Chiquimula",
      description: "Términos y condiciones de uso, reservaciones y servicios de Tony's Grill Chiquimula.",
      canonical: `${BASE_URL}/terminos-y-condiciones`,
    };
  }

  if (pathname === '/politicas-de-privacidad') {
    return {
      title: "Políticas de Privacidad | Tony's Grill Chiquimula",
      description: "Políticas de privacidad y protección de datos de clientes en Tony's Grill Chiquimula.",
      canonical: `${BASE_URL}/politicas-de-privacidad`,
    };
  }

  return {
    title: "Tony's Grill Chiquimula | Mejores Cortes de Carne a la Parrilla, Pizzas & Desayunos",
    description: "Tony's Grill Chiquimula - Restaurante familiar líder en Chiquimula, Guatemala. Disfruta los mejores cortes de carne a la parrilla, asados, pizzas artesanales, lasañas, desayunos típicos y salón para eventos. Ordena hoy al +502 7942-4777.",
    canonical: `${BASE_URL}/`,
  };
}

function setMetaTag(selector: string, attrName: 'name' | 'property', attrValue: string, content: string) {
  let tag = document.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export const RouteSeoManager: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const seo = getSeoForLocation(pathname, search);
    document.title = seo.title;

    setMetaTag('meta[name="title"]', 'name', 'title', seo.title);
    setMetaTag('meta[name="description"]', 'name', 'description', seo.description);
    setMetaTag('meta[name="robots"]', 'name', 'robots', seo.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    setMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', seo.canonical);

    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', seo.canonical);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seo.canonical);
  }, [pathname, search]);

  return null;
};

