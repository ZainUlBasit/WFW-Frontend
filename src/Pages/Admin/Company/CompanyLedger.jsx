import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/NavBar/NavBar";
import AdminCompanyNav from "../../../Components/NavBar/AdminNavbars/AdminCompanyNav";
import ModalAddNewCompany from "./ModalAddNewCompany";
import CashLedger from "./CashLedger";
import ItemLedger from "./ItemLedger";
import ReportWrapper from "../../Styling/ReportWrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../../store/CompanySlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import SelectNone from "../../../Components/Error/SelectNone";
import moment from "moment";
import CompanyTransactionDataServices from "../../../Services/companyTransactions.services";
import { fetchStocks } from "../../../store/StockSlice";
// import { useSelector } from "react-redux";

const CompanyLedger = () => {
  // const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [value, setValue] = useState("");
  const [fromDate, setFromDate] = useState(
    moment(new Date()).subtract(1, "months").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [open, setOpen] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [isItem, setIsItem] = useState(false);

  const dispatch = useDispatch();
  const company = useSelector((state) => state.CompanySliceReducer.data);
  const loading = useSelector((state) => state.CompanySliceReducer.loading);
  const isError = useSelector((state) => state.CompanySliceReducer.isError);
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [SelectCompany, setSelectCompany] = useState({
    name: "",
    found: false,
  });
  const [ShowMsg, setShowMsg] = useState(false);
  useEffect(() => {
    dispatch(fetchCompanies(data));
    console.log(company);
  }, []);
  const onChangeFunc = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search", searchTerm);
  };

  const handleCash = () => {
    if (SelectCompany.found) {
      setIsCash(true);
      setIsItem(false);
    } else {
      setShowMsg(true);
      setIsItem(false);
      setIsCash(false);
    }
  };

  const handleItem = () => {
    if (SelectCompany.found) {
      setIsItem(true);
      setIsCash(false);
    } else {
      setShowMsg(true);
      setIsItem(false);
      setIsCash(false);
    }
  };

  // const resetAll = () => {
  //   setIsCash(false);
  //   setIsItem(false);
  // };

  return (
    <>
      <Navbar />
      <AdminCompanyNav setOpen={setOpen} />
      {loading ? (
        <DataLoader />
      ) : isError ? (
        <ConnectionLost />
      ) : company ? (
        <div>
          <ReportWrapper
            title="COMPANY LEDGER"
            Ledger
            fromDate={fromDate}
            toDate={toDate}
            value={value}
            onChangeFunc={onChangeFunc}
            onSearch={onSearch}
            onChange={setFromDate}
            onChange1={setToDate}
            handleItem={handleItem}
            handleCash={handleCash}
            setSelectCompany={setSelectCompany}
            SelectCompany={SelectCompany}
            DefOption="Select Company..."
            Options={company}
          />
          {SelectCompany.found && isCash ? (
            <CashLedger
              isCash={isCash}
              SelectedCompany={SelectCompany}
              toDate={toDate}
              fromDate={fromDate}
            />
          ) : SelectCompany.found && isItem ? (
            <ItemLedger
              isItem={isItem}
              SelectedCompany={SelectCompany}
              toDate={toDate}
              fromDate={fromDate}
            />
          ) : ShowMsg ? (
            <SelectNone tag="Company" />
          ) : null}
          {open ? <ModalAddNewCompany setOpen={setOpen} open={open} /> : null}
        </div>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default CompanyLedger;
