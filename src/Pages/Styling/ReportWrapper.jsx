import { useState } from "react";
import styled from "styled-components";
import ReportBtns from "../../Components/Buttons/ReportBtns";
import DatePickerComp from "../../Components/Ledger/DatePickerComp";
import SelectComp from "../../Components/Select/SearchingComp";
import { Rows } from "../../DemoData/CompaniesInfo";
import InputWrapperStyling from "../Admin/Styling/InputWrapperStyling";
import { ItemDataTemp } from "./textData";

export const ReportStyled = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  width: 100%;
  .InnerCont {
    width: 80%;
    background-color: #5a4ae3;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    border: 2px solid white;
    .TitleCont {
      color: white;
      font-family: raleway;
      font-weight: 700;
      font-size: 2.3em;
      padding: 20px 0px 10px 0px;
      text-align: center;
      letter-spacing: 0.05ch;
      @media screen and (max-width: 466px) {
        letter-spacing: 0.1ch;
        font-size: 1.5em;
      }
    }
    .Line {
      width: 100%;
      height: 2px;
      background-color: white;
    }
    .ButtonCont {
      margin-bottom: 10px;
    }
  }
`;

const ReportWrapper = (props) => {
  return (
    <ReportStyled>
      <div className="InnerCont">
        <div className="TitleCont select-none">{props.title}</div>
        <div className="Line"></div>
        {props.Ledger || props.Invoice ? (
          <InputWrapperStyling>
            <SelectComp
              DefOption={props.DefOption}
              Options={props.Options}
              setSelect={props.setSelectCompany}
              SelectCompany={props.SelectCompany}
            />
          </InputWrapperStyling>
        ) : null}
        {!props.Invoice ? (
          <div className="pr-[10px] pl-[10px] font-[raleway] flex w-[100%] rounded-[10px] justify-between mt-[12px] mb-[28px] max500:flex-wrap md:flex-nowrap">
            <DatePickerComp
              title={"From Date"}
              value={props.fromDate}
              onChange={props.onChange}
            />
            <div className="w-[30%]"></div>
            <DatePickerComp
              title={"To Date"}
              value={props.toDate}
              onChange={props.onChange1}
            />
          </div>
        ) : null}
        <div className={props.Invoice ? "ButtonCont mt-[20px]" : "ButtonCont"}>
          {props.Ledger ? (
            <div className="flex justify-center items-center flex-wrap">
              <ReportBtns
                title={"SHOW CASH LEDGER"}
                HandLer={props.handleCash}
              />
              <ReportBtns
                title={"SHOW ITEM LEDGER"}
                HandLer={props.handleItem}
              />
            </div>
          ) : (
            <ReportBtns title={"Show Report"} HandLer={props.setShowReport} />
          )}
        </div>
      </div>
    </ReportStyled>
  );
};

export default ReportWrapper;
