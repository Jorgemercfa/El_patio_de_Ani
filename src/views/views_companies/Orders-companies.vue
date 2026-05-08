<script setup>
import { computed } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import { useCart } from '@/store/cart';

const { getPurchasedproducts, markPurchasedCompleted } = useCart();

const orders = computed(() => getPurchasedproducts());

function formatDate(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleString('es-PE');
}

function orderPrice(item) {
  return Number(item.discount_price ?? item.price ?? 0) * Number(item.quantity ?? 1);
}
</script>

<template>
  <AdminLayout>
    <section class="orders-panel">
      <h2 class="panel-title">Pedidos y reservas</h2>
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
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="`${order.id}-${index}`">
              <td>{{ order.userId ?? 'Cliente invitado' }}</td>
              <td>{{ order.name }}</td>
              <td>{{ formatDate(order.purchasedAt) }}</td>
              <td>S/ {{ orderPrice(order).toFixed(2) }}</td>
              <td>
                <span :class="order.completedAt ? 'tag done' : 'tag pending'">
                  {{ order.completedAt ? 'Completado' : 'Pendiente' }}
                </span>
              </td>
              <td class="actions">
                <button
                  type="button"
                  class="complete-btn"
                  :disabled="!!order.completedAt"
                  @click="markPurchasedCompleted(index)"
                >
                  Marcar completado
                </button>
                <button type="button" class="detail-btn">
                  Ver detalle
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
  margin: 0 0 14px;
  color: #2D3E94;
}

.empty-state {
  background: #f4f6f3;
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

.tag.done {
  background: #ffd2e8;
  color: #E91E81;
}

.actions {
  display: flex;
  gap: 6px;
}

.complete-btn,
.detail-btn {
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

.complete-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.detail-btn {
  background: #E91E81;
  color: white;
}
</style>
