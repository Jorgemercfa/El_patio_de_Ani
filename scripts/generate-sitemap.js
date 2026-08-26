/**
 * scripts/generate-sitemap.js
 *
 * Genera public/sitemap.xml antes del build, leyendo:
 * - Rutas estaticas (definidas abajo, tomadas de router.js)
 * - Productos/servicios desde Firestore (coleccion configurable)
 *
 * Requiere la variable de entorno FIREBASE_SERVICE_ACCOUNT_KEY
 * con el JSON completo de la service account key (ver instrucciones
 * al final de este archivo / en la respuesta del asistente).
 */

const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const BASE_URL = 'https://elpatiodeani.com/El_patio_de_Ani';

// Rutas publicas estaticas, tomadas de tu router.js (solo las que aportan SEO)
const STATIC_ROUTES = [
  '/',
  '/Product-item',
  '/Contact-item',
  '/Promotions-item',
  '/Reviews-item',
  '/About-item',
  '/Privacy-Policy',
  '/Terms-of-Use',
  '/FAQ',
];

// AJUSTA ESTO: nombre real de tu coleccion de Firestore con los productos/servicios
const PRODUCTS_COLLECTION = 'products'; // <-- cambia si tu coleccion se llama distinto

function initFirebaseAdmin() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    console.warn(
      'FIREBASE_SERVICE_ACCOUNT_KEY no esta definido. Se generara el sitemap solo con rutas estaticas.'
    );
    return null;
  }

  // Diagnostico seguro: no expone el contenido sensible, solo su forma
  const trimmed = raw.trim();
  console.log(
    `FIREBASE_SERVICE_ACCOUNT_KEY recibido: ${trimmed.length} caracteres, ` +
    `empieza con "${trimmed.slice(0, 1)}", termina con "${trimmed.slice(-1)}"`
  );

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(trimmed);
  } catch (err) {
    console.error(
      'FIREBASE_SERVICE_ACCOUNT_KEY no contiene un JSON valido. ' +
      'Verifica que el secret tenga PEGADO EL ARCHIVO .json COMPLETO, ' +
      'sin comillas extra alrededor y sin contenido duplicado. ' +
      `Detalle: ${err.message}`
    );
    console.warn('Se generara el sitemap solo con rutas estaticas.');
    return null;
  }

  if (!serviceAccount.project_id || !serviceAccount.private_key) {
    console.error(
      'El JSON de FIREBASE_SERVICE_ACCOUNT_KEY no tiene la forma esperada ' +
      '(faltan project_id o private_key). Revisa que sea el archivo correcto.'
    );
    console.warn('Se generara el sitemap solo con rutas estaticas.');
    return null;
  }

  initializeApp({
    credential: cert(serviceAccount),
  });
  return getFirestore();
}

async function getProductUrls(db) {
  if (!db) return [];

  const snapshot = await db.collection(PRODUCTS_COLLECTION).get();
  return snapshot.docs
    .map((doc) => {
      const data = doc.data();

      // IMPORTANTE: la app busca el producto por el campo numerico `id`
      // guardado dentro del documento (ver Component-service-item.vue:
      // products.find(s => s.id === Number(route.params.id))), NO por el
      // ID autogenerado del documento de Firestore. Si usamos doc.id aqui,
      // la URL del sitemap nunca coincide con ningun producto real.
      if (data.id === undefined || data.id === null || data.id === '') {
        return null;
      }

      const entry = { loc: `${BASE_URL}/product/${data.id}` };
      if (data.updatedAt && typeof data.updatedAt.toDate === 'function') {
        entry.lastmod = data.updatedAt.toDate().toISOString().split('T')[0];
      }
      return entry;
    })
    .filter(Boolean);
}

async function main() {
  const db = initFirebaseAdmin();
  const productUrls = await getProductUrls(db);

  const staticEntries = STATIC_ROUTES.map((route) => ({
    loc: `${BASE_URL}${route}`,
  }));

  const allEntries = [...staticEntries, ...productUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map((entry) => {
    const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${entry.loc}</loc>${lastmod}\n  </url>`;
  })
  .join('\n')}
</urlset>
`;

  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`sitemap.xml generado con ${allEntries.length} URLs en ${outputPath}`);
}

main().catch((err) => {
  console.error('Error generando sitemap:', err);
  process.exit(1);
});