import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const AuthInputPopOver = ({
  label,
  placeholder,
  required,
  Value,
  onClick,
  Width,
}) => {
  return (
    <div
      className={`relative ${
        Width && Width
      } font-[Quicksand] cursor-pointer bg-white rounded-lg`}
      onClick={onClick}
    >
      <p className="absolute top-[-11px] left-3 w-fit bg-white font-[Roboto] text-[15px] font-bold">
        {label}
      </p>
      <div className="px-5 py-3 pr-10 border border-gray-300 rounded-[7.94px] w-full outline-none cursor-pointer font-[Roboto] font-bold">
        {Value === "" ? placeholder : Value}
      </div>
      <KeyboardArrowDownIcon className="flex absolute !text-3xl right-4 top-[.60rem]" />
    </div>
  );
};

export default AuthInputPopOver;
