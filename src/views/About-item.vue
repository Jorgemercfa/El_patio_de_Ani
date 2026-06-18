<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>
<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="about-section">
      <div class="about-container">
        <h1 class="main-title">Sobre Nosotros</h1>
         <div class="about-card">
        <p class="about-text">
           Somos una empresa de entretenimiento infantil nacida de un sueño antiguo, construido a lo largo de los años con esfuerzo, ilusión, ideas y, sobre todo, mucho amor. Nuestra visión siempre fue crear un espacio donde los niños puedan disfrutar, reír, emocionarse y vivir momentos inolvidables, brindándoles una infancia llena de alegría, diversión y recuerdos que perduren para siempre. Después de muchos años de planificación, aprendizajes, intentos y sueños que se formaban y transformaban constantemente, como parte de un proceso lleno de dedicación, finalmente nace El Patio de Ani: una productora de eventos infantiles creada para convertir cada celebración en una experiencia mágica, segura y memorable para cada niño y familia.
        </p>
        <h2>Visión</h2>
        <p>
          Brindar servicios de entretenimiento infantil seguros, confiables y de alta calidad, generando experiencias memorables para nuestros clientes.
        </p>

        <h2>Misión</h2>
        <p>
          Ser reconocidos como una empresa líder en el rubro de entretenimiento infantil, destacando por nuestra seguridad, puntualidad y excelencia en el servicio.
        </p>
        <h2>Valores</h2>
        <ul>
          <li><strong>Responsabilidad</strong></li>
          <li><strong>Puntualidad</strong></li>
          <li><strong>Seguridad</strong></li>
          <li><strong>Calidad de Servicio</strong></li>
          <li><strong>Compromiso con el Cliente</strong></li>
         </ul> 
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.about-section {
  margin-top: 40px;
}

.about-container {
  width: 85%;
  max-width: 1100px;
  margin: auto;
}

.main-title {
  font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
  margin-bottom: 32px;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @apply font-black text-left;
}

.main-title::after {
  content: '';
  width: 64px;
  height: 4px;
  background-color: #E91E81;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.about-section h2 {
  font-size: 1.5rem;
  margin-top: 24px;
  margin-bottom: 12px;
}

.about-card {
  background-color: #fefffe; /* Azul oscuro como la imagen */
  color: #e91e81;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  margin-bottom: 80px;

}


</style>    

