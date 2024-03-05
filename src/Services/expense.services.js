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

const expenseCollectionRef = collection(db, "expenses");
class ExpenseDataService {
  addExpense = (newExpense) => {
    return addDoc(expenseCollectionRef, newExpense);
  };

  getExpenses = () => {
    return getDocs(expenseCollectionRef);
  };
}
export default new ExpenseDataService();
