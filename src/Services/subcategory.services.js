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

const subcategoryCollectionRef = collection(db, "subcategory");
class SubCategoryDataServices {
  addSubCategory = (newSubCategory) => {
    return addDoc(subcategoryCollectionRef, newSubCategory);
  };

  getSubCategories = () => {
    return getDocs(subcategoryCollectionRef);
  };

  updateSubCategory = (id, updatedSubCategory) => {
    const subcategoryDoc = doc(db, "subcategory", id);
    return updateDoc(subcategoryDoc, updatedSubCategory);
  };

  deleteSubCategory = (id) => {
    const subcategoryDoc = doc(db, "subcategory", id);
    return deleteDoc(subcategoryDoc);
  };

  getSubCategory = (id) => {
    const subcategoryDoc = doc(db, "subcategory", id);
    return getDoc(subcategoryDoc);
  };
}

export default new SubCategoryDataServices();
