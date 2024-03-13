import React from "react";
import Lottie from "lottie-react";
import empty from "./empty.json";

const LoadingError = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh] w-full">
      <Lottie
        animationData={empty}
        loop={false}
        className="w-[200px] h-[200px]"
      />
      <span className="font-[raleway] text-[#1886E6] font-bold text-[1.5rem]">
        Data Not Found...!
      </span>
    </div>
  );
};

export default LoadingError;
