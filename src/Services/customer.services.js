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

const customerCollectionRef = collection(db, "customers");
class CustomerDataServices {
  addCustomer = (newCustomer) => {
    return addDoc(customerCollectionRef, newCustomer);
  };

  updateCustomer = (id, updatedCustomer) => {
    const customerDoc = doc(db, "customers", id);
    return updateDoc(customerDoc, updatedCustomer);
  };

  updateCustomerTotal = (id, Total, Discount) => {
    const customerDoc = doc(db, "customers", id);
    return updateDoc(customerDoc, {
      total: firebase.firestore.FieldValue.increment(Total),
      discount: firebase.firestore.FieldValue.increment(Discount),
      remaining: firebase.firestore.FieldValue.increment(Total),
    });
  };

  updateCustomerCash = (id, cashPayment) => {
    const customerDoc = doc(db, "customers", id);
    const Remaining = Number(cashPayment) * -1;
    return updateDoc(customerDoc, {
      remaining: firebase.firestore.FieldValue.increment(Remaining),
      paid: firebase.firestore.FieldValue.increment(cashPayment),
    });
  };

  updateCustomerAdvance = (id, advanceCash) => {
    const customerDoc = doc(db, "customers", id);
    return updateDoc(customerDoc, {
      advance: firebase.firestore.FieldValue.increment(advanceCash),
    });
  };

  deleteCustomer = (id) => {
    const customerDoc = doc(db, "customers", id);
    return deleteDoc(customerDoc);
  };

  getAllCustomers = () => {
    return getDocs(customerCollectionRef);
  };

  getCustomer = (id) => {
    const customerDoc = doc(db, "customers", id);
    return getDoc(customerDoc);
  };
}

export default new CustomerDataServices();
