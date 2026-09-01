<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { fetchCompanyproducts, getCompanyproducts } from '@/auth/companyproductsRepo';
import { useSession } from '@/auth/session';
import { fetchGlobalReviews } from '@/auth/reviewServicesRepo';
import { useHomeSeo } from '@/composables/useSeoHead';

const { isAuthenticated, state } = useSession();
const router = useRouter();

// ═══════════════════════════════════════════════════════════════════════════
// SEO - Meta tags dinámicos para Home
// ═══════════════════════════════════════════════════════════════════════════
useHomeSeo();

/* =============================
   POPUP DE BIENVENIDA
============================= */
const showWelcomePopup = ref(false);
const WELCOME_POPUP_SESSION_KEY = 'welcomePopupShown';


const closeWelcomePopup = () => {
  showWelcomePopup.value = false;
};


const goToProfileFromPopup = () => {
  showWelcomePopup.value = false;
  router.push('/Profile');
};


/* =============================
   CARRUSEL PRINCIPAL DE VIDEOS (LOCALES)
============================= */


// VIDEOS RESPONSIVOS: los de escritorio (pesados, buena calidad) y los de
// móvil (comprimidos agresivamente, ya que en pantallas chicas la pérdida
// de nitidez no se nota, y en redes móviles el peso SÍ importa mucho).
// Los archivos de móvil van en src/assets/videos_mobile/ (carpeta hermana
// de src/assets/videos/), con los mismos nombres (video1.mp4 ... video5.mp4).
const videosDesktop = [
  new URL('@/assets/videos/video1.mp4', import.meta.url).href,
  new URL('@/assets/videos/video2.mp4', import.meta.url).href,
  new URL('@/assets/videos/video3.mp4', import.meta.url).href,
  new URL('@/assets/videos/video4.mp4', import.meta.url).href,
  new URL('@/assets/videos/video5.mp4', import.meta.url).href
];

const videosMobile = [
  new URL('@/assets/videos_mobile/video1.mp4', import.meta.url).href,
  new URL('@/assets/videos_mobile/video2.mp4', import.meta.url).href,
  new URL('@/assets/videos_mobile/video3.mp4', import.meta.url).href,
  new URL('@/assets/videos_mobile/video4.mp4', import.meta.url).href,
  new URL('@/assets/videos_mobile/video5.mp4', import.meta.url).href
];

// Se elige el set UNA sola vez, al cargar el componente, según el ancho de
// pantalla en ese momento (mismo breakpoint que ya usa el CSS: 768px).
// A propósito NO se recalcula al hacer resize/rotar el celular, porque
// cambiar de set de videos a mitad de reproducción (con distinto src)
// cortaría el video que se está viendo — la decisión de calidad se toma
// una vez, al entrar a la página, como hace cualquier sitio con video
// adaptativo.
const MOBILE_BREAKPOINT_QUERY = '(max-width: 768px)';
const isMobileViewport = ref(
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches
    : false,
);

const videos = computed(() => (isMobileViewport.value ? videosMobile : videosDesktop));

const VIDEO_AUTO_ADVANCE_INTERVAL = 20000;
const VIDEO_ENDED_DELAY = 1000;


const currentVideoIndex = ref(0);
const totalVideos = computed(() => videos.value.length);
const videoIntervalId = ref(null);
const videoRef = ref(null);
const videoEndedTimeout = ref(null);
const mainWrapperRef = ref(null);


const currentVideoSrc = computed(() => videos.value[currentVideoIndex.value]);


const nextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % totalVideos.value;
};


const goToVideo = (index) => {
  currentVideoIndex.value = index;
  restartVideoTimer();
};


const startVideoTimer = () => {
  videoIntervalId.value = setInterval(nextVideo, VIDEO_AUTO_ADVANCE_INTERVAL);
};


const stopVideoTimer = () => {
  if (videoIntervalId.value) {
    clearInterval(videoIntervalId.value);
    videoIntervalId.value = null;
  }
};


const restartVideoTimer = () => {
  stopVideoTimer();
  startVideoTimer();
};


const onVideoEnded = () => {
  clearTimeout(videoEndedTimeout.value);
  videoEndedTimeout.value = setTimeout(() => {
    nextVideo();
    restartVideoTimer();
  }, VIDEO_ENDED_DELAY);
};


/* =============================
   ZOOM DINÁMICO DEL VIDEO PRINCIPAL
   Calcula, para cada video segun su proporcion real,
   cuanto "cover" moderado aplicar sin recortar de mas.

   NOTA (fix móvil): el cálculo depende de dos cosas que en móvil no
   siempre están listas al mismo tiempo: (1) las dimensiones reales del
   video (videoWidth/videoHeight, que llegan con loadedmetadata) y
   (2) el tamaño real del wrapper (clientWidth/clientHeight, que en
   móvil puede ser 0 o incorrecto muy temprano porque depende de "vh",
   y "vh" cambia según si la barra de direcciones del navegador está
   visible o no). Antes solo se intentaba aplicar el zoom UNA vez
   (evento loadedmetadata + un chequeo puntual en onMounted), y si en
   ese instante faltaba cualquiera de los dos datos, el zoom se
   quedaba para siempre en el valor por defecto (video chico y con
   mucho blur alrededor). Ahora se reintenta con backoff corto hasta
   que ambos valores estén disponibles, y se escucha en más eventos
   del video además de loadedmetadata (loadeddata, canplay), porque
   Safari iOS es conocido por no disparar loadedmetadata de forma
   confiable en videos autoplay+muted+playsinline.
============================= */
const ZOOM_CAP = 1.9; // tope maximo de recorte permitido, calibrado para el contenedor de 80vh
const MAX_ZOOM_RETRIES = 12;
const ZOOM_RETRY_DELAY = 150; // ms
const zoomRetryTimeoutId = ref(null);


const computeZoom = (videoEl, wrapperEl) => {
  const vw = videoEl.videoWidth;
  const vh = videoEl.videoHeight;
  const cw = wrapperEl.clientWidth;
  const ch = wrapperEl.clientHeight;

  // Si falta cualquiera de los cuatro valores todavia no podemos
  // calcular un zoom confiable (evita divisiones por 0 / NaN / Infinity)
  if (!vw || !vh || !cw || !ch) return null;

  const containScale = Math.min(cw / vw, ch / vh);
  const coverScale = Math.max(cw / vw, ch / vh);
  const fullCoverZoom = coverScale / containScale;

  return Math.min(fullCoverZoom, ZOOM_CAP);
};


const applyModerateZoom = (event) => {
  const videoEl = event.target;
  const wrapperEl = mainWrapperRef.value;
  if (!wrapperEl) return;

  const zoom = computeZoom(videoEl, wrapperEl);
  if (zoom !== null) {
    videoEl.style.setProperty('--video-zoom', zoom.toFixed(3));
  }
};


// Reintenta aplicar el zoom hasta MAX_ZOOM_RETRIES veces, esperando
// ZOOM_RETRY_DELAY ms entre cada intento, hasta que tanto el video
// como el wrapper tengan dimensiones reales disponibles. Esto cubre
// el caso móvil donde ni el evento loadedmetadata ni un chequeo
// puntual alcanzan a capturar el momento exacto en que ambos datos
// están listos.
const tryApplyZoomWithRetry = (videoEl, attempt = 0) => {
  clearTimeout(zoomRetryTimeoutId.value);

  const wrapperEl = mainWrapperRef.value;
  if (!videoEl || !wrapperEl) return;

  const zoom = computeZoom(videoEl, wrapperEl);
  if (zoom !== null) {
    videoEl.style.setProperty('--video-zoom', zoom.toFixed(3));
    return;
  }

  if (attempt < MAX_ZOOM_RETRIES) {
    zoomRetryTimeoutId.value = setTimeout(
      () => tryApplyZoomWithRetry(videoEl, attempt + 1),
      ZOOM_RETRY_DELAY,
    );
  }
};


const recalcZoomOnResize = () => {
  if (videoRef.value) tryApplyZoomWithRetry(videoRef.value);
};


// Recalcula el zoom cuando el TAMAÑO REAL del wrapper cambia, incluso
// si ese cambio no dispara un evento "resize" de window. Esto pasa,
// por ejemplo, cuando en Safari iOS aparece/desaparece la barra de
// direcciones y el alto en "vh" cambia sin que la ventana "se resize".
let wrapperResizeObserver = null;


/* =============================
   HELPERS
============================= */
const getProductPrice = (product) => Number(product.discount_price ?? product.price ?? 0);
const getProductName = (product) => product.name ?? 'Producto sin nombre';
const getProductCategory = (product) => product.category ?? '';
const getProductImage = (product) => product.image ?? '';


/* =============================
   CARRUSEL PRODUCTOS (HORIZONTAL)
============================= */
const productsTrackRef = ref(null);


const scrollproductsBy = (direction) => {
  const el = productsTrackRef.value;
  if (!el) return;
  const card = el.querySelector('.logs-item');
  const cardWidth = card ? card.getBoundingClientRect().width : 220;
  el.scrollBy({ left: direction * (cardWidth + 20), behavior: 'smooth' });
};


const scrollproductsLeft = () => scrollproductsBy(-1);
const scrollproductsRight = () => scrollproductsBy(1);


/* =============================
   FILTRO POR CATEGORÍA
============================= */
const products = computed(() => getCompanyproducts());


const restaurantproducts = computed(() =>
  products.value.filter((c) => c.category === 'Shows Infantiles'),
);


const restaurantproducts2 = computed(() =>
  products.value.filter((c) => c.category === 'Inflables' || c.category === 'Juegos'),
);


/* =============================
   CARRUSEL SHOWS (scroll)
============================= */
const restaurantTrackRef = ref(null);


const scrollRestaurantsBy = (direction) => {
  const el = restaurantTrackRef.value;
  if (!el) return;
  const card = el.querySelector('.logs-item');
  const cardWidth = card ? card.getBoundingClientRect().width : 220;
  el.scrollBy({ left: direction * (cardWidth + 20), behavior: 'smooth' });
};


const scrollRestaurantsLeft = () => scrollRestaurantsBy(-1);
const scrollRestaurantsRight = () => scrollRestaurantsBy(1);


/* =============================
   CARRUSEL Inflables y Juegos (scroll)
============================= */
const restaurantTrackRef2 = ref(null);


const scrollRestaurantsBy2 = (direction) => {
  const el = restaurantTrackRef2.value;
  if (!el) return;
  const card = el.querySelector('.logs-item');
  const cardWidth = card ? card.getBoundingClientRect().width : 220;
  el.scrollBy({ left: direction * (cardWidth + 20), behavior: 'smooth' });
};


const scrollRestaurantsLeft2 = () => scrollRestaurantsBy2(-1);
const scrollRestaurantsRight2 = () => scrollRestaurantsBy2(1);


/* =============================
   CARRUSEL TESTIMONIOS (scroll)
============================= */
const reviewsTrackRef = ref(null);
const reviews = ref([]);


const scrollReviewsLeft = () => {
  if (reviewsTrackRef.value) {
    reviewsTrackRef.value.scrollBy({ left: -320, behavior: 'smooth' });
  }
};


const scrollReviewsRight = () => {
  if (reviewsTrackRef.value) {
    reviewsTrackRef.value.scrollBy({ left: 320, behavior: 'smooth' });
  }
};


const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('es-PE', { year: 'numeric', month: 'short' }).format(date);
};




/* =============================
   ÚNICO onMounted
============================= */
onMounted(async () => {
  await fetchCompanyproducts();
  startVideoTimer();
  reviews.value = await fetchGlobalReviews();
  window.addEventListener('resize', recalcZoomOnResize);
  window.addEventListener('orientationchange', recalcZoomOnResize); // los móviles rotan pantalla, hay que recalcular el zoom


  // Fallback contra la condición de carrera del PRIMER video (fix móvil):
  // en vez de un único chequeo puntual, reintentamos con backoff corto
  // hasta que el video tenga videoWidth/videoHeight Y el wrapper tenga
  // clientWidth/clientHeight reales. Esto cubre tanto el caso en que el
  // evento 'loadedmetadata' se pierde (se dispara antes de que Vue
  // termine de enlazar el listener) como el caso en que el video tarda
  // más en cargar metadata de lo que tarda este onMounted en ejecutarse,
  // que es justamente el escenario típico en redes móviles.
  await nextTick();
  if (videoRef.value) {
    tryApplyZoomWithRetry(videoRef.value);
  }

  // Recalcula el zoom si el tamaño real del wrapper cambia sin que se
  // dispare un evento "resize" de window (p. ej. cuando la barra de
  // direcciones de Safari iOS aparece/desaparece y cambia el "vh").
  if (mainWrapperRef.value && 'ResizeObserver' in window) {
    wrapperResizeObserver = new ResizeObserver(() => recalcZoomOnResize());
    wrapperResizeObserver.observe(mainWrapperRef.value);
  }


  if (isAuthenticated.value && state.user) {
    const alreadyShown = sessionStorage.getItem(WELCOME_POPUP_SESSION_KEY);
    if (!alreadyShown) {
      showWelcomePopup.value = true;
      sessionStorage.setItem(WELCOME_POPUP_SESSION_KEY, 'true');
    }
  }
});


onBeforeUnmount(() => {
  stopVideoTimer();
  clearTimeout(videoEndedTimeout.value);
  clearTimeout(zoomRetryTimeoutId.value);
  window.removeEventListener('resize', recalcZoomOnResize);
  window.removeEventListener('orientationchange', recalcZoomOnResize);
  if (wrapperResizeObserver) {
    wrapperResizeObserver.disconnect();
    wrapperResizeObserver = null;
  }
});


/* =============================
   TARIFAS DE MOVILIDAD
============================= */
const tarifas = [
  { distrito: 'Miraflores / San Isidro', precio: 80 },
  { distrito: 'Surco / Barranco / San Luis', precio: 80 },
  { distrito: 'San Borja / Surquillo', precio: 80 },
  { distrito: 'Jesús María / San Miguel / Lince', precio: 90 },
  { distrito: 'La Molina / Santa Anita*', precio: 100 },
  { distrito: 'Chorrillos* / Villa', precio: 90 },
  { distrito: 'Cieneguilla* / Pachacamac', precio: 110 },
  { distrito: 'Centro de Lima', precio: 100 },
  { distrito: 'Callao', precio: 120 },
  { distrito: 'Chaclacayo / Lurin', precio: 170 },
];
</script>
