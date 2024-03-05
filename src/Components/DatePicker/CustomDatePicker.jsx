import React from "react";
import DatePicker from "react-date-picker";

const CustomDatePicker = ({ value, onChange }) => {
  return (
    <DatePicker
      onChange={onChange}
      value={value}
      className="w-[100%] bg-white font-bold text-[1.2rem]"
      format="MM/dd/yyyy"
    />
  );
};

export default CustomDatePicker;
