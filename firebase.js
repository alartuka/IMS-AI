// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  // "AIzaSyAX4CfA6Vd2nAwXjdLy59I8WzzIlw7WNDs",
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  // "ims-ai.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  // "ims-ai",
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  // "ims-ai.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MEASUREMENT_SENDER_ID,
  // "2647719839",
  appId: process.env.NEXT_PUBLIC_APP_ID,
  // "1:2647719839:web:9c93f3778a3386411307aa",
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  // "G-5HGNBKQS86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { firestore, app, storage, auth };
