import { Lottie } from "lottie-react";
import React from "react";
import search_not_found from "./search_not_found.json";

const SNF = () => {
  return (
    <div className="flex justify-center items-center h-[10vh] w-full">
      <Lottie animationData={search_not_found} loop={true} />
      <span>Empty...!</span>
    </div>
  );
};

export default SNF;
