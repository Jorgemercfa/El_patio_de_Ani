<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
<header>
    <Navbar />
</header>

<div class="privacy-policy">
    <h1 class="title-privacy">Terminos de Uso</h1>
    <div class="privacy-content">
        <p>- Contrato sujeto a disponibilidad</p>
        <p>- Los costos de transporte varían según el distrito</p>
        <p>- Los juegos sólo serán reservados con el depósito del 50% del total</p>
        <p>- Los precios son por alquiler por evento</p>
        <p>- Los juegos se instalan horas antes y se retiran finalizando el evento</p>
        <p>- NO se instalan juegos en la vía pública</p>
    </div>

    

</div>
<footer>
    <Footer />
</footer>
</template>

<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.title-privacy {
  font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
  margin-bottom: 32px;
  font-weight: 800;
  text-align: left;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-privacy::after {
  content: '';
  width: 64px;
  height: 4px;
  background-color: #E91E81;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.privacy-content {
  margin-top: 24px;
}

.privacy-content p {
  margin-bottom: 16px;
  line-height: 1.6;
  color: #2D3E94;
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