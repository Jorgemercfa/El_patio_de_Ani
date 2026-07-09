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
    const nivelIndex = NIVELES.findIndex(n => n.nombre === loyaltyData.nivelActual);
    return {
      ...user,
      loyalty: loyaltyData,
      proximoNivelIndex: nivelIndex + 1,
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
          <button type="button" :class="{ active: filterStatus === 'listo' }" @click="filterStatus = 'listo'" class="filter-btn">Listo para ascender ✓</button>
        </div>
      </div>
      <div v-if="loadingUsers" class="loading-state">Cargando usuarios...</div>
      <div v-else-if="filteredUsers.length === 0" class="empty-state">No hay usuarios para mostrar.</div>
      <div v-else class="users-grid">
        <article v-for="user in filteredUsers" :key="user.id" :class="['user-card', { 'ready-for-promotion': user.status === 'listo' }]">
          <div class="user-header">
            <div class="user-avatar">{{ (user.name?.[0] || '').toUpperCase() }}</div>
            <div class="user-info">
              <h3>{{ user.name }} {{ user.lastname }}</h3>
              <p class="user-email">{{ user.email }}</p>
            </div>
            <span :class="['status-badge', user.status]">{{ user.status === 'listo' ? '✓ Listo' : '⏳ En progreso' }}</span>
          </div>
          <div class="loyalty-info">
            <div class="current-level">
              <p class="label">Nivel actual</p>
              <span :class="['level-badge', getNivelBadgeClass(user.loyalty.nivelActual)]">{{ user.loyalty.nivelActual }}</span>
              <p class="discount">{{ user.loyalty.descuentoActual }}% descuento</p>
            </div>
            <div class="reservas-info">
              <p class="label">Reservas</p>
              <p class="reservas-count">{{ user.loyalty.reservas }} reservas</p>
              <p v-if="user.loyalty.proximoNivel !== 'Máximo nivel'" class="faltantes">Faltan <strong>{{ user.loyalty.reservasParaProximo }}</strong> para {{ user.loyalty.proximoNivel }}</p>
              <p v-else class="max-level">Nivel máximo alcanzado</p>
            </div>
            <div class="next-level" v-if="user.proximoNivel">
              <p class="label">Próximo nivel</p>
              <span :class="['level-badge', getNivelBadgeClass(user.proximoNivel.nombre)]">{{ user.proximoNivel.nombre }}</span>
              <p class="next-discount">{{ user.proximoNivel.descuento }}% descuento</p>
            </div>
          </div>
          <div class="progress-section" v-if="user.loyalty.proximoNivel !== 'Máximo nivel'">
            <p class="label">Progreso</p>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${user.porcentajeProgreso}%`, backgroundColor: getLevelColor(user.loyalty.nivelActual) }"></div>
            </div>
            <p class="progress-text">{{ Math.round(user.porcentajeProgreso) }}%</p>
          </div>
          <div v-if="user.status === 'listo'" class="action-area">
            <p class="alert">⚠️ Este cliente cumple con las reservas requeridas. Verifica en WhatsApp y aprueba el ascenso manualmente en Firestore.</p>
            <button type="button" class="approve-btn" @click="alert('Función de aprobación será implementada conectando a Firestore')">Aprobar ascenso</button>
          </div>
        </article>
      </div>
    </section>
  </AdminLayout>
</template>

<style scoped>
.loyalty-monitor { padding: 20px; }
.monitor-header { margin-bottom: 28px; }
.monitor-header h1 { margin: 0 0 8px; color: #2D3E94; font-size: 1.8rem; }
.subtitle { margin: 0; color: #666; font-size: 0.95rem; }
.controls-area { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
.search-input { padding: 12px 16px; border: 2px solid #E91E81; border-radius: 8px; font-size: 0.95rem; width: 100%; }
.search-input:focus { outline: none; border-color: #2D3E94; box-shadow: 0 0 0 3px rgba(45, 62, 148, 0.1); }
.filter-buttons { display: flex; gap: 10px; flex-wrap: wrap; }
.filter-btn { padding: 10px 16px; border: 2px solid #E91E81; border-radius: 20px; background: white; color: #2D3E94; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
.filter-btn:hover { background: #FDF6EC; }
.filter-btn.active { background: #E91E81; color: white; }
.loading-state, .empty-state { text-align: center; padding: 40px 20px; background: #FDF6EC; border-radius: 12px; color: #666; }
.users-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 20px; }
.user-card { background: white; border: 2px solid #E91E81; border-radius: 12px; padding: 20px; transition: all 0.3s ease; }
.user-card:hover { box-shadow: 0 6px 20px rgba(233, 30, 129, 0.15); transform: translateY(-2px); }
.user-card.ready-for-promotion { border-color: #FFD700; background: linear-gradient(135deg, #FDF6EC 0%, #fff9e6 100%); }
.user-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #eee; }
.user-avatar { width: 48px; height: 48px; border-radius: 50%; background: #2D3E94; color: white; display: grid; place-items: center; font-weight: 700; font-size: 1.2rem; flex-shrink: 0; }
.user-info { flex: 1; min-width: 0; }
.user-info h3 { margin: 0; color: #2D3E94; font-size: 1rem; }
.user-email { margin: 4px 0 0; color: #999; font-size: 0.85rem; }
.status-badge { padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; flex-shrink: 0; }
.status-badge.listo { background: #d4edda; color: #155724; }
.status-badge.pendiente { background: #fff3cd; color: #856404; }
.loyalty-info { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.current-level, .reservas-info, .next-level { padding: 12px; background: #FDF6EC; border-radius: 8px; }
.label { margin: 0 0 8px; font-size: 0.85rem; color: #999; font-weight: 600; }
.level-badge { display: inline-block; padding: 8px 12px; border-radius: 6px; font-weight: 600; font-size: 0.9rem; }
.badge-bronce { background: rgba(205, 127, 50, 0.15); color: #8B4513; }
.badge-plata { background: rgba(192, 192, 192, 0.2); color: #606060; }
.badge-oro { background: rgba(255, 215, 0, 0.2); color: #b8860b; }
.badge-vip { background: rgba(155, 89, 182, 0.15); color: #6c3483; }
.discount { margin: 6px 0 0; font-size: 0.9rem; color: #2D3E94; font-weight: 600; }
.next-discount { margin: 6px 0 0; font-size: 0.85rem; color: #666; }
.reservas-count { margin: 0; font-size: 1.4rem; font-weight: 700; color: #E91E81; }
.faltantes, .max-level { margin: 6px 0 0; font-size: 0.85rem; color: #666; }
.progress-section { margin-bottom: 16px; }
.progress-bar { width: 100%; height: 8px; background: #eee; border-radius: 4px; overflow: hidden; margin: 8px 0; }
.progress-fill { height: 100%; transition: width 0.3s ease; border-radius: 4px; }
.progress-text { margin: 0; font-size: 0.85rem; color: #666; text-align: right; }
.action-area { padding-top: 12px; border-top: 2px solid #FFD700; }
.alert { margin: 0 0 12px; padding: 8px; background: #fff3cd; border-left: 3px solid #FFD700; font-size: 0.85rem; color: #856404; border-radius: 4px; }
.approve-btn { width: 100%; padding: 12px; background: linear-gradient(135deg, #FFD700, #FFC700); color: #2D3E94; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
.approve-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3); }
@media (max-width: 768px) { .users-grid { grid-template-columns: 1fr; } .loyalty-info { grid-template-columns: 1fr; } .filter-buttons { flex-direction: column; } .filter-btn { width: 100%; } }
</style>