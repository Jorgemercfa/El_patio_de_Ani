<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar-item.vue'
import Footer from '@/components/Footer-item.vue'
import { useSession } from '@/auth/session'
import { getCompanyproducts } from '@/auth/companyproductsRepo'

const route = useRoute()
const { isAuthenticated, state: sessionState } = useSession()

// ── Product ──────────────────────────────────────────────
const products = computed(() => getCompanyproducts())
const product = computed(() =>
  products.value.find((p) => p.id === Number(route.query.id)),
)

const displayPrice = computed(() => {
  const p = product.value
  if (!p) return null
  const raw = p.price ?? p.discount_price ?? p.originalPrice ?? p.tributo
  const n = typeof raw === 'string' ? Number(raw) : raw
  return Number.isFinite(n) ? n : null
})

const inflableSize = computed(() => {
  const sub = (product.value?.subcategory || '').toLowerCase()
  if (sub.includes('bebé') || sub.includes('bebe') || sub.includes('baby') || sub.includes('pequeño') || sub.includes('peque')) return 'bebes'
  if (sub.includes('grande')) return 'grande'
  return 'mediano'
})

const isPremium = computed(() => (displayPrice.value ?? 0) > 600)

// ── Today date for min ────────────────────────────────────
// Note: recalculated on component mount; if a user keeps the page open past
// midnight the date may become stale until they reload.
const today = new Date().toISOString().split('T')[0]

// ── WhatsApp contact ──────────────────────────────────────
const WA_NUMBER = '51975495623'

// ── Form fields ──────────────────────────────────────────
const form = ref({
  name: sessionState.user?.name || '',
  address: '',
  district: '',
  eventDate: '',
  startTime: '',
  endTime: '',
  electricity: '',
  largo: '',
  ancho: '',
  floorType: '',
  childrenCount: '',
  ageRange: '',
  accessConfirmed: false,
  measureVisit: '',
  phone: '',
})

// sync name if user logs in after page loads
watch(
  () => sessionState.user,
  (u) => { if (u && !form.value.name) form.value.name = u.name || '' },
)

// ── Space dimension validation ────────────────────────────
const minDimensions = computed(() => {
  if (inflableSize.value === 'bebes') return { largo: 3, ancho: 3 }
  if (inflableSize.value === 'grande' || isPremium.value) return { largo: 8, ancho: 6 }
  return { largo: 5, ancho: 4 }
})

const spaceWarning = computed(() => {
  const l = Number(form.value.largo)
  const a = Number(form.value.ancho)
  if (!l || !a) return null
  const { largo: ml, ancho: ma } = minDimensions.value
  if (l < ml || a < ma) {
    return `⚠️ El espacio mínimo requerido para este inflable es ${ml}m × ${ma}m. Por favor verifica las dimensiones.`
  }
  return null
})

// ── Floor type info ───────────────────────────────────────
const floorNotes = {
  'Césped (Estacas)': '🌱 Se colocarán estacas en el suelo para sujetar el inflable.',
  'Cemento/Asfalto (Bolsas de arena)': '🏗️ Se utilizarán bolsas de arena para sujetar el inflable de forma segura.',
  'Tierra': '⛏️ Las estacas se fijarán directamente en la tierra.',
  'Interior': '🏠 Para interiores se utilizarán sujeciones especiales sin dañar el piso.',
}

const floorNote = computed(() => floorNotes[form.value.floorType] || null)

// ── Children info by size ─────────────────────────────────
const childrenInfo = computed(() => {
  if (inflableSize.value === 'bebes') return 'ℹ️ Este inflable está diseñado para bebés y niños pequeños (0-3 años). Capacidad recomendada: hasta 8 niños a la vez.'
  if (inflableSize.value === 'grande') return 'ℹ️ Inflable grande ideal para grupos grandes. Capacidad recomendada: hasta 20 niños a la vez.'
  return 'ℹ️ Inflable mediano ideal para 10-15 niños. Apto para niños de 3 a 12 años.'
})

// ── Submit / Validation ───────────────────────────────────
const submitAttempted = ref(false)
const showModal = ref(false)

const errors = computed(() => {
  const e = {}
  if (!form.value.name.trim()) e.name = 'El nombre es obligatorio.'
  if (!form.value.address.trim()) e.address = 'La dirección es obligatoria.'
  if (!form.value.district.trim()) e.district = 'El distrito es obligatorio.'
  if (!form.value.eventDate) e.eventDate = 'La fecha del evento es obligatoria.'
  if (!form.value.startTime) e.startTime = 'La hora de inicio es obligatoria.'
  if (!form.value.endTime) e.endTime = 'La hora de fin es obligatoria.'
  if (form.value.startTime && form.value.endTime && form.value.endTime <= form.value.startTime) {
    e.endTime = 'La hora de fin debe ser posterior a la hora de inicio.'
  }
  if (!form.value.electricity) e.electricity = 'Selecciona la opción de suministro eléctrico.'
  if (!form.value.largo || Number(form.value.largo) <= 0) e.largo = 'Ingresa el largo disponible.'
  if (!form.value.ancho || Number(form.value.ancho) <= 0) e.ancho = 'Ingresa el ancho disponible.'
  if (spaceWarning.value) e.space = spaceWarning.value
  if (!form.value.floorType) e.floorType = 'Selecciona el tipo de suelo.'
  if (!form.value.childrenCount || Number(form.value.childrenCount) < 1) e.childrenCount = 'Ingresa la cantidad estimada de niños.'
  if (!form.value.ageRange.trim()) e.ageRange = 'Ingresa el rango de edades.'
  if (!form.value.accessConfirmed) e.accessConfirmed = 'Debes confirmar que el acceso está libre de obstáculos.'
  if (isPremium.value && !form.value.measureVisit) e.measureVisit = 'Por favor indica si deseas coordinar la visita de medidas.'
  if (isPremium.value && form.value.measureVisit === 'si' && !form.value.phone.trim()) e.phone = 'Ingresa un teléfono de contacto.'
  return e
})

const isFormValid = computed(() => Object.keys(errors.value).length === 0)

function handleSubmit() {
  submitAttempted.value = true
  if (!isFormValid.value) return
  showModal.value = true
}

// ── WhatsApp message builder ──────────────────────────────
const whatsappMessage = computed(() => {
  const p = product.value
  const f = form.value
  let msg = `🎪 *RESERVA DE INFLABLE - El Patio de Ani*\n\n`
  if (p) msg += `🏷️ Servicio: ${p.name}\n`
  if (displayPrice.value) msg += `💰 Precio: S/ ${displayPrice.value.toFixed(2)}\n`
  msg += `\n📋 *Datos del evento:*\n`
  msg += `• Responsable: ${f.name}\n`
  msg += `• Dirección: ${f.address}\n`
  msg += `• Distrito: ${f.district}\n`
  msg += `• Fecha: ${f.eventDate}\n`
  msg += `• Horario: ${f.startTime} – ${f.endTime}\n`
  msg += `\n⚡ *Logística eléctrica:* ${f.electricity}\n`
  msg += `\n📐 *Dimensiones del espacio:* ${f.largo}m × ${f.ancho}m\n`
  msg += `\n🌱 *Tipo de suelo:* ${f.floorType}\n`
  msg += `\n👧 *Invitados:* ${f.childrenCount} niños, edades: ${f.ageRange}\n`
  if (isPremium.value && f.measureVisit) {
    msg += `\n📏 *Visita de medidas:* ${f.measureVisit === 'si' ? 'Sí, coordinar' : 'No necesaria'}\n`
    if (f.measureVisit === 'si' && f.phone) msg += `• Teléfono: ${f.phone}\n`
  }
  return encodeURIComponent(msg)
})

const whatsappUrl = computed(() => `https://wa.me/${WA_NUMBER}?text=${whatsappMessage.value}`)
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="reserva-page">
    <!-- HEADER -->
    <div class="reserva-header">
      <h1 class="reserva-title">
        <span>Reservar</span>
        {{ product?.name || 'Inflable' }}
      </h1>
      <p v-if="product" class="reserva-subtitle">
        {{ product.category }} · {{ product.subcategory }}
      </p>
      <div v-if="displayPrice" class="reserva-price">S/ {{ displayPrice.toFixed(2) }}</div>
    </div>

    <!-- NON-AUTHENTICATED: WhatsApp panel -->
    <div v-if="!isAuthenticated" class="reserva-card whatsapp-panel">
      <h2 class="whatsapp-panel__title">¿Eres nuevo con nosotros? 👋</h2>
      <p class="whatsapp-panel__text">
        Para tu primera reserva, contáctanos por WhatsApp y nuestro equipo te asesorará personalmente.
      </p>
      <a
        :href="`https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20reservar%20un%20inflable`"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-whatsapp"
      >
        💬 Contactar por WhatsApp
      </a>
      <div class="signin-link">
        ¿Ya eres cliente?
        <router-link to="/Sign-in">Inicia sesión para reservar directamente</router-link>
      </div>
    </div>

    <!-- AUTHENTICATED: Full form -->
    <form v-else class="reserva-card" @submit.prevent="handleSubmit" novalidate>

      <!-- SECTION 1: Event data -->
      <div class="form-section">
        <h2 class="section-header">1️⃣ Datos del evento</h2>
        <div class="section-divider"></div>
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Nombre del responsable</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Tu nombre completo"
              :class="{ 'input-error': submitAttempted && errors.name }"
            />
            <span v-if="submitAttempted && errors.name" class="error-msg">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="address">Dirección completa</label>
            <input
              id="address"
              v-model="form.address"
              type="text"
              placeholder="Calle, número, referencia"
              :class="{ 'input-error': submitAttempted && errors.address }"
            />
            <span v-if="submitAttempted && errors.address" class="error-msg">{{ errors.address }}</span>
          </div>

          <div class="form-group">
            <label for="district">Distrito</label>
            <input
              id="district"
              v-model="form.district"
              type="text"
              placeholder="Ej: Miraflores"
              :class="{ 'input-error': submitAttempted && errors.district }"
            />
            <span v-if="submitAttempted && errors.district" class="error-msg">{{ errors.district }}</span>
          </div>

          <div class="form-group">
            <label for="eventDate">Fecha del evento</label>
            <input
              id="eventDate"
              v-model="form.eventDate"
              type="date"
              :min="today"
              :class="{ 'input-error': submitAttempted && errors.eventDate }"
            />
            <span v-if="submitAttempted && errors.eventDate" class="error-msg">{{ errors.eventDate }}</span>
          </div>

          <div class="form-group">
            <label for="startTime">Hora de inicio</label>
            <input
              id="startTime"
              v-model="form.startTime"
              type="time"
              :class="{ 'input-error': submitAttempted && errors.startTime }"
            />
            <span v-if="submitAttempted && errors.startTime" class="error-msg">{{ errors.startTime }}</span>
          </div>

          <div class="form-group">
            <label for="endTime">Hora de fin</label>
            <input
              id="endTime"
              v-model="form.endTime"
              type="time"
              :class="{ 'input-error': submitAttempted && errors.endTime }"
            />
            <span v-if="submitAttempted && errors.endTime" class="error-msg">{{ errors.endTime }}</span>
          </div>
        </div>
      </div>

      <!-- SECTION 2: Electricity -->
      <div class="form-section">
        <h2 class="section-header">2️⃣ Logística eléctrica</h2>
        <div class="section-divider"></div>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" v-model="form.electricity" value="Sí, toma de corriente estable" />
            Sí, toma de corriente estable
          </label>
          <label class="radio-label">
            <input type="radio" v-model="form.electricity" value="Sí, grupo electrógeno" />
            Sí, grupo electrógeno
          </label>
          <label class="radio-label">
            <input type="radio" v-model="form.electricity" value="No cuento con suministro eléctrico" />
            No cuento con suministro eléctrico
          </label>
        </div>
        <span v-if="submitAttempted && errors.electricity" class="error-msg">{{ errors.electricity }}</span>
        <div v-if="form.electricity === 'No cuento con suministro eléctrico'" class="alert alert--warning">
          ⚠️ Los inflables requieren conexión eléctrica. Sin suministro no es posible instalar.
        </div>
      </div>

      <!-- SECTION 3: Space dimensions -->
      <div class="form-section">
        <h2 class="section-header">3️⃣ Dimensiones del espacio</h2>
        <div class="section-divider"></div>
        <p class="section-hint">
          Espacio mínimo requerido: <strong>{{ minDimensions.largo }}m × {{ minDimensions.ancho }}m</strong>
        </p>
        <div class="form-grid">
          <div class="form-group">
            <label for="largo">Largo (metros)</label>
            <input
              id="largo"
              v-model="form.largo"
              type="number"
              min="1"
              step="0.5"
              placeholder="Ej: 6"
              :class="{ 'input-error': submitAttempted && (errors.largo || errors.space) }"
            />
            <span v-if="submitAttempted && errors.largo" class="error-msg">{{ errors.largo }}</span>
          </div>
          <div class="form-group">
            <label for="ancho">Ancho (metros)</label>
            <input
              id="ancho"
              v-model="form.ancho"
              type="number"
              min="1"
              step="0.5"
              placeholder="Ej: 5"
              :class="{ 'input-error': submitAttempted && (errors.ancho || errors.space) }"
            />
            <span v-if="submitAttempted && errors.ancho" class="error-msg">{{ errors.ancho }}</span>
          </div>
        </div>
        <div v-if="spaceWarning" class="alert alert--error">{{ spaceWarning }}</div>
      </div>

      <!-- SECTION 4: Floor type -->
      <div class="form-section">
        <h2 class="section-header">4️⃣ Tipo de suelo</h2>
        <div class="section-divider"></div>
        <div class="form-group">
          <label for="floorType">Selecciona el tipo de suelo</label>
          <select
            id="floorType"
            v-model="form.floorType"
            :class="{ 'input-error': submitAttempted && errors.floorType }"
          >
            <option value="" disabled>-- Elige una opción --</option>
            <option>Césped (Estacas)</option>
            <option>Cemento/Asfalto (Bolsas de arena)</option>
            <option>Tierra</option>
            <option>Interior</option>
          </select>
          <span v-if="submitAttempted && errors.floorType" class="error-msg">{{ errors.floorType }}</span>
        </div>
        <div v-if="floorNote" class="alert alert--info">{{ floorNote }}</div>
      </div>

      <!-- SECTION 5: Guest details -->
      <div class="form-section">
        <h2 class="section-header">5️⃣ Detalles de los invitados</h2>
        <div class="section-divider"></div>
        <div class="form-grid">
          <div class="form-group">
            <label for="childrenCount">Cantidad estimada de niños</label>
            <input
              id="childrenCount"
              v-model="form.childrenCount"
              type="number"
              min="1"
              max="200"
              placeholder="Ej: 15"
              :class="{ 'input-error': submitAttempted && errors.childrenCount }"
            />
            <span v-if="submitAttempted && errors.childrenCount" class="error-msg">{{ errors.childrenCount }}</span>
          </div>
          <div class="form-group">
            <label for="ageRange">Rango de edades</label>
            <input
              id="ageRange"
              v-model="form.ageRange"
              type="text"
              placeholder="ej: 3-8 años"
              :class="{ 'input-error': submitAttempted && errors.ageRange }"
            />
            <span v-if="submitAttempted && errors.ageRange" class="error-msg">{{ errors.ageRange }}</span>
          </div>
        </div>
        <div class="alert alert--info">{{ childrenInfo }}</div>
      </div>

      <!-- SECTION 6: Access route -->
      <div class="form-section">
        <h2 class="section-header">6️⃣ Ruta de acceso</h2>
        <div class="section-divider"></div>
        <label class="checkbox-label">
          <input type="checkbox" v-model="form.accessConfirmed" />
          Confirmo que el acceso está libre de escaleras y obstáculos
        </label>
        <span v-if="submitAttempted && errors.accessConfirmed" class="error-msg block-error">{{ errors.accessConfirmed }}</span>
      </div>

      <!-- SECTION 7: Measurement visit (only if premium) -->
      <div v-if="isPremium" class="form-section">
        <h2 class="section-header">7️⃣ Visita de medidas</h2>
        <div class="section-divider"></div>
        <div class="alert alert--info">
          📏 Para inflables premium (S/600+) ofrecemos visita de medidas sin costo
        </div>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" v-model="form.measureVisit" value="si" />
            Sí, coordinar visita
          </label>
          <label class="radio-label">
            <input type="radio" v-model="form.measureVisit" value="no" />
            No, confirmo espacio suficiente
          </label>
        </div>
        <span v-if="submitAttempted && errors.measureVisit" class="error-msg">{{ errors.measureVisit }}</span>
        <div v-if="form.measureVisit === 'si'" class="form-group" style="margin-top:12px">
          <label for="phone">Teléfono de contacto</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="Ej: 987 654 321"
            :class="{ 'input-error': submitAttempted && errors.phone }"
          />
          <span v-if="submitAttempted && errors.phone" class="error-msg">{{ errors.phone }}</span>
        </div>
      </div>

      <!-- Submit button -->
      <button type="submit" class="btn-submit">
        ✅ Confirmar Reserva
      </button>

    </form>

    <!-- CONFIRMATION MODAL -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <h2 class="modal__title">🎉 ¡Reserva confirmada!</h2>
        <p class="modal__text">
          Gracias <strong>{{ form.name }}</strong>, tu reserva ha sido registrada. Haz clic en el botón de abajo para enviar los detalles por WhatsApp y coordinar los últimos detalles.
        </p>
        <div class="modal__summary">
          <p><strong>Servicio:</strong> {{ product?.name }}</p>
          <p><strong>Fecha:</strong> {{ form.eventDate }}</p>
          <p><strong>Horario:</strong> {{ form.startTime }} – {{ form.endTime }}</p>
          <p><strong>Dirección:</strong> {{ form.address }}, {{ form.district }}</p>
          <p><strong>Invitados:</strong> {{ form.childrenCount }} niños ({{ form.ageRange }})</p>
        </div>
        <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
          💬 Enviar detalles por WhatsApp
        </a>
        <button class="modal__close" @click="showModal = false">Cerrar</button>
      </div>
    </div>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.reserva-page {
  min-height: 100vh;
  background: #f4f6f3;
  padding: 40px 16px 60px;
  font-family: Outfit, Inter, Avenir, Helvetica, Arial, sans-serif;
}

/* HEADER */
.reserva-header {
  max-width: 800px;
  margin: 0 auto 30px;
  text-align: center;
}

.reserva-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
  display: inline-block;
}

.reserva-subtitle {
  font-size: 0.95rem;
  color: #2D3E94;
  opacity: 0.7;
  margin-bottom: 8px;
}

.reserva-price {
  font-size: 1.6rem;
  font-weight: 800;
  color: #E91E81;
}

/* CARD */
.reserva-card {
  max-width: 800px;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 32px 28px;
  box-shadow: 0 8px 30px rgba(45, 62, 148, 0.08);
}

/* FORM SECTIONS */
.form-section {
  margin-bottom: 32px;
}

.section-header {
  font-size: 1.15rem;
  font-weight: 700;
  color: #2D3E94;
  margin-bottom: 8px;
}

.section-divider {
  height: 2px;
  background: linear-gradient(90deg, #E91E81, #2D3E94);
  border-radius: 2px;
  margin-bottom: 18px;
}

.section-hint {
  font-size: 0.9rem;
  color: #2D3E94;
  margin-bottom: 12px;
  opacity: 0.8;
}

/* GRID */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* FORM GROUPS */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2D3E94;
}

.form-group input,
.form-group select {
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  background: #fff;
  color: #333;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #E91E81;
}

.input-error {
  border-color: #E91E81 !important;
}

/* RADIO / CHECKBOX */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;
}

.radio-label input,
.checkbox-label input {
  accent-color: #E91E81;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* ALERTS */
.alert {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  margin-top: 12px;
  line-height: 1.5;
}

.alert--warning {
  background: #fffbea;
  border: 1px solid #FFD200;
  color: #7a5f00;
}

.alert--error {
  background: #fff0f5;
  border: 1px solid #E91E81;
  color: #a0003a;
}

.alert--info {
  background: #f0f4ff;
  border: 1px solid #2D3E94;
  color: #1a2560;
}

/* ERROR MESSAGES */
.error-msg {
  font-size: 0.8rem;
  color: #E91E81;
  margin-top: 2px;
}

.block-error {
  display: block;
  margin-top: 6px;
}

/* SUBMIT BUTTON */
.btn-submit {
  width: 100%;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  padding: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 210, 0, 0.5);
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 8px;
}

.btn-submit:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 28px rgba(255, 210, 0, 0.7);
}

/* WHATSAPP BUTTON */
.btn-whatsapp {
  display: inline-block;
  width: 100%;
  background: #25D366;
  color: #FFFFFF;
  border: none;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
  margin-top: 12px;
  box-sizing: border-box;
}

.btn-whatsapp:hover {
  background: #1ebe57;
  transform: scale(1.02);
}

/* WHATSAPP PANEL */
.whatsapp-panel {
  text-align: center;
}

.whatsapp-panel__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2D3E94;
  margin-bottom: 12px;
}

.whatsapp-panel__text {
  font-size: 1rem;
  color: #444;
  margin-bottom: 4px;
  line-height: 1.6;
}

.signin-link {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
}

.signin-link a {
  color: #2D3E94;
  font-weight: 600;
  text-decoration: underline;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 32px 28px;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal__title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2D3E94;
  margin-bottom: 12px;
}

.modal__text {
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 20px;
  line-height: 1.6;
}

.modal__summary {
  background: #f0f4ff;
  border: 1px solid #2D3E94;
  border-radius: 10px;
  padding: 14px 18px;
  text-align: left;
  font-size: 0.9rem;
  color: #1a2560;
  margin-bottom: 16px;
}

.modal__summary p {
  margin: 4px 0;
}

.modal__close {
  display: block;
  width: 100%;
  margin-top: 12px;
  background: none;
  border: 2px solid #e0e0e0;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  color: #666;
  transition: border-color 0.2s;
}

.modal__close:hover {
  border-color: #E91E81;
  color: #E91E81;
}
</style>
