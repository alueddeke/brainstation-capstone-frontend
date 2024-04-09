// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import cors from "cors";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAC0wgHN5Qqi_vBS-N7OXHxtZvONu1UWpk",
  authDomain: "capstone-gist.firebaseapp.com",
  projectId: "capstone-gist",
  storageBucket: "capstone-gist.appspot.com",
  messagingSenderId: "1018227032561",
  appId: "1:1018227032561:web:a9a3eb20da31d85ea64450",
  measurementId: "G-GLKB2QSL6V",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(firebaseApp);
// const database = getFirestore(firebaseApp);

//detect auth status
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log("Logged in!!");
  } else {
    console.log("No user");
  }
});

export { firebaseApp, auth };
