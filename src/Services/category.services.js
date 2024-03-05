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

const categoryCollectionRef = collection(db, "category");
class CategoryDataServices {
  addCategory = (newCategory) => {
    console.log(newCategory);
    return addDoc(categoryCollectionRef, newCategory);
  };

  getCategories = () => {
    return getDocs(categoryCollectionRef);
  };

  updateCategory = (id, updatedCategory) => {
    const categoryDoc = doc(db, "category", id);
    return updateDoc(categoryDoc, updatedCategory);
  };

  deleteCategory = (id) => {
    const categoryDoc = doc(db, "category", id);
    return deleteDoc(categoryDoc);
  };

  getCategory = (id) => {
    const categoryDoc = doc(db, "category", id);
    return getDoc(categoryDoc);
  };
}

export default new CategoryDataServices();
