import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminColumns,
  Columns,
} from "../../../Components/TableColumns/Admin/ItemLegderColumns";
import TableComp from "../../../Components/Tables/TableComponent";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import { fetchCustomerReturn } from "../../../store/CustomerReturnSlice";
import { fetchCustomerTransaction } from "../../../store/CustomerTransactionSlice";
import moment from "moment";
import customerTransactionsServices from "../../../Services/customerTransactions.services";
import { fetchTransactions } from "../../../store/TransactionSlice";

const ItemLedger = ({ isItem, SelectedCustomer, FromDate, ToDate }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  // const [customerTransaction, setCustomerTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const customerTransaction = useSelector((state) => state.Transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    // const getTransactions = async () => {
    //   setIsLoading(true);
    //   const c_id = SelectedCustomer.name
    //   setCustomerTransaction(data);
    //   setIsLoading(false);
    // };
    // getTransactions();
    dispatch(
      fetchTransactions({
        customerId: SelectedCustomer?.name,
        to: ToDate,
        from: FromDate,
      })
    );
  }, [SelectedCustomer, FromDate, ToDate]);

  const [selID, setSelID] = useState(-1);
  return (
    <>
      {/* {!loading && !isError && formatData()} */}
      {customerTransaction.loading ? (
        <DataLoader />
      ) : customerTransaction ? (
        <div>
          {/* {formatData()} */}
          <div className={isItem ? "flex flex-col" : "hidden"}>
            <TableComp
              title="Item Ledger Detail"
              isLedger={true}
              rows={customerTransaction.data}
              columns={uData.role === 1 ? AdminColumns : Columns}
              isActive_={isActive_}
              setSelID={setSelID}
              LedgerDetail={true}
            />
          </div>
        </div>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default ItemLedger;
