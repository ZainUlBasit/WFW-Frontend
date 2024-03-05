import { db } from "../config/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users");
class UserDataServices {
  getUsers = () => {
    return getDocs(userCollectionRef);
  };
}

export default new UserDataServices();
