import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiLDDaDKFNnEf1gclo1IiUUX4zrKCNq18",
  authDomain: "wfw-expert-system-cff9e.firebaseapp.com",
  projectId: "wfw-expert-system-cff9e",
  storageBucket: "wfw-expert-system-cff9e.appspot.com",
  messagingSenderId: "262156476109",
  appId: "1:262156476109:web:365400f1336a76e3bb1384",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
