<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { fetchGlobalReviews, addGlobalReview } from '@/auth/reviewServicesRepo';
import { useSession } from '@/auth/session';

const { isAuthenticated, state } = useSession();

const reviews = ref([]);
const loading = ref(true);
const submitting = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const form = ref({
  stars: 5,
  text: '',
  name: '',
});

onMounted(async () => {
  reviews.value = await fetchGlobalReviews(true);
  loading.value = false;
});

async function handleSubmit() {
  if (!form.value.text.trim()) {
    errorMessage.value = 'Escribe un comentario antes de enviar.';
    return;
  }
  submitting.value = true;
  errorMessage.value = '';
  try {
    // Si hay sesión usa el nombre del usuario, si no usa lo que escribió o el default
    const author = isAuthenticated.value
      ? (state.user?.name || 'Cliente verificado')
      : (form.value.name.trim() || 'Cliente verificado');

    await addGlobalReview({
      stars: form.value.stars,
      text: form.value.text.trim(),
      author,
    });
    reviews.value = await fetchGlobalReviews(true);
    form.value = { stars: 5, text: '', name: '' };
    successMessage.value = '✅ ¡Gracias por tu reseña!';
    setTimeout(() => { successMessage.value = ''; }, 3000);
  } catch (err) {
    errorMessage.value = 'No se pudo enviar la reseña. Intenta de nuevo.';
    console.error('[Reviews] Error enviando reseña:', err);
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
<header>
  <Navbar />
</header>

<div class="reviews-wrapper">
  <h1 class="title-reviews">Reseñas</h1>

  <section class="reviews-section">
    <h2 class="section-heading">Lo que dicen nuestros clientes ⭐</h2>
    <p class="reviews-subtitle">Familias que confiaron en nosotros</p>

    <!-- Cargando -->
    <div v-if="loading" class="empty-state">Cargando reseñas...</div>

    <!-- Grid de reseñas -->
    <div v-else-if="reviews.length > 0" class="reviews-grid">
      <div
        v-for="review in reviews"
        :key="review._docId"
        class="review-card"
      >
        <div class="review-stars">
          <span v-for="n in review.stars" :key="n">⭐</span>
        </div>
        <p class="review-text">"{{ review.text }}"</p>
        <div class="review-author">
          <div class="review-avatar">{{ review.author.charAt(0).toUpperCase() }}</div>
          <span class="review-name">{{ review.author }}</span>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!
    </div>
  </section>

  <!-- ===== FORMULARIO PARA TODOS ===== -->
  <section class="form-section">
    <h2 class="section-heading">📝 Deja tu reseña</h2>
    <p class="reviews-subtitle">Tu opinión nos ayuda a mejorar</p>

    <div class="form-card">
      <!-- Estrellas -->
      <div class="form-group">
        <label>Tu calificación</label>
        <div class="stars-selector">
          <button
            v-for="n in 5"
            :key="n"
            type="button"
            class="star-btn"
            :class="{ active: n <= form.stars }"
            @click="form.stars = n"
          >★</button>
        </div>
      </div>

      <!-- Nombre — solo si no hay sesión -->
      <div v-if="!isAuthenticated" class="form-group">
        <label for="review-name">Tu nombre <span class="optional">(opcional)</span></label>
        <input
          id="review-name"
          v-model="form.name"
          type="text"
          placeholder="Ej: María G."
        />
      </div>

      <!-- Si hay sesión, mostrar quién firma -->
      <div v-else class="session-name-hint">
        ✅ Firmando como <strong>{{ state.user?.name }}</strong>
      </div>

      <!-- Texto -->
      <div class="form-group">
        <label for="review-text">Tu comentario</label>
        <textarea
          id="review-text"
          v-model="form.text"
          rows="4"
          placeholder="Cuéntanos cómo fue tu experiencia..."
          maxlength="600"
        ></textarea>
        <span class="char-count">{{ form.text.length }}/600</span>
      </div>

      <p v-if="successMessage" class="feedback-success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="feedback-error">{{ errorMessage }}</p>

      <button
        class="btn-submit"
        :disabled="submitting"
        @click="handleSubmit"
      >
        {{ submitting ? 'Enviando...' : '📤 Enviar reseña' }}
      </button>
    </div>
  </section>
</div>

<footer>
  <Footer />
</footer>
</template>

<style scoped>
.reviews-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 20px 60px;
  font-family: 'Nunito', sans-serif;
}

.title-reviews {
  font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
  font-weight: 800;
  margin-bottom: 40px;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-reviews::after {
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

.section-heading {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0 0 8px;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.reviews-section {
  background: linear-gradient(135deg, #fff0f7 0%, #f0f4ff 100%);
  border-radius: 32px;
  padding: 48px;
  margin-bottom: 40px;
}

.reviews-subtitle {
  font-size: 0.95rem;
  color: #888;
  margin: 8px 0 32px;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.review-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(233, 30, 129, 0.08);
  border: 1px solid rgba(233, 30, 129, 0.12);
  text-align: left;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.review-card::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 16px;
  font-size: 7rem;
  color: rgba(233, 30, 129, 0.06);
  font-family: Georgia, serif;
  line-height: 1;
  pointer-events: none;
}

.review-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(233, 30, 129, 0.15);
}

.review-stars { font-size: 1rem; margin-bottom: 12px; }

.review-text {
  color: #2D3E94;
  font-size: 0.92rem;
  line-height: 1.65;
  margin: 0 0 18px;
  font-style: italic;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.review-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.review-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #888;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 40px;
  font-size: 0.95rem;
}

/* ===== FORMULARIO ===== */
.form-section {
  background: white;
  border-radius: 32px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  margin-bottom: 40px;
}

.form-card {
  max-width: 600px;
  margin-top: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.form-group textarea {
  padding: 12px 14px;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: 'Nunito', sans-serif;
  resize: vertical;
  transition: border-color 0.2s;
}

.form-group textarea:focus {
  outline: none;
  border-color: #E91E81;
}

.char-count {
  font-size: 0.78rem;
  color: #aaa;
  text-align: right;
}

.stars-selector {
  display: flex;
  gap: 6px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.15s, transform 0.15s;
  padding: 0;
  line-height: 1;
}

.star-btn.active { color: #FFD200; }
.star-btn:hover { transform: scale(1.2); color: #FFD200; }

.btn-submit {
  padding: 14px 32px;
  background: linear-gradient(135deg, #E91E81, #C2185B);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(233, 30, 129, 0.35);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(233, 30, 129, 0.45);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.feedback-success {
  background: rgba(37, 211, 102, 0.12);
  border: 1px solid rgba(37, 211, 102, 0.4);
  color: #128C7E;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  margin-bottom: 16px;
}

.feedback-error {
  background: rgba(233, 30, 129, 0.08);
  border: 1px solid rgba(233, 30, 129, 0.3);
  color: #b00020;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  margin-bottom: 16px;
}

.form-group input {
  padding: 12px 14px;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: 'Nunito', sans-serif;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #E91E81;
}

.optional {
  font-weight: 400;
  color: #aaa;
  font-size: 0.82rem;
}

.session-name-hint {
  font-size: 0.9rem;
  color: #1c8c46;
  background: rgba(37, 211, 102, 0.1);
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 18px;
  font-weight: 500;
}

.login-prompt {
  text-align: center;
  padding: 40px 20px;
  color: #2D3E94;
}

.login-prompt p {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.btn-login {
  display: inline-block;
  background: linear-gradient(135deg, #E91E81, #C2185B);
  color: white;
  text-decoration: none;
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(233, 30, 129, 0.35);
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(233, 30, 129, 0.45);
}

@media (max-width: 900px) {
  .reviews-grid { grid-template-columns: repeat(2, 1fr); }
  .reviews-section, .form-section { padding: 32px 24px; }
}

@media (max-width: 600px) {
  .reviews-grid { grid-template-columns: 1fr; }
  .reviews-section, .form-section { padding: 24px 16px; }
}
</style>