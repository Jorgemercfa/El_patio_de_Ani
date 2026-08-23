<script setup>
import { computed, ref } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import { useCart } from '@/store/cart';

const {
  getPurchasedproducts,
  markPurchasedCompleted,
  confirmPurchasedReservation,
  releasePurchasedReservation,
} = useCart();

const orders = computed(() => getPurchasedproducts());
const selectedOrder = ref(null);

function formatDate(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatReservationDate(date) {
  if (!date) return '-';
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('es-PE');
  }
  return new Date(date).toLocaleDateString('es-PE');
}

function orderPrice(item) {
  return Number(item.discount_price ?? item.price ?? 0) * Number(item.quantity ?? 1);
}

function needsConfirmation(order) {
  return Boolean(order.reservationDate);
}

// releasedAt es un estado nuevo (antes no existía en absoluto): antes de
// este fix, una reserva liberada se seguía mostrando como "Pendiente" con
// el botón "Liberar" todavía disponible, porque no había ningún campo que
// distinguiera "nunca confirmada" de "liberada intencionalmente".
//
// confirmationExpired es otro estado nuevo: se marca cuando el admin
// intenta confirmar una reserva cuyo hold en reservas.js ya venció (pasaron
// más de 2h sin confirmar). Antes esto se confirmaba igual sin ningún
// aviso, arriesgando una doble reserva si otro cliente ya había tomado esa
// fecha. Ahora se distingue visualmente de un "Pendiente" común para que
// el admin sepa que necesita verificar la fecha con el cliente antes de
// seguir.
function reservationStatusLabel(order) {
  if (order.completedAt) return 'Completado';
  if (!needsConfirmation(order)) return 'Sin fecha';
  if (order.releasedAt) return 'Liberado';
  if (order.confirmedAt) return 'Confirmado';
  if (order.confirmationExpired) return 'Vencida (revisar)';
  return 'Pendiente';
}

function reservationStatusClass(order) {
  if (order.completedAt) return 'tag done';
  if (!needsConfirmation(order)) return 'tag neutral';
  if (order.releasedAt) return 'tag released';
  if (order.confirmedAt) return 'tag confirmed';
  if (order.confirmationExpired) return 'tag expired';
  return 'tag pending';
}

function showDetail(order) {
  selectedOrder.value = order;
}

function completeOrder(order) {
  if (order.completedAt || !order.orderId) return;
  markPurchasedCompleted(order.orderId);
}

// confirmPurchasedReservation() ahora devuelve false cuando el hold ya
// venció (más de 2h sin confirmar) en vez de confirmarlo silenciosamente.
// En ese caso avisamos al admin en vez de asumir que la fecha sigue
// apartada — pudo haberla tomado otro cliente mientras tanto. Reintentar
// el botón seguirá devolviendo false (el hold sigue vencido); la salida
// real acá es usar "Liberar" y coordinar una nueva fecha con el cliente
// por WhatsApp si corresponde.
function confirmOrder(order) {
  if (!order.orderId || order.confirmedAt || order.releasedAt || !needsConfirmation(order)) return;
  const confirmed = confirmPurchasedReservation?.(order.orderId);
  if (confirmed === false) {
    window.alert(
      'Esta reserva ya venció (pasaron más de 2 horas sin confirmar) y la fecha pudo haber sido tomada por otro cliente. Verifica disponibilidad antes de continuar — si ya no aplica, usa "Liberar" y coordina una nueva fecha con el cliente.',
    );
  }
}

function releaseOrder(order) {
  if (!order.orderId || order.confirmedAt || order.releasedAt) return;
  if (!window.confirm('¿Liberar esta fecha? El cliente no llegó a confirmar la reserva.')) return;
  releasePurchasedReservation?.(order.orderId);
}
</script>

<template>
  <AdminLayout>
    <section class="orders-panel">
      <h2 class="panel-title">Pedidos y reservas</h2>
      <p class="panel-subtitle">
        Las reservas con fecha quedan en <strong>Pendiente de confirmar</strong> hasta que
        valides que el cliente sí envió el mensaje de WhatsApp. Si no confirmas a tiempo, la
        fecha se libera sola automáticamente para que otro cliente pueda tomarla.
      </p>

      <div v-if="orders.length === 0" class="empty-state">
        No hay pedidos registrados por el momento.
      </div>

      <div v-else class="orders-table-wrap">
        <table class="orders-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Fecha Registro</th>
              <th>Fecha Reserva</th>
              <th>Total</th>
              <th>Estado reserva</th>
              <th>Estado pedido</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.orderId || `${order.id}-${order.purchasedAt}`">
              <td class="col-client">{{ order.userId ?? 'Cliente invitado' }}</td>
              <td class="col-product">
                <span class="product-name">{{ order.name }}</span>
              </td>
              <td class="col-date">{{ formatDate(order.purchasedAt) }}</td>
              <td class="col-date">
                <strong>{{ formatReservationDate(order.reservationDate) }}</strong>
              </td>
              <td class="col-price">S/ {{ orderPrice(order).toFixed(2) }}</td>
              <td class="col-status">
                <span :class="reservationStatusClass(order)">
                  {{ reservationStatusLabel(order) }}
                </span>
              </td>
              <td class="col-status">
                <span :class="order.completedAt ? 'tag done' : 'tag pending'">
                  {{ order.completedAt ? 'Completado' : 'Pendiente' }}
                </span>
              </td>
              <td class="actions-cell">
                <div class="actions-grid">
                  <button
                    v-if="needsConfirmation(order)"
                    type="button"
                    class="btn btn-confirm"
                    :disabled="!!order.confirmedAt || !!order.releasedAt"
                    title="Confirmar reserva"
                    @click="confirmOrder(order)"
                  >
                    ✓ Confirmar
                  </button>
                  <button
                    v-if="needsConfirmation(order) && !order.confirmedAt && !order.releasedAt"
                    type="button"
                    class="btn btn-release"
                    title="Liberar fecha"
                    @click="releaseOrder(order)"
                  >
                    ✕ Liberar
                  </button>
                  <button
                    type="button"
                    class="btn btn-complete"
                    :disabled="!!order.completedAt"
                    title="Marcar como completado"
                    @click="completeOrder(order)"
                  >
                    Completar
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-detail" 
                    title="Ver detalle del pedido"
                    @click="showDetail(order)"
                  >
                    Detalle
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <article v-if="selectedOrder" class="detail-panel">
        <div class="detail-header">
          <h3>Detalle del pedido</h3>
          <button type="button" class="close-btn" @click="selectedOrder = null">✕</button>
        </div>
        <div class="detail-grid">
          <p><strong>Cliente:</strong> {{ selectedOrder.userId ?? 'Cliente invitado' }}</p>
          <p><strong>Producto:</strong> {{ selectedOrder.name }}</p>
          <p><strong>Fecha Registro:</strong> {{ formatDate(selectedOrder.purchasedAt) }}</p>
          <p><strong>Fecha Reserva:</strong> {{ formatReservationDate(selectedOrder.reservationDate) }}</p>
          <p><strong>Estado Reserva:</strong> {{ reservationStatusLabel(selectedOrder) }}</p>
          <p><strong>Total:</strong> S/ {{ orderPrice(selectedOrder).toFixed(2) }}</p>
        </div>
      </article>
    </section>
  </AdminLayout>
</template>

<style scoped>
.orders-panel {
  background: #ffffff;
  border: 1px solid #f2c5df;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  width: 100%;
  box-sizing: border-box;
}

.panel-title {
  margin: 0 0 6px;
  color: #2D3E94;
  font-size: 1.5rem;
  font-weight: 700;
}

.panel-subtitle {
  margin: 0 0 18px;
  color: #7a5f00;
  background: #fffbea;
  border: 1px solid #FFD200;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.85rem;
  line-height: 1.4;
}

.empty-state {
  background: #FDF6EC;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  color: #666;
}

.orders-table-wrap {
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #f1dceb;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.orders-table th {
  background-color: #fdf1f8;
  color: #2D3E94;
  font-weight: 700;
  padding: 12px 10px;
  border-bottom: 2px solid #f1dceb;
  text-align: left;
  white-space: nowrap;
}

.orders-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #f1dceb;
  vertical-align: middle;
  color: #333333;
}

.orders-table tr:last-child td {
  border-bottom: none;
}

.orders-table tr:hover {
  background-color: #fff9fc;
}

/* Ajustes específicos de columnas para evitar deformación */
.col-client {
  min-width: 110px;
  max-width: 140px;
  word-break: break-word;
}

.col-product {
  min-width: 180px;
  max-width: 260px;
}

.product-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
  font-weight: 600;
}

.col-date {
  white-space: nowrap;
  font-size: 0.83rem;
  color: #555;
}

.col-price {
  white-space: nowrap;
  font-weight: 700;
  color: #2D3E94;
}

.col-status {
  white-space: nowrap;
}

.actions-cell {
  min-width: 200px;
}

.text-center {
  text-align: center;
}

/* Tags de estado */
.tag {
  display: inline-block;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
}

.tag.pending {
  background: #ffe79b;
  color: #6b5200;
}

.tag.confirmed {
  background: #d7f4de;
  color: #1b6b32;
}

.tag.done {
  background: #ffd2e8;
  color: #E91E81;
}

.tag.neutral {
  background: #eef0f6;
  color: #667085;
}

.tag.released {
  background: #f1dceb;
  color: #8a5b00;
}

.tag.expired {
  background: #ffd9d9;
  color: #b00020;
}

/* Cuadrícula compacta para botones de acción (2x2) */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
}

.btn {
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-confirm {
  background: #1b6b32;
  color: white;
}

.btn-confirm:hover:not(:disabled) {
  background: #145226;
}

.btn-release {
  background: #fff0f0;
  color: #b00020;
  border: 1px solid #f2b8b8;
}

.btn-release:hover:not(:disabled) {
  background: #fde8e8;
}

.btn-complete {
  background: #FFD200;
  color: #2D3E94;
}

.btn-complete:hover:not(:disabled) {
  background: #ebd800;
}

.btn-detail {
  background: #E91E81;
  color: white;
}

.btn-detail:hover:not(:disabled) {
  background: #d61874;
}

/* Panel de detalle mejorado */
.detail-panel {
  margin-top: 18px;
  background: #fdf1f8;
  border: 1px solid #f4c5df;
  border-radius: 12px;
  padding: 16px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.detail-header h3 {
  margin: 0;
  color: #2D3E94;
  font-size: 1.1rem;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #666;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.detail-grid p {
  margin: 0;
  font-size: 0.88rem;
  color: #444;
}
</style>