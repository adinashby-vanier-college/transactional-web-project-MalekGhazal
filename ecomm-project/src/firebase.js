// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFC72Vg2z0DIP9_LLuJNDUql20njoJWr4",
  authDomain: "ecwp-53c12.firebaseapp.com",
  projectId: "ecwp-53c12",
  storageBucket: "ecwp-53c12.appspot.com",
  messagingSenderId: "534068696028",
  appId: "1:534068696028:web:a0d7cea1b257c4f1fa7519",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
