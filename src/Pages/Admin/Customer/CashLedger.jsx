import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Columns } from "../../../Components/TableColumns/Admin/CashLegderColumns";
import TableComp from "../../../Components/Tables/TableComponent";
import { CustomerColumns, CustomerRows } from "../../../DemoData/TempData";
import DataLoader from "../../../Components/Loader/DataLoader";
import { useEffect } from "react";
import moment from "moment";
import cashpaymentServices from "../../../Services/cashpayment.services";
import { fetchPayments } from "../../../store/PaymentSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CashLedgerReport from "../../../Components/Reports/CashLedgerReport";

const CashLedger = ({ isCash, SelectedCustomer, FromDate, ToDate }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [selID, setSelID] = useState(-1);
  const [Rows, setRows] = useState([]);
  const [Loading, setLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const customer = useSelector((state) => state.CustomerSliceReducer);

  const PaymentState = useSelector((state) => state.PaymentState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchPayments({
        branch_number: uData.branch_number,
        user_Id: SelectedCustomer.name,
        startDate: FromDate,
        endDate: ToDate,
        role: uData.role,
      })
    );
  }, [SelectedCustomer, FromDate, ToDate]);

  // useEffect(() => {
  //   const getData = async () => {
  //     setLoading(true);
  //     let data = await cashpaymentServices.getPayments();
  //     data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
  //     data = data.filter(
  //       (dt) =>
  //         dt.user_id === SelectedCustomer.name &&
  //         dt.shop === uData.userdata.fullName &&
  //         new Date(dt.date.seconds * 1000) >= new Date(FromDate) &&
  //         new Date(dt.date.seconds * 1000) <= new Date(ToDate)
  //     );
  //     // {
  //     //   cid: SelectedCustomer.name,
  //     //   sname: uData.userdata.name,
  //     //   todate: ToDate,
  //     //   fromdate: FromDate,
  //     // }
  //     data = data.map((ite) => {
  //       return {
  //         ...ite,
  //         date: moment(ite.date.seconds * 1000).format("DD/MM/YYYY"),
  //       };
  //     });
  //     setRows(data);
  //     setLoading(false);
  //   };
  //   getData();
  // }, [SelectedCustomer, FromDate, ToDate]);
  return Loading ? (
    <DataLoader />
  ) : (
    <div className={isCash ? "flex flex-col w-full" : "bg-yellow-400 hidden"}>
      <TableComp
        title="Cash Ledger Detail"
        rows={PaymentState.data.map((dt) => {
          return {
            ...dt,
            payment_type: dt.payment_type === 1 ? "Cash" : "Bank",
          };
        })}
        columns={Columns}
        isActive_={isActive_}
        setSelID={setSelID}
        LedgerDetail={true}
        isLedger={true}
      />
      <div className="flex justify-center items-center my-5">
        <PDFDownloadLink
          document={
            <CashLedgerReport
              Data={PaymentState.data.map((dt) => {
                return {
                  ...dt,
                  date: moment(new Date(dt.date * 1000)).format("DD/MM/YY"),
                  payment_type: dt.payment_type === 1 ? "Cash" : "Bank",
                };
              })}
              cTotal={
                customer.data.find((cus) => cus._id === SelectedCustomer?.name)
                  .total
              }
              cDiscount={
                customer.data.find((cus) => cus._id === SelectedCustomer?.name)
                  .discount
              }
              cPaid={
                customer.data.find((cus) => cus._id === SelectedCustomer?.name)
                  .paid
              }
              cReturn={
                customer.data.find((cus) => cus._id === SelectedCustomer?.name)
                  .return_amount
              }
              cRemaining={
                customer.data.find((cus) => cus._id === SelectedCustomer?.name)
                  .remaining
              }
              bDate={moment(new Date()).format("DD/MMM/YYYY")}
              cName={
                customer.data.find((cus) => cus._id === SelectedCustomer?.name)
                  .name
              }
              cAddress={
                customer.data.find((cus) => cus._id === SelectedCustomer?.name)
                  .address
              }
            />
          }
          fileName={`${
            customer.data.find((cus) => cus._id === SelectedCustomer?.name).name
          } ${moment(new Date()).format(
            "DD/MM/YY hh:mm:ss A"
          )} - Cash Ledger Report`}
        >
          <button className="bg-white text-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[raleway] font-[700] rounded-[5px] border-[2px] border-[#5a4ae3] border-[solid] hover:bg-[#5a4ae3] hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem]">
            Print
          </button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default CashLedger;
