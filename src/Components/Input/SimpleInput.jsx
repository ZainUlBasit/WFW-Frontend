import React from "react";
import TextField from "@mui/material/TextField";
import "./AuthInput.css";

const AuthInput = ({
  id,
  Type,
  label,
  placeholder,
  required,
  Value,
  setValue,
  readonly,
  disabled,
}) => {
  return (
    <div className="relative w-[300px] maxInputWidth font-[Roboto]">
      <p className="absolute top-[-11px] left-3 w-fit bg-white h-[13px] text-[15px] font-bold InputLabel">
        {label}
      </p>
      <input
        type={Type ? Type : "text"}
        required={required}
        id={id}
        placeholder={placeholder}
        className="px-5 py-3 border border-gray-300 rounded-[7.94px] w-full outline-none InputText"
        value={Value}
        readOnly={readonly ? true : false}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled ? disabled : false}
      />
    </div>
  );
};

export default AuthInput;
