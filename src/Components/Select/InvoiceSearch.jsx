import React from "react";
import { SelectWrapper } from "./SearchingComp.Styling";

const InvoiceSearch = ({ DefOption, Options, setSelect }) => {
  return (
    <SelectWrapper>
      <select
        className="SelectInner"
        onChange={(e) => {
          setSelect({ bill: e.target.value.toString(), selected: true });
        }}
        defaultValue={DefOption}
      >
        <option disabled defaultValue={DefOption} key="none">
          {DefOption}
        </option>
        {Options.map((Comp, i) => {
          return (
            <option key={i} value={Comp.billNo}>
              {Comp.billNo}
            </option>
          );
        })}
      </select>
    </SelectWrapper>
  );
};

export default InvoiceSearch;
