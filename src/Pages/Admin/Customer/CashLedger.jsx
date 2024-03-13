import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Columns } from "../../../Components/TableColumns/Admin/CashLegderColumns";
import TableComp from "../../../Components/Tables/TableComponent";
import { CustomerColumns, CustomerRows } from "../../../DemoData/TempData";
import DataLoader from "../../../Components/Loader/DataLoader";
import { useEffect } from "react";
import moment from "moment";
import cashpaymentServices from "../../../Services/cashpayment.services";

const CashLedger = ({ isCash, SelectedCustomer, FromDate, ToDate }) => {
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
          dt.user_id === SelectedCustomer.name &&
          dt.shop === uData.userdata.fullName &&
          new Date(dt.date.seconds * 1000) >= new Date(FromDate) &&
          new Date(dt.date.seconds * 1000) <= new Date(ToDate)
      );
      // {
      //   cid: SelectedCustomer.name,
      //   sname: uData.userdata.name,
      //   todate: ToDate,
      //   fromdate: FromDate,
      // }
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
  }, [SelectedCustomer, FromDate, ToDate]);
  return Loading ? (
    <DataLoader />
  ) : (
    <div className={isCash ? "flex flex-col w-full" : "bg-yellow-400 hidden"}>
      <TableComp
        title="Cash Ledger Detail"
        rows={Rows}
        columns={Columns}
        isActive_={isActive_}
        setSelID={setSelID}
        LedgerDetail={true}
      />
    </div>
  );
};

export default CashLedger;
