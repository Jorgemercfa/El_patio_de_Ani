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

function resolveSeedImageSource(imageSource) {
  if (imageSource.startsWith('data:') || imageSource.startsWith('blob:')) {
    return imageSource;
  }

  const currentOrigin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'http://localhost';
  const parsedUrl = new URL(imageSource, currentOrigin);

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('La imagen del seed tiene un protocolo no permitido.');
  }

  if (parsedUrl.origin !== currentOrigin) {
    throw new Error('La imagen del seed debe pertenecer al mismo origen de la app.');
  }

  return parsedUrl.toString();
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
      const seedId = Number(seedProduct?.id);
      const firestoreDoc = firestoreDocs.find(
        (item) => Number.isFinite(seedId) && Number(item?.id) === seedId,
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
        throw new Error(
          `El producto seed ${seedProduct.id} (${seedProduct.name}) no tiene imagen.`,
        );
      }

      const sourceToFetch = resolveSeedImageSource(imageDataUrl);
      const response = await fetch(sourceToFetch);
      if (!response.ok) {
        throw new Error(
          `No se pudo leer la imagen local del producto ${seedProduct.id} (${response.status}).`,
        );
      }

      const blob = await response.blob();
      if (!blob?.size) {
        throw new Error(`La imagen del producto ${seedProduct.id} está vacía.`);
      }

      const ext = getFileExtension(blob.type);
      const filename = `${STORAGE_FOLDER}/product_${seedProduct.id}.${ext}`;
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
