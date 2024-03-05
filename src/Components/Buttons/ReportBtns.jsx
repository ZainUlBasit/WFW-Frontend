import React from "react";
import { BtnStyling } from "../Styling/BtnSyling";

const ReportBtns = ({ title, HandLer }) => {
  return (
    <BtnStyling className="select-none" onClick={HandLer}>
      {title}
    </BtnStyling>
  );
};

export default ReportBtns;
