import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../Components/NavBar/NavBar";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import CashLedger from "./CashLedger";
import ItemLedger from "./ItemLedger";
import ReportWrapper from "../../Styling/ReportWrapper";
import { CustomerRows } from "../../../DemoData/TempData";
import { fetchCompanies } from "../../../store/CompanySlice";
import SelectNone from "../../../Components/Error/SelectNone";
import DataLoader from "../../../Components/Loader/DataLoader";
import { fetchCustomers } from "../../../store/CustomerSlice";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import TableComp from "../../../Components/Tables/TableComponent";
import { Columns } from "../../../Components/TableColumns/Admin/ItemLegderColumns";
import moment from "moment";
import customerReturnsServices from "../../../Services/customerReturns.services";

const CustomerLedger = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [fromDate, onChange] = useState(new Date());
  const [toDate, onChange1] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [isItem, setIsItem] = useState(false);

  const dispatch = useDispatch();
  const customer = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const isError = useSelector((state) => state.CustomerSliceReducer.isError);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [SelectCustomer, setSelectCustomer] = useState({
    name: "",
    found: false,
  });
  const [ItemReturn, setItemReturn] = useState([]);
  const [ShowMsg, setShowMsg] = useState(false);
  useEffect(() => {
    dispatch(fetchCustomers(uData));
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     let data = await customerReturnsServices.getAllReturns();
  //     data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
  //     data = data
  //       .filter(
  //         (dt) =>
  //           dt.shop === uData.userdata.fullName &&
  //           dt.customerid === SelectCustomer.name
  //       )
  //       .map((dtt) => {
  //         return {
  //           ...dtt,
  //           date: moment(dtt.date.seconds * 1000).format("DD/MM/YYYY"),
  //         };
  //       });
  //     setItemReturn(data);
  //   };
  //   getData();
  // }, [SelectCustomer]);

  // useEffect(() => {
  //   console.log(ItemReturn);
  // });

  const handleCash = () => {
    if (SelectCustomer.found) {
      setIsCash(true);
      setIsItem(false);
    } else {
      setShowMsg(true);
      setIsCash(false);
      setIsItem(false);
    }
  };

  const handleItem = () => {
    if (SelectCustomer.found) {
      setIsItem(true);
      setIsCash(false);
    } else {
      setShowMsg(true);
      setIsCash(false);
      setIsItem(false);
    }
  };

  const showDates = () => {
    console.log(fromDate);
    console.log(toDate);
  };

  const getCurrentTotal = () => {
    let cusTemp = customer.filter((cus) => cus._id == SelectCustomer.name);
    cusTemp = cusTemp[0];
    return cusTemp;
  };
  return (
    <>
      <Navbar />
      <CustomerNav setOpen={setOpen} />
      {loading ? (
        <DataLoader />
      ) : isError ? (
        <ConnectionLost />
      ) : customer ? (
        <div>
          <ReportWrapper
            title="CUSTOMER LEDGER"
            Ledger
            fromDate={fromDate}
            toDate={toDate}
            onChange={onChange}
            onChange1={onChange1}
            handleItem={handleItem}
            handleCash={handleCash}
            SelectCompany={SelectCustomer}
            setSelectCompany={setSelectCustomer}
            Options={customer}
            DefOption="Select Customer..."
          />
          {SelectCustomer.found && isCash ? (
            <CashLedger
              isCash={isCash}
              SelectedCustomer={SelectCustomer}
              FromDate={fromDate}
              ToDate={toDate}
            />
          ) : SelectCustomer.found && isItem ? (
            <ItemLedger
              isItem={isItem}
              SelectedCustomer={SelectCustomer}
              FromDate={fromDate}
              ToDate={toDate}
            />
          ) : ShowMsg ? (
            <SelectNone tag="Customer" />
          ) : null}
          {SelectCustomer.found && isItem ? (
            <div className="w-[100%] flex justify-center items-center py-[10px]">
              <div className="w-[90%] text-[#5a4ae3] flex flex-col justify-end items-end">
                <div className="flex text-[2rem] font-[raleway] font-bold py-[2px]">
                  <div className="w-[170px] flex justify-end mr-[4px]">
                    Total:
                  </div>
                  <div className="w-[190px]">{getCurrentTotal().total}/-</div>
                </div>
                <div className="flex text-[2rem] font-[raleway] font-bold py-[2px]">
                  <div className="w-[170px] flex justify-end mr-[4px]">
                    Paid:
                  </div>
                  <div className="w-[190px]">{getCurrentTotal().paid}/-</div>
                </div>
                <div className="flex text-[2rem] font-[raleway] font-bold py-[2px]">
                  <div className="w-[170px] flex justify-end mr-[4px]">
                    Return:
                  </div>
                  <div className="w-[190px]">
                    {getCurrentTotal().return_amount}/-
                  </div>
                </div>
                <div className="flex text-[2rem] font-[raleway] font-bold py-[2px]">
                  <div className="w-[170px] flex justify-end mr-[4px]">
                    Remaining:
                  </div>
                  <div className="w-[190px]">
                    {getCurrentTotal().remaining}/-
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* Item Return Table */}
          {/* {SelectCustomer.found && isItem ? (
            <TableComp
              title="Item Return Detail"
              rows={ItemReturn}
              columns={Columns}
              isActive_={isActive_}
              // setSelID={setSelID}
              LedgerDetail={true}
              FromDate={fromDate}
              ToDate={toDate}
            />
          ) : null} */}
        </div>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default CustomerLedger;
