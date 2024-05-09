// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzvBx-rHi3EEeEY4BbSWaL8evc4Auq9pc",
  authDomain: "web-cosmetics.firebaseapp.com",
  projectId: "web-cosmetics",
  storageBucket: "web-cosmetics.appspot.com",
  messagingSenderId: "129650941165",
  appId: "1:129650941165:web:aeda7cbdede1ead47bc0e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase storage service
const storage = getStorage(app);

export { storage }; // Export the storage service for use in your application
