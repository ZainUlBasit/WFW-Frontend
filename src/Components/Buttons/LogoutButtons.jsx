import React from "react";

const LogoutButtons = ({ title, onClick, icon, iconOri }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row bg-[#5a4ae3] text-white m-[5px] p-[5px] rounded-[5px] hover:bg-[#fffdfdc7] hover:text-[#5a4ae3] border-[1px] border-[#5a4ae3] transition-all duration-700"
    >
      {iconOri === "left" ? icon : null}
      <div className="mx-[10px] h-full">{title}</div>
      {iconOri === "right" ? icon : null}
    </button>
  );
};

export default LogoutButtons;
