// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: Object = {
  apiKey: 'AIzaSyCquKw6KDQP87HQ4jUTQYyiRxpklwzy6Xs',
  authDomain: 'journalitynote.firebaseapp.com',
  projectId: 'journalitynote',
  storageBucket: 'journalitynote.appspot.com',
  messagingSenderId: '88348090741',
  appId: '1:88348090741:web:6f14dbd1c33380f316733c'
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)
const db: Firestore = getFirestore(app)
const auth = getAuth(app);

export { db, auth}
