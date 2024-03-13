import styled from "styled-components";
import { StyledInputWrapper } from "../StyledInputWrapper";
import { StyledLabel } from "../StyledLabel";

const StyledSelect = styled.select`
  /* pl-[5px] w-[244px] mr-[3px] ml-[7px] outline-none transition-all duration-700 text-[1rem] rounded-[5px] font-[raleway] text-[#5A4AE3] font-[600] */
  height: 35px;
  padding-left: 5px;
  width: 244px;
  margin-right: 3px;
  margin-left: 7px;
  outline: none;
  transition: all 700ms ease-in-out;
  font-size: 1rem;
  border-radius: 0px 5px 5px 0px;
  overflow: hidden;
  font-family: raleway;
  color: #5a4ae3;
  font-weight: 600;
  option {
    font-weight: 600;
    font-size: 1rem;
  }
`;

export const SelectComponent = ({ defOption, data, icon, value, onChange }) => {
  return (
    <StyledInputWrapper>
      <StyledLabel icon={icon} />
      <StyledSelect value={value} onChange={onChange}>
        <option value="none">{defOption}</option>
        {data.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </StyledSelect>
    </StyledInputWrapper>
  );
};
