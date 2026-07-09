<script setup>
import { ref, computed, onMounted } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import { getUsers } from '@/auth/usersRepo';
import { useLoyaltyManual } from '@/store/loyaltyManual';

const users = ref([]);
const loadingUsers = ref(false);
const searchQuery = ref('');
const filterStatus = ref('todos');
const approvingUserId = ref(null);
const editingUserId = ref(null);
const editingValue = ref(0);

const { getLoyaltyData, approveNivel, setReservas } = useLoyaltyManual();

// Se incrementa cada vez que se aprueba un ascenso, para forzar a
// processedUsers a recalcular (getLoyaltyData lee de localStorage,
// que Vue no puede observar por sí solo).
const refreshKey = ref(0);

const processedUsers = computed(() => {
  refreshKey.value; // eslint-disable-line no-unused-expressions

  return users.value.map((user) => {
    const loyaltyData = getLoyaltyData(user.uid);
    const esMaximoNivel = loyaltyData.proximoNivel === 'Máximo nivel';
    const totalParaProximo = loyaltyData.reservas + loyaltyData.reservasParaProximo;

    return {
      ...user,
      loyalty: loyaltyData,
      status: loyaltyData.cumpleCondiciones ? 'listo' : 'pendiente',
      porcentajeProgreso: esMaximoNivel
        ? 100
        : (loyaltyData.reservas / (totalParaProximo || 1)) * 100,
    };
  });
});

const filteredUsers = computed(() => {
  return processedUsers.value.filter((user) => {
    const matchSearch = user.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.lastname?.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.email?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = filterStatus.value === 'todos' || user.status === filterStatus.value;
    return matchSearch && matchStatus;
  });
});

// Cuántos usuarios están esperando aprobación, para que se note de
// un vistazo aunque el filtro esté en "Todos".
const pendientesDeAprobacion = computed(
  () => processedUsers.value.filter((user) => user.status === 'listo').length,
);

const loadUsers = async () => {
  loadingUsers.value = true;
  try {
    const allUsers = await getUsers();
    users.value = allUsers;
  } catch (error) {
    console.error('Error cargando usuarios:', error);
  } finally {
    loadingUsers.value = false;
  }
};

const startEditReservas = (user) => {
  editingUserId.value = user.uid;
  editingValue.value = user.loyalty.reservas;
};

const cancelEditReservas = () => {
  editingUserId.value = null;
};

const saveEditReservas = (user) => {
  const nuevoTotal = Math.max(0, Math.floor(Number(editingValue.value) || 0));
  setReservas(user.uid, nuevoTotal);
  editingUserId.value = null;
  refreshKey.value += 1;
};

const handleApprove = (user) => {
  const confirmado = window.confirm(
    `¿Aprobar el ascenso de ${user.name} ${user.lastname ?? ''} a ${user.loyalty.proximoNivel}?`,
  );
  if (!confirmado) return;

  approvingUserId.value = user.uid;
  try {
    approveNivel(user.uid);
    refreshKey.value += 1;
  } finally {
    approvingUserId.value = null;
  }
};

const getLevelColor = (nivel) => {
  const colores = { '🥉 Bronce': '#CD7F32', '🥈 Plata': '#C0C0C0', '🥇 Oro': '#FFD700', '💎 VIP': '#9B59B6' };
  return colores[nivel] || '#2D3E94';
};

const getNivelBadgeClass = (nivel) => {
  if (nivel.includes('Bronce')) return 'badge-bronce';
  if (nivel.includes('Plata')) return 'badge-plata';
  if (nivel.includes('Oro')) return 'badge-oro';
  if (nivel.includes('VIP')) return 'badge-vip';
  return 'badge-default';
};

onMounted(() => { loadUsers(); });
</script>

<template>
  <AdminLayout>
    <section class="loyalty-monitor">
      <div class="monitor-header">
        <h1>📊 Monitoreo de Loyalty</h1>
        <p class="subtitle">Revisa el progreso de clientes y aprueba cambios de nivel</p>
      </div>
      <div v-if="pendientesDeAprobacion > 0" class="pending-banner">
        🔔 Tienes <strong>{{ pendientesDeAprobacion }}</strong> {{ pendientesDeAprobacion === 1 ? 'usuario listo' : 'usuarios listos' }} para ascender de nivel.
      </div>
      <div class="controls-area">
        <input v-model="searchQuery" type="text" placeholder="Buscar por nombre, apellido o email..." class="search-input" />
        <div class="filter-buttons">
          <button type="button" :class="{ active: filterStatus === 'todos' }" @click="filterStatus = 'todos'" class="filter-btn">Todos</button>
          <button type="button" :class="{ active: filterStatus === 'pendiente' }" @click="filterStatus = 'pendiente'" class="filter-btn">En progreso</button>
          <button type="button" :class="{ active: filterStatus === 'listo' }" @click="filterStatus = 'listo'" class="filter-btn">
            Listo ✓ <span v-if="pendientesDeAprobacion > 0" class="count-pill">{{ pendientesDeAprobacion }}</span>
          </button>
        </div>
      </div>
      <div v-if="loadingUsers" class="loading-state">Cargando usuarios...</div>
      <div v-else-if="filteredUsers.length === 0" class="empty-state">No hay usuarios.</div>
      <div v-else class="users-grid">
        <article v-for="user in filteredUsers" :key="user.id" :class="['user-card', { 'ready-for-promotion': user.status === 'listo' }]">
          <div class="user-header">
            <div class="user-avatar">{{ (user.name?.[0] || '').toUpperCase() }}</div>
            <div class="user-info">
              <h3>{{ user.name }} {{ user.lastname }}</h3>
              <p class="user-email">{{ user.email }}</p>
            </div>
            <span :class="['status-badge', user.status]">{{ user.status === 'listo' ? '✓' : '⏳' }}</span>
          </div>
          <div class="loyalty-info">
            <div class="level-box">
              <p class="label">Nivel</p>
              <span :class="['level-badge', getNivelBadgeClass(user.loyalty.nivel)]">{{ user.loyalty.nivel }}</span>
              <p class="discount">{{ user.loyalty.descuento }}%</p>
            </div>
            <div class="level-box">
              <p class="label">Reservas</p>
              <template v-if="editingUserId === user.uid">
                <input
                  v-model.number="editingValue"
                  type="number"
                  min="0"
                  class="reservas-input"
                  @keyup.enter="saveEditReservas(user)"
                  @keyup.esc="cancelEditReservas"
                />
                <div class="edit-actions">
                  <button type="button" class="edit-save" @click="saveEditReservas(user)">Guardar</button>
                  <button type="button" class="edit-cancel" @click="cancelEditReservas">Cancelar</button>
                </div>
              </template>
              <template v-else>
                <p class="reservas-count reservas-editable" title="Clic para ajustar manualmente" @click="startEditReservas(user)">
                  {{ user.loyalty.reservas }} <span class="edit-icon">✎</span>
                </p>
                <p v-if="user.loyalty.proximoNivel !== 'Máximo nivel'" class="faltantes">
                  {{ user.loyalty.reservasParaProximo > 0 ? `Faltan ${user.loyalty.reservasParaProximo}` : 'Listo para ascender' }}
                </p>
              </template>
            </div>
            <div v-if="user.loyalty.proximoNivel !== 'Máximo nivel'" class="level-box">
              <p class="label">Próximo</p>
              <span :class="['level-badge', getNivelBadgeClass(user.loyalty.proximoNivel)]">{{ user.loyalty.proximoNivel }}</span>
              <p class="discount">{{ user.loyalty.descuentoProximo }}%</p>
            </div>
          </div>
          <div class="progress-section" v-if="user.loyalty.proximoNivel !== 'Máximo nivel'">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${user.porcentajeProgreso}%`, backgroundColor: getLevelColor(user.loyalty.nivel) }"></div>
            </div>
          </div>
          <div v-if="user.status === 'listo'" class="action-area">
            <button
              type="button"
              class="approve-btn"
              :disabled="approvingUserId === user.uid"
              @click="handleApprove(user)"
            >
              {{ approvingUserId === user.uid ? 'Aprobando...' : `Aprobar ascenso a ${user.loyalty.proximoNivel}` }}
            </button>
          </div>
        </article>
      </div>
    </section>
  </AdminLayout>
</template>

<style scoped>
.loyalty-monitor { padding: 20px; }
.monitor-header { margin-bottom: 20px; }
.monitor-header h1 { margin: 0 0 8px; color: #2D3E94; font-size: 1.6rem; }
.subtitle { margin: 0; color: #666; font-size: 0.9rem; }
.pending-banner { background: #fff8e1; border: 2px solid #FFD700; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; color: #6c5300; font-size: 0.9rem; }
.controls-area { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
.search-input { padding: 10px 14px; border: 2px solid #E91E81; border-radius: 8px; font-size: 0.9rem; width: 100%; }
.filter-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn { padding: 8px 14px; border: 2px solid #E91E81; border-radius: 18px; background: white; color: #2D3E94; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.filter-btn.active { background: #E91E81; color: white; }
.count-pill { background: #FFD700; color: #2D3E94; border-radius: 999px; padding: 1px 7px; font-size: 0.75rem; font-weight: 700; }
.loading-state, .empty-state { padding: 30px; background: #FDF6EC; border-radius: 10px; color: #666; text-align: center; }
.users-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
.user-card { background: white; border: 2px solid #E91E81; border-radius: 10px; padding: 16px; transition: all 0.3s ease; }
.user-card:hover { box-shadow: 0 4px 15px rgba(233, 30, 129, 0.1); transform: translateY(-2px); }
.user-card.ready-for-promotion { border-color: #FFD700; background: #fffef0; }
.user-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
.user-avatar { width: 40px; height: 40px; border-radius: 50%; background: #2D3E94; color: white; display: grid; place-items: center; font-weight: 700; flex-shrink: 0; }
.user-info { flex: 1; }
.user-info h3 { margin: 0; color: #2D3E94; font-size: 0.95rem; }
.user-email { margin: 2px 0 0; color: #999; font-size: 0.8rem; }
.status-badge { padding: 4px 8px; border-radius: 16px; font-size: 0.8rem; font-weight: 600; background: #f0f0f0; }
.status-badge.listo { background: #d4edda; color: #155724; }
.status-badge.pendiente { background: #fff3cd; }
.loyalty-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 10px; margin-bottom: 12px; }
.level-box { padding: 10px; background: #FDF6EC; border-radius: 6px; }
.label { margin: 0 0 6px; font-size: 0.75rem; color: #999; font-weight: 600; }
.level-badge { display: inline-block; padding: 6px 10px; border-radius: 4px; font-weight: 600; font-size: 0.8rem; }
.badge-bronce { background: rgba(205, 127, 50, 0.15); color: #8B4513; }
.badge-plata { background: rgba(192, 192, 192, 0.2); color: #606060; }
.badge-oro { background: rgba(255, 215, 0, 0.2); color: #b8860b; }
.badge-vip { background: rgba(155, 89, 182, 0.15); color: #6c3483; }
.discount { margin: 4px 0 0; font-size: 0.85rem; color: #2D3E94; font-weight: 600; }
.reservas-count { margin: 0; font-size: 1.2rem; font-weight: 700; color: #E91E81; }
.reservas-editable { cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
.edit-icon { font-size: 0.7rem; opacity: 0.5; }
.reservas-editable:hover .edit-icon { opacity: 1; }
.reservas-input { width: 70px; padding: 4px 6px; border: 2px solid #2D3E94; border-radius: 4px; font-size: 1rem; font-weight: 700; color: #E91E81; }
.edit-actions { display: flex; gap: 6px; margin-top: 6px; }
.edit-save, .edit-cancel { padding: 4px 8px; border-radius: 4px; border: none; font-size: 0.75rem; font-weight: 600; cursor: pointer; }
.edit-save { background: #2D3E94; color: white; }
.edit-cancel { background: #eee; color: #666; }
.faltantes { margin: 4px 0 0; font-size: 0.8rem; color: #666; }
.progress-section { margin-bottom: 10px; }
.progress-bar { width: 100%; height: 6px; background: #eee; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; transition: width 0.3s ease; }
.action-area { padding-top: 10px; border-top: 1px solid #FFD700; }
.approve-btn { width: 100%; padding: 10px; background: #FFD700; color: #2D3E94; border: none; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; }
.approve-btn:hover:not(:disabled) { background: #FFC700; }
.approve-btn:disabled { opacity: 0.6; cursor: not-allowed; }
@media (max-width: 768px) { .users-grid { grid-template-columns: 1fr; } }
</style>