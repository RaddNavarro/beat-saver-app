// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOUsYWjjztHz6m5Hsfnu09DMITPd_jA7s",
  authDomain: "beat-saver-60772.firebaseapp.com",
  projectId: "beat-saver-60772",
  storageBucket: "beat-saver-60772.firebasestorage.app",
  messagingSenderId: "923816585194",
  appId: "1:923816585194:web:dcea92ba1cf93ac485f493",
  measurementId: "G-GD12ZMVNF3",
};

// Initialize Firebase
let APP = initializeApp(firebaseConfig);
// if (firebase.apps.length === 0) {
//   APP = initializeApp(firebaseConfig);
// } else {
//   APP = firebase.app();
// }

const AUTH = initializeAuth(APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const DB = getFirestore(APP);

export { AUTH, DB };
