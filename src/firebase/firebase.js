import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import cors from "cors";

const firebaseConfig = {
  apiKey: "AIzaSyAC0wgHN5Qqi_vBS-N7OXHxtZvONu1UWpk",
  authDomain: "capstone-gist.firebaseapp.com",
  projectId: "capstone-gist",
  storageBucket: "capstone-gist.appspot.com",
  messagingSenderId: "1018227032561",
  appId: "1:1018227032561:web:a9a3eb20da31d85ea64450",
  measurementId: "G-GLKB2QSL6V",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
  } else {
  }
});

export { firebaseApp, auth };
