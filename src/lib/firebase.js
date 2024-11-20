import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Конфігурація Firebase (використовуйте свої дані з Firebase Console)
const firebaseConfig = {};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);
export { storage };
