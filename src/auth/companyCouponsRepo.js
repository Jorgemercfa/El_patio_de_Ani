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
  const storedById = Object.fromEntries(
    stored
      .filter((product) => product && product.id !== null && product.id !== undefined)
      .map((product) => [product.id, product]),
  );

  // Merge: stored data takes precedence EXCEPT for structural fields
  // (category, subcategory) which always come from seed to avoid stale cache.
  const mergedSeed = normalizedSeed.map((seedProduct) => {
    const storedProduct = storedById[seedProduct.id];
    if (!storedProduct) return seedProduct;

    return {
      ...storedProduct,
      // Always sync structural taxonomy fields from seed
      category: seedProduct.category,
      subcategory: seedProduct.subcategory,
    };
  });

  const extraStored = stored.filter(
    (product) =>
      product &&
      product.id !== null &&
      product.id !== undefined &&
      !seedIds.has(product.id),
  );
  const merged = [...mergedSeed, ...extraStored];

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

export function updateCompanyproduct(id, data) {
  const products = getCompanyproducts();
  const updated = products.map((product) =>
    product.id === id ? { ...product, ...data, id } : product,
  );
  saveCompanyproducts(updated);
}

export function resetCompanyproductToSeed(id) {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY));
  const withoutOverride = stored.filter((product) => product.id !== id);

  if (withoutOverride.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withoutOverride));
  }
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
