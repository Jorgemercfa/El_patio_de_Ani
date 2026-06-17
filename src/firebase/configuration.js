import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkzVDgX2WU382pIv2Qmoar9NnKcb9bWCA",
  authDomain: "el-patio-de-ani.firebaseapp.com",
  projectId: "el-patio-de-ani",
  storageBucket: "el-patio-de-ani.firebasestorage.app",
  messagingSenderId: "971509876310",
  appId: "1:971509876310:web:c7c033fe677a9f6c74ddf7",
  measurementId: "G-728SC66LWR"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export const isFirebaseConfigured = !!app;