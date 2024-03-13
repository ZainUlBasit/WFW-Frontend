import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableComp from "../../../Components/Tables/TableComponent";
import { ReportColumns as Columns } from "../../../DemoData/ReportColumns";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import { fetchExpenses } from "../../../store/ExpenseSlice";
import moment from "moment";

const ExpenseReport = ({ toDate, fromDate }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [SelID, setSelID] = useState("");
  // const [expenses, setExpenses] = useState([]);
  // const [loading, setloading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  let expenses = useSelector((state) => state.ExpenseSliceReducer.data);
  const loading = useSelector((state) => state.ExpenseSliceReducer.loading);
  const isError = useSelector((state) => state.ExpenseSliceReducer.isError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchExpenses({ shop: uData.userdata.fullName, toDate, fromDate })
    );
  }, [toDate, fromDate]);
  return (
    <>
      {loading ? (
        <DataLoader />
      ) : expenses ? (
        <TableComp
          title={"Expense Detail"}
          rows={expenses}
          columns={Columns}
          isActive_={isActive_}
          setSelID={setSelID}
        />
      ) : null}
    </>
  );
};

export default ExpenseReport;
