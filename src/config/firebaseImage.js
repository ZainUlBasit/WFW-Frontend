// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjA873Pb_r_9O2bnkJ8ni2v51zyrDoGaA",
  authDomain: "wfw-system.firebaseapp.com",
  projectId: "wfw-system",
  storageBucket: "wfw-system.appspot.com",
  messagingSenderId: "448478680138",
  appId: "1:448478680138:web:3ad628fc23a39a7c1a42b3",
};

// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export default firebase;
// export defaultf
// export const storage = getStorage(app);
