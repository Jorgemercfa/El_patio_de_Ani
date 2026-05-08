export const EL_PATIO_WHATSAPP_NUMBER = '51975495623';
export const LARGE_INFLABLE_PRICE_THRESHOLD = 600;
const BABY_KEYWORDS = [
  'bebé',
  'bebe',
  'baby',
  'pequeño',
  'pequeno',
  'cubito',
];
const LARGE_KEYWORDS = ['grande', 'mega', 'arcoíris', 'arcoiris'];

function normalizePriceValue(value) {
  if (value === null || value === undefined || value === '') return null;

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== 'string') return null;

  const cleaned = value.trim().replace(/[^\d.,-]/g, '');
  if (!cleaned) return null;

  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');
  const decimalIndex = Math.max(lastComma, lastDot);

  const normalized =
    decimalIndex >= 0
      ? `${cleaned.slice(0, decimalIndex).replace(/[.,]/g, '')}.${cleaned
          .slice(decimalIndex + 1)
          .replace(/[.,]/g, '')}`
      : cleaned.replace(/[.,]/g, '');

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getProductPrice(product) {
  if (!product) return null;

  return (
    normalizePriceValue(product.price) ??
    normalizePriceValue(product.originalPrice) ??
    normalizePriceValue(product.discount_price) ??
    normalizePriceValue(product.tributo)
  );
}

export function isInflableProduct(product) {
  return product?.category === 'Juegos e Inflables';
}

export function getInflableSize(product) {
  const subcategory = String(product?.subcategory || '').toLowerCase();
  const name = String(product?.name || '').toLowerCase();
  const ageRange = String(product?.age_range || '').toLowerCase();
  const searchText = `${subcategory} ${name} ${ageRange}`;
  const price = getProductPrice(product) ?? 0;

  if (
    BABY_KEYWORDS.some((keyword) => searchText.includes(keyword)) ||
    subcategory.includes('juegos para bebés') ||
    subcategory.includes('juegos para bebes') ||
    ageRange.includes('0-2') ||
    ageRange.includes('1-3') ||
    ageRange.includes('meses')
  ) {
    return 'bebes';
  }

  if (
    LARGE_KEYWORDS.some((keyword) => searchText.includes(keyword)) ||
    price > LARGE_INFLABLE_PRICE_THRESHOLD
  ) {
    return 'grande';
  }

  return 'mediano';
}

export function getInflableBadge(size) {
  const badges = {
    bebes: {
      label: '👶 Para Bebés',
      shortLabel: '👶 Bebés',
      background: '#f3e8ff',
      color: '#7c3aed',
    },
    mediano: {
      label: '🎪 Mediano',
      shortLabel: '🎪 Mediano',
      background: '#e8f5e9',
      color: '#2e7d32',
    },
    grande: {
      label: '🏰 Grande',
      shortLabel: '🏰 Grande',
      background: '#fff3e0',
      color: '#ef6c00',
    },
  };

  return badges[size] || badges.mediano;
}

export function getInflableSpaceRequirement(product) {
  const size = getInflableSize(product);

  if (size === 'bebes') {
    return { length: 3, width: 3, label: 'Mínimo recomendado: 3m x 3m' };
  }

  if (
    size === 'grande' ||
    (getProductPrice(product) ?? 0) > LARGE_INFLABLE_PRICE_THRESHOLD
  ) {
    return { length: 8, width: 6, label: 'Mínimo recomendado: 8m x 6m' };
  }

  return { length: 5, width: 4, label: 'Mínimo recomendado: 5m x 4m' };
}

export function getInflableGuestsInfo(product) {
  const size = getInflableSize(product);

  if (size === 'bebes') {
    return 'Recomendado para niños pequeños con supervisión constante y turnos cortos de juego.';
  }

  if (size === 'grande') {
    return 'Ideal para eventos con mayor flujo de niños; sugerimos organizar turnos y supervisión permanente.';
  }

  return 'Perfecto para fiestas familiares con grupos pequeños o medianos y rotación ordenada de invitados.';
}

export function getSurfaceNote(surface) {
  const notes = {
    cesped:
      'En césped podemos instalar con estacas para una fijación más segura del inflable.',
    cemento:
      'En cemento o asfalto usamos bolsas de arena para asegurar la estructura sin dañar la superficie.',
    tierra:
      'En tierra verificaremos nivelación y firmeza antes de instalar para garantizar estabilidad.',
    interior:
      'En interiores validamos altura libre, ventilación y espacio de maniobra antes de confirmar la reserva.',
  };

  return notes[surface] || '';
}
