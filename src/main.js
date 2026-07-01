import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'

const CHUNK_RELOAD_FLAG = 'chunk-reload-attempted';
const APP_BASE_PATH = process.env.BASE_URL || '/';

function getChunkErrorMessage(error) {
  if (!error) return '';
  if (typeof error === 'string') return error;
  return String(error?.message || error?.reason?.message || '');
}

function isChunkOrAssetLoadError(error, eventTarget) {
  const message = getChunkErrorMessage(error);
  const name = String(error?.name || error?.reason?.name || '');

  if (name === 'ChunkLoadError') return true;
  if (message.includes('Loading chunk')) return true;
  if (message.includes('Failed to fetch dynamically imported module')) return true;

  const assetUrl = eventTarget?.src || eventTarget?.href || '';
  const isAppAsset = typeof assetUrl === 'string'
    && assetUrl.includes(APP_BASE_PATH)
    && /\/(js|css)\//.test(assetUrl);

  return ['SCRIPT', 'LINK'].includes(eventTarget?.tagName) && isAppAsset;
}

function reloadForStaleAssets(error) {
  if (!window?.sessionStorage) {
    console.error('[App] Error cargando recursos dinámicos:', error);
    return;
  }

  if (!sessionStorage.getItem(CHUNK_RELOAD_FLAG)) {
    sessionStorage.setItem(CHUNK_RELOAD_FLAG, 'true');
    console.warn('[App] Detectado chunk/css antiguo en caché. Recargando una vez...', error);
    window.location.reload();
    return;
  }

  sessionStorage.removeItem(CHUNK_RELOAD_FLAG);
  console.error('[App] La recarga automática no resolvió la carga de chunks.', error);
}

function handleChunkLoadFailure(error, eventTarget) {
  if (!isChunkOrAssetLoadError(error, eventTarget)) return;
  reloadForStaleAssets(error);
}

router.onError((error) => {
  handleChunkLoadFailure(error);
});

window.addEventListener('error', (event) => {
  handleChunkLoadFailure(event.error || event.message, event.target);
}, true);

window.addEventListener('unhandledrejection', (event) => {
  handleChunkLoadFailure(event.reason);
});

createApp(App).use(router).mount('#app');
