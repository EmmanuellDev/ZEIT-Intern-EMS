// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA1ar53mHYs7u-P-Mz2DJ9kYiDU3uUtWos",
  authDomain: "employee-ms-96481.firebaseapp.com",
  projectId: "employee-ms-96481",
  storageBucket: "employee-ms-96481.appspot.com",
  messagingSenderId: "434731769386",
  appId: "1:434731769386:web:0c52d0d1e79af3d50aad53",
  measurementId: "G-JVRPX5R48K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
