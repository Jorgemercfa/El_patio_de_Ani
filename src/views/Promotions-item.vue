<script setup>
import { onMounted, ref } from 'vue';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { getActivePromotions } from '@/auth/promsRepo';

const promotions = ref([]);
const loading = ref(true);
const error = ref(null);

const WHATSAPP_PHONE = '51975495623';

onMounted(async () => {
  try {
    promotions.value = await getActivePromotions();
  } catch (e) {
    error.value = 'No se pudieron cargar las promociones. Intenta de nuevo.';
    console.warn('[Promotions] Error cargando promos:', e);
  } finally {
    loading.value = false;
  }
});

function formatDeadline(deadline) {
  if (!deadline) return null;
  // Firestore Timestamp o string ISO
  const date = deadline?.toDate ? deadline.toDate() : new Date(deadline);
  return date.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function isExpired(deadline) {
  if (!deadline) return false;
  const date = deadline?.toDate ? deadline.toDate() : new Date(deadline);
  return date < new Date();
}

function sendWhatsApp(promo) {
  let message = `Hola Ani, me interesa esta promoción 🎉\n\n`;
  message += `🏷️ ${promo.title}\n`;
  message += `📝 ${promo.description}\n`;
  message += `💰 Precio promo: S/ ${promo.price}`;

  if (promo.originalPrice) {
    message += ` (antes S/ ${promo.originalPrice})`;
  }

  if (promo.deadline) {
    message += `\n📅 Válido hasta: ${formatDeadline(promo.deadline)}`;
  }

  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.location.href = url;
}
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="promos-section">
      <div class="promos-container">
        <div class="promos-badge">🔥 OFERTAS ESPECIALES</div>
        <h1 class="main-title">Promociones</h1>
        <p class="main-subtitle">
          ¡Aprovecha nuestras ofertas por tiempo limitado! Reserva ahora y ahorra en tu próximo evento.
        </p>

        <!-- Loading -->
        <div v-if="loading" class="status-state">
          <p class="status-icon">⏳</p>
          <p class="status-msg">Cargando promociones...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="status-state">
          <p class="status-icon">⚠️</p>
          <p class="status-msg">{{ error }}</p>
        </div>

        <!-- Sin promos -->
        <div v-else-if="promotions.length === 0" class="status-state">
          <p class="status-icon">🎉</p>
          <p class="status-msg">No hay promociones activas en este momento. ¡Vuelve pronto!</p>
        </div>

        <!-- Grid de promos -->
        <div v-else class="promos-grid">
          <article
            v-for="promo in promotions"
            :key="promo.id"
            class="promo-card"
            :class="{ 'promo-card--expired': isExpired(promo.deadline) }"
          >
            <!-- Imagen -->
            <div class="promo-image-wrapper">
              <img
                v-if="promo.image"
                :src="promo.image"
                :alt="promo.title"
                class="promo-image"
              />
              <div v-else class="promo-image-placeholder">🎪</div>

              <!-- Badge de expiración -->
              <span v-if="isExpired(promo.deadline)" class="promo-badge promo-badge--expired">
                Vencida
              </span>
              <span v-else-if="promo.deadline" class="promo-badge promo-badge--active">
                ⏰ Oferta por tiempo limitado
              </span>
            </div>

            <!-- Contenido -->
            <div class="promo-body">
              <h2 class="promo-title">{{ promo.title }}</h2>
              <p class="promo-description">{{ promo.description }}</p>

              <!-- Precio -->
              <div class="promo-price-block">
                <span v-if="promo.originalPrice" class="promo-original-price">
                  S/ {{ promo.originalPrice }}
                </span>
                <span class="promo-price">S/ {{ promo.price }}</span>
                <span v-if="promo.originalPrice" class="promo-savings">
                  Ahorras S/ {{ promo.originalPrice - promo.price }}
                </span>
              </div>

              <!-- Deadline -->
              <p v-if="promo.deadline" class="promo-deadline">
                📅 Válido hasta: <strong>{{ formatDeadline(promo.deadline) }}</strong>
              </p>

              <!-- Botón -->
              <button
                class="promo-btn"
                :disabled="isExpired(promo.deadline)"
                :class="{ 'promo-btn--disabled': isExpired(promo.deadline) }"
                @click="sendWhatsApp(promo)"
              >
                {{ isExpired(promo.deadline) ? 'Promoción vencida' : '📱 Quiero esta promo' }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FDF6EC;
  font-family: 'Nunito', sans-serif;
}

.promos-section {
  flex: 1;
  padding: 100px 0 80px;
}

.promos-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
  text-align: center;
}

.promos-badge {
  display: inline-block;
  background: linear-gradient(135deg, #E91E81, #FF6B6B);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 6px 18px;
  border-radius: 999px;
  margin-bottom: 16px;
}

.main-title {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.main-subtitle {
  font-size: 1rem;
  color: #666;
  margin-bottom: 50px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Estados vacío / loading / error */
.status-state {
  text-align: center;
  padding: 80px 20px;
}

.status-icon {
  font-size: 3.5rem;
  margin-bottom: 12px;
}

.status-msg {
  font-size: 1.1rem;
  color: #2D3E94;
  font-weight: 600;
}

/* Grid */
.promos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
  text-align: left;
}

/* Card */
.promo-card {
  background: white;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.promo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.promo-card--expired {
  opacity: 0.65;
  filter: grayscale(0.4);
}

/* Imagen */
.promo-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  background: #f5f0e8;
  overflow: hidden;
}

.promo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promo-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: linear-gradient(135deg, #fff0f8, #f0f4ff);
}

/* Badges */
.promo-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.promo-badge--active {
  background: #E91E81;
  color: white;
}

.promo-badge--expired {
  background: #888;
  color: white;
}

/* Cuerpo de la card */
.promo-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.promo-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #2D3E94;
  margin: 0;
}

.promo-description {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
  line-height: 1.5;
}

/* Precio */
.promo-price-block {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.promo-original-price {
  font-size: 0.9rem;
  color: #aaa;
  text-decoration: line-through;
}

.promo-price {
  font-size: 1.6rem;
  font-weight: 900;
  color: #E91E81;
}

.promo-savings {
  font-size: 0.78rem;
  background: rgba(37, 211, 102, 0.15);
  color: #1c8c46;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}

/* Deadline */
.promo-deadline {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
}

/* Botón */
.promo-btn {
  margin-top: auto;
  padding: 13px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: 0.25s;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
}

.promo-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 7px 18px rgba(37, 211, 102, 0.45);
}

.promo-btn--disabled,
.promo-btn:disabled {
  background: #ccc;
  box-shadow: none;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 600px) {
  .promos-grid {
    grid-template-columns: 1fr;
  }
}
</style>