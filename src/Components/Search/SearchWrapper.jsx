import React from "react";

const SearchWrapper = ({children}) => {
  return (
    <div className="flex justify-between items-center px-5 text-white font-[Quicksand] absolute -top-9 left-[-1px] w-[calc(100%+2px)] bg-[#465462] rounded-[15px]">
      {children}
    </div>
  );
};

export default SearchWrapper;
