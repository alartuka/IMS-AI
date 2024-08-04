// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';

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
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Upload images to Firebase Storage
// const uploadImages = async (images) => {
//   const uploadPromises = images.map(async (image, index) => {
//     const storageRef = ref(storage, `images/${Date.now()}_${index}.jpg`);
//     const snapshot = await uploadString(storageRef, image, 'data_url');
//     const downloadURL = await getDownloadURL(snapshot.ref);
//     return downloadURL;
//   });

//   return Promise.all(uploadPromises);
// };

// Fetch classified data from Firestore
// const fetchClassifiedData = async () => {
//   const snapshot = await getDocs(collection(firestore, 'image-classifications'));
//   return snapshot.docs.map((doc) => doc.data());
// };

export { firestore, app, storage };
// export { firestore, app, storage, uploadImages, fetchClassifiedData };