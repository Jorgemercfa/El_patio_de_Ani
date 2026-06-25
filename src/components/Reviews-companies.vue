<script setup>
import { ref } from 'vue';
import { addGlobalReview } from '@/auth/reviewServicesRepo';

const submitting = ref(false);
const submitted = ref(false);
const errorMessage = ref('');

const form = ref({
  stars: 5,
  text: '',
  name: '',
});

async function handleSubmit() {
  if (!form.value.text.trim()) {
    errorMessage.value = 'Escribe un comentario antes de enviar.';
    return;
  }
  submitting.value = true;
  errorMessage.value = '';
  try {
    await addGlobalReview({
      stars: form.value.stars,
      text: form.value.text.trim(),
      author: form.value.name.trim() || 'Cliente verificado',
    });
    submitted.value = true;
  } catch (err) {
    errorMessage.value = 'No se pudo enviar la reseña. Intenta de nuevo.';
    console.error('[Reviews QR] Error enviando reseña:', err);
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="qr-wrapper">

    <!-- Logo EPA -->
    <div class="qr-header">
      <h1 class="qr-brand">El Patio de Ani 🎉</h1>
      <p class="qr-tagline">Productora de eventos infantiles</p>
    </div>

    <!-- Pantalla de éxito -->
    <div v-if="submitted" class="success-card">
      <div class="success-icon">🎊</div>
      <h2 class="success-title">¡Gracias por tu reseña!</h2>
      <p class="success-text">Tu opinión nos ayuda a seguir mejorando y a que más familias confíen en nosotros.</p>
    </div>

    <!-- Formulario -->
    <div v-else class="form-card">
      <h2 class="form-title">¿Cómo fue tu experiencia?</h2>
      <p class="form-subtitle">Tu opinión es muy importante para nosotros</p>

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

      <!-- Nombre -->
      <div class="form-group">
        <label for="qr-name">Tu nombre <span class="optional">(opcional)</span></label>
        <input
          id="qr-name"
          v-model="form.name"
          type="text"
          placeholder="Ej: María G."
          autocomplete="given-name"
        />
      </div>

      <!-- Comentario -->
      <div class="form-group">
        <label for="qr-text">Tu comentario</label>
        <textarea
          id="qr-text"
          v-model="form.text"
          rows="5"
          placeholder="Cuéntanos cómo fue tu experiencia con nosotros..."
          maxlength="600"
        ></textarea>
        <span class="char-count">{{ form.text.length }}/600</span>
      </div>

      <p v-if="errorMessage" class="feedback-error">{{ errorMessage }}</p>

      <button
        class="btn-submit"
        :disabled="submitting"
        @click="handleSubmit"
      >
        {{ submitting ? 'Enviando...' : '📤 Enviar reseña' }}
      </button>
    </div>

  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.qr-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff0f7 0%, #f0f4ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 60px;
  font-family: 'Nunito', sans-serif;
}

.qr-header {
  text-align: center;
  margin-bottom: 32px;
}

.qr-brand {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 6px;
}

.qr-tagline {
  font-size: 0.9rem;
  color: #888;
  margin: 0;
}

/* ===== FORMULARIO ===== */
.form-card {
  background: white;
  border-radius: 28px;
  padding: 36px 28px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 32px rgba(233, 30, 129, 0.10);
}

.form-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2D3E94;
  margin: 0 0 6px;
  text-align: center;
}

.form-subtitle {
  font-size: 0.9rem;
  color: #888;
  text-align: center;
  margin: 0 0 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 700;
  color: #333;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  padding: 12px 14px;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: 'Nunito', sans-serif;
  transition: border-color 0.2s;
  width: 100%;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #E91E81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.optional {
  font-weight: 400;
  color: #aaa;
  font-size: 0.82rem;
}

.char-count {
  font-size: 0.78rem;
  color: #aaa;
  text-align: right;
}

.stars-selector {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 4px 0;
}

.star-btn {
  background: none;
  border: none;
  font-size: 2.4rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.15s, transform 0.15s;
  padding: 0;
  line-height: 1;
}

.star-btn.active { color: #FFD200; }
.star-btn:hover { transform: scale(1.2); color: #FFD200; }

.btn-submit {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #E91E81, #C2185B);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(233, 30, 129, 0.35);
  margin-top: 8px;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(233, 30, 129, 0.45);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* ===== ÉXITO ===== */
.success-card {
  background: white;
  border-radius: 28px;
  padding: 48px 28px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 32px rgba(233, 30, 129, 0.10);
  text-align: center;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.success-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #2D3E94;
  margin: 0 0 12px;
}

.success-text {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* ===== ERROR ===== */
.feedback-error {
  background: rgba(233, 30, 129, 0.08);
  border: 1px solid rgba(233, 30, 129, 0.3);
  color: #b00020;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  margin-bottom: 16px;
  font-size: 0.9rem;
}
</style>