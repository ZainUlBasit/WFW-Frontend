import React from "react";
import Navbar from "../NavBar/NavBar";
import BranchDetailCard from "./BranchDetailCard";

const BranchDetails = () => {
  return (
    <>
      <Navbar />
      <div className="flex pt-[calc(10vh+10px)] w-full h-[100vh]">
        <BranchDetailCard />
      </div>
    </>
  );
};

export default BranchDetails;
