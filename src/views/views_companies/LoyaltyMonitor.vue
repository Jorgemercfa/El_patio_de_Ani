<script setup>
import { ref, computed, onMounted } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import { getUsers } from '@/auth/usersRepo';
import { useLoyaltyManual } from '@/store/loyaltyManual';

const users = ref([]);
const loadingUsers = ref(false);
const searchQuery = ref('');
const filterStatus = ref('todos');

const { getLoyaltyData, NIVELES } = useLoyaltyManual();

const processedUsers = computed(() => {
  return users.value.map((user) => {
    const loyaltyData = getLoyaltyData(user.uid);
    const nivelIndex = NIVELES.findIndex(n => n.nombre === loyaltyData.nivel);
    return {
      ...user,
      loyalty: loyaltyData,
      proximoNivel: nivelIndex < NIVELES.length - 1 ? NIVELES[nivelIndex + 1] : null,
      status: loyaltyData.cumpleCondiciones ? 'listo' : 'pendiente',
      porcentajeProgreso: loyaltyData.proximoNivel === 'Máximo nivel' ? 100 : (loyaltyData.reservas / (loyaltyData.proximoNivel ? NIVELES[nivelIndex + 1].minReservas : 1)) * 100,
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
      <div class="controls-area">
        <input v-model="searchQuery" type="text" placeholder="Buscar por nombre, apellido o email..." class="search-input" />
        <div class="filter-buttons">
          <button type="button" :class="{ active: filterStatus === 'todos' }" @click="filterStatus = 'todos'" class="filter-btn">Todos</button>
          <button type="button" :class="{ active: filterStatus === 'pendiente' }" @click="filterStatus = 'pendiente'" class="filter-btn">En progreso</button>
          <button type="button" :class="{ active: filterStatus === 'listo' }" @click="filterStatus = 'listo'" class="filter-btn">Listo ✓</button>
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
              <p class="reservas-count">{{ user.loyalty.reservas }}</p>
              <p v-if="user.loyalty.proximoNivel !== 'Máximo nivel'" class="faltantes">Faltan {{ user.loyalty.reservasParaProximo }}</p>
            </div>
            <div v-if="user.proximoNivel" class="level-box">
              <p class="label">Próximo</p>
              <span :class="['level-badge', getNivelBadgeClass(user.proximoNivel.nombre)]">{{ user.proximoNivel.nombre }}</span>
            </div>
          </div>
          <div class="progress-section" v-if="user.loyalty.proximoNivel !== 'Máximo nivel'">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${user.porcentajeProgreso}%`, backgroundColor: getLevelColor(user.loyalty.nivel) }"></div>
            </div>
          </div>
          <div v-if="user.status === 'listo'" class="action-area">
            <button type="button" class="approve-btn">Aprobar ascenso</button>
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
.controls-area { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
.search-input { padding: 10px 14px; border: 2px solid #E91E81; border-radius: 8px; font-size: 0.9rem; width: 100%; }
.filter-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn { padding: 8px 14px; border: 2px solid #E91E81; border-radius: 18px; background: white; color: #2D3E94; font-weight: 600; font-size: 0.85rem; cursor: pointer; }
.filter-btn.active { background: #E91E81; color: white; }
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
.faltantes { margin: 4px 0 0; font-size: 0.8rem; color: #666; }
.progress-section { margin-bottom: 10px; }
.progress-bar { width: 100%; height: 6px; background: #eee; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; transition: width 0.3s ease; }
.action-area { padding-top: 10px; border-top: 1px solid #FFD700; }
.approve-btn { width: 100%; padding: 10px; background: #FFD700; color: #2D3E94; border: none; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; }
.approve-btn:hover { background: #FFC700; }
@media (max-width: 768px) { .users-grid { grid-template-columns: 1fr; } }
</style>