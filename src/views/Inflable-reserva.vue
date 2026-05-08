<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '@/components/Navbar-item.vue'
import Footer from '@/components/Footer-item.vue'
import { useSession } from '@/auth/session'
import { getCompanyproducts } from '@/auth/companyproductsRepo'

const route = useRoute()
const router = useRouter()
const { isAuthenticated, state } = useSession()

const WA_NUMBER = '51975495623'

const products = computed(() => getCompanyproducts())
const product = computed(() => {
  const id = Number(route.query.id)
  return products.value.find((p) => p.id === id) || null
})

// Form fields
const nombre = ref(state.user?.name || '')
const direccion = ref('')
const distrito = ref('')
const fecha = ref('')
const horaInicio = ref('')
const horaFin = ref('')
const electricidad = ref('')
const largo = ref('')
const ancho = ref('')
const suelo = ref('')
const cantidadNinos = ref('')
const rangoEdades = ref('')
const accesoLibre = ref(false)
const visitaMedidas = ref('')
const telefono = ref('')

const showModal = ref(false)
const submitAttempted = ref(false)

// Computed: inflable size
const inflableSize = computed(() => {
  const s = (product.value?.subcategory || '').toLowerCase()
  if (s.includes('bebé') || s.includes('bebe') || s.includes('baby') || s.includes('pequeño')) return 'bebes'
  if (s.includes('grande')) return 'grande'
  return 'mediano'
})

// Computed: requires measure visit if price > 600
const requiresMeasureVisit = computed(() => {
  const rawPrice = product.value?.price ?? product.value?.discount_price ?? product.value?.originalPrice
  const price = typeof rawPrice === 'string' ? Number(rawPrice) : rawPrice
  return Number.isFinite(price) && price > 600
})

const noElectricity = computed(() => electricidad.value === 'ninguna')

const spaceDimMinimums = computed(() => {
  if (inflableSize.value === 'bebes') return { l: 3, w: 3 }
  if (inflableSize.value === 'grande') return { l: 8, w: 6 }
  return { l: 5, w: 4 }
})

const spaceTooSmall = computed(() => {
  const l = Number(largo.value)
  const w = Number(ancho.value)
  if (!largo.value || !ancho.value) return false
  const min = spaceDimMinimums.value
  return l < min.l || w < min.w
})

const today = computed(() => new Date().toISOString().split('T')[0])

function submitForm() {
  submitAttempted.value = true

  // Basic required fields
  if (!nombre.value || !direccion.value || !distrito.value || !fecha.value || !electricidad.value) return

  // Access required
  if (!accesoLibre.value) return

  // Block if no electricity
  if (noElectricity.value) return

  // Space too small: warn but allow with confirmation
  if (spaceTooSmall.value) {
    const ok = confirm(
      `⚠️ Las dimensiones ingresadas (${largo.value}m x ${ancho.value}m) son menores a las recomendadas para un inflable ${inflableSize.value === 'bebes' ? 'de bebés' : inflableSize.value} (mínimo ${spaceDimMinimums.value.l}m x ${spaceDimMinimums.value.w}m). ¿Deseas continuar de todas formas?`
    )
    if (!ok) return
  }

  showModal.value = true
}

function sendWhatsApp() {
  const sizeLabel = inflableSize.value === 'bebes' ? '👶 Bebés' : inflableSize.value === 'grande' ? '🏰 Grande' : '🎪 Mediano'
  const productName = product.value?.name || 'Inflable'
  const lines = [
    `🎪 *RESERVA DE INFLABLE - El Patio de Ani*`,
    ``,
    `📦 *Producto:* ${productName} (${sizeLabel})`,
    ``,
    `📅 *DATOS DEL EVENTO*`,
    `• Nombre: ${nombre.value}`,
    `• Dirección: ${direccion.value}`,
    `• Distrito: ${distrito.value}`,
    `• Fecha: ${fecha.value}`,
    `• Horario: ${horaInicio.value} - ${horaFin.value}`,
    ``,
    `⚡ *LOGÍSTICA ELÉCTRICA*`,
    `• Electricidad: ${electricidad.value === 'corriente' ? 'Toma de corriente' : electricidad.value === 'generador' ? 'Generador eléctrico' : 'Sin electricidad'}`,
    ``,
    `📐 *DIMENSIONES DEL ESPACIO*`,
    `• Largo: ${largo.value}m | Ancho: ${ancho.value}m`,
    `• Mínimo requerido: ${spaceDimMinimums.value.l}m x ${spaceDimMinimums.value.w}m`,
    ``,
    `🌱 *TIPO DE SUELO*`,
    `• ${suelo.value}`,
    ``,
    `👧 *DETALLES DE INVITADOS*`,
    `• Cantidad de niños: ${cantidadNinos.value}`,
    `• Rango de edades: ${rangoEdades.value}`,
    ``,
    `🚪 *RUTA DE ACCESO*`,
    `• Acceso libre de obstáculos: ${accesoLibre.value ? 'Sí ✅' : 'No ❌'}`,
  ]

  if (requiresMeasureVisit.value) {
    lines.push(``)
    lines.push(`📏 *TOMA DE MEDIDAS*`)
    lines.push(`• Visita para toma de medidas: ${visitaMedidas.value === 'si' ? 'Sí, acepto' : 'No necesito'}`)
    if (visitaMedidas.value === 'si' && telefono.value) {
      lines.push(`• Teléfono de contacto: ${telefono.value}`)
    }
  }

  const message = lines.join('\n')
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="reserva-main">

    <!-- NOT AUTHENTICATED -->
    <div v-if="!isAuthenticated" class="auth-card">
      <div class="auth-card-inner">
        <div class="auth-icon">🎪</div>
        <h2 class="auth-title">¿Eres nuevo con nosotros? 👋</h2>
        <p class="auth-desc">
          Para reservar directamente necesitas iniciar sesión. Si prefieres, puedes consultarnos por WhatsApp y te ayudamos a elegir el inflable perfecto para tu evento.
        </p>
        <a
          class="btn-whatsapp"
          :href="`https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20reservar%20un%20inflable%20para%20mi%20evento`"
          target="_blank"
          rel="noopener"
        >
          💬 Consultar por WhatsApp
        </a>
        <button class="btn-signin" @click="router.push({ name: 'SignIn' })">
          🔑 Iniciar sesión para reservar
        </button>
      </div>
    </div>

    <!-- AUTHENTICATED: FULL FORM -->
    <div v-else class="form-card">
      <div class="form-header">
        <h1 class="form-title">📋 Reservar Inflable</h1>
        <p class="form-subtitle" v-if="product">
          <strong>{{ product.name }}</strong>
        </p>
      </div>

      <form @submit.prevent="submitForm" novalidate>

        <!-- SECTION 1: Datos del evento -->
        <div class="form-section">
          <div class="section-header">
            <span class="section-number">1</span>
            <span class="section-title">📅 Datos del evento</span>
          </div>
          <div class="form-grid">
            <div class="field full">
              <label class="field-label">Nombre completo *</label>
              <input
                v-model="nombre"
                type="text"
                class="field-input"
                :class="{ 'field-error': submitAttempted && !nombre }"
                placeholder="Tu nombre completo"
              />
              <span v-if="submitAttempted && !nombre" class="error-msg">Este campo es requerido</span>
            </div>
            <div class="field full">
              <label class="field-label">Dirección del evento *</label>
              <input
                v-model="direccion"
                type="text"
                class="field-input"
                :class="{ 'field-error': submitAttempted && !direccion }"
                placeholder="Av. / Calle, número, referencia"
              />
              <span v-if="submitAttempted && !direccion" class="error-msg">Este campo es requerido</span>
            </div>
            <div class="field">
              <label class="field-label">Distrito *</label>
              <input
                v-model="distrito"
                type="text"
                class="field-input"
                :class="{ 'field-error': submitAttempted && !distrito }"
                placeholder="Ej: Miraflores"
              />
              <span v-if="submitAttempted && !distrito" class="error-msg">Requerido</span>
            </div>
            <div class="field">
              <label class="field-label">Fecha del evento *</label>
              <input
                v-model="fecha"
                type="date"
                class="field-input"
                :class="{ 'field-error': submitAttempted && !fecha }"
                :min="today"
              />
              <span v-if="submitAttempted && !fecha" class="error-msg">Requerido</span>
            </div>
            <div class="field">
              <label class="field-label">Hora de inicio</label>
              <input v-model="horaInicio" type="time" class="field-input" />
            </div>
            <div class="field">
              <label class="field-label">Hora de fin</label>
              <input v-model="horaFin" type="time" class="field-input" />
            </div>
          </div>
        </div>

        <hr class="section-divider" />

        <!-- SECTION 2: Logística eléctrica -->
        <div class="form-section">
          <div class="section-header">
            <span class="section-number">2</span>
            <span class="section-title">⚡ Logística eléctrica</span>
          </div>
          <p class="section-desc">¿Cuenta con sistema eléctrico a menos de 15 metros del área de instalación?</p>
          <div class="radio-group">
            <label class="radio-label">
              <input v-model="electricidad" type="radio" value="corriente" />
              <span>Toma de corriente estable</span>
            </label>
            <label class="radio-label">
              <input v-model="electricidad" type="radio" value="generador" />
              <span>Generador eléctrico</span>
            </label>
            <label class="radio-label">
              <input v-model="electricidad" type="radio" value="ninguna" />
              <span>No cuento con electricidad</span>
            </label>
          </div>
          <span v-if="submitAttempted && !electricidad" class="error-msg">Selecciona una opción</span>
          <div v-if="noElectricity" class="warning-banner">
            ⚠️ <strong>Atención:</strong> El inflable requiere electricidad para funcionar. Por favor coordina una fuente de energía o contáctanos para asistencia.
            <br />
            <span v-if="submitAttempted && noElectricity" class="error-msg">No es posible reservar sin electricidad. Contáctanos por WhatsApp.</span>
          </div>
        </div>

        <hr class="section-divider" />

        <!-- SECTION 3: Dimensiones del espacio -->
        <div class="form-section">
          <div class="section-header">
            <span class="section-number">3</span>
            <span class="section-title">📐 Dimensiones del espacio</span>
          </div>
          <div class="info-banner">
            ℹ️ Mínimo requerido para inflable
            <strong>
              <template v-if="inflableSize === 'bebes'">👶 Bebés</template>
              <template v-else-if="inflableSize === 'grande'">🏰 Grande</template>
              <template v-else>🎪 Mediano</template>
            </strong>:
            <strong>{{ spaceDimMinimums.l }}m x {{ spaceDimMinimums.w }}m</strong>
          </div>
          <div class="form-grid">
            <div class="field">
              <label class="field-label">Largo disponible (metros)</label>
              <input
                v-model="largo"
                type="number"
                min="1"
                step="0.5"
                class="field-input"
                :class="{ 'field-error': spaceTooSmall }"
                placeholder="Ej: 6"
              />
            </div>
            <div class="field">
              <label class="field-label">Ancho disponible (metros)</label>
              <input
                v-model="ancho"
                type="number"
                min="1"
                step="0.5"
                class="field-input"
                :class="{ 'field-error': spaceTooSmall }"
                placeholder="Ej: 5"
              />
            </div>
          </div>
          <div v-if="spaceTooSmall" class="error-banner">
            ❌ El espacio ingresado ({{ largo }}m x {{ ancho }}m) es menor al mínimo recomendado ({{ spaceDimMinimums.l }}m x {{ spaceDimMinimums.w }}m). Podría afectar la instalación.
          </div>
        </div>

        <hr class="section-divider" />

        <!-- SECTION 4: Tipo de suelo -->
        <div class="form-section">
          <div class="section-header">
            <span class="section-number">4</span>
            <span class="section-title">🌱 Tipo de suelo</span>
          </div>
          <div class="field">
            <label class="field-label">Selecciona el tipo de suelo</label>
            <select v-model="suelo" class="field-input">
              <option value="" disabled>-- Seleccionar --</option>
              <option value="cesped">Césped (se fija con estacas)</option>
              <option value="cemento">Cemento / Asfalto (se fija con bolsas de arena)</option>
              <option value="tierra">Tierra</option>
              <option value="interior">Interior (piso liso)</option>
            </select>
          </div>
          <div class="info-banner" v-if="suelo">
            <template v-if="suelo === 'cesped'">🌿 Para césped utilizamos estacas de anclaje incluidas en el servicio.</template>
            <template v-else-if="suelo === 'cemento'">🏗️ Para cemento/asfalto usamos bolsas de arena como lastre (incluidas).</template>
            <template v-else-if="suelo === 'tierra'">🪨 El suelo de tierra puede requerir preparación previa. Te contactaremos para coordinarlo.</template>
            <template v-else-if="suelo === 'interior'">🏠 Para espacios interiores el inflable no usa anclajes; verifica que haya suficiente altura.</template>
          </div>
        </div>

        <hr class="section-divider" />

        <!-- SECTION 5: Detalles de invitados -->
        <div class="form-section">
          <div class="section-header">
            <span class="section-number">5</span>
            <span class="section-title">👧 Detalles de invitados</span>
          </div>
          <div class="info-banner">
            <template v-if="inflableSize === 'bebes'">👶 Inflable para bebés — recomendado para niños de 1 a 4 años.</template>
            <template v-else-if="inflableSize === 'grande'">🏰 Inflable grande — apto para niños de 4 a 12 años, mayor capacidad.</template>
            <template v-else>🎪 Inflable mediano — recomendado para niños de 3 a 10 años.</template>
          </div>
          <div class="form-grid">
            <div class="field">
              <label class="field-label">Cantidad estimada de niños</label>
              <input
                v-model="cantidadNinos"
                type="number"
                min="1"
                class="field-input"
                placeholder="Ej: 20"
              />
            </div>
            <div class="field">
              <label class="field-label">Rango de edades</label>
              <input
                v-model="rangoEdades"
                type="text"
                class="field-input"
                placeholder="Ej: 3-8 años"
              />
            </div>
          </div>
        </div>

        <hr class="section-divider" />

        <!-- SECTION 6: Ruta de acceso -->
        <div class="form-section">
          <div class="section-header">
            <span class="section-number">6</span>
            <span class="section-title">🚪 Ruta de acceso</span>
          </div>
          <label class="checkbox-label" :class="{ 'checkbox-error': submitAttempted && !accesoLibre }">
            <input v-model="accesoLibre" type="checkbox" />
            <span>El camino hacia el área de instalación está libre de escaleras o pasos estrechos que impidan el ingreso del inflable.</span>
          </label>
          <div v-if="submitAttempted && !accesoLibre" class="error-banner">
            ❌ Debes confirmar que el acceso al área está libre de obstáculos para continuar.
          </div>
        </div>

        <!-- SECTION 7: Toma de medidas (only if price > 600) -->
        <template v-if="requiresMeasureVisit">
          <hr class="section-divider" />
          <div class="form-section">
            <div class="section-header">
              <span class="section-number">7</span>
              <span class="section-title">📏 Toma de medidas</span>
            </div>
            <div class="info-banner">
              📌 Para inflables de alto valor (S/ 600+) ofrecemos una <strong>visita previa de toma de medidas</strong> sin costo adicional para garantizar que el inflable encaje perfectamente en tu espacio.
            </div>
            <div class="radio-group">
              <label class="radio-label">
                <input v-model="visitaMedidas" type="radio" value="si" />
                <span>Sí, acepto la visita previa de toma de medidas</span>
              </label>
              <label class="radio-label">
                <input v-model="visitaMedidas" type="radio" value="no" />
                <span>No, conozco bien mis dimensiones</span>
              </label>
            </div>
            <div v-if="visitaMedidas === 'si'" class="field" style="margin-top: 16px;">
              <label class="field-label">Teléfono de contacto para coordinar la visita</label>
              <input
                v-model="telefono"
                type="tel"
                class="field-input"
                placeholder="Ej: 999 888 777"
              />
            </div>
          </div>
        </template>

        <hr class="section-divider" />

        <button type="submit" class="submit-btn">
          🎪 Confirmar reserva
        </button>

      </form>
    </div>

    <!-- MODAL CONFIRMATION -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-card">
        <h3 class="modal-title">✅ ¡Reserva lista para enviar!</h3>
        <p class="modal-desc">
          Haz clic en el botón de abajo para enviar todos los detalles de tu reserva por WhatsApp. Nuestro equipo confirmará la disponibilidad y te responderá en menos de 2 horas.
        </p>
        <div class="modal-summary">
          <p><strong>📦 Inflable:</strong> {{ product?.name }}</p>
          <p><strong>📅 Fecha:</strong> {{ fecha }}</p>
          <p><strong>📍 Lugar:</strong> {{ direccion }}, {{ distrito }}</p>
          <p><strong>⏰ Horario:</strong> {{ horaInicio }} - {{ horaFin }}</p>
        </div>
        <button class="btn-whatsapp" @click="sendWhatsApp">
          💬 Enviar por WhatsApp
        </button>
        <button class="btn-close-modal" @click="showModal = false">
          Cerrar
        </button>
      </div>
    </div>

  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.reserva-main {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px 60px;
  font-family: Outfit, Inter, Avenir, Helvetica, Arial, sans-serif;
}

/* --- NOT AUTH CARD --- */
.auth-card {
  display: flex;
  justify-content: center;
}

.auth-card-inner {
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(45, 62, 148, 0.1);
  padding: 48px 40px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auth-icon {
  font-size: 3rem;
}

.auth-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2D3E94;
}

.auth-desc {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

/* --- FORM CARD --- */
.form-card {
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(45, 62, 148, 0.1);
  padding: 40px 36px;
}

.form-header {
  text-align: center;
  margin-bottom: 36px;
}

.form-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(90deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-subtitle {
  color: #555;
  margin-top: 6px;
  font-size: 1rem;
}

/* --- SECTIONS --- */
.form-section {
  margin-bottom: 8px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.section-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #2D3E94;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2D3E94;
}

.section-desc {
  color: #555;
  margin-bottom: 14px;
  font-size: 0.95rem;
}

.section-divider {
  border: none;
  border-top: 2px solid rgba(233, 30, 129, 0.2);
  margin: 28px 0;
}

/* --- FORM GRID --- */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .form-card {
    padding: 24px 16px;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field.full {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2D3E94;
}

.field-input {
  padding: 10px 14px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  background: #fafafa;
}

.field-input:focus {
  border-color: #E91E81;
  background: #fff;
}

.field-input.field-error {
  border-color: #E91E81;
  background: #fff0f5;
}

/* --- RADIO / CHECKBOX --- */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;
}

.radio-label input[type="radio"] {
  margin-top: 2px;
  accent-color: #E91E81;
  flex-shrink: 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;
  padding: 14px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
}

.checkbox-label.checkbox-error {
  border-color: #E91E81;
  background: #fff0f5;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 2px;
  accent-color: #E91E81;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

/* --- BANNERS --- */
.warning-banner {
  background: #fffbea;
  border: 2px solid #FFD200;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.9rem;
  color: #664d00;
  margin-top: 14px;
}

.error-banner {
  background: #fff0f5;
  border: 2px solid #E91E81;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.9rem;
  color: #a0003a;
  margin-top: 12px;
}

.info-banner {
  background: #f0f4ff;
  border: 2px solid #2D3E94;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.9rem;
  color: #1a2a70;
  margin-bottom: 16px;
}

/* --- ERROR MESSAGES --- */
.error-msg {
  font-size: 0.8rem;
  color: #E91E81;
  font-weight: 600;
}

/* --- SUBMIT BUTTON --- */
.submit-btn {
  width: 100%;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  padding: 16px;
  font-size: 1.1rem;
  font-weight: 800;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 210, 0, 0.4);
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 8px;
}

.submit-btn:hover {
  background-color: #e6bd00;
  transform: scale(1.02);
}

/* --- BUTTONS --- */
.btn-whatsapp {
  display: block;
  width: 100%;
  background: #25D366;
  color: #FFFFFF;
  border: none;
  padding: 14px 20px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-whatsapp:hover {
  background-color: #1ebe5c;
  transform: scale(1.02);
}

.btn-signin {
  width: 100%;
  background: #2D3E94;
  color: #FFFFFF;
  border: none;
  padding: 14px 20px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-signin:hover {
  background: #1a2a6e;
  transform: scale(1.02);
}

/* --- MODAL --- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 40px 32px;
  max-width: 520px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2D3E94;
}

.modal-desc {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
}

.modal-summary {
  background: #f0f4ff;
  border-radius: 10px;
  padding: 16px;
  text-align: left;
  font-size: 0.9rem;
  color: #2D3E94;
  line-height: 1.8;
}

.btn-close-modal {
  background: none;
  border: 2px solid #e0e0e0;
  color: #888;
  padding: 10px 20px;
  font-size: 0.9rem;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.btn-close-modal:hover {
  border-color: #E91E81;
  color: #E91E81;
}
</style>
