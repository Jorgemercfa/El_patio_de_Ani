import { storage } from './configuration';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

export const uploadImage = async (file, path) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};

export const deleteImage = (path) => {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
};