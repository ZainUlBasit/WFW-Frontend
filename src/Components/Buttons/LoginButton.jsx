import React from "react";

const LoginButton = ({ onClick }) => {
  return (
    <button
      className="h-[42px] w-[270px] bg-[#5a4ae3] overflow-hidden flex items-center justify-center text-[2.1ch] font-[700] text-[white] cursor-pointer transition-all duration-[0.4s] ease-[ease-in-out] my-[10px] m-0 p-0 rounded-lg border-2 border-solid border-[#5a4ae3] hover:bg-[#4335bb] font-[raleway]"
      onClick={onClick}
    >
      LOGIN
    </button>
  );
};

export default LoginButton;
