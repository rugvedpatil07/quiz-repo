import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmI0ZqlrSarLkDYFTKAHhbgPjf36CZFN8",
  authDomain: "master-quiz-rp07.firebaseapp.com",
  projectId: "master-quiz-rp07",
  storageBucket: "master-quiz-rp07.firebasestorage.app",
  messagingSenderId: "484192702436",
  appId: "1:484192702436:web:82d77a1ddd4f2f164f81f1"
};

// Initialize Firebase only if it hasn't been initialized already (important for Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
