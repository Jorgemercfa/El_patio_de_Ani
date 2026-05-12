<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSession } from '@/auth/session';
// import { useCart } from '@/store/cart.js';

const router = useRouter();
const { state, logout } = useSession();
const children = ref([]);
const showChildrenSavedMessage = ref(false);
const childrenStorageTimer = ref(null);
// const { getPurchasedproducts } = useCart();

// const purchasedproducts = computed(() =>
//   state.user ? getPurchasedproducts(state.user.id) : [],
// );
const initials = computed(() => {
  const name = state.user?.name || '';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'UA';
});

// function formatDate(iso) {
//   if (!iso) return '';
//   return new Date(iso).toLocaleDateString('es-PE', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// }

const onLogout = () => {
  logout();
  router.push({ name: 'Home' });
};

const childrenStorageKey = computed(() =>
  state.user?.id ? `patio-hijos-${state.user.id}` : '',
);

const createEmptyChild = () => ({
  name: '',
  birthday: '',
});

const addChild = () => {
  children.value.push(createEmptyChild());
};

const removeChild = (index) => {
  children.value.splice(index, 1);
};

const loadChildren = () => {
  if (!childrenStorageKey.value) {
    children.value = [];
    return;
  }

  try {
    const storedChildren = localStorage.getItem(childrenStorageKey.value);
    if (!storedChildren) {
      children.value = [];
      return;
    }

    const parsedChildren = JSON.parse(storedChildren);
    children.value = Array.isArray(parsedChildren)
      ? parsedChildren.map((child) => ({
          name: typeof child?.name === 'string' ? child.name : '',
          birthday: typeof child?.birthday === 'string' ? child.birthday : '',
        }))
      : [];
  } catch {
    children.value = [];
  }
};

const saveChildren = () => {
  if (!childrenStorageKey.value) return;

  const sanitizedChildren = children.value.map((child) => ({
    name: (child.name || '').trim(),
    birthday: child.birthday || '',
  }));

  localStorage.setItem(childrenStorageKey.value, JSON.stringify(sanitizedChildren));
  showChildrenSavedMessage.value = true;

  if (childrenStorageTimer.value) {
    clearTimeout(childrenStorageTimer.value);
  }
  childrenStorageTimer.value = setTimeout(() => {
    showChildrenSavedMessage.value = false;
  }, 3000);
};

onMounted(loadChildren);

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
                  <label :for="`child-birthday-${index}`">Fecha de cumpleaños</label>
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
        </div>

        <!-- Purchased products -->
        <!-- <div class="products-section">
          <h2 class="section-title">Mis cupones adquiridos</h2>
          <div v-if="purchasedproducts.length > 0" class="products-grid">
            <div
              v-for="(c, i) in purchasedproducts"
              :key="i"
              class="product-card"
            >
              <img :src="c.image" :alt="c.name" class="product-img" />
              <div class="product-body">
                <h3 class="product-name">{{ c.name }}</h3>
                <div class="product-code-box">{{ c.product_code }}</div>
                <p class="product-date">
                  Comprado el {{ formatDate(c.purchasedAt) }}
                </p>
                <p class="product-price">
                  S/ {{ Number(c.discount_price ?? c.price ?? 0).toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="no-products">
            <p>Aún no tienes cupones adquiridos.</p>
            <router-link to="/product-item">
              <button class="browse-btn">Ver cupones disponibles</button>
            </router-link>
          </div>
        </div> -->
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
  background-color: #f4f6f3;
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
  border-radius: 16px;
  border: 2px solid #E91E81;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
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
  border-radius: 12px;
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

.kids-section {
  margin-top: 24px;
  background: #fff;
  border: 2px solid #E91E81;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
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
  border: 2px dashed #E91E81;
  border-radius: 14px;
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
  border-radius: 14px;
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
  border-radius: 12px;
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
  border-radius: 12px;
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

/* Purchased products section */
.products-section {
  margin-top: 50px;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #2D3E94;
  position: relative;
}

.section-title::after {
  content: '';
  width: 60px;
  height: 3px;
  background-color: #E91E81;
  display: block;
  margin-top: 8px;
  border-radius: 2px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border: 2px solid #E91E81;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.product-body {
  padding: 16px;
}

.product-name {
  font-size: 1rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 10px;
}

.product-code-box {
  background: #2D3E94;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  margin-bottom: 10px;
  cursor: default;
  user-select: all;
}

.product-date {
  font-size: 0.8rem;
  color: #888;
  margin: 0 0 4px;
}

.product-price {
  font-size: 0.95rem;
  font-weight: 600;
  color: #E91E81;
  margin: 0;
}

.no-products {
  text-align: center;
  padding: 50px 20px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
}

.no-products p {
  font-size: 1.05rem;
  color: #666;
  margin-bottom: 20px;
}

.browse-btn {
  padding: 12px 28px;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.browse-btn:hover {
  background: #f2c500;
  transform: translateY(-2px);
}
</style>
