import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableComp from "../../../Components/Tables/TableComponent";
import DataLoader from "../../../Components/Loader/DataLoader";
import moment from "moment";
import { StockDataColumns } from "../../../DemoData/StockDataColumns";
import companyTransactionsServices from "../../../Services/companyTransactions.services";

const ItemLedger = ({ isItem, SelectedCompany, toDate, fromDate }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [selID, setSelID] = useState(-1);
  const [Transactions, setTransactions] = useState([]);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let data = await companyTransactionsServices.getAllTransactions();
      data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      data = data.filter(
        (dt) =>
          dt.company_id === SelectedCompany.name &&
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
      setTransactions(data);
      setLoading(false);
    };
    getData();
  }, [SelectedCompany, fromDate, toDate]);

  const userD = useSelector((state) => state.AutoLoginSliceReducer.data);

  return Loading ? (
    <DataLoader />
  ) : (
    <div className={isItem ? "flex flex-col" : "hidden"}>
      <TableComp
        title="Item Ledger Detail"
        rows={Transactions}
        columns={StockDataColumns}
        isActive_={isActive_}
        setSelID={setSelID}
        LedgerDetail={true}
      />
    </div>
  );
};

export default ItemLedger;
