<template>
  <div id="app">
    <router-view />

    <transition name="birthday-fade">
      <div v-if="showBirthdayPopup" class="birthday-overlay">
        <div class="birthday-card">
          <p class="birthday-message">{{ birthdayMessage }}</p>
          <div class="birthday-actions">
            <button type="button" class="birthday-primary" @click="goToServices">
              Ver servicios
            </button>
            <button type="button" class="birthday-secondary" @click="closeBirthdayPopup">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </transition>

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

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSession } from '@/auth/session';

const { state, isAuthenticated } = useSession();
const router = useRouter();
const showBirthdayPopup = ref(false);
const upcomingBirthday = ref(null);

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const BIRTHDAY_NOTIFICATION_THRESHOLD_DAYS = 7;

const getLocalDateString = (date = new Date()) => {
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

const getDaysUntilBirthday = (birthday) => {
  if (!birthday) return null;

  const [year, month, day] = birthday.split('-').map(Number);
  if (!year || !month || !day) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let nextBirthday = new Date(today.getFullYear(), month - 1, day);
  nextBirthday.setHours(0, 0, 0, 0);

  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, month - 1, day);
    nextBirthday.setHours(0, 0, 0, 0);
  }

  return Math.round((nextBirthday.getTime() - today.getTime()) / MS_PER_DAY);
};

const birthdayMessage = computed(() => {
  const child = upcomingBirthday.value;
  if (!child) return '';

  if (child.daysRemaining === 0) {
    return `🎊 ¡Hoy es el cumpleaños de ${child.name}! ¡Feliz cumpleaños! 🎈`;
  }

  if (child.daysRemaining === 1) {
    return `🚨 ¡Mañana es el cumpleaños de ${child.name}! ¿Ya tienes todo listo para la fiesta?`;
  }

  if (child.daysRemaining <= 3) {
    return `🎉 ¡Solo ${child.daysRemaining} días para el cumpleaños de ${child.name}! No te quedes sin tu inflable favorito.`;
  }

  return `🎂 ¡El cumpleaños de ${child.name} es en ${child.daysRemaining} días! Reserva con anticipación y obtén un descuento especial.`;
});

const closeBirthdayPopup = () => {
  const todayKey = `patio-bday-shown-${getLocalDateString()}`;
  sessionStorage.setItem(todayKey, 'true');
  showBirthdayPopup.value = false;
};

const goToServices = () => {
  closeBirthdayPopup();
  router.push('/Product-item');
};

onMounted(() => {
  if (!isAuthenticated.value || !state.user?.id) return;

  const todayKey = `patio-bday-shown-${getLocalDateString()}`;
  if (sessionStorage.getItem(todayKey)) return;

  const childrenStorageKey = `patio-hijos-${state.user.id}`;
  const rawChildren = localStorage.getItem(childrenStorageKey);
  if (!rawChildren) return;

  try {
    const parsedChildren = JSON.parse(rawChildren);
    if (!Array.isArray(parsedChildren)) return;

    const upcomingChildren = parsedChildren
      .map((child) => {
        const name = (child?.name || '').trim();
        const daysRemaining = getDaysUntilBirthday(child?.birthday);
        if (
          !name ||
          daysRemaining === null ||
          daysRemaining > BIRTHDAY_NOTIFICATION_THRESHOLD_DAYS
        ) {
          return null;
        }
        return { name, daysRemaining };
      })
      .filter(Boolean)
      .sort((a, b) => a.daysRemaining - b.daysRemaining);

    if (!upcomingChildren.length) return;

    upcomingBirthday.value = upcomingChildren[0];
    showBirthdayPopup.value = true;
  } catch {
    upcomingBirthday.value = null;
  }
});
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

.birthday-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  padding: 16px;
}

.birthday-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border: 2px solid #E91E81;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.22);
}

.birthday-message {
  margin: 0;
  color: #2D3E94;
  font-weight: 700;
  line-height: 1.5;
}

.birthday-actions {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.birthday-primary,
.birthday-secondary {
  border-radius: 12px;
  padding: 11px 14px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
}

.birthday-primary {
  border: none;
  background: #FFD200;
  color: #2D3E94;
}

.birthday-secondary {
  border: 2px solid #E91E81;
  background: #fff;
  color: #E91E81;
}

.birthday-fade-enter-active,
.birthday-fade-leave-active {
  transition: opacity 0.3s ease;
}

.birthday-fade-enter-from,
.birthday-fade-leave-to {
  opacity: 0;
}

/* Botón flotante WhatsApp */
.whatsapp-btn {
  position: fixed;
  bottom: 32px;
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

@media (max-width: 768px) {
  .whatsapp-btn {
    bottom: 80px;
    right: 16px;
    width: 52px;
    height: 52px;
  }

  .whatsapp-btn img {
    width: 32px;
    height: 32px;
  }
}

@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  70%  { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}
</style>
