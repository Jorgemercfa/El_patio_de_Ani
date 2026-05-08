<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  distrito: '',
  tipoEvento: '',
  fecha: '',
  comentarios: '',
});

function sendWhatsApp() {
  if (!form.value.nombre || !form.value.telefono || !form.value.distrito) {
    alert('Por favor completa los campos obligatorios: Nombre, Teléfono y Distrito.');
    return;
  }
  const phone = '51975495623';
  const message =
    `¡Hola! Solicito una cotización 🎉\n\n` +
    `👤 Nombre: ${form.value.nombre}\n` +
    `📧 Email: ${form.value.email || 'No indicado'}\n` +
    `📱 Teléfono: ${form.value.telefono}\n` +
    `📍 Distrito: ${form.value.distrito}\n` +
    `🎉 Tipo de evento: ${form.value.tipoEvento || 'Por definir'}\n` +
    `📅 Fecha: ${form.value.fecha || 'Por definir'}\n` +
    `💬 Comentarios: ${form.value.comentarios || 'Sin comentarios adicionales'}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="contact-section">
      <div class="contact-container">
        <div class="contact-badge">¡ESCRÍBENOS HOY!</div>
        <h1 class="main-title">Solicita tu Cotización 📋</h1>
        <p class="main-subtitle">
          ¡Hagamos tu fiesta especial! 🎉 Completa el formulario y te contactamos sin compromiso.
          Respondemos por WhatsApp.
        </p>

        <div class="contact-card">
          <!-- FORMULARIO -->
          <div class="form-area">
            <div class="form-row">
              <div class="form-group">
                <label>Nombre Completo <span class="required">*</span></label>
                <input v-model="form.nombre" type="text" placeholder="Tu nombre completo" required />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="form.email" type="email" placeholder="tucorreo@email.com" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Teléfono / WhatsApp <span class="required">*</span></label>
                <input v-model="form.telefono" type="tel" placeholder="999 000 000" required />
              </div>
              <div class="form-group">
                <label>Distrito del Evento <span class="required">*</span></label>
                <input v-model="form.distrito" type="text" placeholder="Ej: Miraflores, Surco..." required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Tipo de Evento</label>
                <select v-model="form.tipoEvento">
                  <option value="">Selecciona...</option>
                  <option>Cumpleaños</option>
                  <option>Bautizo</option>
                  <option>Aniversario</option>
                  <option>Evento Corporativo</option>
                  <option>Otro</option>
                </select>
              </div>
              <div class="form-group">
                <label>Fecha del Evento</label>
                <input v-model="form.fecha" type="date" />
              </div>
            </div>

            <div class="form-group">
              <label>Comentarios / Servicios de Interés</label>
              <textarea
                v-model="form.comentarios"
                rows="4"
                placeholder="Cuéntanos qué servicios necesitas: shows, inflables, snacks..."
              ></textarea>
            </div>

            <button class="whatsapp-btn" @click="sendWhatsApp">
              <i class="pi pi-whatsapp"></i>
              Enviar por WhatsApp
            </button>
          </div>

          <!-- INFORMACIÓN -->
          <div class="contact-info">
            <h2>¿Cómo nos contactas?</h2>

            <div class="info-item">
              <span class="info-icon whatsapp-icon">📱</span>
              <div>
                <p class="info-label">WhatsApp Principal</p>
                <a href="https://wa.me/51975495623" target="_blank" class="info-link">
                  +51 975 495 623
                </a>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon whatsapp-icon">📱</span>
              <div>
                <p class="info-label">WhatsApp Alternativo</p>
                <a href="https://wa.me/51959181191" target="_blank" class="info-link">
                  +51 959 181 191
                </a>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">✉️</span>
              <div>
                <p class="info-label">Correo</p>
                <p class="info-value">elpatiodeani@gmail.com</p>
              </div>
            </div>

            <div class="response-badge">
              🟢 ¡Respondemos en menos de 2 horas durante horario de atención!
            </div>
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
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f3;
}

.contact-section {
  flex: 1;
  padding: 100px 0 80px 0;
}

.contact-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
  text-align: center;
}

.contact-badge {
  display: inline-block;
  background: linear-gradient(135deg, #E91E81, #FF6B6B);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 6px 18px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.main-title {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 12px;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.main-subtitle {
  font-size: 1rem;
  color: #666;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.contact-card {
  display: flex;
  gap: 40px;
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
  text-align: left;
}

.form-area {
  flex: 2;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #2D3E94;
  font-size: 0.9rem;
}

.required {
  color: #E91E81;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1.5px solid #ddd;
  font-size: 14px;
  transition: 0.3s ease;
  background: #fafafa;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #E91E81;
  background: white;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.1);
}

.whatsapp-btn {
  margin-top: 6px;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
}

.whatsapp-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.45);
}

.whatsapp-btn .pi {
  font-size: 1.2rem;
  color: white;
}

/* PANEL DERECHO INFO */
.contact-info {
  flex: 1;
  min-width: 240px;
  background: #2D3E94;
  border-radius: 16px;
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  color: white;
}

.contact-info h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #FFD200;
  margin: 0 0 8px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.info-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.info-label {
  font-size: 0.78rem;
  opacity: 0.75;
  margin: 0 0 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-link {
  color: #25D366;
  font-weight: 700;
  text-decoration: none;
  font-size: 1rem;
}

.info-link:hover {
  text-decoration: underline;
}

.info-value {
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  margin: 0;
}

.response-badge {
  background: rgba(37, 211, 102, 0.15);
  border: 1px solid rgba(37, 211, 102, 0.4);
  border-radius: 10px;
  padding: 14px;
  font-size: 0.88rem;
  line-height: 1.5;
  color: #a8f0c8;
  margin-top: auto;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .contact-card {
    flex-direction: column;
    padding: 30px;
  }

  .form-row {
    flex-direction: column;
  }
}
</style>
