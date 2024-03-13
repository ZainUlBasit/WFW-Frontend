import React from "react";
import styled from "styled-components";

export const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
  .SelectInner {
    outline: none;
    width: 95%;
    border-radius: 5px;
    padding: 8px 5px;
    font-size: ${(props) => (props.font_Size ? "1.8ch" : "1.8ch")};
    font-weight: 700;
    color: #5a4ae3;
    option {
      width: 50% !important;
      font-size: ${(props) => (props.font_Size ? "1rem" : "1.8ch")};
      font-weight: 600;
      @media screen and (max-width: 500px) {
        font-size: 10px !important;
      }
    }
  }
`;

const SelectComp = ({ DefOption, Options, font_Size, setSelect }) => {
  return (
    <SelectWrapper font_Size>
      <select
        className="SelectInner"
        onChange={(e) => setSelect({ name: e.target.value, found: true })}
        defaultValue={DefOption}
      >
        <option disabled defaultValue={DefOption} key="none">
          {DefOption}
        </option>
        {Options.map((Comp, i) => {
          return (
            <option key={i} value={Comp.name || Comp.fullname}>
              {Comp.name || Comp.fullname}
            </option>
          );
        })}
      </select>
    </SelectWrapper>
  );
};

export default SelectComp;
