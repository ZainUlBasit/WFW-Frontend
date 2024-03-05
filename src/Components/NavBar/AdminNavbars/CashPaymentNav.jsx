import React from "react";
import { useSelector } from "react-redux";
import { NavComp } from "../../../Pages/Admin/Styling/NavComp";
import AdminNavButton from "../../Buttons/AdminNavButton";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const CashPaymentNav = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);

  return (
    <NavComp
      isAct={isActive_}
      className={isActive_ ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="flex flex-wrap mb-[5px] mt-[5px] justify-center items-center">
        <AdminNavButton
          title={"Customer Payment"}
          type={"link"}
          link={"/cash_payment"}
          BIcon={PointOfSaleIcon}
          width={"185px"}
        />
        <AdminNavButton
          title={"Company Payment"}
          type={"link"}
          link={"/company_payment"}
          BIcon={AccountBalanceIcon}
          width={"185px"}
        />
        <AdminNavButton
          title={"Net Profit"}
          type={"link"}
          link={"/profit"}
          BIcon={AccountBalanceWalletIcon}
          width={"185px"}
        />
      </div>
    </NavComp>
  );
};

export default CashPaymentNav;
