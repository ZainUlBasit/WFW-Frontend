import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Request = ({ customer, RefreshData }) => {
  const [OpenDetail, setOpenDetail] = useState(false);
  const handleDelete = async () => {
    const customerDoc = doc(db, "customers", customer._id);
    deleteDoc(customerDoc);
    alert("Customer Successfully Deleted");
    RefreshData();
  };
  const handleAccept = async () => {
    const customerDoc = doc(db, "customers", customer._id);
    await updateDoc(customerDoc, {
      verify: true,
      total: 0,
      remaining: 0,
      paid: 0,
      ref: "no",
      page: 0,
      discount: 0,
    });
    createUserWithEmailAndPassword(auth, customer.email, customer.password);
    alert("Customer Successfully Accepted");
    RefreshData();
  };
  return (
    <div className="flex flex-col items-end">
      <div className="w-full flex justify-between items-center mt-[10px] border-[#5a4ae3] border-[1px] px-[10px] py-[5px] rounded-t-[10px] shadow-[5px_5px_0px_0px_rgba(109,40,217)] bg-[aliceblue]">
        <div className="text-[1rem] font-bold text-[#5a4ae3]">
          {customer.name}
        </div>
        <div className="flex flex-row justify-center items-center">
          <div
            className="bg-[green] text-white py-[10px] px-[10px] rounded-[10px] cursor-pointer border-[2px] border-[green] hover:bg-white hover:text-[green] transition-all duration-700 text-[.8rem] font-bold"
            onClick={handleAccept}
          >
            Accept
          </div>
          {OpenDetail ? (
            <KeyboardArrowUpIcon
              style={{
                color: "#5a4ae3",
                marginLeft: 4,
                fontSize: "3ch",
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={() => setOpenDetail(!OpenDetail)}
            />
          ) : (
            <KeyboardArrowDownIcon
              style={{
                color: "#5a4ae3",
                marginLeft: 4,
                fontSize: "3ch",
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={() => setOpenDetail(!OpenDetail)}
            />
          )}
        </div>
      </div>
      {OpenDetail ? (
        <div className="border-[2px] border-[#6D28D9] rounded-t-[0px] rounded-b-[8px] w-[99.5%] p-[10px]">
          <div className="text-[#5a4ae3] font-bold flex flex-row">
            <div className="text-black pr-1">Email: </div>
            <span className="underline">{customer.email}</span>
          </div>
          {/* <div className="text-[#5a4ae3] font-bold flex flex-row">
            <div className="text-black pr-1">Password: </div>
            <span className="underline">{customer.password}</span>
          </div> */}
          <div className="text-[#5a4ae3] font-bold flex flex-row">
            <div className="text-black pr-1">Contact: </div>
            <span className="underline">{customer.contact}</span>
          </div>
          <div className="text-[#5a4ae3] font-bold flex flex-row">
            <div className="text-black pr-1">CNIC: </div>
            <span className="underline">{customer.cnic}</span>
          </div>
          <div className="text-[#5a4ae3] font-bold flex flex-row">
            <div className="text-black pr-1">Address: </div>
            <span className="underline">{customer.address}</span>
          </div>
          <div className="text-[#5a4ae3] font-bold flex flex-row">
            <div className="text-black pr-1">Shop: </div>
            <span className="underline">{customer.shop}</span>
          </div>
          <div className="text-[#5a4ae3] font-bold flex flex-row justify-end">
            <button
              className="border-[2px] border-[red] bg-[red] text-white py-[5px] px-[10px] hover:bg-white hover:text-[red] hover:rounded-[8px] transition-all duration-700 "
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Request;
