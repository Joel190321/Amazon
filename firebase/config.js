import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getUserRole } from './firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA0qadKEGu0Y7uJehzD57M6xsJf7bakJ8I",
  authDomain: "afiliados-fd9c9.firebaseapp.com",
  projectId: "afiliados-fd9c9",
  storageBucket: "afiliados-fd9c9.firebasestorage.app",
  messagingSenderId: "649144915770",
  appId: "1:649144915770:web:176d500d7d9fd41cca6203",
  measurementId: "G-C4T9CL7ZS5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

async function isUserAdmin(uid) {
  if (!uid) return false;
  const role = await getUserRole(uid);
  return role === 'admin';
}

export { db, auth, googleProvider, isUserAdmin };
