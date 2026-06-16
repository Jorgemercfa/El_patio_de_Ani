<script setup>
import { ref } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import { migrateProductImages } from '@/utils/migrateImages';

const running = ref(false);
const progress = ref(0);
const total = ref(0);
const results = ref([]);
const done = ref(false);
const error = ref('');

async function startMigration() {
  running.value = true;
  progress.value = 0;
  total.value = 0;
  done.value = false;
  results.value = [];
  error.value = '';

  try {
    const migrationResults = await migrateProductImages((current, tot) => {
      progress.value = current;
      total.value = tot;
    });
    results.value = migrationResults;
    done.value = true;
  } catch (migrationError) {
    error.value =
      migrationError instanceof Error ? migrationError.message : String(migrationError);
  } finally {
    running.value = false;
  }
}
</script>

<template>
  <AdminLayout>
    <div class="migrate-panel">
      <h2>Migración de imágenes</h2>
      <p>Este proceso sube las imágenes del catálogo a Firebase Storage y actualiza Firestore.</p>
      <p><strong>Solo ejecutar una vez.</strong></p>

      <button class="migrate-btn" :disabled="running" @click="startMigration">
        {{ running ? `Migrando... ${progress}/${total}` : 'Iniciar migración' }}
      </button>

      <div v-if="running" class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: total ? `${(progress / total) * 100}%` : '0%' }"
        />
      </div>

      <div v-if="error" class="error-msg">{{ error }}</div>

      <div v-if="done" class="results">
        <h3>Resultado:</h3>
        <p>✅ Exitosos: {{ results.filter((item) => item.status === 'success').length }}</p>
        <p>
          ⏭️ Saltados (ya tenían imagen):
          {{ results.filter((item) => item.status === 'skipped').length }}
        </p>
        <p>
          ❌ No encontrados en Firestore:
          {{ results.filter((item) => item.status === 'not_found').length }}
        </p>
        <p>⚠️ Errores: {{ results.filter((item) => item.status === 'error').length }}</p>

        <details v-if="results.filter((item) => item.status === 'error').length > 0">
          <summary>Ver errores</summary>
          <ul>
            <li v-for="item in results.filter((entry) => entry.status === 'error')" :key="item.id">
              {{ item.name }}: {{ item.error }}
            </li>
          </ul>
        </details>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.migrate-panel {
  background: white;
  border: 2px solid #e91e81;
  border-radius: 14px;
  padding: 24px;
  max-width: 600px;
}

.migrate-panel h2 {
  color: #2d3e94;
  margin-top: 0;
}

.migrate-btn {
  background: #e91e81;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 16px;
}

.migrate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.progress-bar {
  margin-top: 16px;
  height: 12px;
  background: #f0d3e6;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #e91e81, #2d3e94);
  border-radius: 999px;
  transition: width 0.3s;
}

.error-msg {
  color: #b00020;
  margin-top: 12px;
  font-weight: 600;
}

.results {
  margin-top: 20px;
}

.results h3 {
  color: #2d3e94;
}
</style>
