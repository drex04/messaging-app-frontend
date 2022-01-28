// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_8z1-umZ7FIFAxcDHX3GNCufNI3b5jiE",
  authDomain: "test-project-8ed81.firebaseapp.com",
  projectId: "test-project-8ed81",
  storageBucket: "test-project-8ed81.appspot.com",
  messagingSenderId: "20631184582",
  appId: "1:20631184582:web:d8cf9f3d02b950d7d2a3c7",
  measurementId: "G-FFRQ0C0D9P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}
