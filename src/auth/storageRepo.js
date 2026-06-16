import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from '@/firebase';

/**
 * Configuración recomendada en Firebase Storage:
 * rules_version = '2';
 * service firebase.storage {
 *   match /b/{bucket}/o {
 *     match /products/{allPaths=**} {
 *       allow read: if true;
 *       allow write: if request.auth != null;
 *     }
 *   }
 * }
 */
export async function uploadImage(file, folder = 'products') {
  if (!isFirebaseConfigured || !storage) {
    throw new Error('Firebase Storage no está configurado.');
  }

  if (!file) {
    throw new Error('No se seleccionó ningún archivo.');
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Solo se permiten imágenes JPG, PNG, WEBP o GIF.');
  }

  const MAX_SIZE_MB = 5;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`La imagen no puede superar ${MAX_SIZE_MB}MB.`);
  }

  const extensionByType = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };
  const ext = extensionByType[file.type];
  const filename = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const fileRef = storageRef(storage, filename);

  const snapshot = await uploadBytesResumable(fileRef, file);
  return getDownloadURL(snapshot.ref);
}
