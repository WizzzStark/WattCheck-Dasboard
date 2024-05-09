import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAEZoqdSvfAFoIEdY7RASAI2RNWrzZfaaY",
    authDomain: "wattcheck-52a95.firebaseapp.com",
    projectId: "wattcheck-52a95",
    storageBucket: "wattcheck-52a95.appspot.com",
    messagingSenderId: "559272381271",
    appId: "1:559272381271:web:2cb206e3125ae7ae4e0c12"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };