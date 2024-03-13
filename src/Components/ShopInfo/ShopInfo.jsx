import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import DeleteModal from "../Modals/DeleteModal";
import UpdateBranch from "../Modals/UpdateBranch";

const ShopInfo = ({ shop, RefreshData }) => {
  const [OpenDetail, setOpenDetail] = useState(false);
  const [OpenUpdateModal, setOpenUpdateModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <>
      <div className="flex flex-col items-end">
        <div className="w-full flex justify-between items-center mt-[10px] border-[#5a4ae3] border-[1px] px-[10px] rounded-t-[10px] shadow-[5px_5px_0px_0px_rgba(109,40,217)] bg-[aliceblue] py-[15px]">
          <div className="text-[1rem] font-bold text-[#5a4ae3]">
            {shop.name}
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
          <div className="fade-in border-[2px] border-[#6D28D9] bg-[#6D28D9] rounded-t-[0px] rounded-b-[8px] w-[99.5%] p-[10px]">
            <div className="flex justify-center items-center">
              <img
                src={shop.imageUrl}
                className="w-[120px] h-[120px] my-[20px] rounded-[50%] overflow-hidden"
                alt="Unable to get"
              />
            </div>
            <div className="text-[#fff] font-bold flex flex-row justify-center gap-x-1">
              <div className="text-white">Name:</div>
              <div className="underline">{shop.name}</div>
            </div>
            <div className="text-[#fff] font-bold flex flex-row justify-center gap-x-1">
              <div className="text-white">Email:</div>
              <div className="underline">{shop.email}</div>
            </div>
            <div className="text-[#fff] font-bold flex flex-row justify-center gap-x-1">
              <div className="text-white">Role:</div>
              <div className="underline">{shop.role}</div>
            </div>
            <div className="text-[#fff] font-bold flex flex-row gap-x-2 justify-center py-4">
              <button
                className="border-[2px] border-[green] bg-[green] text-white py-3 px-4 hover:bg-white hover:text-[green] hover:rounded-[8px] transition-all duration-700 outline-none text-xl"
                onClick={() => setOpenUpdateModal(true)}
              >
                Update
              </button>
              <button
                className="border-[2px] border-[red] bg-[red] text-white py-3 px-4 hover:bg-white hover:text-[red] hover:rounded-[8px] transition-all duration-700 outline-none text-xl"
                onClick={() => setOpenDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {OpenDeleteModal && (
        <DeleteModal Open={OpenDeleteModal} setOpen={setOpenDeleteModal}  State={shop} />
      )}
      {OpenUpdateModal && (
        <UpdateBranch
          open={OpenUpdateModal}
          setOpen={setOpenUpdateModal}
          CurrentShop={shop}
        />
      )}
    </>
  );
};

export default ShopInfo;
