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
import { fetchCustomers } from "../../../store/CustomerSlice";
import PaymentModal from "./CustomerPaymentModal";
import DataLoader from "../../../Components/Loader/DataLoader";

const CustomerPayment = () => {
  const [OpenModal, setOpenModal] = useState(false);
  const [SelectCustomer, setSelectCustomer] = useState({});
  const dispatch = useDispatch();
  // const customer = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const isError = useSelector((state) => state.CustomerSliceReducer.isError);
  // const [customer, setCustomers] = useState([]);
  // const [Loading, setLoading] = useState(true);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const customer = useSelector((state) => state.CustomerSliceReducer.data);
  const Loading = useSelector((state) => state.CompanySliceReducer.loading);
  // const isError = useSelector((state) => state.CompanySliceReducer.isError);
  useEffect(() => {
    // const shop = uData.userdata.name;
    dispatch(fetchCustomers({ shop: uData.userdata.fullName }));
  }, []);
  return (
    <>
      <Navbar />
      <CashPaymentNav />
      {Loading ? (
        <DataLoader />
      ) : (
        <PaymentComponent
          title={"Customer Payment"}
          setOpen={setOpenModal}
          data={customer}
          type="customer"
        />
      )}
      {OpenModal ? (
        <PaymentModal
          title="Customer Payment"
          open={OpenModal}
          setOpen={setOpenModal}
          data={customer}
        />
      ) : null}
    </>
  );
};

export default CustomerPayment;
