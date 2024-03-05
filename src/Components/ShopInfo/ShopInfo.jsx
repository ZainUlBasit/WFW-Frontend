import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const ShopInfo = ({ shop, RefreshData }) => {
  const [OpenDetail, setOpenDetail] = useState(false);
  const HandleDelete = async () => {
    const userDoc = doc(db, "users", shop._id);
    deleteDoc(userDoc);
    alert("Shop Successfully Deleted");
    RefreshData();
  };
  return (
    <>
      <div className="flex flex-col items-end">
        <div className="w-full flex justify-between items-center mt-[10px] border-[#5a4ae3] border-[1px] px-[10px] rounded-t-[10px] shadow-[5px_5px_0px_0px_rgba(109,40,217)] bg-[aliceblue] py-[15px]">
          <div className="text-[1rem] font-bold text-[#5a4ae3]">
            {shop.fullName}
          </div>
          <div className="flex flex-row justify-center items-center">
            {OpenDetail ? (
              <KeyboardArrowUpIcon
                style={{
                  color: "#5a4ae3",
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
            <div className="flex justify-center items-center">
              <img
                src={shop.pic}
                className="w-[80px] my-[20px] rounded-[50%] overflow-hidden"
                alt="Unable to get"
              />
            </div>
            <div className="text-[#5a4ae3] font-bold flex flex-row">
              <div className="text-black">Name:</div>
              {shop.fullName}
            </div>
            <div className="text-[#5a4ae3] font-bold flex flex-row">
              <div className="text-black">Email:</div>
              {shop.email}
            </div>
            <div className="text-[#5a4ae3] font-bold flex flex-row">
              <div className="text-black">Role:</div>
              {shop.role}
            </div>
            <div className="text-[#5a4ae3] font-bold flex flex-row justify-end">
              <button
                className="border-[2px] border-[red] bg-[red] text-white py-[5px] px-[10px] hover:bg-white hover:text-[red] hover:rounded-[8px] transition-all duration-700 "
                onClick={HandleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ShopInfo;
