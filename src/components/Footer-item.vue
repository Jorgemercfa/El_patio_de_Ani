<script setup>
import 'primeicons/primeicons.css';
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer-area">
    <div class="footer-wave">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" fill="#FDF6EC"/>
      </svg>
    </div>
    <div class="footer-container">
      <div class="contact-footer">
        <h4 class="titile-footer">Contacto</h4>
        <div class="footer-text">
          <div>elpatiodeani@gmail.com</div>
          <div>+51 975 495 623</div>
        </div>
      </div>
      <div class="links-footer">
        <h4 class="titile-footer">Enlaces</h4>
        <div class="footer-text">
          <div><router-link to="/Privacy-Policy" class="footer-text-2">Política de Privacidad</router-link></div>
          <div><router-link to="/Terms-of-Use" class="footer-text-2">Términos de Uso</router-link></div>
          <div><router-link to="/FAQ" class="footer-text-2">Preguntas Frecuentes</router-link></div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      © {{ year }} El Patio de Ani. Todos los derechos reservados.
    </div>
  </footer>
</template>

<style>
.footer-area {
  overflow: hidden;
  font-family: 'Nunito', sans-serif;
  background-color: #E91E81; /* SE MANTIENE TU VERDE */
  color: white;
  margin-top: 0;
  border-radius: 24px 24px 0 0;
}

.footer-wave {
  line-height: 0;
  background: #E91E81;
}

.footer-wave svg {
  width: 100%;
  height: 60px;
  display: block;
}

/* CONTENEDOR */
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 5%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

/* TÍTULOS */
.titile-footer {
  font-size: 1.1rem;
  margin-bottom: 15px;
  position: relative;
  font-weight: 600;
}

/* Línea decorativa (BLANCA para que combine con el verde) */
.titile-footer::after {
  content: '';
  width: 40px;
  height: 3px;
  background-color: #ffffff;
  position: absolute;
  bottom: -6px;
  left: 0;
  border-radius: 4px;
}

/* TEXTO */
.footer-text {
  font-size: 0.95rem;
  color: #e6e6e6;
  line-height: 1.6;
}

.footer-text-2 {
  color: #ffffff;
  text-decoration: none;
}

/* BARRA INFERIOR */
.footer-bottom {
  text-align: center;
  padding: 20px;
  font-size: 0.85rem;
  color: #cccccc;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .titile-footer::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-media2 {
    justify-content: center;
  }
}
</style>
