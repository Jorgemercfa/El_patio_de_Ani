<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSession } from '@/auth/session';
import { useCart } from '@/store/cart.js';
import { NIVELES, useLoyalty } from '@/store/loyalty';

const router = useRouter();
const route = useRoute();
const { state, logout } = useSession();
const children = ref([]);
const showChildrenSavedMessage = ref(false);
const childrenStorageTimer = ref(null);
const childrenErrorMessage = ref('');
const profileNotice = ref('');
const ORDER_ID_DISPLAY_LENGTH = 12;
const { getPurchasedproducts } = useCart();
const { getLoyaltyData } = useLoyalty();

const purchasedproducts = computed(() =>
  state.user ? getPurchasedproducts(state.user.id) : [],
);
const sortedOrders = computed(() =>
  [...purchasedproducts.value].sort(
    (a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime(),
  ),
);
const loyaltyData = computed(() =>
  state.user ? getLoyaltyData(state.user.id) : getLoyaltyData(null),
);
const loyaltyLevelColorMap = {
  '🥉 Bronce': '#cd7f32',
  '🥈 Plata': '#a8a9ad',
  '🥇 Oro': '#FFD200',
  '💎 VIP': '#E91E81',
};
const silverReservasTarget = NIVELES.find((nivel) => nivel.nombre === '🥈 Plata')?.minReservas || 3;
const loyaltyLevelColor = computed(
  () => loyaltyLevelColorMap[loyaltyData.value.nivel] || '#2D3E94',
);
const loyaltyProgress = computed(() => {
  const levelIndex = NIVELES.findIndex((nivel) => nivel.nombre === loyaltyData.value.nivel);
  if (levelIndex < 0 || levelIndex === NIVELES.length - 1) return 100;

  const currentLevelMin = NIVELES[levelIndex].minReservas;
  const nextLevelMin = NIVELES[levelIndex + 1].minReservas;
  const progressRange = nextLevelMin - currentLevelMin;
  const progressValue = loyaltyData.value.reservas - currentLevelMin;
  return Math.min(100, Math.max(0, (progressValue / progressRange) * 100));
});
const loyaltyMessage = computed(() => {
  if (loyaltyData.value.nivel === '💎 VIP') {
    return '¡Eres cliente VIP! Disfruta del máximo descuento 💎';
  }
  if (loyaltyData.value.nivel === '🥉 Bronce' && loyaltyData.value.reservas === 0) {
    return `¡Completa ${silverReservasTarget} reservas para alcanzar el nivel Plata!`;
  }
  return `Te faltan ${loyaltyData.value.reservasParaProximo} reserva(s) para ${loyaltyData.value.proximoNivel}.`;
});

const upcomingBirthdays = computed(() => {
  if (!children.value.length) return [];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return children.value.filter((child) => {
    if (!child.birthday) return false;

    // Construir la fecha de cumpleaños de este año
    const bday = new Date(child.birthday);
    const thisYearBday = new Date(
      today.getFullYear(),
      bday.getMonth(),
      bday.getDate(),
    );

    // Si ya pasó este año, calcular para el año siguiente
    if (thisYearBday < today) {
      thisYearBday.setFullYear(today.getFullYear() + 1);
    }

    const diffDays = Math.round(
      (thisYearBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    return diffDays <= 7;
  }).map((child) => {
    const bday = new Date(child.birthday);
    const thisYearBday = new Date(
      new Date().getFullYear(),
      bday.getMonth(),
      bday.getDate(),
    );
    if (thisYearBday < new Date()) {
      thisYearBday.setFullYear(new Date().getFullYear() + 1);
    }
    const diffDays = Math.round(
      (thisYearBday.getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24),
    );
    return {
      name: child.name,
      lastname: child.lastname,
      diffDays,
    };
  });
});

const initials = computed(() => {
  const name = state.user?.name || '';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'UA';
});

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const onLogout = async () => {
  await logout();
  router.push({ name: 'Home' });
};

const createEmptyChild = () => ({
  name: '',
  lastname: '',
  birthday: '',
});

const addChild = () => {
  children.value.push(createEmptyChild());
};

const removeChild = (index) => {
  children.value.splice(index, 1);
};

const loadChildren = () => {
  children.value = Array.isArray(state.user?.children)
    ? state.user.children.map((child) => ({
        name: typeof child?.name === 'string' ? child.name : '',
        lastname: typeof child?.lastname === 'string' ? child.lastname : '',
        birthday: typeof child?.birthday === 'string' ? child.birthday : '',
      }))
    : [];
};

const saveChildren = async () => {
  if (!state.user?.uid) return;

  childrenErrorMessage.value = '';

  const sanitizedChildren = children.value.map((child) => ({
    name: (child.name || '').trim(),
    lastname: (child.lastname || '').trim(),
    birthday: child.birthday || '',
  }));

  try {
    await updateDoc(doc(db, 'user', state.user.uid), {
      children: sanitizedChildren,
    });

    state.user.children = sanitizedChildren;
    showChildrenSavedMessage.value = true;
    profileNotice.value = 'Si las notificaciones por email están configuradas, recibirás una confirmación por el registro de hijos.';

    if (childrenStorageTimer.value) {
      clearTimeout(childrenStorageTimer.value);
    }
    childrenStorageTimer.value = setTimeout(() => {
      showChildrenSavedMessage.value = false;
    }, 3000);
  } catch (error) {
    console.error('[Perfil] Error guardando hijos:', error);
    childrenErrorMessage.value = 'No se pudieron guardar los hijos. Intenta nuevamente.';
  }
};

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  if (route.query.welcomeEmail === 'pending') {
    profileNotice.value = 'Cuenta creada correctamente. Revisa tu correo de bienvenida si el servicio de email está configurado.';
    router.replace({ name: 'Profile' }).catch((error) => {
      console.warn('[Perfil] No se pudo limpiar el query de bienvenida:', error);
    });
  }
  loadChildren();
});

onBeforeUnmount(() => {
  if (childrenStorageTimer.value) {
    clearTimeout(childrenStorageTimer.value);
  }
});
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="contact-section">
      <div class="contact-container">
        <h1 class="main-title">Perfil</h1>

        <div class="contact-card">
          <div class="profile-header">
            <div class="avatar">{{ initials }}</div>
            <div>
              <h2 class="profile-name">{{ state.user?.name }}</h2>
              <p class="profile-email">{{ state.user?.email }}</p>
            </div>
          </div>
          <div class="form-area">
            <div class="form-group">
              <label>Nombre</label>
              <input :value="state.user?.name" disabled />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input :value="state.user?.email" disabled />
            </div>

            <button class="submit-btn" type="button" @click="onLogout">
              Cerrar sesión
            </button>
          </div>
        </div>

        <p v-if="profileNotice" class="profile-notice">
          {{ profileNotice }}
        </p>

        <div class="loyalty-section">
          <h2 class="kids-title">🏆 Mi Nivel</h2>
          <div class="loyalty-badge" :style="{ borderColor: loyaltyLevelColor }">
            <span class="loyalty-level" :style="{ color: loyaltyLevelColor }">{{ loyaltyData.nivel }}</span>
            <span class="loyalty-reservas">{{ loyaltyData.reservas }} reservas acumuladas</span>
          </div>
          <div class="loyalty-progress">
            <div class="loyalty-progress-fill" :style="{ width: `${loyaltyProgress}%`, backgroundColor: loyaltyLevelColor }"></div>
          </div>
          <p class="loyalty-next-level" v-if="loyaltyData.reservasParaProximo > 0">
            Faltan <strong>{{ loyaltyData.reservasParaProximo }}</strong> reserva(s) para
            <strong>{{ loyaltyData.proximoNivel }}</strong>
          </p>
          <p class="loyalty-next-level" v-else>
            Has alcanzado el nivel máximo de beneficios.
          </p>
          <p class="loyalty-discount">{{ loyaltyData.descuento }}% de descuento activo</p>
          <p class="loyalty-message">{{ loyaltyMessage }}</p>
        </div>

        <div class="kids-section">
          <h2 class="kids-title">🎂 Mis hijos</h2>

          <div v-if="children.length === 0" class="kids-empty">
            <p>Aún no has agregado ningún hijo. ¡Agrega uno!</p>
            <button class="add-child-btn" type="button" @click="addChild">
              + Agregar hijo
            </button>
          </div>

          <div v-else class="kids-list">
            <div
              v-for="(child, index) in children"
              :key="`child-${index}`"
              class="child-item"
            >
              <div class="child-fields">
                <div class="form-group">
                  <label :for="`child-name-${index}`">Nombre del hijo</label>
                  <input
                    :id="`child-name-${index}`"
                    v-model="child.name"
                    type="text"
                    placeholder="Ej: Lucía"
                  />
                </div>

                <div class="form-group">
                  <label :for="`child-lastname-${index}`">Apellido del hijo</label>
                  <input
                    :id="`child-lastname-${index}`"
                    v-model="child.lastname"
                    type="text"
                    placeholder="Ej: García"
                  />
                </div>

                <div class="form-group">
                  <label :for="`child-birthday-${index}`">Fecha de nacimiento</label>
                  <input :id="`child-birthday-${index}`" v-model="child.birthday" type="date" />
                </div>
              </div>

              <button class="remove-child-btn" type="button" @click="removeChild(index)">
                ✕
              </button>
            </div>

            <div class="kids-actions">
              <button class="add-child-btn" type="button" @click="addChild">
                + Agregar hijo
              </button>
              <button class="save-children-btn" type="button" @click="saveChildren">
                Guardar hijos
              </button>
            </div>
          </div>

          <p v-if="showChildrenSavedMessage" class="save-children-message">
            ¡Hijos guardados correctamente! 🎉
          </p>
          <p v-if="childrenErrorMessage" class="save-children-error">
            {{ childrenErrorMessage }}
          </p>
        </div>

        <!-- ===== AVISO DE CUMPLEAÑOS ===== -->
<div v-if="upcomingBirthdays.length > 0" class="birthday-alert">
  <div
    v-for="(kid, index) in upcomingBirthdays"
    :key="index"
    class="birthday-alert-item"
  >
    <span class="birthday-alert-icon">🎂</span>
    <div class="birthday-alert-text">
      <strong>
        {{ kid.diffDays === 0
          ? `¡Hoy es el cumpleaños de ${kid.name}!`
          : kid.diffDays === 1
            ? `¡Mañana es el cumpleaños de ${kid.name}!`
            : `¡El cumpleaños de ${kid.name} es en ${kid.diffDays} días!`
        }}
      </strong>
      <p>Reserva con tiempo y celebra con El Patio de Ani 🎉</p>
    </div>
    <router-link to="/Product-item" class="birthday-alert-btn">
      Ver servicios →
    </router-link>
  </div>
</div>

        <div class="orders-section">
          <h2 class="kids-title">📦 Mis Pedidos</h2>
          <div v-if="sortedOrders.length > 0" class="orders-grid">
            <article
              v-for="order in sortedOrders"
              :key="order.orderId"
              class="order-card"
              :aria-label="`Pedido de ${order.name || 'producto'}`"
            >
              <img
                v-if="order.image"
                :src="order.image"
                :alt="order.name || 'Producto'"
                class="order-image"
              />
              <div class="order-body">
                <div class="order-top">
                  <h3 class="order-name">{{ order.name || 'Producto sin nombre' }}</h3>
                  <span class="order-category">{{ order.category || 'Sin categoría' }}</span>
                </div>
                <p class="order-price">
                  💰 Precio pagado:
                  <strong>S/ {{ Number(order.discount_price ?? order.price ?? 0).toFixed(2) }}</strong>
                </p>
                <p class="order-date">📅 Fecha de compra: {{ formatDate(order.purchasedAt) }}</p>
                <div class="order-meta">
                  <span
                    class="order-status"
                    :class="order.completedAt ? 'status-completed' : 'status-pending'"
                  >
                    {{ order.completedAt ? 'Completado' : 'Pendiente' }}
                  </span>
                  <code class="order-code" aria-label="Código de pedido">
                    🔑 {{ String(order.orderId || '').slice(0, ORDER_ID_DISPLAY_LENGTH) }}
                  </code>
                </div>
              </div>
            </article>
          </div>
          <div v-else class="orders-empty">
            <p>Aún no tienes pedidos. ¡Explora nuestros servicios!</p>
            <router-link to="/Product-item">
              <button class="browse-btn" type="button">Ver servicios</button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
/* puedes reutilizar estilos parecidos a Sign-in */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FDF6EC;
  font-family: 'Nunito', sans-serif;
}
.contact-section {
  flex: 1;
  padding: 120px 0 80px 0;
}
.contact-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
}
.main-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 50px;
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
  background-color: #325bcd;
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}
.contact-card {
  display: grid;
  gap: 24px;
  background: white;
  padding: 34px;
  border-radius: 28px;
  border: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 14px;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #2D3E94;
  color: #fff;
  font-weight: 700;
}
.profile-name {
  margin: 0;
  color: #2D3E94;
}
.profile-email {
  margin: 4px 0 0;
  color: #666;
}
.form-area {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
}
.form-group input {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
}
.submit-btn {
  margin-top: 10px;
  padding: 14px;
  border-radius: 999px;
  border: none;
  background-color: #E91E81;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #d81b76;
  transform: translateY(-2px);
}

.loyalty-section {
  margin-top: 24px;
  background: #fff;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.loyalty-badge {
  border: 2px solid #E91E81;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #fff;
}

.loyalty-level {
  font-size: 2rem;
  font-weight: 800;
}

.loyalty-reservas {
  color: #2D3E94;
  font-weight: 700;
}

.loyalty-progress {
  margin-top: 14px;
  background: #f1f3fb;
  border-radius: 999px;
  height: 12px;
  overflow: hidden;
}

.loyalty-progress-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 0.3s ease;
}

.loyalty-next-level {
  margin: 12px 0 0;
  color: #2D3E94;
}

.loyalty-discount {
  margin: 8px 0 0;
  color: #1c8c46;
  font-size: 1.3rem;
  font-weight: 800;
}

.loyalty-message {
  margin: 8px 0 0;
  color: #2D3E94;
  font-weight: 700;
}

.kids-section {
  margin-top: 24px;
  background: #fff;
  border: none;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.kids-title {
  margin: 0 0 16px;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.kids-empty {
  background: #fff9fc;
  border: 2px dashed rgba(233, 30, 129, 0.4);
  border-radius: 24px;
  padding: 18px;
  text-align: center;
}

.kids-empty p {
  margin: 0 0 12px;
  color: #2D3E94;
  font-weight: 600;
}

.kids-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.child-item {
  border: 2px solid #f8d3e9;
  border-radius: 20px;
  padding: 14px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.child-fields {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.remove-child-btn {
  border: 2px solid #E91E81;
  background: #fff;
  color: #E91E81;
  border-radius: 999px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 700;
}

.kids-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.add-child-btn,
.save-children-btn {
  border: none;
  border-radius: 999px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
}

.add-child-btn {
  background: #2D3E94;
  color: #fff;
}

.save-children-btn {
  background: #FFD200;
  color: #2D3E94;
}

.save-children-message {
  margin: 14px 0 0;
  color: #1c8c46;
  font-weight: 700;
}

.profile-notice {
  margin-top: 16px;
  color: #2D3E94;
  font-weight: 700;
}

.save-children-error {
  margin: 14px 0 0;
  color: #b00020;
  font-weight: 700;
}

.orders-section {
  margin-top: 24px;
  background: #fff;
  border: none;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.orders-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.order-card {
  background: #fff;
  border: none;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  overflow: hidden;
}

.order-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.order-body {
  padding: 14px;
}

.order-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.order-name {
  margin: 0;
  color: #2D3E94;
  font-size: 1rem;
}

.order-category {
  background: #ffe8f4;
  color: #E91E81;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 700;
}

.order-price,
.order-date {
  margin: 0 0 8px;
  color: #333;
  font-size: 0.92rem;
}

.order-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.order-status {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 700;
}

.status-completed {
  background: #e6f8e8;
  color: #1b6b32;
}

.status-pending {
  background: #fffbea;
  color: #7a5f00;
}

.order-code {
  background: #2D3E94;
  color: #fff;
  border-radius: 12px;
  padding: 6px 10px;
  font-family: monospace;
  font-size: 0.82rem;
}

.orders-empty {
  text-align: center;
  padding: 24px;
  background: #fff;
  border-radius: 24px;
  border: 2px dashed rgba(233, 30, 129, 0.4);
}

.orders-empty p {
  font-size: 1.05rem;
  color: #2D3E94;
  margin: 0 0 16px;
  font-weight: 600;
}

.browse-btn {
  padding: 12px 28px;
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

@media (min-width: 768px) {
  .orders-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1080px) {
  .orders-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>