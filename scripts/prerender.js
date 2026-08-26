/**
 * scripts/prerender.js
 *
 * Corre DESPUES de "vue-cli-service build" (ver "build" en package.json).
 * Para cada ruta publica del sitio (estaticas + una por cada producto en
 * Firestore), abre esa ruta en un Chrome headless (Puppeteer), espera a que
 * Vue termine de renderizar el contenido real, y guarda el HTML resultante
 * como <ruta>/index.html dentro de dist/.
 *
 * Asi, cuando Google (u otro crawler) visita una URL del sitio, recibe HTML
 * ya armado con el contenido real -no un <div id="app"></div> vacio que
 * depende de que se ejecute JavaScript-.
 *
 * Para la persona que navega no cambia nada: apenas carga esa pagina, Vue
 * Router toma el control como siempre y la navegacion sigue siendo SPA.
 *
 * Requiere la misma variable de entorno FIREBASE_SERVICE_ACCOUNT_KEY que ya
 * usa scripts/generate-sitemap.js (se reutiliza el mismo secret de GitHub).
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PORT = 4173;
const BASE_LOCAL_URL = `http://localhost:${PORT}`;

// Mismas rutas estaticas que scripts/generate-sitemap.js. Si agregas o
// quitas una pagina publica, actualiza ambas listas.
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

const PRODUCTS_COLLECTION = 'products';

// ─── Firebase Admin (misma logica que generate-sitemap.js) ─────────────
function initFirebaseAdmin() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    console.warn(
      '[prerender] FIREBASE_SERVICE_ACCOUNT_KEY no esta definido. ' +
      'Solo se prerenderizaran las rutas estaticas.'
    );
    return null;
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(raw.trim());
  } catch (err) {
    console.error('[prerender] FIREBASE_SERVICE_ACCOUNT_KEY no es un JSON valido:', err.message);
    return null;
  }

  if (!serviceAccount.project_id || !serviceAccount.private_key) {
    console.error('[prerender] El JSON de FIREBASE_SERVICE_ACCOUNT_KEY no tiene la forma esperada.');
    return null;
  }

  initializeApp({ credential: cert(serviceAccount) });
  return getFirestore();
}

async function getProductRoutes(db) {
  if (!db) return [];

  const snapshot = await db.collection(PRODUCTS_COLLECTION).get();
  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      // Mismo criterio que generate-sitemap.js: se usa el campo numerico
      // "id" del documento, no el ID autogenerado de Firestore, porque es
      // lo que espera la ruta /product/:id (ver Component-service-item.vue).
      if (data.id === undefined || data.id === null || data.id === '') return null;
      return `/product/${data.id}`;
    })
    .filter(Boolean);
}

// ─── Servidor estatico local para dist/, con fallback tipo SPA ─────────
// (equivalente a lo que hace GitHub Pages via 404.html -> index.html)
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(DIST_DIR, safePath);

    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          // Cualquier ruta sin archivo propio recibe el index.html
          // original, para que Vue Router la resuelva del lado del
          // cliente (igual que pasa en produccion via 404.html).
          fs.readFile(path.join(DIST_DIR, 'index.html'), (fallbackErr, fallbackContent) => {
            if (fallbackErr) {
              res.writeHead(500);
              res.end('No se pudo leer dist/index.html');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(fallbackContent);
          });
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(content);
      });
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

// ─── Guardar el HTML capturado en la ruta correcta dentro de dist/ ─────
function writeRenderedHtml(route, html) {
  const outputDir = route === '/'
    ? DIST_DIR
    : path.join(DIST_DIR, route.replace(/^\//, ''));

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('[prerender] No existe dist/. Corre "vue-cli-service build" antes de prerenderizar.');
    process.exit(1);
  }

  const db = initFirebaseAdmin();
  const productRoutes = await getProductRoutes(db);
  const allRoutes = [...STATIC_ROUTES, ...productRoutes];

  console.log(`[prerender] Rutas a prerenderizar: ${allRoutes.length}`);

  const server = await startStaticServer();

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;
  let failed = 0;

  try {
    const page = await browser.newPage();

    for (const route of allRoutes) {
      const url = `${BASE_LOCAL_URL}${route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });

        // Firestore mantiene conexiones persistentes que a veces no
        // disparan "network idle" al instante. Para las paginas de
        // detalle de producto, esperamos ademas a que aparezca el
        // contenido real o el mensaje de "no encontrado" -ambos indican
        // que el fetch ya se resolvio-, con un margen fijo como red de
        // seguridad adicional.
        if (route.startsWith('/product/')) {
          await page
            .waitForSelector('.product-wrapper, .not-found', { timeout: 20000 })
            .catch(() => {});
        }
        await new Promise((resolve) => setTimeout(resolve, 800));

        const html = await page.content();
        writeRenderedHtml(route, html);
        success += 1;
        console.log(`[prerender] OK  ${route}`);
      } catch (err) {
        failed += 1;
        console.error(`[prerender] FALLO ${route}:`, err.message);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`[prerender] Listo. ${success} paginas generadas, ${failed} fallidas de ${allRoutes.length}.`);

  if (success === 0 && allRoutes.length > 0) {
    // Si no se pudo prerenderizar nada, mejor fallar el build para
    // notarlo en Actions en vez de desplegar silenciosamente sin SEO.
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[prerender] Error inesperado:', err);
  process.exit(1);
});