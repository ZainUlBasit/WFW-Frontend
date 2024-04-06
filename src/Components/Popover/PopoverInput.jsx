import React from "react";
import TextField from "@mui/material/TextField";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

const AuthInputPopOver = ({ label, placeholder, Value, onClick }) => {
  return (
    <div className="relative w-[297px] font-[Raleway]" onClick={onClick}>
      <p className="absolute top-[-11px] left-3 w-fit bg-white font-[Raleway] text-[15px] font-bold">
        {label}
      </p>
      <div className="px-3 py-3 pr-10 border border-gray-300 rounded-[7.94px] w-full outline-none cursor-pointer">
        {Value === "" ? placeholder : Value}
      </div>
      <ExpandCircleDownIcon className="flex absolute right-3 top-[.85rem]" />
    </div>
  );
};

export default AuthInputPopOver;
