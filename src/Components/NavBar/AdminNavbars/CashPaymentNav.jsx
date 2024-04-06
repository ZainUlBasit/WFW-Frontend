import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavComp } from "../../../Pages/Admin/Styling/NavComp";
import AdminNavButton from "../../Buttons/AdminNavButton";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddPayment from "../../Modals/AddPayment";

const CashPaymentNav = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [OpenAddPaymentModal, setOpenAddPaymentModal] = useState(false);

  return (
    <NavComp
      isAct={isActive_}
      className={isActive_ ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="flex flex-wrap mb-[5px] mt-[5px] justify-center items-center">
        <AdminNavButton
          title={"Add Payment"}
          type={"modal"}
          link={"/"}
          BIcon={PointOfSaleIcon}
          width={"185px"}
          setOpen={setOpenAddPaymentModal}
        />
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
      {OpenAddPaymentModal && (
        <AddPayment
          open={OpenAddPaymentModal}
          setOpen={setOpenAddPaymentModal}
        />
      )}
    </NavComp>
  );
};

export default CashPaymentNav;
