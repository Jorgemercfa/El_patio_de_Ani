<script setup>
import { computed } from 'vue';
import NavbarCompanies from '@/components/Navbar-company-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSessionCompany } from '@/auth/session_companies';

const { state } = useSessionCompany();

const companyName = computed(() => state.company?.name || 'Empresa');

// Fecha formateada
const today = new Date().toLocaleDateString('es-PE', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
</script>

<template>
  <div class="page-wrapper-company">
    <header>
      <NavbarCompanies />
    </header>

    <main class="dashboard-section">
      <div class="dashboard-container">
        <!-- Bienvenida -->
        <div class="welcome-area">
          <h1 class="welcome-title">
            Bienvenido, <span class="company-highlight">{{ companyName }}</span>
          </h1>
          <p class="welcome-date">{{ today }}</p>
        </div>

        <!-- Tarjetas de acciones rápidas -->
        <div class="quick-actions">
          <router-link to="/Create-products" class="action-card create-card">
            <div class="action-icon">
              <i class="pi pi-plus-circle"></i>
            </div>
            <h3>Crear Producto</h3>
            <p>Vende un producto que ya no uses</p>
          </router-link>

          <router-link to="/Company-products" class="action-card products-card">
            <div class="action-icon">
              <i class="pi pi-tags"></i>
            </div>
            <h3>Mis Productos</h3>
            <p>Administra y revisa tus productos activos</p>
          </router-link>

          <router-link to="/Company-profile" class="action-card profile-card">
            <div class="action-icon">
              <i class="pi pi-building"></i>
            </div>
            <h3>Mi usuario vendedor</h3>
            <p>Visualiza y edita el perfil de tu vendedor</p>
          </router-link>
        </div>

        <!-- Sección informativa -->
        <div class="info-section">
          <div class="info-card">
            <h2 class="info-title">
              <i class="pi pi-chart-line"></i> Panel de vendedor
            </h2>
            <p class="info-text">
              Desde aquí puedes gestionar todos los aspectos de tu presencia en
              Al Toque. Crea cupones atractivos, revisa el rendimiento de tus
              ofertas y mantén actualizada la información de tu vendedor.
            </p>
          </div>

          <div class="tips-card">
            <h2 class="tips-title"><i class="pi pi-lightbulb"></i> Consejos</h2>
            <ul class="tips-list">
              <li>
                <strong>Descuentos claros:</strong> Usa porcentajes y precios
                visibles para atraer más clientes.
              </li>
              <li>
                <strong>Imágenes de calidad:</strong> Una buena foto aumenta las
                conversiones hasta un 40%.
              </li>
              <li>
                <strong>Códigos únicos:</strong> Genera códigos fáciles de
                recordar para tus cupones.
              </li>
              <li>
                <strong>Fechas estratégicas:</strong> Lanza ofertas en fechas
                clave como fines de semana y feriados.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.page-wrapper-company {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  /* color: #e0e0e0; */
  font-family: Outfit, Inter, Avenir, Helvetica, Arial, sans-serif;
}

.dashboard-section {
  flex: 1;
  padding: 100px 0 60px 0;
}

.dashboard-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
}

/* ─── Bienvenida ─── */
.welcome-area {
  margin-bottom: 50px;
}

.welcome-title {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.company-highlight {
  color: #325bcd;
}

.welcome-date {
  font-size: 1rem;
  color: #888;
  text-transform: capitalize;
}

/* ─── Acciones rápidas ─── */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 50px;
}

.action-card {
  background: #325bcd;
  border: 1px solid #30363d;
  border-radius: 16px;
  padding: 32px 28px;
  text-decoration: none;
  color: #e0e0e0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.create-card:hover {
  border-color: #4fc3f7;
}

.products-card:hover {
  border-color: #66bb6a;
}

.profile-card:hover {
  border-color: #ffa726;
}

.action-icon {
  font-size: 2.2rem;
  margin-bottom: 16px;
}

.create-card .action-icon {
  color: #4fc3f7;
}

.products-card .action-icon {
  color: #66bb6a;
}

.profile-card .action-icon {
  color: #ffa726;
}

.action-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
}

.action-card p {
  font-size: 0.9rem;
  color: #ffffff;
  line-height: 1.5;
}

/* ─── Sección informativa ─── */
.info-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.info-card,
.tips-card {
  background: #325bcd;
  border: 1px solid #30363d;
  border-radius: 16px;
  padding: 32px;
}

.info-title,
.tips-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-title .pi {
  color: #ffffff;
}

.tips-title .pi {
  color: #ffa726;
}

.info-text {
  font-size: 0.95rem;
  color: #ffffff;
  line-height: 1.8;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tips-list li {
  font-size: 0.93rem;
  color: #ffffff;
  line-height: 1.6;
  padding-left: 20px;
  position: relative;
}

.tips-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #4fc3f7;
  font-weight: bold;
}

.tips-list li strong {
  color: #e0e0e0;
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 1.8rem;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .info-section {
    grid-template-columns: 1fr;
  }
}
</style>
