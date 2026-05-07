import productsSeed from '@/data/product';

const STORAGE_KEY = 'al-toque-company-products';

function safeParse(json) {
  if (!json) return [];

  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Error leyendo cupones de empresa:', error);
    return [];
  }
}

export function getCompanyproducts() {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY));
  const normalizedSeed = productsSeed.map((product) => ({
    ...product,
    companyId: null,
    companyName: product.name || '',
    companyemail: null,
    createdAt: null,
  }));

  if (!Array.isArray(stored) || stored.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedSeed));
    return normalizedSeed;
  }

  const seedIds = new Set(normalizedSeed.map((product) => product.id));
  const extraStored = stored.filter((product) => !seedIds.has(product?.id));
  const merged = [...normalizedSeed, ...extraStored];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

  return merged;
}

export function saveCompanyproducts(products) {
  if (!Array.isArray(products)) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function nextproductId(products) {
  const maxId = products.reduce(
    (max, product) => (product?.id > max ? product.id : max),
    0,
  );

  return maxId + 1;
}

export function addCompanyproduct(productInput) {
  const products = getCompanyproducts();

  const product = {
    ...productInput,
    id: nextproductId(products),
    createdAt: new Date().toISOString(),
  };

  products.push(product);
  saveCompanyproducts(products);

  return product;
}

export function getproductsByCompany(company) {
  if (!company) return [];

  const products = getCompanyproducts();

  return products.filter(
    (product) =>
      product.companyId === company.id ||
      (product.companyemail && product.companyemail === company.email),
  );
}
