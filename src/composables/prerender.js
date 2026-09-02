/**
 * scripts/prerender.js
 *
 * Corre DESPUÉS de `vue-cli-service build` (ver package.json: "build":
 * "npm run generate-sitemap && vue-cli-service build && npm run prerender").
 *
 * Qué hace:
 * 1. Levanta un servidor local temporal que sirve la carpeta dist/ ya
 *    compilada (igual que vería un visitante real).
 * 2. Abre cada URL (home, rutas estáticas, y cada producto de Firestore)
 *    con Puppeteer, espera a que Vue termine de renderizar, y captura el
 *    HTML final.
 * 3. Guarda ese HTML en un archivo NUEVO dentro de dist/, en la ruta
 *    correspondiente (ej. dist/product/12/index.html). El dist/index.html
 *    original NUNCA se toca ni se sobreescribe.
 *
 * Por qué es seguro:
 * - Solo AGREGA archivos nuevos, nunca borra ni modifica los que ya
 *   generó vue-cli-service build.
 * - Si Puppeteer falla en alguna URL puntual, el script sigue con las
 *   demás y al final avisa cuáles fallaron — nunca deja el build a
 *   medias ni rompe el resto.
 * - Los usuarios que navegan DENTRO de la app (haciendo click en un
 *   link) nunca tocan estos archivos: Vue Router sigue manejando todo
 *   en el navegador como siempre. Estos HTML "extra" solo los ve quien
 *   entra por primera vez directo a esa URL (o un bot como Google).
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const handler = require('serve-handler');
const admin = require('firebase-admin');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PORT = 5050; // puerto local temporal, no afecta nada en producción
const LOCAL_BASE_URL = `http://localhost:${PORT}`;
const PRODUCTS_COLLECTION = 'products'; // mismo nombre confirmado en generate-sitemap.js

// Mismas rutas estáticas que ya usas en generate-sitemap.js — si agregas
// una ruta pública nueva ahí, agrégala también aquí.
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

function checkDistExists() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(
      'No existe la carpeta dist/. Este script debe correr DESPUÉS de "vue-cli-service build".',
    );
    process.exit(1);
  }
}

function startLocalServer() {
  return new Promise((resolve) => {
    const server = http.createServer((request, response) => {
      // serve-handler simula un hosting real de SPA: si la ruta pedida no
      // existe como archivo físico, cae al index.html (igual que hace
      // GitHub Pages / Netlify con un _redirects o 404->200).
      return handler(request, response, {
        public: DIST_DIR,
        rewrites: [{ source: '**', destination: '/index.html' }],
      });
    });

    server.listen(PORT, () => {
      console.log(`Servidor local de prerender corriendo en ${LOCAL_BASE_URL}`);
      resolve(server);
    });
  });
}

function initFirebaseAdmin() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    console.warn(
      'FIREBASE_SERVICE_ACCOUNT_KEY no está definido. Se hará prerender solo de las rutas estáticas (sin páginas de producto).',
    );
    return null;
  }

  // admin.apps evita inicializar dos veces si generate-sitemap.js ya lo
  // hizo en el mismo proceso de build (normalmente corren como procesos
  // node separados, así que esto rara vez aplica, pero es una salvaguarda
  // barata).
  if (admin.apps.length === 0) {
    const serviceAccount = JSON.parse(raw);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  }

  return admin.firestore();
}

async function getProductRoutes(db) {
  if (!db) return [];

  const snapshot = await db.collection(PRODUCTS_COLLECTION).get();

  return snapshot.docs
    .map((doc) => doc.data())
    .filter((data) => data.id !== undefined && data.id !== null)
    .map((data) => `/product/${data.id}`);
}

// Convierte una ruta tipo "/product/12" al archivo físico correspondiente
// dentro de dist/: dist/product/12/index.html
// La raíz "/" es un caso especial: como dist/index.html YA existe (es el
// build normal), no lo tocamos — Google ya lo indexa tal cual.
function routeToOutputPath(route) {
  if (route === '/') return null; // no sobreescribir el index.html original

  const cleanRoute = route.replace(/^\/+/, '').replace(/\/+$/, '');
  return path.join(DIST_DIR, cleanRoute, 'index.html');
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  const url = `${LOCAL_BASE_URL}${route}`;

  try {
    // 'networkidle0' espera hasta que no haya peticiones de red activas
    // por al menos 500ms — buena señal de que Vue ya terminó de pedir
    // datos a Firestore y renderizar el contenido dinámico.
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Margen extra corto: algunos componentes (como el detalle de
    // producto) actualizan el DOM justo después del último request de
    // red (por ejemplo, animaciones de entrada o un computed que se
    // resuelve un tick después). Este pequeño delay reduce el riesgo de
    // capturar el HTML un instante demasiado pronto.
    await new Promise((resolve) => setTimeout(resolve, 400));

    const html = await page.content();
    const outputPath = routeToOutputPath(route);

    if (outputPath) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, html, 'utf8');
    }

    console.log(`✔ Prerenderizado: ${route}`);
    return { route, ok: true };
  } catch (error) {
    console.error(`✘ Falló el prerender de ${route}:`, error.message);
    return { route, ok: false, error: error.message };
  } finally {
    await page.close();
  }
}

async function main() {
  checkDistExists();

  const db = initFirebaseAdmin();
  const productRoutes = await getProductRoutes(db);
  const allRoutes = [...STATIC_ROUTES, ...productRoutes];

  console.log(`Prerenderizando ${allRoutes.length} rutas (${STATIC_ROUTES.length} estáticas + ${productRoutes.length} de productos)...`);

  const server = await startLocalServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // necesario en la mayoría de runners de CI (GitHub Actions)
  });

  const results = [];
  for (const route of allRoutes) {
    // Se procesa una ruta a la vez (no en paralelo) para no saturar de
    // memoria al runner de GitHub Actions, que suele tener recursos
    // limitados. Con pocas decenas de productos esto sigue siendo rápido.
    const result = await prerenderRoute(browser, route);
    results.push(result);
  }

  await browser.close();
  server.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\nPrerender terminado: ${results.length - failed.length} OK, ${failed.length} fallidas.`);

  if (failed.length > 0) {
    console.warn('Rutas que fallaron (el resto del sitio sigue funcionando normal):');
    failed.forEach((f) => console.warn(`  - ${f.route}: ${f.error}`));
    // No usamos process.exit(1) aquí a propósito: una ruta fallida no
    // debería tumbar todo el deploy. El sitio sigue siendo una SPA
    // funcional aunque falte el HTML prerenderizado de una página
    // puntual — solo pierde un poco de SEO en esa página específica.
  }
}

main().catch((err) => {
  console.error('Error general en el prerender:', err);
  // Este sí es un error fatal (ej. no pudo iniciar Puppeteer o el
  // servidor local) — ahí no tiene sentido continuar el build.
  process.exit(1);
});