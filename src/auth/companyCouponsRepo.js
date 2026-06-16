import { ref } from 'vue';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import productsSeed from '@/data/product';
import { db, isFirebaseConfigured } from '@/firebase';

const PRODUCTS_COLLECTION = 'products';

const productsState = ref([]);
const hasLoadedState = ref(false);
const loadingState = ref(false);

function sortProducts(products) {
  return [...products].sort((a, b) => {
    const idA = Number(a?.id);
    const idB = Number(b?.id);

    if (Number.isFinite(idA) && Number.isFinite(idB)) {
      return idA - idB;
    }

    return String(a?.name || '').localeCompare(String(b?.name || ''));
  });
}

function normalizeProduct(product, docId = '') {
  const numericId = Number(product?.id);

  return {
    ...product,
    id: Number.isFinite(numericId) ? numericId : null,
    product_code: product?.product_code || '',
    options: Array.isArray(product?.options)
      ? product.options.filter((item) => typeof item === 'string' && item.trim() !== '')
      : [],
    _docId: docId || product?._docId || '',
  };
}

function normalizeSeedProducts() {
  return sortProducts(productsSeed.map((item) => normalizeProduct(item)));
}

function sanitizeProductPayload(productInput) {
  return {
    name: String(productInput?.name || '').trim(),
    shortDescription: String(productInput?.shortDescription || '').trim(),
    longDescription: String(productInput?.longDescription || '').trim(),
    image: String(productInput?.image || '').trim(),
    price: Number(productInput?.price || 0),
    category: String(productInput?.category || '').trim(),
    subcategory: String(productInput?.subcategory || '').trim(),
    duration: String(productInput?.duration || '').trim(),
    age_range: String(productInput?.age_range || '').trim(),
    dimensions: String(productInput?.dimensions || '').trim(),
    options: Array.isArray(productInput?.options)
      ? productInput.options
          .map((item) => String(item || '').trim())
          .filter(Boolean)
      : [],
    Terms_of_use: String(productInput?.Terms_of_use || '').trim(),
    buy_button: String(productInput?.buy_button || '').trim(),
    details_button: String(productInput?.details_button || '').trim(),
    product_code: String(productInput?.product_code || '').trim(),
    companyId: productInput?.companyId ?? null,
    companyName: String(productInput?.companyName || '').trim(),
    companyemail: String(productInput?.companyemail || '').trim(),
  };
}

// Constante de control — false = leer siempre desde Firestore
const USE_SEED_FALLBACK = false;

function ensureLocalFallbackLoaded() {
  if (!hasLoadedState.value) {
    productsState.value = USE_SEED_FALLBACK ? normalizeSeedProducts() : [];
    hasLoadedState.value = true;
  }

  return productsState.value;
}

export function isSeedOnlyMode() {
  if (!hasLoadedState.value) return true;
  return productsState.value.every((p) => !p._docId);
}

export async function fetchCompanyproducts(force = false) {
  if (!isFirebaseConfigured || !db) {
    return ensureLocalFallbackLoaded();
  }

  if (loadingState.value) {
    return productsState.value;
  }

  if (hasLoadedState.value && !force) {
    return productsState.value;
  }

  loadingState.value = true;

  try {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const normalized = snapshot.docs.map((item) => normalizeProduct(item.data(), item.id));
    productsState.value = sortProducts(normalized);
    hasLoadedState.value = true;
    return productsState.value;
  } finally {
    loadingState.value = false;
  }
}

function triggerBackgroundFetch() {
  fetchCompanyproducts().catch((error) => {
    console.warn('[Products] No se pudo cargar productos desde Firestore:', error);
    if (!hasLoadedState.value) {
      ensureLocalFallbackLoaded();
    }
  });
}

export function getCompanyproducts() {
  if (!hasLoadedState.value && !loadingState.value) {
    triggerBackgroundFetch();
  }

  if (!isFirebaseConfigured || !db) {
    return ensureLocalFallbackLoaded();
  }

  return productsState.value;
}

export async function saveCompanyproducts(products) {
  if (!Array.isArray(products)) return;
  productsState.value = sortProducts(products.map((item) => normalizeProduct(item, item?._docId)));
}

async function nextProductId() {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('id', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return 1;

  const maxId = Number(snapshot.docs[0].data()?.id || 0);
  return (Number.isFinite(maxId) ? maxId : 0) + 1;
}

export async function addCompanyproduct(productInput) {
  const payload = sanitizeProductPayload(productInput);

  if (!isFirebaseConfigured || !db) {
    const localProducts = ensureLocalFallbackLoaded();
    const localMaxId = localProducts.reduce((max, product) => {
      const currentId = Number(product?.id || 0);
      return currentId > max ? currentId : max;
    }, 0);

    const created = normalizeProduct(
      {
        ...payload,
        id: localMaxId + 1,
      },
      '',
    );

    productsState.value = sortProducts([...localProducts, created]);
    return created;
  }

  await fetchCompanyproducts();

  const generatedId = await nextProductId();
  const createdPayload = {
    ...payload,
    id: generatedId,
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), createdPayload);
  const createdProduct = normalizeProduct(createdPayload, docRef.id);

  productsState.value = sortProducts([...productsState.value, createdProduct]);
  return createdProduct;
}

export async function updateCompanyproduct(id, data) {
  await fetchCompanyproducts();

  const normalizedId = Number(id);
  const targetProduct = productsState.value.find(
    (product) => product.id === normalizedId || product._docId === String(id),
  );

  if (!targetProduct) {
    throw new Error('No se encontró el producto a actualizar.');
  }

  const payload = sanitizeProductPayload({ ...targetProduct, ...data });
  const productId = Number(data?.id || targetProduct.id || normalizedId);

  if (Number.isFinite(productId)) {
    payload.id = productId;
  }

  if (!isFirebaseConfigured || !db || !targetProduct._docId) {
    productsState.value = productsState.value.map((product) =>
      product.id === targetProduct.id
        ? normalizeProduct({ ...product, ...payload }, product._docId)
        : product,
    );
    productsState.value = sortProducts(productsState.value);
    return;
  }

  await updateDoc(doc(db, PRODUCTS_COLLECTION, targetProduct._docId), payload);

  productsState.value = sortProducts(
    productsState.value.map((product) =>
      product._docId === targetProduct._docId
        ? normalizeProduct({ ...product, ...payload }, targetProduct._docId)
        : product,
    ),
  );
}

export async function resetCompanyproductToSeed(id) {
  if (!isFirebaseConfigured || !db) {
    if (id === undefined || id === null) {
      productsState.value = normalizeSeedProducts();
      hasLoadedState.value = true;
      return;
    }

    const normalizedId = Number(id);
    productsState.value = productsState.value.map((product) => {
      if (product.id !== normalizedId) return product;
      const seedProduct = productsSeed.find((item) => Number(item?.id) === normalizedId);
      return seedProduct ? normalizeProduct(seedProduct, product._docId) : product;
    });
    productsState.value = sortProducts(productsState.value);
    return;
  }

  await fetchCompanyproducts(true);
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

export async function deleteCompanyproduct(id) {
  await fetchCompanyproducts();

  const normalizedId = Number(id);
  const targetProduct = productsState.value.find(
    (product) => product.id === normalizedId || product._docId === String(id),
  );

  if (!targetProduct) {
    throw new Error(`No se encontró el producto con ID: ${id}`);
  }

  if (isFirebaseConfigured && db && targetProduct._docId) {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, targetProduct._docId));
  }

  productsState.value = sortProducts(
    productsState.value.filter(
      (product) => product._docId !== targetProduct._docId && product.id !== targetProduct.id,
    ),
  );
}
