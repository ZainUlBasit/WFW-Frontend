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
import { PDFDownloadLink } from "@react-pdf/renderer";
import ItemLedgerReport from "../../../Components/Reports/ItemLedgerReport";
import { fetchCustomers } from "../../../store/CustomerSlice";

const ItemLedger = ({ isItem, SelectedCustomer, FromDate, ToDate }) => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  // const [customerTransaction, setCustomerTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const customerTransaction = useSelector((state) => state.Transactions);

  const customer = useSelector((state) => state.CustomerSliceReducer);

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
          <div className="flex justify-center items-center my-5">
            <PDFDownloadLink
              document={
                <ItemLedgerReport
                  Data={customerTransaction.data}
                  cTotal={
                    customer.data.find(
                      (cus) => cus._id === SelectedCustomer?.name
                    ).total
                  }
                  cDiscount={
                    customer.data.find(
                      (cus) => cus._id === SelectedCustomer?.name
                    ).discount
                  }
                  cPaid={
                    customer.data.find(
                      (cus) => cus._id === SelectedCustomer?.name
                    ).paid
                  }
                  cReturn={
                    customer.data.find(
                      (cus) => cus._id === SelectedCustomer?.name
                    ).return_amount
                  }
                  cRemaining={
                    customer.data.find(
                      (cus) => cus._id === SelectedCustomer?.name
                    ).remaining
                  }
                  bDate={moment(new Date()).format("DD/MMM/YYYY")}
                  cName={
                    customer.data.find(
                      (cus) => cus._id === SelectedCustomer?.name
                    ).name
                  }
                  cAddress={
                    customer.data.find(
                      (cus) => cus._id === SelectedCustomer?.name
                    ).address
                  }
                />
              }
              fileName={`${
                customer.data.find((cus) => cus._id === SelectedCustomer?.name)
                  .name
              } - Item Ledger Report`}
            >
              <button className="bg-white text-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[raleway] font-[700] rounded-[5px] border-[2px] border-[#5a4ae3] border-[solid] hover:bg-[#5a4ae3] hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem]">
                Print
              </button>
            </PDFDownloadLink>
          </div>
        </div>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default ItemLedger;
