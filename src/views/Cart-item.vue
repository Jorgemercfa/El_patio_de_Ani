<script setup>
import { computed, ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useCart } from '@/store/cart.js';
import { useReservasServicio } from '@/store/reservas';
import { useSession } from '@/auth/session';
import { useLoyaltyManual } from '@/store/loyaltyManual';

const MAX_QUANTITY_PER_SNACK = 10;
const WHATSAPP_PHONE = '51975495623';
const SNACK_CATEGORY = 'Carritos Snacks';

const {
  cartItems,
  cartTotal,
  cartCount,
  removeFromCart,
  updateQuantity,
  updateReservationDate,
  checkout,
  saveLastConfirmation,
  consumeLastConfirmation,
  retrySyncPendingOrders,
} = useCart();
const { isDateAvailable } = useReservasServicio();
const { state: sessionState } = useSession();
const { getLoyaltyData, getDescuento, addReserva } = useLoyaltyManual();

const loyaltyData = computed(() =>
  sessionState.user ? getLoyaltyData(sessionState.user.id) : getLoyaltyData(null),
);
const loyaltyDiscount = computed(() =>
  sessionState.user ? getDescuento(sessionState.user.id) : 0,
);
const discountAmount = computed(() => cartTotal.value * (loyaltyDiscount.value / 100));
const cartTotalWithDiscount = computed(() =>
  cartTotal.value * (1 - loyaltyDiscount.value / 100),
);

const showConfirmation = ref(false);
const submitting = ref(false);
const missingDateError = ref('');
const snackDateErrors = ref({}); // { [itemId]: mensaje } — fechas sin stock disponible
const checkoutError = ref(''); // error del checkout real (Firestore/reservas), distinto de missingDateError

// URL de WhatsApp lista para enviar tras un checkout exitoso. Ya no se
// intenta abrir automáticamente — se muestra como un botón real que el
// usuario debe pulsar (ver el fix explicado junto a confirmReservation).
const whatsappUrl = ref('');

const todayDate = new Date().toLocaleDateString('en-CA');

// En mobile (sobre todo iOS Safari y WebViews tipo in-app browser), abrir
// WhatsApp suele hacer que el navegador descargue/recargue esta pestaña en
// background. Al volver, Vue se remonta desde cero y cualquier ref en
// memoria (como showConfirmation) se resetea. Por eso la confirmación real
// se guarda en localStorage (ver cart.js) y acá, al montar, revisamos si
// hay una pendiente de mostrar — cubre tanto la carga normal como ese
// remount forzado.
onMounted(() => {
  if (consumeLastConfirmation()) {
    showConfirmation.value = true;
  }

  // Si un checkout anterior aseguró la reserva pero falló al escribir el
  // pedido en Firestore (corte de red justo en ese instante), queda
  // guardado en una cola local esperando reintento. Sin este llamado,
  // nada disparaba ese reintento nunca — el pedido podía quedar atrapado
  // localmente para siempre si el cliente no volvía a abrir la app desde
  // este mismo navegador. Se llama en silencio: si no hay nada pendiente,
  // no hace nada.
  retrySyncPendingOrders();
});

function getItemPrice(item) {
  return Number(item.discount_price ?? item.price ?? 0);
}

function isService(item) {
  const serviceCategories = ['Inflables', 'Shows Infantiles', 'Juegos', 'Carritos Snacks', 'Estética Infantil'];
  return serviceCategories.includes(item.category);
}

function isSnack(item) {
  return item.category === SNACK_CATEGORY;
}

function shouldShowQuantityControls(item) {
  return !isService(item);
}

function increaseQuantity(item) {
  if (isService(item)) return;
  if (item.quantity >= MAX_QUANTITY_PER_SNACK) return;
  updateQuantity(item.id, item.quantity + 1);
}

function decreaseQuantity(item) {
  if (isService(item)) return;
  updateQuantity(item.id, item.quantity - 1);
}

// NOTA: isDateAvailable ahora consulta Firestore y es asíncrona (antes
// era síncrona contra localStorage). onDateChange se convierte a async;
// Vue maneja el handler async de @change sin problema.
async function onDateChange(item, event) {
  const newDate = event.target.value;

  if (!newDate) {
    const remainingErrors = { ...snackDateErrors.value };
    delete remainingErrors[item.id];
    snackDateErrors.value = remainingErrors;
    updateReservationDate(item.id, newDate);
    missingDateError.value = '';
    return;
  }

  // Antes de aplicar la fecha, se valida contra las reservas ya
  // activas (confirmadas o pendientes vigentes) de otros clientes para
  // este mismo producto. Esto evita, por ejemplo, vender más popcorn
  // del stock disponible (POPCORN_MAX_STOCK) para una misma fecha.
  let available;
  try {
    available = await isDateAvailable(item.id, newDate);
  } catch (err) {
    console.error('[Cart] Error verificando disponibilidad:', err);
    snackDateErrors.value = {
      ...snackDateErrors.value,
      [item.id]: 'No se pudo verificar la disponibilidad. Intenta de nuevo.',
    };
    event.target.value = item.reservationDate || '';
    return;
  }

  if (!available) {
    snackDateErrors.value = {
      ...snackDateErrors.value,
      [item.id]: 'Esa fecha ya no tiene disponibilidad para este producto. Elige otra.',
    };
    event.target.value = item.reservationDate || '';
    return;
  }

  const remainingErrors = { ...snackDateErrors.value };
  delete remainingErrors[item.id];
  snackDateErrors.value = remainingErrors;

  updateReservationDate(item.id, newDate);
  missingDateError.value = '';
}

function snacksWithoutDate() {
  return cartItems.value.filter((item) => isSnack(item) && !item.reservationDate);
}

function buildWhatsAppMessage(items, total, totalWithDiscount, discount, discountAmt, loyalty) {
  const lines = items.flatMap((item) => {
    const base = `- ${item.name} x${item.quantity}: S/ ${(getItemPrice(item) * item.quantity).toFixed(2)}`;
    const dateLine = item.reservationDate ? ` (Fecha: ${item.reservationDate})` : '';
    const itemLines = [base + dateLine];

    if (item.eventDetails) {
      const d = item.eventDetails;
      itemLines.push(
        `   Responsable: ${d.responsable}`,
        `   Dirección: ${d.direccion}, ${d.distrito}`,
        `   Tipo de evento: ${d.tipoEvento}`,
        `   Horario: ${d.horario}`,
        `   Logística eléctrica: ${d.electrica}`,
        `   Espacio: ${d.espacio} (${d.suelo})`,
        `   Niños: ${d.invitados} (${d.edades})`,
        `   Acceso: ${d.acceso}`,
        `   Medidas: ${d.medida}${
          d.telefonoMedida && d.telefonoMedida !== 'No indicado' ? ' - Tel: ' + d.telefonoMedida : ''
        }`,
      );
      if (d.modalidadInflable && d.modalidadInflable !== 'No aplica') {
        itemLines.push(`   Modalidad: ${d.modalidadInflable}`);
      }
      if (d.aguaConexion && d.aguaConexion !== 'No aplica') {
        itemLines.push(`   Agua: ${d.aguaConexion} / Drenaje: ${d.aguaDrenaje}`);
      }
    }

    return itemLines;
  });

  const parts = [
    'Hola Ani, quiero reservar lo siguiente:',
    '',
    ...lines,
    '',
    `Subtotal: S/ ${total.toFixed(2)}`,
  ];

  if (discount > 0) {
    parts.push(`Descuento ${loyalty.nivel} (-${discount}%): -S/ ${discountAmt.toFixed(2)}`);
  }

  parts.push(`Total: S/ ${totalWithDiscount.toFixed(2)}`);

  return parts.join('\n');
}

// ─── FIX: pantalla en blanco al reservar por WhatsApp ──────────────────
//
// Antes se pre-abría una pestaña en blanco de forma síncrona
// (window.open('', '_blank')) y RECIÉN DESPUÉS de `await checkout()` se
// le asignaba la URL real de WhatsApp (waWindow.location.href = url).
//
// Eso funcionaba bien cuando checkout() era prácticamente instantáneo
// (solo tocaba localStorage). Ahora checkout() hace varias operaciones
// reales contra Firestore (crear la reserva, confirmarla, guardar el
// pedido), así que puede tardar uno o varios segundos. Muchos
// navegadores (sobre todo Chrome y Safari en mobile) solo permiten
// redirigir una pestaña pre-abierta si ocurre MUY poco después del clic
// original del usuario; pasado ese margen, bloquean la navegación EN
// SILENCIO, sin lanzar ningún error — por eso el catch nunca se
// enteraba y la pestaña se quedaba en blanco para siempre, sin ningún
// aviso ni fallback visible.
//
// Solución definitiva: ya no se abre ninguna pestaña por adelantado. Se
// hace todo el checkout primero (con su spinner "Enviando..."); recién
// cuando termina con éxito se muestra un botón real de "Enviar por
// WhatsApp" (ver template, sección de confirmación). Un clic genuino del
// usuario sobre ESE botón nunca es bloqueado por ningún navegador, sin
// importar cuánto haya tardado el checkout — es 100% confiable, y
// además dejar de depender del timing de un `window.open` diferido es
// justo lo que elimina esta clase de bug de raíz, no solo un síntoma.
async function confirmReservation() {
  if (cartCount.value === 0 || submitting.value) return;

  const missing = snacksWithoutDate();
  if (missing.length > 0) {
    missingDateError.value = `Por favor selecciona la fecha del evento para: ${missing.map((i) => i.name).join(', ')}.`;
    return;
  }
  missingDateError.value = '';
  checkoutError.value = '';
  whatsappUrl.value = '';

  submitting.value = true;

  // ─── 1. Tomar SNAPSHOT de todos los valores ANTES de tocar el carrito ───
  const itemsSnapshot = cartItems.value.map((item) => ({ ...item }));
  const totalSnapshot = cartTotal.value;
  const totalWithDiscountSnapshot = cartTotalWithDiscount.value;
  const discountSnapshot = loyaltyDiscount.value;
  const discountAmtSnapshot = discountAmount.value;
  const loyaltySnapshot = { ...loyaltyData.value };

  // ─── 2. Construir el mensaje con el snapshot ───
  const message = buildWhatsAppMessage(
    itemsSnapshot,
    totalSnapshot,
    totalWithDiscountSnapshot,
    discountSnapshot,
    discountAmtSnapshot,
    loyaltySnapshot,
  );

  const encoded = message
    .split('\n')
    .map((line) => encodeURIComponent(line))
    .join('%0A');

  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;

  // ─── 3. Checkout REAL — esperado, con manejo de errores ───
  // El checkout funciona igual para invitados y usuarios registrados: no
  // se exige login para comprar. El sistema de loyalty (descuento,
  // addReserva) es la ÚNICA parte que depende de tener sesión, y ya
  // estaba condicionada aparte más abajo (sessionState.user?.id).
  try {
    await checkout();
  } catch (err) {
    console.error('[Cart] Error al confirmar la reserva:', err);

    if (err?.code === 'RESERVATION_CONFLICT') {
      const failedDates = (err.failures || [])
        .map((f) => f.date)
        .filter(Boolean)
        .join(', ');
      checkoutError.value = failedDates
        ? `No pudimos confirmar tu reserva: la fecha ${failedDates} ya no está disponible. Vuelve a intentarlo eligiendo otra fecha.`
        : 'No pudimos confirmar tu reserva porque alguna fecha ya no está disponible. Vuelve a intentarlo eligiendo otra fecha.';
    } else {
      checkoutError.value = 'Ocurrió un error al procesar tu reserva. Por favor intenta de nuevo.';
    }

    submitting.value = false;
    return; // no se muestra confirmación ni el botón de WhatsApp
  }

  // ─── 4. Solo si el checkout tuvo éxito: persistir confirmación y loyalty ───
  saveLastConfirmation();

  if (sessionState.user?.id) {
    addReserva(sessionState.user.id);
  }

  showConfirmation.value = true;
  // Se deja la URL lista para que el usuario haga clic en el botón real
  // (ver template) — ya no se intenta abrir/redirigir nada por script.
  whatsappUrl.value = url;

  submitting.value = false;
}
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="cart-section">
      <div class="cart-container">
        <h1 class="main-title">Carrito de compras</h1>

        <div v-if="checkoutError" class="checkout-error" role="alert" aria-live="assertive">
          ⚠️ {{ checkoutError }}
        </div>

        <div v-if="cartCount > 0" class="cart-layout">
          <div class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-card">
              <img :src="item.image" :alt="item.name" class="cart-thumb" />
              <div class="cart-info">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-price">
                  S/ {{ getItemPrice(item).toFixed(2) }}
                </p>

                <div v-if="item.eventDetails" class="event-details">
                  <p><strong>📍</strong> {{ item.eventDetails.direccion }}, {{ item.eventDetails.distrito }}</p>
                  <p><strong>🎉</strong> {{ item.eventDetails.tipoEvento }}</p>
                  <p><strong>🕒</strong> {{ item.eventDetails.horario }}</p>
                  <p><strong>📐</strong> {{ item.eventDetails.espacio }} — {{ item.eventDetails.suelo }}</p>
                  <p><strong>👧</strong> {{ item.eventDetails.invitados }} ({{ item.eventDetails.edades }})</p>
                  <p v-if="item.eventDetails.modalidadInflable && item.eventDetails.modalidadInflable !== 'No aplica'">
                    <strong>💦</strong> {{ item.eventDetails.modalidadInflable }}
                  </p>
                  <p v-if="item.eventDetails.aguaConexion && item.eventDetails.aguaConexion !== 'No aplica'">
                    <strong>💧</strong> {{ item.eventDetails.aguaConexion }}
                  </p>
                </div>
              </div>

              <div v-if="shouldShowQuantityControls(item)" class="cart-controls">
                <button
                  class="qty-btn"
                  :disabled="item.quantity <= 1"
                  :class="{ 'qty-btn--disabled': item.quantity <= 1 }"
                  @click="decreaseQuantity(item)"
                  title="Disminuir cantidad"
                >
                  −
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button
                  class="qty-btn"
                  :disabled="item.quantity >= MAX_QUANTITY_PER_SNACK"
                  :class="{ 'qty-btn--disabled': item.quantity >= MAX_QUANTITY_PER_SNACK }"
                  @click="increaseQuantity(item)"
                  title="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <div v-if="isSnack(item)" class="snack-date-picker">
                <label :for="`date-${item.id}`" class="snack-date-label">📅 Fecha del evento</label>
                <input
                  :id="`date-${item.id}`"
                  type="date"
                  class="snack-date-input"
                  :min="todayDate"
                  :value="item.reservationDate || ''"
                  @change="onDateChange(item, $event)"
                />
                <span v-if="!item.reservationDate" class="snack-date-required">Requerida</span>
                <span v-if="snackDateErrors[item.id]" class="snack-date-required">
                  {{ snackDateErrors[item.id] }}
                </span>
              </div>

              <div v-else-if="isService(item)" class="service-quantity">
                <span class="qty-label">Cantidad:</span>
                <span class="qty-fixed">{{ item.quantity }}</span>
              </div>

              <div v-else-if="item.reservationDate" class="service-date-display">
                <span class="snack-date-label">📅 {{ item.reservationDate }}</span>
              </div>

              <button
                class="remove-btn"
                @click="removeFromCart(item.id)"
                title="Eliminar"
              >
                ✕
              </button>
            </div>
          </div>

          <div class="cart-summary">
            <h2 class="summary-title">Resumen</h2>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>S/ {{ cartTotal.toFixed(2) }}</span>
            </div>
            <div v-if="loyaltyDiscount > 0" class="summary-row discount-row">
              <span>Descuento {{ loyaltyData.nivel }} (-{{ loyaltyDiscount }}%)</span>
              <span>-S/ {{ discountAmount.toFixed(2) }}</span>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span>S/ {{ cartTotalWithDiscount.toFixed(2) }}</span>
            </div>
            <button class="checkout-btn" :disabled="submitting" @click="confirmReservation">
              {{ submitting ? 'Enviando...' : 'Reservar por WhatsApp' }}
            </button>

            <p v-if="missingDateError" class="missing-date-error">
              {{ missingDateError }}
            </p>

            <p v-if="showConfirmation" class="confirmation-message">
              Tu reserva fue registrada. Pronto Ani te atenderá.
            </p>
          </div>
        </div>

        <div v-else class="empty-state">
          <p class="empty-icon">🛒</p>
          <p class="empty-msg">Tu carrito está vacío</p>

          <p v-if="showConfirmation" class="confirmation-message">
            Tu reserva fue registrada. Pronto Ani te atenderá.
          </p>

          <router-link to="/product-item">
            <button class="browse-btn">Ver productos</button>
          </router-link>
        </div>

        <!--
          Este botón vive FUERA de los dos `v-if`/`v-else` de arriba a
          propósito: checkout() vacía el carrito ANTES de que se muestre
          este botón, así que para cuando whatsappUrl se llena, el
          template ya cambió al bloque "carrito vacío" (v-else). Si este
          botón viviera dentro de .cart-summary, nunca llegaría a
          renderizarse.
        -->
        <a
          v-if="whatsappUrl"
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="whatsapp-cta-link"
        >
          📲 Enviar confirmación por WhatsApp
        </a>
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

.cart-section {
  flex: 1;
  padding: 80px 0 60px;
}

.cart-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
}

.main-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: #2D3E94;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-title::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #E91E81;
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}

.checkout-error {
  margin: 0 0 20px;
  padding: 12px 14px;
  background: rgba(233, 30, 129, 0.08);
  border: 1px solid rgba(233, 30, 129, 0.35);
  border-radius: 12px;
  color: #b00020;
  font-weight: 700;
  font-size: 0.9rem;
}

.cart-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.cart-items {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 16px;
  border-radius: 24px;
  border: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  flex-wrap: wrap;
}

.cart-thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 16px;
  flex-shrink: 0;
}

.cart-info {
  flex: 1;
  min-width: 120px;
}

.item-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2D3E94;
  margin: 0 0 4px;
}

.item-price {
  font-size: 0.9rem;
  color: #E91E81;
  margin: 0;
}

.event-details {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #eee;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.event-details p {
  margin: 0;
  font-size: 0.8rem;
  color: #555;
  line-height: 1.4;
}

.event-details strong {
  margin-right: 2px;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: 2px solid #E91E81;
  border-radius: 999px;
  background: white;
  color: #E91E81;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
  line-height: 1;
}

.qty-btn:hover:not(:disabled) {
  background: #E91E81;
  color: white;
}

.qty-btn--disabled,
.qty-btn:disabled {
  border-color: #ddd;
  color: #bbb;
  cursor: not-allowed;
}

.qty-btn--disabled:hover,
.qty-btn:disabled:hover {
  background: white;
  color: #bbb;
}

.qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: #2D3E94;
}

.service-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  background: #f5f5f5;
  border-radius: 8px;
  height: 30px;
  min-width: 90px;
}

.qty-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.qty-fixed {
  font-size: 1rem;
  font-weight: 700;
  color: #2D3E94;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
  padding: 4px;
}

.remove-btn:hover {
  color: #e53935;
}

.snack-date-picker {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 160px;
}

.service-date-display {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  background: #f0f4ff;
  border-radius: 10px;
  min-width: 120px;
}

.snack-date-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #2D3E94;
}

.snack-date-input {
  border: 1.5px solid #E91E81;
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-family: 'Nunito', sans-serif;
  color: #2D3E94;
  cursor: pointer;
}

.snack-date-input:focus {
  outline: none;
  border-color: #2D3E94;
  box-shadow: 0 0 0 3px rgba(45, 62, 148, 0.1);
}

.snack-date-required {
  font-size: 0.72rem;
  color: #E91E81;
  font-weight: 700;
}

.missing-date-error {
  margin: 10px 0 0;
  padding: 10px 12px;
  background: rgba(233, 30, 129, 0.08);
  border: 1px solid rgba(233, 30, 129, 0.35);
  border-radius: 12px;
  color: #b00020;
  font-weight: 700;
  font-size: 0.85rem;
}

.whatsapp-cta-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 20px auto 0;
  max-width: 360px;
  padding: 14px 18px;
  background: #25D366;
  color: #fff;
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 999px;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.whatsapp-cta-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.55);
}

.cart-summary {
  width: 280px;
  background: white;
  padding: 28px;
  border-radius: 24px;
  border: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.summary-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2D3E94;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #2D3E94;
  margin-bottom: 12px;
}

.discount-row {
  color: #1c8c46;
  font-weight: 700;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 700;
  color: #E91E81;
  border-top: 1px solid #eee;
  padding-top: 14px;
  margin-bottom: 22px;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.checkout-btn:hover:not(:disabled) {
  background: #f2c500;
  transform: translateY(-2px);
}

.checkout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.confirmation-message {
  margin: 14px 0 0;
  padding: 12px 14px;
  background: rgba(37, 211, 102, 0.12);
  border: 1px solid rgba(37, 211, 102, 0.4);
  border-radius: 14px;
  color: #128C7E;
  font-weight: 700;
  font-size: 0.88rem;
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 12px;
}

.empty-msg {
  font-size: 1.2rem;
  color: #2D3E94;
  margin-bottom: 28px;
}

.browse-btn {
  padding: 12px 30px;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.browse-btn:hover {
  background: #f2c500;
  transform: translateY(-2px);
}

/* ─── Mobile ─── */
@media (max-width: 700px) {
  .cart-summary {
    width: 100%;
  }

  .cart-card {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .cart-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .cart-thumb {
    width: 56px;
    height: 56px;
  }

  .qty-btn {
    width: 44px;
    height: 44px;
    font-size: 1.3rem;
  }

  .cart-controls {
    justify-content: center;
  }

  .snack-date-picker,
  .service-quantity,
  .service-date-display {
    width: 100%;
    min-width: 0;
  }

  .snack-date-input {
    width: 100%;
    padding: 10px 12px;
    font-size: 1rem;
  }

  .remove-btn {
    align-self: flex-end;
    font-size: 1.3rem;
    padding: 8px;
  }
}
</style>