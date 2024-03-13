import styled from "styled-components";

/* <input
                type="text"
                placeholder="Search Company..."
                className="h-full px-[12px] py-[13px] rounded-[5px] font-[raleway] placeholder:text-gray-600 outline-none text-[1.1rem] font-[700] w-[95%]"
              ></input> */

const SearchBarStyling = styled.input.attrs({
  className: "h-full p",
  // "relative bg-[#5A4AE3] py-[20px] text-xl flex items-center rounded-t-lg pl-10 text-white justify-center font-[raleway] font-[700] text-[1.4rem]",
})``;

export default SearchBarStyling;
