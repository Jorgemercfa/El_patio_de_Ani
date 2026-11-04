#!/usr/bin/env node

/**
 * Script para auditar y eliminar imágenes no referenciadas en Firestore
 * 
 * Uso:
 *   node scripts/cleanup-unused-images.js --audit     (solo lista sin eliminar)
 *   node scripts/cleanup-unused-images.js --delete    (elimina después de confirmar)
 * 
 * Requiere:
 *   - FIREBASE_SERVICE_ACCOUNT_KEY en variables de entorno
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ─────────────────────────────────────────────────────────────────────
// Configurar Firebase Admin
// ─────────────────────────────────────────────────────────────────────

function initializeFirebase() {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountJson) {
    console.error(
      '❌ Error: FIREBASE_SERVICE_ACCOUNT_KEY no está definida.\n' +
      '   Exporta tu archivo JSON de Firebase:\n' +
      '   export FIREBASE_SERVICE_ACCOUNT_KEY="$(cat /path/to/serviceAccountKey.json)"'
    );
    process.exit(1);
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: serviceAccount.project_id + '.appspot.com',
    });
    console.log('✅ Firebase inicializado correctamente\n');
  } catch (error) {
    console.error('❌ Error parseando FIREBASE_SERVICE_ACCOUNT_KEY:', error.message);
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────────────
// Obtener URLs referenciadas en Firestore
// ─────────────────────────────────────────────────────────────────────

async function getReferencedImageUrls() {
  const db = admin.firestore();
  const usedUrls = new Set();
  const urlsBySource = {
    products: new Set(),
    proms: new Set(),
  };

  console.log('📋 Buscando URLs referenciadas en Firestore...\n');

  // Colección "products"
  try {
    const productsSnap = await db.collection('products').get();
    console.log(`   📦 products: ${productsSnap.size} documentos`);

    productsSnap.forEach((doc) => {
      const data = doc.data();

      // Campo "image" (imagen principal)
      if (data.image && typeof data.image === 'string') {
        usedUrls.add(data.image);
        urlsBySource.products.add(data.image);
      }

      // Campo "images" (galería)
      if (Array.isArray(data.images)) {
        data.images.forEach((url) => {
          if (typeof url === 'string' && url.trim()) {
            usedUrls.add(url);
            urlsBySource.products.add(url);
          }
        });
      }
    });
    console.log(`   ✓ ${urlsBySource.products.size} URLs encontradas\n`);
  } catch (error) {
    console.error('   ❌ Error leyendo "products":', error.message);
  }

  // Colección "proms" (promociones)
  try {
    const promsSnap = await db.collection('proms').get();
    console.log(`   🎉 proms: ${promsSnap.size} documentos`);

    promsSnap.forEach((doc) => {
      const data = doc.data();

      if (data.image && typeof data.image === 'string') {
        usedUrls.add(data.image);
        urlsBySource.proms.add(data.image);
      }
    });
    console.log(`   ✓ ${urlsBySource.proms.size} URLs encontradas\n`);
  } catch (error) {
    console.error('   ❌ Error leyendo "proms":', error.message);
  }

  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ TOTAL: ${usedUrls.size} URLs referenciadas\n`);

  return { usedUrls, urlsBySource };
}

// ─────────────────────────────────────────────────────────────────────
// Extraer nombre de archivo de URL de Firebase Storage
// ─────────────────────────────────────────────────────────────────────

function extractFilePathFromUrl(url) {
  try {
    // Formato: https://firebasestorage.googleapis.com/v0/b/BUCKET/o/ENCODED_PATH?alt=media&...
    // Decodificar %2F en / y otros caracteres
    const match = url.match(/\/o\/([^?]+)/);
    if (match) {
      return decodeURIComponent(match[1]);
    }
  } catch (error) {
    // Silent error
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────
// Obtener archivos en Storage
// ─────────────────────────────────────────────────────────────────────

async function getStorageFiles(prefix = 'products/') {
  const bucket = admin.storage().bucket();
  const files = [];

  console.log(`🗂️  Listando archivos en Storage (${prefix})...\n`);

  try {
    const [storageFiles] = await bucket.getFiles({ prefix });

    storageFiles.forEach((file) => {
      files.push({
        name: file.name,
        size: file.metadata.size || 0,
        updated: file.metadata.updated,
      });
    });

    console.log(`   ✓ ${files.length} archivos encontrados\n`);
  } catch (error) {
    console.error('   ❌ Error listando Storage:', error.message);
  }

  return files;
}

// ─────────────────────────────────────────────────────────────────────
// Comparar y encontrar huérfanas
// ─────────────────────────────────────────────────────────────────────

function findUnusedFiles(storageFiles, referencedUrls) {
  const unused = [];

  storageFiles.forEach((file) => {
    // Verificar si esta ruta de archivo está referenciada en alguna URL
    const isUsed = Array.from(referencedUrls).some((url) => {
      const filePath = extractFilePathFromUrl(url);
      return filePath === file.name;
    });

    if (!isUsed) {
      unused.push(file);
    }
  });

  return unused;
}

// ─────────────────────────────────────────────────────────────────────
// Mostrar reporte
// ─────────────────────────────────────────────────────────────────────

function showReport(storageFiles, unusedFiles) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 REPORTE DE AUDITORÍA\n');

  const totalSize = storageFiles.reduce((sum, f) => sum + (f.size || 0), 0);
  const unusedSize = unusedFiles.reduce((sum, f) => sum + (f.size || 0), 0);

  console.log(`📁 Archivos en Storage: ${storageFiles.length}`);
  console.log(`📦 Tamaño total: ${formatBytes(totalSize)}`);
  console.log(`\n🗑️  Archivos NO referenciados: ${unusedFiles.length}`);
  console.log(`💾 Espacio que se liberaría: ${formatBytes(unusedSize)}`);
  console.log(`📈 Porcentaje: ${((unusedSize / totalSize) * 100).toFixed(1)}%\n`);

  if (unusedFiles.length > 0) {
    console.log('Archivos a eliminar:\n');
    unusedFiles.slice(0, 10).forEach((file) => {
      console.log(`   ❌ ${file.name} (${formatBytes(file.size || 0)})`);
    });

    if (unusedFiles.length > 10) {
      console.log(`   ... y ${unusedFiles.length - 10} más`);
    }
    console.log('');
  }

  return unusedSize;
}

// ─────────────────────────────────────────────────────────────────────
// Eliminar archivos
// ─────────────────────────────────────────────────────────────────────

async function deleteUnusedFiles(unusedFiles) {
  if (unusedFiles.length === 0) {
    console.log('✅ No hay archivos para eliminar\n');
    return 0;
  }

  const bucket = admin.storage().bucket();
  let deleted = 0;
  let errors = 0;

  console.log(`🗑️  Eliminando ${unusedFiles.length} archivos...\n`);

  for (const file of unusedFiles) {
    try {
      await bucket.file(file.name).delete();
      deleted++;
      if (deleted % 5 === 0) {
        console.log(`   ✓ ${deleted}/${unusedFiles.length} eliminados...`);
      }
    } catch (error) {
      console.error(`   ⚠️  No se pudo eliminar ${file.name}: ${error.message}`);
      errors++;
    }
  }

  console.log(`\n✅ Eliminación completada:`);
  console.log(`   ✓ Éxitos: ${deleted}`);
  if (errors > 0) {
    console.log(`   ⚠️  Errores: ${errors}`);
  }
  console.log('');

  return deleted;
}

// ─────────────────────────────────────────────────────────────────────
// Prompts interactivos
// ─────────────────────────────────────────────────────────────────────

function askConfirmation(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`\n${message} (s/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 's');
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// Utilidades
// ─────────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ─────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const isAuditOnly = args.includes('--audit');
  const isDeleteMode = args.includes('--delete');

  console.log('\n');
  console.log('╔════════════════════════════════════════╗');
  console.log('║  🗂️  Firebase Storage Cleanup Utility  ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Inicializar Firebase
  initializeFirebase();

  // Obtener URLs referenciadas
  const { usedUrls } = await getReferencedImageUrls();

  // Listar archivos en Storage
  const storageFiles = await getStorageFiles();

  // Encontrar huérfanas
  const unusedFiles = findUnusedFiles(storageFiles, usedUrls);

  // Mostrar reporte
  const unusedSize = showReport(storageFiles, unusedFiles);

  // Modo audit (solo lectura)
  if (isAuditOnly) {
    console.log('ℹ️  Modo AUDIT: no se eliminó nada\n');
    process.exit(0);
  }

  // Modo delete (con confirmación)
  if (unusedFiles.length > 0 && !isDeleteMode) {
    console.log('💡 Ejecuta con --delete para eliminar estos archivos');
    console.log('   Ejemplo: node scripts/cleanup-unused-images.js --delete\n');
    process.exit(0);
  }

  if (isDeleteMode && unusedFiles.length > 0) {
    const confirmed = await askConfirmation(
      `⚠️  ¿Confirmar eliminación de ${unusedFiles.length} archivos (${formatBytes(unusedSize)})?`
    );

    if (confirmed) {
      const deletedCount = await deleteUnusedFiles(unusedFiles);
      console.log(`💰 Espacio liberado: ${formatBytes(unusedSize)}\n`);
    } else {
      console.log('\n❌ Operación cancelada\n');
    }
  }

  process.exit(0);
}

// Ejecutar
main().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
