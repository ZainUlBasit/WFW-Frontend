import React, { useState } from "react";
import { useSelector } from "react-redux";
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

const CashLedger = ({ isCash, SelectedCompany, toDate, fromDate }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [selID, setSelID] = useState(-1);
  const [Rows, setRows] = useState([]);
  const [Loading, setLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let data = await cashpaymentServices.getPayments();
      data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      data = data.filter(
        (dt) =>
          dt.user_id === SelectedCompany.name &&
          dt.shop === uData.userdata.fullName &&
          new Date(dt.date.seconds * 1000) >= new Date(fromDate) &&
          new Date(dt.date.seconds * 1000) <= new Date(toDate)
      );
      data = data.map((ite) => {
        return {
          ...ite,
          date: moment(ite.date.seconds * 1000).format("DD/MM/YYYY"),
        };
      });
      setRows(data);
      setLoading(false);
    };
    getData();
  }, [SelectedCompany, fromDate, toDate]);

  return Loading ? (
    <DataLoader />
  ) : (
    <div className={isCash ? "flex flex-col" : "hidden"}>
      <TableComp
        title="Cash Ledger Detail"
        rows={Rows}
        columns={uData.userdata.name === "Admin" ? AdminColumns : Columns}
        isActive_={isActive_}
        setSelID={setSelID}
        LedgerDetail={true}
      />
    </div>
  );
};

export default CashLedger;
