import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIDKm7qEoyF6bkk8i4Gj7ALdzig84oNJg",
  authDomain: "inuxserver.firebaseapp.com",
  projectId: "inuxserver",
  storageBucket: "inuxserver.firebasestorage.app",
  messagingSenderId: "621683693723",
  appId: "1:621683693723:web:b24b324ba4b5745a81ce3e",
  measurementId: "G-YYLQ1X6R0V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
