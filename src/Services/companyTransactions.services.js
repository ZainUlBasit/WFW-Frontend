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

const companyTransactionCollectionRef = collection(db, "company-transaction");

class CompanyTransactionDataServices {
  addTransaction = (newTransaction) => {
    return addDoc(companyTransactionCollectionRef, newTransaction);
  };

  getAllTransactions = () => {
    return getDocs(companyTransactionCollectionRef);
  };
  
}

export default new CompanyTransactionDataServices();
