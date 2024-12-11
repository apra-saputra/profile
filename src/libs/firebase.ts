// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfiguration: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STOREBUCKET,
};

// Initialize Firebase
const app = initializeApp(firebaseConfiguration);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

export default app;

export { signInWithPopup, auth, analytics, provider };
