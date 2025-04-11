import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgeDX447ZFhTRn7gdaHWYQp4TlwSmY1WE",
  authDomain: "xwitter-clone-6b314.firebaseapp.com",
  projectId: "xwitter-clone-6b314",
  storageBucket: "xwitter-clone-6b314.firebasestorage.app",
  messagingSenderId: "818950006986",
  appId: "1:818950006986:web:5a872e70c2da0ccea52c33"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);