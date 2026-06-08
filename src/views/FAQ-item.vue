<script setup>
import { onMounted, ref } from 'vue';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

const openIndex = ref(null);

const faqSections = [
  {
    title: '📦 Sobre los servicios',
    items: [
      {
        question: '¿Qué servicios ofrecen?',
        answer: 'Ofrecemos shows infantiles, inflables, juegos, carritos de snacks y pintacaritas para eventos en Lima.',
      },
      {
        question: '¿Atienden fuera de Lima?',
        answer: 'Por ahora atendemos solo Lima Metropolitana, con tarifas de movilidad según distrito.',
      },
      {
        question: '¿Con cuánta anticipación debo reservar?',
        answer: 'Te recomendamos reservar con mínimo 5 días hábiles; para fines de semana, idealmente con 2 semanas de anticipación.',
      },
    ],
  },
  {
    title: '📅 Sobre la reserva',
    items: [
      {
        question: '¿Cómo puedo hacer una reserva?',
        answer: 'Puedes reservar desde la web eligiendo el servicio y completando el formulario, o escribirnos directamente por WhatsApp.',
      },
      {
        question: '¿Puedo reservar más de un servicio para el mismo evento?',
        answer: 'Sí. Puedes agregar varios servicios al carrito para el mismo evento y gestionarlos en una sola reserva.',
      },
      {
        question: '¿Qué pasa si necesito cancelar?',
        answer: 'Con 48 horas de anticipación devolvemos el 100%. Con menos de 48 horas, se retiene el 50% por gastos operativos.',
      },
      {
        question: '¿Cómo sé si la fecha está disponible?',
        answer: 'En el formulario de reserva encontrarás un calendario con disponibilidad en tiempo real.',
      },
    ],
  },
  {
    title: '💳 Sobre los pagos',
    items: [
      {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos transferencia bancaria, Yape, Plin y tarjeta de crédito/débito.',
      },
      {
        question: '¿Cuándo se realiza el cobro?',
        answer: 'Solicitamos un adelanto del 50% para confirmar la reserva y el saldo restante se paga el día del evento.',
      },
      {
        question: '¿Los precios incluyen IGV?',
        answer: 'Sí, todos los precios mostrados ya incluyen impuestos.',
      },
    ],
  },
  {
    title: '🎪 Sobre los inflables',
    items: [
      {
        question: '¿Qué espacio necesito para un inflable?',
        answer: 'Depende del modelo: bebés aprox. 3x3m, medianos aprox. 5x4m y grandes aprox. 8x6m.',
      },
      {
        question: '¿Qué pasa si no tengo electricidad en el lugar?',
        answer: 'Contamos con generador eléctrico propio que se puede incluir con un costo adicional.',
      },
      {
        question: '¿Pueden instalar en interior?',
        answer: 'Sí, siempre que exista altura libre suficiente y acceso adecuado para ingresar el inflable.',
      },
    ],
  },
  {
    title: '🌟 Sobre el programa de fidelidad',
    items: [
      {
        question: '¿Cómo funciona el sistema de puntos?',
        answer: 'Cada reserva confirmada suma +1. Al llegar a Plata (3), Oro (6) o VIP (10) recibes descuentos del 5%, 10% y 15%.',
      },
      {
        question: '¿Los descuentos se aplican automáticamente?',
        answer: 'Sí. Al hacer checkout se aplica automáticamente el descuento correspondiente a tu nivel.',
      },
    ],
  },
];

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});
</script>

<template>
  <div class="faq-page">
    <header>
      <Navbar />
    </header>

    <main class="faq-content">
      <div class="faq-container">
        <h1 class="faq-title">Preguntas Frecuentes</h1>
        <p class="faq-subtitle">
          Resolvemos las dudas más comunes para que tu reserva sea rápida y sin complicaciones.
        </p>

        <section
          v-for="(section, sectionIndex) in faqSections"
          :key="section.title"
          class="faq-section"
        >
          <h2 class="faq-section-title">{{ section.title }}</h2>

          <article
            v-for="(item, itemIndex) in section.items"
            :key="item.question"
            class="faq-item"
          >
            <button
              type="button"
              class="faq-question"
              :aria-expanded="openIndex === `${sectionIndex}-${itemIndex}`"
              @click="toggle(`${sectionIndex}-${itemIndex}`)"
            >
              <span>{{ item.question }}</span>
              <span class="faq-arrow" :class="{ open: openIndex === `${sectionIndex}-${itemIndex}` }">▼</span>
            </button>

            <div class="faq-answer-wrap" :class="{ open: openIndex === `${sectionIndex}-${itemIndex}` }">
              <div class="faq-answer">
                {{ item.answer }}
              </div>
            </div>
          </article>
        </section>

        <div class="faq-contact-cta">
          <p>¿No encontraste tu respuesta?</p>
          <a href="https://wa.me/51975495623" target="_blank" rel="noopener noreferrer">
            Contáctanos por WhatsApp
          </a>
        </div>
      </div>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.faq-page {
  min-height: 100vh;
  background: #FDF6EC;
  font-family: 'Nunito', sans-serif;
}

.faq-content {
  padding: 90px 20px 80px;
}

.faq-container {
  max-width: 980px;
  margin: 0 auto;
}

.faq-title {
  font-size: clamp(2rem, 2.8vw, 2.8rem);
  margin-bottom: 8px;
  font-weight: 800;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.faq-subtitle {
  color: #555;
  margin-bottom: 28px;
  line-height: 1.6;
  font-size: 1rem;
}

.faq-section {
  margin-bottom: 26px;
}

.faq-section-title {
  color: #2D3E94;
  font-size: 1.2rem;
  margin-bottom: 12px;
  font-weight: 800;
}

.faq-item {
  margin-bottom: 10px;
  border-radius: 12px;
  box-shadow: 0 3px 14px rgba(45, 62, 148, 0.08);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  border: none;
  border-left: 4px solid #E91E81;
  background: #fff;
  color: #2D3E94;
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}

.faq-arrow {
  transition: transform 0.25s ease;
  color: #E91E81;
  font-size: 0.9rem;
}

.faq-arrow.open {
  transform: rotate(180deg);
}

.faq-answer-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}

.faq-answer-wrap.open {
  grid-template-rows: 1fr;
}

.faq-answer {
  overflow: hidden;
  background: #fff0f7;
  color: #444;
  line-height: 1.55;
  padding: 0 16px;
}

.faq-answer-wrap.open .faq-answer {
  padding: 16px;
}

.faq-contact-cta {
  margin-top: 32px;
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
}

.faq-contact-cta p {
  margin: 0 0 10px;
  color: #2D3E94;
  font-weight: 700;
}

.faq-contact-cta a {
  display: inline-block;
  text-decoration: none;
  background: #25D366;
  color: #fff;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 999px;
}

.faq-contact-cta a:hover {
  background: #1ebe5d;
}

@media (max-width: 768px) {
  .faq-content {
    padding-top: 75px;
  }

  .faq-question {
    font-size: 0.95rem;
    padding: 14px;
  }

  .faq-section-title {
    font-size: 1.05rem;
  }
}
</style>
