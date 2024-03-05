import React from "react";
import Lottie from "lottie-react";
import adding from "./adding.json";

const AddingLoader = () => {
  return (
    <div className="flex justify-center items-center h-[40px] w-full mt-[15px]">
      <Lottie animationData={adding} loop={true} className="w-[100px]" />
    </div>
  );
};

export default AddingLoader;
