import React from "react";

const LedgerButton = ({ handleCash, title }) => {
  return (
    <button
      className=" border-[2px] boder-white font-[700] h-[90%] w-[350px] py-[8px] px-[15px] text-white text-[1.1rem] hover:bg-white hover:text-[#5A4AE3] transition-all duration-700 rounded-[10px] mx-[5px] mb-[10px]"
      onClick={handleCash}
    >
      {title}
      {/* SHOW CASH LEDGER */}
    </button>
  );
};

export default LedgerButton;
