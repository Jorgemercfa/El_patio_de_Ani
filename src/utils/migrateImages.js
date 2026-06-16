import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import productsSeed from '@/data/product';
import { db, isFirebaseConfigured, storage } from '@/firebase';

const PRODUCTS_COLLECTION = 'products';
const STORAGE_FOLDER = 'products';

function getFileExtension(blobType) {
  if (blobType === 'image/png') return 'png';
  if (blobType === 'image/webp') return 'webp';
  if (blobType === 'image/gif') return 'gif';
  return 'jpg';
}

export async function migrateProductImages(onProgress) {
  if (!isFirebaseConfigured || !db || !storage) {
    throw new Error('Firebase no está configurado correctamente.');
  }

  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  const firestoreDocs = snapshot.docs.map((item) => ({ docId: item.id, ...item.data() }));

  let done = 0;
  const total = productsSeed.length;
  const results = [];

  for (const seedProduct of productsSeed) {
    try {
      const firestoreDoc = firestoreDocs.find(
        (item) => Number(item?.id) === Number(seedProduct?.id),
      );

      if (!firestoreDoc) {
        results.push({ id: seedProduct.id, name: seedProduct.name, status: 'not_found' });
        done += 1;
        onProgress?.(done, total);
        continue;
      }

      if (
        typeof firestoreDoc.image === 'string' &&
        firestoreDoc.image.trim().startsWith('https://')
      ) {
        results.push({ id: seedProduct.id, name: seedProduct.name, status: 'skipped' });
        done += 1;
        onProgress?.(done, total);
        continue;
      }

      const imageDataUrl = String(seedProduct?.image || '').trim();
      if (!imageDataUrl) {
        throw new Error('El producto seed no tiene imagen.');
      }

      const response = await fetch(imageDataUrl);
      if (!response.ok) {
        throw new Error(`No se pudo leer la imagen local (${response.status}).`);
      }

      const blob = await response.blob();
      if (!blob?.size) {
        throw new Error('La imagen está vacía.');
      }

      const ext = getFileExtension(blob.type);
      const filename = `${STORAGE_FOLDER}/product_${seedProduct.id}_${Date.now()}.${ext}`;
      const fileRef = storageRef(storage, filename);

      await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(fileRef);

      await updateDoc(doc(db, PRODUCTS_COLLECTION, firestoreDoc.docId), { image: downloadURL });

      results.push({
        id: seedProduct.id,
        name: seedProduct.name,
        status: 'success',
        url: downloadURL,
      });
    } catch (error) {
      results.push({
        id: seedProduct.id,
        name: seedProduct.name,
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
      });
    }

    done += 1;
    onProgress?.(done, total);
  }

  return results;
}
