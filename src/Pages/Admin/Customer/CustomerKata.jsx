import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../Components/NavBar/NavBar";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import TableComp from "../../../Components/Tables/TableComponent";
import {
  CustomerKataRows as rows,
  CustomerKataColumns as columns,
} from "../../../DemoData/TempData";
import { fetchCustomers } from "../../../store/CustomerSlice";
import { CircularProgress } from "@mui/material";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CustomerKataReport from "../../../Components/Reports/CustomerKataReport";
import moment from "moment";

const CustomerKata = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [open, setOpen] = useState(false);
  const [selID, setSelID] = useState(-1);

  const dispatch = useDispatch();
  const customer = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const isError = useSelector((state) => state.CustomerSliceReducer.isError);
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    dispatch(fetchCustomers(data));
  }, []);

  const totalAmount = useMemo(() => {
    return customer.reduce((total, cust) => {
      return total + cust.total;
    }, 0);
  }, [customer]);

  const totalReturn = useMemo(() => {
    return customer.reduce((total, cust) => {
      return total + cust.return_amount;
    }, 0);
  }, [customer]);
  const totalDiscount = useMemo(() => {
    return customer.reduce((total, cust) => {
      return total + cust.discount;
    }, 0);
  }, [customer]);
  const totalPaid = useMemo(() => {
    return customer.reduce((total, cust) => {
      return total + cust.paid;
    }, 0);
  }, [customer]);
  const totalRemaining = useMemo(() => {
    return customer.reduce((total, cust) => {
      return total + cust.remaining;
    }, 0);
  }, [customer]);

  return (
    <>
      <Navbar />
      <CustomerNav setOpen={setOpen} />
      {loading ? (
        <DataLoader />
      ) : isError ? (
        <ConnectionLost />
      ) : customer ? (
        <>
          <TableComp
            title={"Customer Kata"}
            rows={customer}
            columns={columns}
            isActive_={isActive_}
            setSelID={setSelID}
          />
          <div className="flex justify-center items-center">
            <PDFDownloadLink
              document={
                <CustomerKataReport
                  Data={customer}
                  date={moment(new Date()).format("DD/MM/YYYY")}
                  cTotal={totalAmount.toLocaleString()}
                  cReturn={totalReturn.toLocaleString()}
                  cPaid={totalPaid.toLocaleString()}
                  cDiscount={totalDiscount.toLocaleString()}
                  cRemaining={totalRemaining.toLocaleString()}
                />
              }
              fileName={`${
                customer.find((dt) => dt._id === selID)?.name || " Kata"
              }`}
            >
              <button
                className="text-white bg-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[Roboto] font-[700] rounded-[5px] border-[2px] border-[white] border-[solid] hover:rounded-2xl hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem] text-3xl"
                onClick={(e) => {
                  // resetStates();
                }}
              >
                Download Customers Kata
              </button>
            </PDFDownloadLink>
          </div>
        </>
      ) : (
        <DataLoader />
      )}

      {customer && !loading && (
        <div className="flex flex-col justify-center items-center text-2xl font-bold py-10 gap-y-2">
          <div className="flex gap-x-2 text-[#5a4ae3]">
            Total Amount: {Number(totalAmount).toLocaleString()}
          </div>
          <div className="flex gap-x-2 text-[#5a4ae3]">
            Total Return: {Number(totalReturn).toLocaleString()}
          </div>
          <div className="flex gap-x-2 text-[#5a4ae3]">
            Total Paid: {Number(totalPaid).toLocaleString()}
          </div>
          <div className="flex gap-x-2 text-[#5a4ae3]">
            Total Discount: {Number(totalDiscount).toLocaleString()}
          </div>
          <div className="flex gap-x-2 text-[#5a4ae3]">
            Total Remaining: {Number(totalRemaining).toLocaleString()}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerKata;
