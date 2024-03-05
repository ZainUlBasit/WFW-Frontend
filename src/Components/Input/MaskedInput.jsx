import React from "react";
import { IMaskInput } from "react-imask";
import { StyledInputWrapper } from "./StyledInputWrapper";
import { StyledLabel } from "./StyledLabel";

const MaskedInput = ({
  mask,
  icon,
  placeholder,
  id,
  name,
  value,
  onChange,
}) => {
  return (
    <StyledInputWrapper>
      <StyledLabel icon={icon} />
      <IMaskInput
        className="pl-[5px] py-[4px] w-[244px] mr-[2px] ml-[7px] outline-none border-[2px] transition-all duration-700 text-[1.05rem] rounded-l-[0px] rounded-r-[5px] font-[raleway]  text-[#5A4AE3] font-[700]"
        mask={mask}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </StyledInputWrapper>
  );
};

export default MaskedInput;
