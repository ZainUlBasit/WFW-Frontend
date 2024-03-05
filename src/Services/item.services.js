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

const itemCollectionRef = collection(db, "item");
class ItemDataServices {
  addItem = (newItem) => {
    return addDoc(itemCollectionRef, newItem);
  };

  getAllItems = () => {
    return getDocs(itemCollectionRef);
  };

  updateItem = (id, updatedItem) => {
    const itemDoc = doc(db, "item", id);
    return updateDoc(itemDoc, updatedItem);
  };

  updateItemQty = (id, updatedItemQty) => {
    console.log(updatedItemQty);
    const itemDoc = doc(db, "item", id);
    return updateDoc(itemDoc, {
      itemqty: firebase.firestore.FieldValue.increment(updatedItemQty),
    });
  };

  deleteItem = (id) => {
    const itemDoc = doc(db, "item", id);
    return deleteDoc(itemDoc);
  };
}

export default new ItemDataServices();
