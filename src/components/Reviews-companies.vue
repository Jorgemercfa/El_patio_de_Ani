<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { fetchGlobalReviews, deleteGlobalReview } from '@/auth/reviewServicesRepo';

const reviews = ref([]);
const loading = ref(true);
const deleteConfirmId = ref(null);
const successMessage = ref('');
const errorMessage = ref('');

onMounted(async () => {
  reviews.value = await fetchGlobalReviews(true);
  loading.value = false;
});

async function handleDelete(docId) {
  if (deleteConfirmId.value !== docId) {
    deleteConfirmId.value = docId;
    return;
  }
  try {
    await deleteGlobalReview(docId);
    reviews.value = await fetchGlobalReviews(true);
    deleteConfirmId.value = null;
    successMessage.value = '🗑️ Reseña eliminada correctamente.';
    setTimeout(() => { successMessage.value = ''; }, 3000);
  } catch (err) {
    errorMessage.value = 'Error al eliminar la reseña.';
    console.error('[ReviewsAdmin] Error eliminando reseña:', err);
  }
}
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="admin-wrapper">
    <h1 class="admin-title">Moderación de Reseñas</h1>

    <p v-if="successMessage" class="feedback-success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="feedback-error">{{ errorMessage }}</p>

    <div class="admin-card">
      <h2 class="section-title">
        📋 Reseñas publicadas
        <span class="count-badge">{{ reviews.length }}</span>
      </h2>

      <div v-if="loading" class="empty-state">Cargando reseñas...</div>

      <div v-else-if="reviews.length === 0" class="empty-state">
        No hay reseñas publicadas todavía.
      </div>

      <div v-else class="reviews-list">
        <div
          v-for="review in reviews"
          :key="review._docId"
          class="review-row"
        >
          <div class="review-row-content">
            <div class="review-row-stars">
              <span v-for="n in review.stars" :key="n">⭐</span>
            </div>
            <p class="review-row-text">"{{ review.text }}"</p>
            <span class="review-row-author">— {{ review.author }}</span>
          </div>

          <button
            class="btn-delete"
            :class="{ confirm: deleteConfirmId === review._docId }"
            @click="handleDelete(review._docId)"
          >
            {{ deleteConfirmId === review._docId ? '¿Confirmar eliminación?' : '🗑️ Eliminar' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.admin-wrapper {
  max-width: 860px;
  margin: 0 auto;
  padding: 100px 20px 60px;
  font-family: 'Nunito', sans-serif;
}

.admin-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.admin-title::after {
  content: '';
  width: 64px;
  height: 4px;
  background: #E91E81;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
  display: block;
}

.admin-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2D3E94;
  margin: 0 0 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.count-badge {
  background: #E91E81;
  color: white;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 0.85rem;
  font-weight: 700;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  background: #fdf6ec;
  border-radius: 16px;
  border-left: 4px solid #E91E81;
}

.review-row-content { flex: 1; }
.review-row-stars { font-size: 0.85rem; margin-bottom: 6px; }

.review-row-text {
  font-size: 0.9rem;
  color: #2D3E94;
  font-style: italic;
  margin: 0 0 6px;
  line-height: 1.5;
}

.review-row-author {
  font-size: 0.8rem;
  color: #888;
  font-weight: 600;
}

.btn-delete {
  background: #fff;
  border: 2px solid #E91E81;
  color: #E91E81;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  font-family: 'Nunito', sans-serif;
  flex-shrink: 0;
}

.btn-delete:hover { background: #fff0f7; }
.btn-delete.confirm { background: #E91E81; color: white; }

.feedback-success {
  background: rgba(37, 211, 102, 0.12);
  border: 1px solid rgba(37, 211, 102, 0.4);
  color: #128C7E;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  margin-bottom: 20px;
}

.feedback-error {
  background: rgba(233, 30, 129, 0.08);
  border: 1px solid rgba(233, 30, 129, 0.3);
  color: #b00020;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 32px;
  font-size: 0.95rem;
}

@media (max-width: 600px) {
  .review-row { flex-direction: column; }
  .btn-delete { width: 100%; text-align: center; }
}
</style>