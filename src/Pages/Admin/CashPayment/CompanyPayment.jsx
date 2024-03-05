import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CashPaymentNav from "../../../Components/NavBar/AdminNavbars/CashPaymentNav";
import Navbar from "../../../Components/NavBar/NavBar";
import PaymentComponent from "../../../Components/PaymentComponent/PaymentComponent";
import SelectComp from "../../../Components/Select/SearchingComp";
import SimpleTableComp from "../../../Components/Tables/SimpleTableComponent";
import TableComp from "../../../Components/Tables/TableComponent";
import { Rows } from "../../../DemoData/CusPaymentInfo";
import { Columns } from "../../../DemoData/CusPaymentInfoColumns";
import { CustomerRows } from "../../../DemoData/TempData";
import { fetchCompanies } from "../../../store/CompanySlice";
import PaymentModal from "./CustomerPaymentModal";
import DataLoader from "../../../Components/Loader/DataLoader";
import CompanyPaymentModal from "./CompanyPaymentModal";

const CompanyPayment = () => {
  const [SelectCompany, setSelectCompany] = useState({});
  const [OpenModal, setOpenModal] = useState(false);
  const company = useSelector((state) => state.CompanySliceReducer.data);
  const Loading = useSelector((state) => state.CompanySliceReducer.loading);
  const isError = useSelector((state) => state.CompanySliceReducer.isError);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);
  return (
    <>
      <Navbar />
      <CashPaymentNav />
      {Loading ? (
        <DataLoader />
      ) : (
        <PaymentComponent
          title={"Company Payment"}
          setOpen={setOpenModal}
          data={company.filter((comp) => {
            if (uData.userdata.fullName == "Admin") return comp;
            else return comp.shop == uData.userdata.fullName;
          })}
          type="company"
        />
      )}
      {OpenModal ? (
        <CompanyPaymentModal
          title="Company Payment"
          open={OpenModal}
          setOpen={setOpenModal}
          data={company}
        />
      ) : null}
    </>
  );
};

export default CompanyPayment;
