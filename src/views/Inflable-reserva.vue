<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar-item.vue'
import Footer from '@/components/Footer-item.vue'
import { useSession } from '@/auth/session'
import { getCompanyproducts } from '@/auth/companyproductsRepo'

const route = useRoute()
const { isAuthenticated, state } = useSession()

const products = computed(() => getCompanyproducts())
const product = computed(() =>
  products.value.find((p) => p.id === Number(route.query.id)),
)

// Minimum dimensions per inflable size (in meters)
const MIN_DIMS = {
  bebes: { largo: 3, ancho: 3 },
  mediano: { largo: 5, ancho: 4 },
  grande: { largo: 8, ancho: 6 },
}

// ─── Computed: inflable size ───────────────────────────────────────────────
const inflableSize = computed(() => {
  const sub = (product.value?.subcategory || '').toLowerCase()
  if (sub.includes('bebé') || sub.includes('bebe') || sub.includes('baby') || sub.includes('pequeño')) return 'bebes'
  if (sub.includes('grande')) return 'grande'
  return 'mediano'
})

const requiresMeasureVisit = computed(() => {
  const p = product.value
  if (!p) return false
  const price = Number(p.price ?? p.discount_price ?? p.originalPrice ?? p.tributo ?? 0)
  return price > 600
})

// ─── Form data ────────────────────────────────────────────────────────────
const form = ref({
  nombre: state.user?.name || '',
  direccion: '',
  distrito: '',
  fecha: '',
  horaInicio: '',
  horaFin: '',
  electricidad: '',
  largo: null,
  ancho: null,
  suelo: '',
  cantidadNinos: null,
  rangoEdades: '',
  accesoLibre: false,
  visitaMedidas: '',
  telefono: '',
})

const submitted = ref(false)
const showModal = ref(false)
const fieldErrors = ref({})

// ─── Validations ──────────────────────────────────────────────────────────
const noElectricity = computed(() => form.value.electricidad === 'ninguna')

const spaceTooSmall = computed(() => {
  const largo = Number(form.value.largo)
  const ancho = Number(form.value.ancho)
  if (!largo || !ancho) return false
  const min = MIN_DIMS[inflableSize.value]
  return largo < min.largo || ancho < min.ancho
})

const accessWarning = computed(() => submitted.value && !form.value.accesoLibre)

const minimumDimensions = computed(() => {
  const min = MIN_DIMS[inflableSize.value]
  return `${min.largo}m \u00d7 ${min.ancho}m`
})

const sizeLabel = computed(() => {
  if (inflableSize.value === 'bebes') return '👶 Bebés'
  if (inflableSize.value === 'grande') return '🏰 Grande'
  return '🎪 Mediano'
})

// ─── Submit ───────────────────────────────────────────────────────────────
function validate() {
  const errors = {}
  if (!form.value.nombre) errors.nombre = true
  if (!form.value.telefono) errors.telefono = true
  if (!form.value.direccion) errors.direccion = true
  if (!form.value.distrito) errors.distrito = true
  if (!form.value.fecha) errors.fecha = true
  if (!form.value.horaInicio) errors.horaInicio = true
  if (!form.value.horaFin) errors.horaFin = true
  if (!form.value.electricidad) errors.electricidad = true
  if (!form.value.largo) errors.largo = true
  if (!form.value.ancho) errors.ancho = true
  if (!form.value.suelo) errors.suelo = true
  if (!form.value.cantidadNinos) errors.cantidadNinos = true
  if (!form.value.rangoEdades) errors.rangoEdades = true
  if (requiresMeasureVisit.value && !form.value.visitaMedidas) errors.visitaMedidas = true
  fieldErrors.value = errors
  return Object.keys(errors).length === 0
}

function handleSubmit() {
  submitted.value = true
  if (!validate()) return
  showModal.value = true
}

const whatsappUrl = computed(() => {
  const f = form.value
  const prod = product.value?.name || 'Inflable'
  const msg = [
    `Hola! Quiero reservar: *${prod}*`,
    `👤 Nombre: ${f.nombre}`,
    `📞 Teléfono: ${f.telefono}`,
    `📍 Dirección: ${f.direccion}, ${f.distrito}`,
    `📅 Fecha: ${f.fecha} | ${f.horaInicio} – ${f.horaFin}`,
    `⚡ Electricidad: ${f.electricidad}`,
    `📐 Espacio: ${f.largo}m × ${f.ancho}m`,
    `🌱 Suelo: ${f.suelo}`,
    `👧 Niños: ${f.cantidadNinos} | Edades: ${f.rangoEdades}`,
    `🚪 Acceso libre: ${f.accesoLibre ? 'Sí' : 'No'}`,
    requiresMeasureVisit.value ? `📏 Visita de medidas: ${f.visitaMedidas}` : null,
  ].filter(Boolean).join('\n')
  return `https://wa.me/51975495623?text=${encodeURIComponent(msg)}`
})
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="reserva-bg">
    <div class="reserva-card">

      <!-- ── NOT AUTHENTICATED ────────────────────────────────────────── -->
      <div v-if="!isAuthenticated" class="guest-panel">
        <div class="guest-emoji">👋</div>
        <h1 class="guest-title">¡Bienvenido a El Patio de Ani!</h1>
        <p class="guest-text">
          Si eres cliente nuevo y aún no conoces cuánto espacio tienes disponible,
          te recomendamos escribirnos por WhatsApp. Con gusto te asesoramos
          y coordinamos todos los detalles de tu evento.
        </p>
        <a
          class="btn-whatsapp"
          href="https://wa.me/51975495623?text=Hola!%20Quiero%20reservar%20un%20inflable"
          target="_blank"
          rel="noopener"
        >
          💬 Escribirnos por WhatsApp
        </a>
        <p class="guest-signin">
          ¿Ya nos conoces?
          <router-link to="/Sign-in">Inicia sesión para reservar directamente</router-link>
        </p>
      </div>

      <!-- ── AUTHENTICATED ───────────────────────────────────────────── -->
      <div v-else>
        <div class="form-header">
          <h1 class="form-title">📋 Reservar Inflable</h1>
          <p v-if="product" class="form-subtitle">
            {{ product.name }}
            <span class="size-badge">{{ sizeLabel }}</span>
          </p>
        </div>

        <form @submit.prevent="handleSubmit" novalidate>

          <!-- ── SECCIÓN 1: Datos del evento ─────────────────────────── -->
          <section class="form-section">
            <div class="section-header">
              <span class="section-number">1</span>
              <span class="section-title">📅 Datos del Evento</span>
            </div>
            <div class="pink-sep"></div>
            <div class="grid-2">
              <div class="field">
                <label>Nombre completo</label>
                <input v-model="form.nombre" type="text" placeholder="Tu nombre" :class="{ error: fieldErrors.nombre }" />
                <span v-if="fieldErrors.nombre" class="err-msg">Campo requerido</span>
              </div>
              <div class="field">
                <label>Teléfono de contacto</label>
                <input v-model="form.telefono" type="tel" placeholder="Ej. 987654321" :class="{ error: fieldErrors.telefono }" />
                <span v-if="fieldErrors.telefono" class="err-msg">Campo requerido</span>
              </div>
              <div class="field">
                <label>Dirección del evento</label>
                <input v-model="form.direccion" type="text" placeholder="Av. Los Rosales 123" :class="{ error: fieldErrors.direccion }" />
                <span v-if="fieldErrors.direccion" class="err-msg">Campo requerido</span>
              </div>
              <div class="field">
                <label>Distrito</label>
                <input v-model="form.distrito" type="text" placeholder="Miraflores" :class="{ error: fieldErrors.distrito }" />
                <span v-if="fieldErrors.distrito" class="err-msg">Campo requerido</span>
              </div>
              <div class="field">
                <label>Fecha del evento</label>
                <input v-model="form.fecha" type="date" :class="{ error: fieldErrors.fecha }" />
                <span v-if="fieldErrors.fecha" class="err-msg">Campo requerido</span>
              </div>
              <div class="field">
                <label>Hora de inicio</label>
                <input v-model="form.horaInicio" type="time" :class="{ error: fieldErrors.horaInicio }" />
                <span v-if="fieldErrors.horaInicio" class="err-msg">Campo requerido</span>
              </div>
              <div class="field">
                <label>Hora de fin</label>
                <input v-model="form.horaFin" type="time" :class="{ error: fieldErrors.horaFin }" />
                <span v-if="fieldErrors.horaFin" class="err-msg">Campo requerido</span>
              </div>
            </div>
          </section>

          <!-- ── SECCIÓN 2: Logística eléctrica ─────────────────────── -->
          <section class="form-section">
            <div class="section-header">
              <span class="section-number">2</span>
              <span class="section-title">⚡ Logística Eléctrica</span>
            </div>
            <div class="pink-sep"></div>
            <p class="field-label-desc">¿Cuenta con sistema electrógeno o toma de corriente estable a menos de 15 metros?</p>
            <div class="radio-group" :class="{ error: fieldErrors.electricidad }">
              <label class="radio-opt">
                <input type="radio" v-model="form.electricidad" value="corriente" />
                <span>✅ Sí, tengo corriente estable</span>
              </label>
              <label class="radio-opt">
                <input type="radio" v-model="form.electricidad" value="generador" />
                <span>🔋 Tengo grupo electrógeno</span>
              </label>
              <label class="radio-opt">
                <input type="radio" v-model="form.electricidad" value="ninguna" />
                <span>❌ No cuento con ninguna</span>
              </label>
            </div>
            <span v-if="fieldErrors.electricidad" class="err-msg">Selecciona una opción</span>
            <div v-if="noElectricity" class="alert alert-error">
              ⚠️ <strong>Importante:</strong> El inflable requiere energía eléctrica para funcionar.
              Sin corriente o generador no es posible realizar la instalación.
              Contáctanos para coordinar una solución.
            </div>
          </section>

          <!-- ── SECCIÓN 3: Dimensiones del espacio ─────────────────── -->
          <section class="form-section">
            <div class="section-header">
              <span class="section-number">3</span>
              <span class="section-title">📐 Dimensiones del Espacio</span>
            </div>
            <div class="pink-sep"></div>
            <p class="field-label-desc">Indica el largo y ancho del área disponible para la instalación (en metros).</p>
            <div class="grid-2">
              <div class="field">
                <label>Largo (m)</label>
                <input v-model.number="form.largo" type="number" min="1" step="0.5" placeholder="Ej. 6" :class="{ error: fieldErrors.largo }" />
                <span v-if="fieldErrors.largo" class="err-msg">Campo requerido</span>
              </div>
              <div class="field">
                <label>Ancho (m)</label>
                <input v-model.number="form.ancho" type="number" min="1" step="0.5" placeholder="Ej. 4" :class="{ error: fieldErrors.ancho }" />
                <span v-if="fieldErrors.ancho" class="err-msg">Campo requerido</span>
              </div>
            </div>
            <div v-if="spaceTooSmall" class="alert alert-warning">
              ⚠️ <strong>Espacio insuficiente:</strong> Para un inflable {{ sizeLabel }} se necesitan al menos
              <strong>{{ minimumDimensions }}</strong>. Por favor verifica las dimensiones de tu espacio.
            </div>
            <div v-else-if="form.largo && form.ancho && !spaceTooSmall" class="alert alert-info">
              ✅ Las dimensiones indicadas son suficientes para este inflable.
            </div>
          </section>

          <!-- ── SECCIÓN 4: Tipo de suelo ────────────────────────────── -->
          <section class="form-section">
            <div class="section-header">
              <span class="section-number">4</span>
              <span class="section-title">🌱 Tipo de Suelo</span>
            </div>
            <div class="pink-sep"></div>
            <div class="field">
              <label>Selecciona el tipo de superficie</label>
              <select v-model="form.suelo" :class="{ error: fieldErrors.suelo }">
                <option value="" disabled>-- Seleccionar --</option>
                <option value="cesped">🌿 Césped (usamos estacas)</option>
                <option value="cemento">🪨 Cemento / Asfalto (bolsas de arena)</option>
                <option value="tierra">🟤 Tierra</option>
                <option value="interior">🏠 Interior</option>
              </select>
              <span v-if="fieldErrors.suelo" class="err-msg">Selecciona una opción</span>
            </div>
            <div class="alert alert-info" style="margin-top: 12px;">
              ℹ️ El método de anclaje varía según el tipo de suelo para garantizar la seguridad del inflable.
            </div>
          </section>

          <!-- ── SECCIÓN 5: Detalles de invitados ───────────────────── -->
          <section class="form-section">
            <div class="section-header">
              <span class="section-number">5</span>
              <span class="section-title">👧 Detalles de Invitados</span>
            </div>
            <div class="pink-sep"></div>
            <div class="grid-2">
              <div class="field">
                <label>Cantidad estimada de niños</label>
                <input v-model.number="form.cantidadNinos" type="number" min="1" placeholder="Ej. 20" :class="{ error: fieldErrors.cantidadNinos }" />
                <span v-if="fieldErrors.cantidadNinos" class="err-msg">Campo requerido</span>
              </div>
              <div class="field">
                <label>Rango de edades</label>
                <input v-model="form.rangoEdades" type="text" placeholder="Ej. 3-8 años" :class="{ error: fieldErrors.rangoEdades }" />
                <span v-if="fieldErrors.rangoEdades" class="err-msg">Campo requerido</span>
              </div>
            </div>
            <div v-if="inflableSize === 'bebes'" class="alert alert-info">
              👶 Este inflable está diseñado para <strong>bebés y niños pequeños</strong>. Ideal hasta 4-5 años.
            </div>
            <div v-else-if="inflableSize === 'grande'" class="alert alert-info">
              🏰 Este inflable <strong>grande</strong> puede acomodar muchos niños a la vez. Perfecto para fiestas grandes.
            </div>
            <div v-else class="alert alert-info">
              🎪 Inflable de tamaño <strong>mediano</strong>. Recomendado para niños de 3 a 12 años.
            </div>
          </section>

          <!-- ── SECCIÓN 6: Ruta de acceso ───────────────────────────── -->
          <section class="form-section">
            <div class="section-header">
              <span class="section-number">6</span>
              <span class="section-title">🚪 Ruta de Acceso</span>
            </div>
            <div class="pink-sep"></div>
            <label class="checkbox-opt">
              <input type="checkbox" v-model="form.accesoLibre" />
              <span>El camino hacia el área de instalación está <strong>libre de escaleras</strong> u obstáculos estrechos.</span>
            </label>
            <div v-if="accessWarning" class="alert alert-error" style="margin-top: 12px;">
              ⚠️ Es importante que el acceso esté despejado para poder instalar el inflable de forma segura.
              Por favor comunícanoslo para evaluar la viabilidad.
            </div>
          </section>

          <!-- ── SECCIÓN 7: Toma de medidas (condicional) ───────────── -->
          <section v-if="requiresMeasureVisit" class="form-section">
            <div class="section-header">
              <span class="section-number">7</span>
              <span class="section-title">📏 Visita de Toma de Medidas</span>
            </div>
            <div class="pink-sep"></div>
            <p class="field-label-desc">
              Este inflable requiere una visita previa para verificar el espacio disponible.
              ¿Puedes coordinarnos una visita?
            </p>
            <div class="radio-group" :class="{ error: fieldErrors.visitaMedidas }">
              <label class="radio-opt">
                <input type="radio" v-model="form.visitaMedidas" value="si" />
                <span>✅ Sí, podemos coordinar una visita</span>
              </label>
              <label class="radio-opt">
                <input type="radio" v-model="form.visitaMedidas" value="no" />
                <span>❌ No, prefiero proceder sin visita</span>
              </label>
            </div>
            <span v-if="fieldErrors.visitaMedidas" class="err-msg">Selecciona una opción</span>
          </section>

          <!-- ── Botón de envío ──────────────────────────────────────── -->
          <button type="submit" class="btn-submit">
            🎉 Confirmar Reserva
          </button>

        </form>
      </div>
    </div>
  </main>

  <!-- ── Modal de confirmación ─────────────────────────────────────────── -->
  <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
    <div class="modal-card">
      <h2 class="modal-title">✅ Resumen de tu Reserva</h2>
      <div class="modal-body">
        <p v-if="product"><strong>Inflable:</strong> {{ product.name }}</p>
        <p><strong>Nombre:</strong> {{ form.nombre }}</p>
        <p><strong>Teléfono:</strong> {{ form.telefono }}</p>
        <p><strong>Dirección:</strong> {{ form.direccion }}, {{ form.distrito }}</p>
        <p><strong>Fecha:</strong> {{ form.fecha }} | {{ form.horaInicio }} – {{ form.horaFin }}</p>
        <p><strong>Electricidad:</strong> {{ form.electricidad }}</p>
        <p><strong>Espacio:</strong> {{ form.largo }}m × {{ form.ancho }}m</p>
        <p><strong>Suelo:</strong> {{ form.suelo }}</p>
        <p><strong>Niños:</strong> {{ form.cantidadNinos }} | Edades: {{ form.rangoEdades }}</p>
        <p><strong>Acceso libre:</strong> {{ form.accesoLibre ? 'Sí' : 'No' }}</p>
        <p v-if="requiresMeasureVisit"><strong>Visita de medidas:</strong> {{ form.visitaMedidas }}</p>
      </div>
      <p class="modal-note">Al confirmar, serás redirigido a WhatsApp para finalizar tu reserva con nosotros.</p>
      <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn-whatsapp" @click="showModal = false">
        💬 Confirmar por WhatsApp
      </a>
      <button class="btn-cancel" @click="showModal = false">Revisar datos</button>
    </div>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
/* ── Layout ── */
.reserva-bg {
  min-height: 80vh;
  background: #f4f6f3;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
}

.reserva-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 8px 30px rgba(45, 62, 148, 0.1);
}

/* ── Guest panel ── */
.guest-panel {
  text-align: center;
  padding: 20px 0;
}

.guest-emoji {
  font-size: 4rem;
  margin-bottom: 16px;
}

.guest-title {
  font-size: 1.8rem;
  color: #2D3E94;
  font-weight: 700;
  margin-bottom: 16px;
}

.guest-text {
  color: #444;
  line-height: 1.7;
  max-width: 500px;
  margin: 0 auto 28px;
}

.guest-signin {
  margin-top: 20px;
  color: #666;
}

.guest-signin a {
  color: #E91E81;
  font-weight: 600;
  text-decoration: none;
}

.guest-signin a:hover {
  text-decoration: underline;
}

/* ── Form header ── */
.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.form-subtitle {
  color: #2D3E94;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.size-badge {
  background: #FFD200;
  color: #2D3E94;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 3px 10px;
  border-radius: 20px;
}

/* ── Sections ── */
.form-section {
  margin-bottom: 32px;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid #e8eaf0;
  background: #fafbff;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.section-number {
  width: 28px;
  height: 28px;
  background: #2D3E94;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(90deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pink-sep {
  width: 40px;
  height: 3px;
  background: #E91E81;
  border-radius: 4px;
  margin-bottom: 16px;
}

/* ── Grid ── */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 580px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }

  .reserva-card {
    padding: 24px 16px;
  }
}

/* ── Fields ── */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label,
.field-label-desc {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2D3E94;
}

.field-label-desc {
  margin-bottom: 12px;
}

.field input,
.field select {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  background: white;
  font-family: inherit;
}

.field input:focus,
.field select:focus {
  border-color: #E91E81;
}

.field input.error,
.field select.error {
  border-color: #E91E81;
  background: #fff0f5;
}

.err-msg {
  font-size: 0.8rem;
  color: #c0144e;
}

/* ── Radio buttons ── */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;
}

.radio-group.error .radio-opt {
  background: #fff0f5;
}

.radio-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.radio-opt:has(input:checked) {
  border-color: #E91E81;
  background: #fff0f8;
}

.radio-opt input {
  accent-color: #E91E81;
}

/* ── Checkbox ── */
.checkbox-opt {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  line-height: 1.5;
}

.checkbox-opt:has(input:checked) {
  border-color: #E91E81;
  background: #fff0f8;
}

.checkbox-opt input {
  accent-color: #E91E81;
  margin-top: 2px;
  flex-shrink: 0;
}

/* ── Alerts ── */
.alert {
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-top: 12px;
}

.alert-error {
  background: #fff0f5;
  border: 1.5px solid #E91E81;
  color: #c0144e;
}

.alert-warning {
  background: #fffbea;
  border: 1.5px solid #FFD200;
  color: #7a5f00;
}

.alert-info {
  background: #f0f4ff;
  border: 1.5px solid #2D3E94;
  color: #1a2d7a;
}

/* ── Buttons ── */
.btn-submit {
  width: 100%;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  padding: 16px;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255, 210, 0, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 8px;
  font-family: inherit;
}

.btn-submit:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 20px rgba(255, 210, 0, 0.55);
}

.btn-whatsapp {
  display: inline-block;
  background: #25D366;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 14px 28px;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s, background 0.2s;
  margin-bottom: 12px;
}

.btn-whatsapp:hover {
  background: #1ebe5d;
  transform: scale(1.03);
}

.btn-cancel {
  display: block;
  width: 100%;
  background: transparent;
  border: 2px solid #2D3E94;
  color: #2D3E94;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
}

.btn-cancel:hover {
  background: rgba(45, 62, 148, 0.07);
}

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 520px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 1.4rem;
  color: #2D3E94;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
}

.modal-body {
  background: #f4f6f3;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.8;
}

.modal-body p {
  margin: 0;
}

.modal-note {
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  margin-bottom: 16px;
}
</style>
