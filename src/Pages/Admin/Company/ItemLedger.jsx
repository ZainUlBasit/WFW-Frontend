import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableComp from "../../../Components/Tables/TableComponent";
import DataLoader from "../../../Components/Loader/DataLoader";
import moment from "moment";
import { StockDataColumns } from "../../../DemoData/StockDataColumns";
import companyTransactionsServices from "../../../Services/companyTransactions.services";
import { fetchStocks } from "../../../store/StockSlice";

const ItemLedger = ({ isItem, SelectedCompany, toDate, fromDate }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [selID, setSelID] = useState(-1);
  const Transactions = useSelector((state) => state.StockState.data);
  // const [Transactions, setTransactions] = useState([]);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchStocks({
        ...uData,
        fromDate: Math.floor(new Date(fromDate) / 1000),
        toDate: Math.floor(new Date(toDate) / 1000),
      })
    );
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
