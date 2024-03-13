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
const cashpaymentCollectionRef = collection(db, "cashpayment");
class CashPaymentDataServices {
  addPayment = (newPayment) => {
    return addDoc(cashpaymentCollectionRef, newPayment);
  };

  getPayments = () => {
    return getDocs(cashpaymentCollectionRef);
  };
}
export default new CashPaymentDataServices();
