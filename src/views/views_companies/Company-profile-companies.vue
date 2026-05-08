<script setup>
import { computed } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import { useSessionCompany } from '@/auth/session_companies';

const { state } = useSessionCompany();
const initials = computed(() => {
  const name = state.company?.name || '';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase())
    .join('') || 'EP';
});
</script>

<template>
  <AdminLayout>
    <section class="profile-card">
      <div class="avatar">{{ initials }}</div>
      <h2>{{ state.company?.name || 'Empresa' }}</h2>
      <p>{{ state.company?.email }}</p>
      <p class="helper">
        Desde aquí puedes revisar tus datos de acceso al panel administrativo.
      </p>
    </section>
  </AdminLayout>
</template>

<style scoped>
.profile-card {
  background: white;
  border: 2px solid #E91E81;
  border-radius: 14px;
  padding: 24px;
  text-align: center;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #2D3E94;
  color: white;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0 auto 12px;
}

h2 {
  margin: 0;
  color: #2D3E94;
}

p {
  margin: 6px 0;
}

.helper {
  color: #666;
}
</style>
