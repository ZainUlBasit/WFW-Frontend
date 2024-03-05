import React, { useState } from "react";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import TodayIcon from "@mui/icons-material/Today";
import ExplicitIcon from "@mui/icons-material/Explicit";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonComp from "../Styling/ButtonComp";
import { ButtonWrapper } from "../Styling/ButtonWrapper";
import { NavComp } from "../Styling/NavComp";
import ModalAddExpense from "./AddNewExpenseModal";

const ReportNav = () => {
  const [AddExpenseModal, setAddExpenseModal] = useState(false);

  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  return (
    <NavComp
      isAct={false}
      className={false ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <ButtonWrapper>
        <ButtonComp onClick={() => setAddExpenseModal(true)}>
          <div className="btnModal">
            <ExplicitIcon className="mr-[5px]" />
            <span className="btnText">Add Expense</span>
          </div>
        </ButtonComp>
        <ButtonComp>
          <Link to="/expense_report" className="BtnLink">
            <ExplicitIcon className="mr-[5px]" />
            <span className="btnText">Show Report</span>
          </Link>
        </ButtonComp>
        <ButtonComp>
          <Link to="/today_report" className="BtnLink">
            <TodayIcon className="mr-[5px]" />
            <span className="btnText">Today Info</span>
          </Link>
        </ButtonComp>
        <ButtonComp width="160px">
          <Link to="/cash_summary" className="BtnLink">
            <TodayIcon className="mr-[5px]" />
            <span className="btnText">Cash Summary</span>
          </Link>
        </ButtonComp>
      </ButtonWrapper>
      {AddExpenseModal ? (
        <ModalAddExpense
          AddExpenseModal={AddExpenseModal}
          setAddExpenseModal={setAddExpenseModal}
        />
      ) : null}
    </NavComp>
  );
};

export default ReportNav;
