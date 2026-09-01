/**
 * src/composables/useSeoHead.js
 * 
 * Composable centralizado para gestionar meta tags SEO en toda la app.
 * Proporciona funciones helper para:
 * - Página de inicio (Home)
 * - Páginas estáticas (About, Contact, Promotions, etc.)
 * - Páginas de productos
 * - Valores por defecto fallback
 */

import { useHead } from '@vueuse/head';

// Configuración base
const BASE_URL = 'https://elpatiodeani.com';
const DEFAULT_TITLE = 'El Patio de Ani - Entretenimiento Infantil en Lima';
const DEFAULT_DESCRIPTION = 'Productora de eventos infantiles en Lima. Shows, inflables, juegos, carritos snacks y estética infantil. Más de 500 eventos realizados.';
const DEFAULT_IMAGE = 'https://elpatiodeani.com/og-default.jpg';

/**
 * Aplica meta tags para la página de inicio
 */
export function useHomeSeo() {
  const seoData = {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    image: DEFAULT_IMAGE,
    url: BASE_URL,
  };

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'El Patio de Ani',
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: DEFAULT_IMAGE,
    sameAs: [
      'https://www.facebook.com/elpatiodeani',
      'https://www.instagram.com/elpatiodeani',
      'https://wa.me/51975495623',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lima',
      addressCountry: 'PE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+51-975-495-623',
      contactOption: 'TollFree',
    },
    priceRange: '$$',
  };

  useHead(() => ({
    title: seoData.title,
    meta: [
      { name: 'description', content: seoData.description },
      { name: 'keywords', content: 'eventos infantiles, entretenimiento, shows, inflables, Lima' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: seoData.title },
      { property: 'og:description', content: seoData.description },
      { property: 'og:image', content: seoData.image },
      { property: 'og:url', content: seoData.url },
      { property: 'og:locale', content: 'es_PE' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoData.title },
      { name: 'twitter:description', content: seoData.description },
      { name: 'twitter:image', content: seoData.image },
    ],
    link: [
      { rel: 'canonical', href: seoData.url },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(homeJsonLd),
      },
    ],
  }));
}

/**
 * Aplica meta tags para página estática (About, Contact, Promotions, etc.)
 */
export function useStaticPageSeo(title, description, page) {
  const pageTitle = `${title} | El Patio de Ani`;
  const pageUrl = `${BASE_URL}/${page}`;

  useHead(() => ({
    title: pageTitle,
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: DEFAULT_IMAGE },
      { property: 'og:url', content: pageUrl },
      { property: 'og:locale', content: 'es_PE' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'canonical', href: pageUrl },
    ],
  }));
}

/**
 * Aplica meta tags para página de producto
 * (uso similar a Component-service-item.vue pero centralizado)
 */
export function useProductSeo(product, images = []) {
  if (!product) return;

  const seoTitle = `${product.name} | El Patio de Ani`;
  const seoDescription = product.shortDescription || product.longDescription?.slice(0, 155) || DEFAULT_DESCRIPTION;
  const seoImage = images[0] || DEFAULT_IMAGE;
  const seoUrl = `${BASE_URL}/product/${product.id}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription || product.shortDescription || '',
    image: images,
    category: product.category || undefined,
    sku: product.product_code || undefined,
    offers: {
      '@type': 'Offer',
      url: seoUrl,
      priceCurrency: 'PEN',
      price: product.price?.toFixed(2),
      availability: 'https://schema.org/InStock',
    },
  };

  useHead(() => ({
    title: seoTitle,
    meta: [
      { name: 'description', content: seoDescription },
      { property: 'og:type', content: 'product' },
      { property: 'og:title', content: seoTitle },
      { property: 'og:description', content: seoDescription },
      { property: 'og:image', content: seoImage },
      { property: 'og:url', content: seoUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'canonical', href: seoUrl },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(productJsonLd),
      },
    ],
  }));
}

/**
 * Aplica meta tags por defecto (fallback)
 */
export function useDefaultSeo() {
  useHead(() => ({
    title: DEFAULT_TITLE,
    meta: [
      { name: 'description', content: DEFAULT_DESCRIPTION },
      { property: 'og:title', content: DEFAULT_TITLE },
      { property: 'og:description', content: DEFAULT_DESCRIPTION },
      { property: 'og:image', content: DEFAULT_IMAGE },
    ],
  }));
}
