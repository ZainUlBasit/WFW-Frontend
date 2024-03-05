import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../Components/NavBar/NavBar";
import ReportNav from "./ReportNav";
import DatePickerComp from "../../../Components/Ledger/DatePickerComp";
import { MainWrapperComp } from "../../Styling/MainWrapperComp";
import ReportBtns from "../../../Components/Buttons/ReportBtns";
import ExpenseReport from "./ExpenseReport";
import ReportWrapper from "../../Styling/ReportWrapper";
import ModalAddExpense from "./AddNewExpenseModal";

const Expenses = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [fromDate, onChange] = useState(new Date());
  const [toDate, onChange1] = useState(new Date());
  const [showReport, setShowReport] = useState(false);
  const [Open, setOpen] = useState(false);

  return (
    <>
      <Navbar />
      <ReportNav />
      <ReportWrapper
        title="Expense Report"
        fromDate={fromDate}
        toDate={toDate}
        onChange={onChange}
        onChange1={onChange1}
        setShowReport={setShowReport}
      />
      {showReport ? (
        <ExpenseReport toDate={toDate} fromDate={fromDate} />
      ) : null}
    </>
  );
};

export default Expenses;