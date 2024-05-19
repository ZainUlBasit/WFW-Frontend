import React from "react";
import { StyledInputWrapper } from "./StyledInputWrapper";
import { StyledLabel } from "./StyledLabel";
import { StyledInput } from "./StyledInput";

const InputComponent = ({
  id,
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <StyledInputWrapper>
      <StyledLabel icon={icon} />
      <StyledInput
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StyledInputWrapper>
  );
};

export default InputComponent;

// export const StyledInput = styled.input`
//   /* className="pl-[5px] w-[244px] mr-[4px] ml-[7px] outline-none border-[2px] focus:border-b-[#5A4AE3] transition-all duration-700 text-[1.2rem] rounded-[5px] font-[Roboto] text-[#5A4AE3] font-[600]" */
//   padding-left: 5px;
//   width: 244px;
//   margin-right: 3px;
//   margin-left: 7px;
//   outline: none;
//   border-width: 2px;
//   transition: all 0.6s ease-in-out;
//   font-size: 1rem;
//   border-radius: 0px 5px 5px 0px;
//   font-family: Roboto;
//   color: #5a4ae3;
//   font-weight: 600;
//   height: 35px;
//   ::placeholder {
//     font-weight: 400;
//   }
// `;

// export const StyledSelect = styled.select.attrs((props) => ({
//   value: props.value,
//   onChange: props.onChange,
// }))`
//   /* pl-[5px] w-[244px] mr-[3px] ml-[7px] outline-none transition-all duration-700 text-[1rem] rounded-[5px] font-[Roboto] text-[#5A4AE3] font-[600] */
//   height: 35px;
//   padding-left: 5px;
//   width: 244px;
//   margin-right: 3px;
//   margin-left: 7px;
//   outline: none;
//   transition: all 700ms ease-in-out;
//   font-size: 1rem;
//   border-radius: 0px 5px 5px 0px;
//   overflow: hidden;
//   font-family: Roboto;
//   color: #5a4ae3;
//   font-weight: 600;
//   option {
//     font-weight: 600;
//     font-size: 1rem;
//   }
// `;

// export const StyledLabel = styled.label`
//   transition: all 700ms ease-in-out;
//   background-color: #5a4ae3;
//   margin-left: 8px;
//   height: 100%;
//   .LabelIcon {
//     color: #fff;
//     font-size: 3ch;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//   }
// `;

// export const InputWrapper = styled.div`
//   /* <div className="flex mb-[15px]"> */
//   display: flex;
//   margin-bottom: 15px;
//   .topLevel {
//     /* bg-[#5A4AE3] flex py-[3px] rounded-[5px] */
//     background-color: #5a4ae3;
//     display: flex;
//     padding: 3px 0px;
//     border-radius: 5px;
//   }
// `;
