// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW4LlewSUy7sJeP9kwdbt65ay4zCmM060",
  authDomain: "practise-app-1a6a0.firebaseapp.com",
  projectId: "practise-app-1a6a0",
  storageBucket: "practise-app-1a6a0.firebasestorage.app",
  messagingSenderId: "725478417483",
  appId: "1:725478417483:web:948db15fcf17c5739e19ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
