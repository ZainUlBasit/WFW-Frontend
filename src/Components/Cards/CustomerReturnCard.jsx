import React, { useEffect, useState } from "react";
// import { CustomerRows } from "../../DemoData/TempData";
import SelectComp from "../Select/SearchingComp";
import { CustomerReturnCardWrapper } from "./CustomerReturnCard.Styling";
import InputWrapperStyling from "../../Pages/Admin/Styling/InputWrapperStyling";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/CustomerSlice";
import { SelectWrapper } from "../Select/SearchingComp.Styling";

const CustomerReturnCard = ({
  setOpen,
  title,
  setSelect,
  Select,
  setCustomerName,
  setCustomerAddress,
  setCustomerID,
  data,
}) => {
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const dispatch = useDispatch();
  return (
    <>
      <CustomerReturnCardWrapper>
        <div className="Inner">
          <div className="title">{title.toUpperCase()}</div>
          <InputWrapperStyling className="InputTab">
            <SelectWrapper>
              <select
                className="SelectInner"
                onChange={(e) =>
                  setSelect({ name: e.target.value, found: true })
                }
                defaultValue={"Select Customer..."}
              >
                <option disabled defaultValue={"Select Customer..."} key="none">
                  {"Select Customer..."}
                </option>
                {data.map((Comp, i) => {
                  return (
                    <option key={i} value={Comp._id}>
                      {Comp.name || Comp.fullname}
                    </option>
                  );
                })}
              </select>
            </SelectWrapper>
          </InputWrapperStyling>
          {Select.found ? (
            <div className="itemTab">
              <div className="header">
                <div className="leftSideTitle">
                  {title === "Add New Bill"
                    ? "New Bill Detail"
                    : "Return Item Detail"}
                </div>
                <div className="rightSideBtn">
                  <button onClick={() => setOpen(true)}>
                    <AddCircleIcon className="BtnIcon" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </CustomerReturnCardWrapper>
    </>
  );
};

export default CustomerReturnCard;
