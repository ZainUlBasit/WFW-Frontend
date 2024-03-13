import React from "react";

const SelectNone = ({ tag }) => {
  return (
    <div className="py-[10px] text-[red] font-[700] font-[raleway] flex justify-center items-center w-full">{`Please make sure your ${tag} is selected...!`}</div>
  );
};

export default SelectNone;
