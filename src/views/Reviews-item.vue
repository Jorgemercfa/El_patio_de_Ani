<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
<header>
    <Navbar />
</header>

<div class="reviews">
    <h1 class="title-reviews">Reseñas</h1>
    <section class="reviews-section">
      <h2 class="title-home">Lo que dicen nuestros clientes ⭐</h2>
      <p class="reviews-subtitle">Familias que confiaron en nosotros</p>
      <div class="reviews-grid">
        <div class="review-card">
          <div class="review-stars" aria-label="5 de 5 estrellas">⭐⭐⭐⭐⭐</div>
          <p class="review-text">"Quería felicitarte por el administrador que enviaste el sábado A1. Los hemos recomendado full, próximo evento de todas maneras los contactamos. Que sigan creciendo y trayendo más inflables."</p>
          <div class="review-author">
            <div class="review-avatar">C</div>
            <span class="review-name">Cliente verificado</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars" aria-label="5 de 5 estrellas">⭐⭐⭐⭐⭐</div>
          <p class="review-text">"Todo muy bien. Excelentes profesionales, muchas gracias. El otro año sí o sí contamos con ustedes."</p>
          <div class="review-author">
            <div class="review-avatar">C</div>
            <span class="review-name">Cliente verificado</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars" aria-label="5 de 5 estrellas">⭐⭐⭐⭐⭐</div>
          <p class="review-text">"Súper excelente los contrataré para el cumpleaños de mi hijito también, gracias por su organización 🙂"</p>
          <div class="review-author">
            <div class="review-avatar">C</div>
            <span class="review-name">Cliente verificado</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars" aria-label="5 de 5 estrellas">⭐⭐⭐⭐⭐</div>
          <p class="review-text">"Los chicos muy atentos todo estuvo genial ☺☺"</p>
          <div class="review-author">
            <div class="review-avatar">C</div>
            <span class="review-name">Cliente verificado</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars" aria-label="5 de 5 estrellas">⭐⭐⭐⭐⭐</div>
          <p class="review-text">"Todo A1 gracias estuvo súper bien"</p>
          <div class="review-author">
            <div class="review-avatar">C</div>
            <span class="review-name">Cliente verificado</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars" aria-label="5 de 5 estrellas">⭐⭐⭐⭐⭐</div>
          <p class="review-text">"Gracias!! El personal estuvo atento todo el tiempo y eso me dio mucha tranquilidad como mamá"</p>
          <div class="review-author">
            <div class="review-avatar">C</div>
            <span class="review-name">Cliente verificado</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars" aria-label="5 de 5 estrellas">⭐⭐⭐⭐⭐</div>
          <p class="review-text">"Todo excelente, gracias muy recomendado 👍👍 el local fue perfecto para el cumpleaños de mi hija"</p>
          <div class="review-author">
            <div class="review-avatar">C</div>
            <span class="review-name">Cliente verificado</span>
          </div>
        </div>
      </div>
    </section>

    

</div>
<footer>
    <Footer />
</footer>
</template>

<style scoped>
.reviews {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.title-reviews {
  font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
  margin-bottom: 32px;
  font-weight: 800;
  text-align: left;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-reviews::after {
  content: '';
  width: 64px;
  height: 4px;
  background-color: #E91E81;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.reviews-content {
  margin-top: 24px;
}

.reviews-content p {
  margin-bottom: 16px;
  line-height: 1.6;
  color: #2D3E94;
}

.reviews-section {
  background: linear-gradient(135deg, #fff0f7 0%, #f0f4ff 100%);
  border-radius: 32px;
  margin: 0 40px 80px;
  padding: 60px;
  text-align: center;
}

.reviews-badge {
  display: inline-block;
  background: linear-gradient(135deg, #E91E81, #C2185B);
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 20px;
  margin-bottom: 8px;
}

.reviews-subtitle {
  font-size: 0.95rem;
  color: #888;
  margin: 14px 0 36px;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.review-card {
  background: white;
  border-radius: 20px;
  padding: 28px 24px;
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
  color: rgba(233, 30, 129, 0.07);
  font-family: Georgia, serif;
  line-height: 1;
  pointer-events: none;
}

.review-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(233, 30, 129, 0.15);
}

.review-stars {
  font-size: 1rem;
  margin-bottom: 12px;
}

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

@media (max-width: 900px) {
  .reviews-grid { grid-template-columns: repeat(2, 1fr); }
  .reviews-section { margin: 0 30px 60px; padding: 40px 30px; }
}

@media (max-width: 600px) {
  .reviews-grid { grid-template-columns: 1fr; }
  .reviews-section { margin: 0 20px 50px; padding: 32px 20px; }
}

.extra-content {
  margin-top: 32px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}
.extra-content p {
  margin: 0;
  line-height: 1.6;
  color: #2D3E94;
}

</style>