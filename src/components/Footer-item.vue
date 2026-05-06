<script setup>
import 'primeicons/primeicons.css';
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer-area">
    <div class="footer-container">
      <div class="contact-footer">
        <h4 class="titile-footer">Contacto</h4>
        <div class="footer-text">
          <div>elpatiodeani@gmail.com</div>
          <div>+51 975 495 623</div>
        </div>
      </div>
      <div class="social-media">
        <h4 class="titile-footer">Redes Sociales</h4>
        <div class="social-media2">
          <div>
            <a href="https://www.facebook.com/people/Alquiler-de-Juegos-Infantiles-El-Patio-de-Ani/100093147260858/?mibextid=wwXIfr&rdid=iwJ2cRP4IrJTbjBH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F181BsAKpcd%2F%3Fmibextid%3DwwXIfr"><i class="pi pi-facebook"></i></a>
          </div>
          <div>
            <a href="https://www.instagram.com/elpatiode.ani?igsh=MXExaW43dzV6cGpxcg=="><i class="pi pi-instagram"></i></a>
          </div>
          <div>
            <a href="https://www.tiktok.com/@elpatiode.ani"><i class="pi pi-tiktok"></i></a>
          </div>
          <div>
            <a href="https://wa.me/51975495623"><i class="pi pi-whatsapp"></i></a>
          </div>
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
  background-color: #E91E81; /* SE MANTIENE TU VERDE */
  color: white;
  margin-top: 100px;
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

/* ICONOS */
.social-media2 {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.social-media2 a,
.social-media2 i {
  font-size: 1.8rem;
  color: #e6e6e6;
  transition: 0.3s ease;
  cursor: pointer;
}

/* Hover elegante */
.social-media2 a:hover,
.social-media2 i:hover {
  color: #ffffff;
  transform: translateY(-3px);
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
