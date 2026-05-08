<template>
  <div id="app">
    <router-view />

    <!-- Botón flotante de WhatsApp -->
    <a
      href="https://wa.me/51987654321?text=¡Hola!%20Me%20gustaría%20más%20información."
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-btn"
      aria-label="Contactar por WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width="38"
        height="38"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  min-height: 100vh;
}

/* Botón flotante WhatsApp */
.whatsapp-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25D366;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.5);
  text-decoration: none;

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  /* Animación de pulso para llamar la atención */
  animation: pulse 2s infinite;
}

.whatsapp-btn:hover {
  transform: scale(1.12);
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.7);
  animation: none;
}

.whatsapp-btn img {
  width: 38px;
  height: 38px;
}

@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  70%  { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}
</style>