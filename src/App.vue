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
      href="https://wa.me/51975495623?text=¡Hola!%20Me%20gustaría%20más%20información."
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-btn"
      aria-label="Contactar por WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="38"
        height="38"
        fill="white"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
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
