import React, { useState } from "react";
import DatePickerComp from "../../../Components/Ledger/DatePickerComp";
import CashPaymentNav from "../../../Components/NavBar/AdminNavbars/CashPaymentNav";
import Navbar from "../../../Components/NavBar/NavBar";
import NetProfitTableComp from "../../../Components/Tables/NetProfitTable";
import SimpleTableComp from "../../../Components/Tables/SimpleTableComponent";
import TableComp from "../../../Components/Tables/TableComponent";
import { Rows } from "../../../DemoData/NetProfitData";
import { Columns } from "../../../DemoData/NetProfitColumns";
import { useSelector } from "react-redux";
import ReportWrapper from "../../Styling/ReportWrapper";

const NetProfit = () => {
  const [fromDate, onChange] = useState(new Date());
  const [toDate, onChange1] = useState(new Date());
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [SelID, setSelID] = useState("");
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <Navbar />
      <CashPaymentNav />
      <ReportWrapper
        title="Net Profit"
        Netprofit
        fromDate={fromDate}
        toDate={toDate}
        setShowReport={setShowReport}
      />
      {showReport ? (
        <div className="profitDetail pb-[20px]">
          <TableComp
            rows={Rows}
            columns={Columns}
            title="Net Profit Details"
            isActive_={isActive_}
            setSelID={setSelID}
          />
        </div>
      ) : null}
      {/* <div className="MainWrapper w-full flex justify-center min-w-[90vh]">
        <div className="InnerWrapper bg-[#5a4ae3] w-[90%] rounded-tl-[10px] rounded-tr-[10px]">
          <div className="Header text-white text-[1.5rem] font-bold text-center py-[10px] border-b-[2px] border-b-white">
            Net Profit
          </div>
          <div className="Body">
            <div className="pr-[10px] pl-[10px] font-[raleway] flex w-[100%] justify-between mt-[12px] sm:flex-wrap md:flex-nowrap ">
              <DatePickerComp
                title={"From Date"}
                value={fromDate}
                onChange={onChange}
              />
              <DatePickerComp
                title={"To Date"}
                value={toDate}
                onChange={onChange1}
              />
            </div>
            <div className="Button flex justify-center py-[20px] border-b-[2px] border-b-white mb-[10px]">
              <button
                className="bg-[#5a4ae3] hover:bg-white text-white hover:text-[#5a4ae3] border-[2px] hover:rounded-[10px] transition-all duration-1000 border-white py-[8px] px-[15px] text-[1.2rem] font-[700] font-[raleway]"
                onClick={() => setshowReport(true)}
              >
                Show Report
              </button>
            </div>
            {showReport ? (
              <div className="profitDetail pb-[20px]">
                <TableComp
                  rows={Rows}
                  columns={Columns}
                  title="Net Profit Details"
                  isActive_={isActive_}
                  setSelID={setSelID}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default NetProfit;
