<script setup>
import { computed, ref } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import { useCart } from '@/store/cart';

// TODO (cart.js): además de lo que ya expone useCart(), este panel
// necesita que cart.js agregue:
//   - confirmPurchasedReservation(orderId): marca order.confirmedAt y
//     llama internamente a useReservasServicio().confirmReservation(orderId)
//     para que la fecha quede bloqueada de forma definitiva.
//   - releasePurchasedReservation(orderId): libera la reserva (por si el
//     cliente nunca confirmó o se cancela el pedido) y llama a
//     useReservasServicio().releaseReservation(orderId).
//   - Que cada order tenga guardado su reservationDate y un campo
//     confirmedAt (null hasta que se confirme), igual que ya existe
//     completedAt.
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
  return new Date(iso).toLocaleString('es-PE');
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

// Un pedido con fecha de evento (inflables, shows, trampolines, etc.)
// necesita validación manual antes de bloquear la fecha en el
// calendario. Un pedido sin fecha (ej. snacks sin reserva) no la
// necesita.
function needsConfirmation(order) {
  return Boolean(order.reservationDate);
}

function reservationStatusLabel(order) {
  if (order.completedAt) return 'Completado';
  if (!needsConfirmation(order)) return 'Sin fecha';
  return order.confirmedAt ? 'Confirmado' : 'Pendiente de confirmar';
}

function reservationStatusClass(order) {
  if (order.completedAt) return 'tag done';
  if (!needsConfirmation(order)) return 'tag neutral';
  return order.confirmedAt ? 'tag confirmed' : 'tag pending';
}

function showDetail(order) {
  selectedOrder.value = order;
}

function completeOrder(order) {
  if (order.completedAt || !order.orderId) return;
  markPurchasedCompleted(order.orderId);
}

function confirmOrder(order) {
  if (!order.orderId || order.confirmedAt || !needsConfirmation(order)) return;
  confirmPurchasedReservation?.(order.orderId);
}

function releaseOrder(order) {
  if (!order.orderId || order.confirmedAt) return;
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
              <th>Fecha</th>
              <th>Fecha Reserva</th>
              <th>Total</th>
              <th>Estado reserva</th>
              <th>Estado pedido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.orderId || `${order.id}-${order.purchasedAt}`">
              <td>{{ order.userId ?? 'Cliente invitado' }}</td>
              <td>{{ order.name }}</td>
              <td>{{ formatDate(order.purchasedAt) }}</td>
              <td>{{ formatReservationDate(order.reservationDate) }}</td>
              <td>S/ {{ orderPrice(order).toFixed(2) }}</td>
              <td>
                <span :class="reservationStatusClass(order)">
                  {{ reservationStatusLabel(order) }}
                </span>
              </td>
              <td>
                <span :class="order.completedAt ? 'tag done' : 'tag pending'">
                  {{ order.completedAt ? 'Completado' : 'Pendiente' }}
                </span>
              </td>
              <td class="actions">
                <button
                  v-if="needsConfirmation(order)"
                  type="button"
                  class="confirm-btn"
                  :disabled="!!order.confirmedAt"
                  @click="confirmOrder(order)"
                >
                  ✅ Confirmar reserva
                </button>
                <button
                  v-if="needsConfirmation(order) && !order.confirmedAt"
                  type="button"
                  class="release-btn"
                  @click="releaseOrder(order)"
                >
                  ✕ Liberar fecha
                </button>
                <button
                  type="button"
                  class="complete-btn"
                  :disabled="!!order.completedAt"
                  @click="completeOrder(order)"
                >
                  Marcar completado
                </button>
                <button type="button" class="detail-btn" @click="showDetail(order)">
                  Ver detalle
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <article v-if="selectedOrder" class="detail-panel">
        <h3>Detalle del pedido</h3>
        <p><strong>Cliente:</strong> {{ selectedOrder.userId ?? 'Cliente invitado' }}</p>
        <p><strong>Producto:</strong> {{ selectedOrder.name }}</p>
        <p><strong>Fecha:</strong> {{ formatDate(selectedOrder.purchasedAt) }}</p>
        <p><strong>Fecha Reserva:</strong> {{ formatReservationDate(selectedOrder.reservationDate) }}</p>
        <p><strong>Estado de la reserva:</strong> {{ reservationStatusLabel(selectedOrder) }}</p>
        <p><strong>Total:</strong> S/ {{ orderPrice(selectedOrder).toFixed(2) }}</p>
      </article>
    </section>
  </AdminLayout>
</template>

<style scoped>
.orders-panel {
  background: white;
  border: 2px solid #E91E81;
  border-radius: 14px;
  padding: 18px;
}

.panel-title {
  margin: 0 0 8px;
  color: #2D3E94;
}

.panel-subtitle {
  margin: 0 0 14px;
  color: #7a5f00;
  background: #fffbea;
  border: 1px solid #FFD200;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.88rem;
  line-height: 1.5;
}

.empty-state {
  background: #FDF6EC;
  border-radius: 10px;
  padding: 16px;
}

.orders-table-wrap {
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  border-bottom: 1px solid #f1dceb;
  padding: 10px 8px;
  text-align: left;
  white-space: nowrap;
}

.orders-table th {
  color: #2D3E94;
}

.tag {
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 700;
}

.tag.pending {
  background: #ffe79b;
  color: #2D3E94;
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
  color: #667;
}

.actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.detail-panel {
  margin-top: 14px;
  background: #fdf1f8;
  border: 1px solid #f4c5df;
  border-radius: 10px;
  padding: 12px;
}

.detail-panel h3 {
  margin: 0 0 8px;
  color: #2D3E94;
}

.detail-panel p {
  margin: 4px 0;
}

.complete-btn,
.detail-btn,
.confirm-btn,
.release-btn {
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  font-weight: 600;
  cursor: pointer;
}

.complete-btn {
  background: #FFD200;
  color: #2D3E94;
}

.complete-btn:disabled,
.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.confirm-btn {
  background: #1b6b32;
  color: white;
}

.release-btn {
  background: #fff0f0;
  color: #b00020;
  border: 1px solid #f2b8b8;
}

.detail-btn {
  background: #E91E81;
  color: white;
}
</style>