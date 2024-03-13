import React, { useState } from "react";
import { SelectWrapper } from "./SearchingComp.Styling";
import { Rows } from "../../DemoData/CompaniesInfo";

const SelectComp = ({ DefOption, Options, font_Size, setSelect }) => {
  return (
    <SelectWrapper font_Size>
      <select
        className="SelectInner"
        onChange={(e) => {
          console.log(e.target.value);
          setSelect({ name: e.target.value.toString(), found: true });
        }}
        defaultValue={DefOption}
      >
        <option disabled defaultValue={DefOption} key="none">
          {DefOption}
        </option>
        {Options.map((Comp, i) => {
          return (
            <option key={i} value={Comp._id}>
              {Comp.name}
            </option>
          );
        })}
      </select>
    </SelectWrapper>
  );
};

export default SelectComp;
