import React from "react";
import Lottie from "lottie-react";
import newloading from "./newloading.json";

const DataLoader = () => {
  return (
    <div className="flex justify-center items-center h-[50vh] w-full">
      <Lottie animationData={newloading} loop={true} width={50} height={50} />
    </div>
  );
};

export default DataLoader;
