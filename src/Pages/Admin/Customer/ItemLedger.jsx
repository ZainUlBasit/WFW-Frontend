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

const ItemLedger = ({ isItem, SelectedCustomer, FromDate, ToDate }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [customerTransaction, setCustomerTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const getTransactions = async () => {
      setIsLoading(true);
      const cName = SelectedCustomer.name;
      let data = await customerTransactionsServices.getAllTransactions();
      data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      data = data.sort((a, b) => {
        const date1 = new Date(a.date.seconds * 1000);
        const date2 = new Date(b.date.seconds * 1000);
        return date1 - date2;
      });
      data = data
        .filter(
          (dt) =>
            dt.customerid === cName &&
            dt.shop === uData.userdata.fullName &&
            new Date(dt.date.seconds * 1000) >= new Date(FromDate) &&
            new Date(dt.date.seconds * 1000) <= new Date(ToDate)
        )
        .map((ite) => {
          return {
            ...ite,
            date: moment(ite.date.seconds * 1000).format("DD/MM/YYYY"),
          };
        });
      setCustomerTransaction(data);
      setIsLoading(false);
    };
    getTransactions();
  }, [SelectedCustomer, FromDate, ToDate]);

  const [selID, setSelID] = useState(-1);
  return (
    <>
      {/* {!loading && !isError && formatData()} */}
      {isLoading ? (
        <DataLoader />
      ) : customerTransaction ? (
        <div>
          {/* {formatData()} */}
          <div className={isItem ? "flex flex-col" : "hidden"}>
            <TableComp
              title="Item Ledger Detail"
              rows={customerTransaction}
              columns={uData.userdata.name === "Admin" ? AdminColumns : Columns}
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
