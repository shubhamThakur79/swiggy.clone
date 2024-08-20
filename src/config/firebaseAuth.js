// config/firebaseAuth.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Replace these with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyA0W93SbRsb_TwToNW7XlrMG2IKSTh44tw",
    authDomain: "swiggy-project-e91fd.firebaseapp.com",
    projectId: "swiggy-project-e91fd",
    storageBucket: "swiggy-project-e91fd.appspot.com",
    messagingSenderId: "137851827411",
    appId: "1:137851827411:web:796baa1d08a9d80b1fd026",
    measurementId: "G-P6R6SB6F72"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider };
