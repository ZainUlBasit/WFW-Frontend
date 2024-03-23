import React from "react";
import SearchWrapper from "./SearchWrapper";
import PolicyIcon from "@mui/icons-material/Policy";

const Search = ({ Value, setValue, Placeholder }) => {
  return (
    <SearchWrapper>
      <div className="flex border-[1px] w-[300px] maxWeb1:w-[400px] maxWeb2:w-[450px] maxWeb3:w-[500px] maxWeb4:w-[550px] border-white items-center gap-x-2 px-3 py-[6px] maxWeb1:px-4 maxWeb1:py-[8px] maxWeb2:px-5 maxWeb2:py-[10px] rounded-full overflow-hidden my-[10px] maxWeb1:my-[15px] maxWeb2:my-[20px]">
        <PolicyIcon className="text-[1.2rem] maxWeb1:text-[1.8rem]" />
        <input
          className="outline-none bg-inherit text-white w-full maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]"
          placeholder={Placeholder}
          value={Value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </SearchWrapper>
  );
};

export default Search;
