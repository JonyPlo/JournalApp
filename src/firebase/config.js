// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
// };
const firebaseConfig = {
  apiKey: 'AIzaSyAE_EzdIORFla3daneOgm9Vv1xNzkwT1XM',
  authDomain: 'journalapp-firebase-d6a80.firebaseapp.com',
  projectId: 'journalapp-firebase-d6a80',
  storageBucket: 'journalapp-firebase-d6a80.appspot.com',
  messagingSenderId: '641354242186',
  appId: '1:641354242186:web:f55e7dea59d6c59f6af573',
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);