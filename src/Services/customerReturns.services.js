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
} from "firebase/firestore";

const customerReturnCollectionRef = collection(db, "customer-return");
class CustomerReturnDataServices {
  addReturn = (newRrturn) => {
    return addDoc(customerReturnCollectionRef, newRrturn);
  };

  getAllReturns = () => {
    return getDocs(customerReturnCollectionRef);
  };
}

export default new CustomerReturnDataServices();
