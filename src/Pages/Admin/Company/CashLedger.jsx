import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminColumns,
  Columns,
} from "../../../Components/TableColumns/Admin/CashLegderColumns";
import TableComp from "../../../Components/Tables/TableComponent";
import { CustomerColumns, CustomerRows } from "../../../DemoData/TempData";
import { useEffect } from "react";
import moment from "moment";
import DataLoader from "../../../Components/Loader/DataLoader";
import cashpaymentServices from "../../../Services/cashpayment.services";
import { fetchPayments } from "../../../store/PaymentSlice";

const CashLedger = ({ isCash, SelectedCompany, toDate, fromDate }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [selID, setSelID] = useState(-1);
  const [Rows, setRows] = useState([]);
  const [Loading, setLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const PaymentState = useSelector((state) => state.PaymentState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchPayments({
        branch_number: uData.branch_number,
        user_Id: SelectedCompany.name,
        startDate: fromDate,
        endDate: toDate,
        role: uData.role,
      })
    );
  }, [SelectedCompany, fromDate, toDate]);

  return PaymentState.loading ? (
    <DataLoader />
  ) : (
    <div className={isCash ? "flex flex-col" : "hidden"}>
      <TableComp
        title="Cash Ledger Detail"
        rows={PaymentState.data.map((dt) => {
          return {
            ...dt,
            payment_type: dt.payment_type === 1 ? "Cash" : "Bank",
          };
        })}
        columns={uData.role === 1 ? AdminColumns : Columns}
        isActive_={isActive_}
        setSelID={setSelID}
        LedgerDetail={true}
        isLedger={true}
      />
    </div>
  );
};

export default CashLedger;
