import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../Components/NavBar/NavBar";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import { useDispatch, useSelector } from "react-redux";
import CustomerPoperOver from "../../../Components/Popover/CustomPopOver";
import { fetchCustomers } from "../../../store/CustomerSlice";
import TableComp from "../../../Components/Tables/TableComponent";
import ItemSummaryTable from "../../../Components/Tables/ItemSummaryTable";
import { Columns } from "../../../DemoData/ItemSummaryColumns";
import { fetchItemSummary } from "../../../store/ItemSummarySlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AddNewBillReport from "../../../Components/Reports/AddNewBillReport";
import ItemSummaryReport from "../../../Components/Reports/ItemSummaryReport";
import moment from "moment";

const ItemSummary = () => {
  const [open, setOpen] = useState(false);
  const [UserId, setUserId] = useState("");
  const [UserName, setUserName] = useState("");

  const CustomerState = useSelector((state) => state.CustomerSliceReducer);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  const ItemSummaryData = useSelector((state) => state.ItemSummaryState);

  useEffect(() => {
    dispatch(fetchCustomers(uData));
  }, []);

  useEffect(() => {
    if (UserId !== "") dispatch(fetchItemSummary({ customerId: UserId }));
  }, [UserId]);

  const totalAmount = useMemo(() => {
    return ItemSummaryData.data.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);
  }, [ItemSummaryData.data]);

  return (
    <>
      <Navbar />
      <CustomerNav setOpen={setOpen} />
      <div className="flex flex-col gap-y-4 py-4">
        <div className="flex w-full justify-center items-center">
          <div className="w-full flex justify-center items-center max-w-[400px]">
            <CustomerPoperOver
              Label={"Customer"}
              placeholder={"Select Customer..."}
              ValueId={UserId === ""}
              setValueId={setUserId}
              ValueName={UserName === "" ? "Select Customer..." : UserName}
              setValueName={setUserName}
              Values={CustomerState?.data}
            />
          </div>
        </div>
        <div>
          <ItemSummaryTable
            rows={ItemSummaryData.loading ? [{}] : ItemSummaryData.data}
            columns={Columns}
            isActive_={false}
          />
        </div>
        <div className="flex justify-center items-center">
          <PDFDownloadLink
            document={
              <ItemSummaryReport
                Data={ItemSummaryData.data}
                date={moment(new Date()).format("DD/MM/YYYY")}
                name={
                  CustomerState.data.find((dt) => dt._id === UserId)?.name ||
                  "-"
                }
                address={
                  CustomerState.data.find((dt) => dt._id === UserId)?.address ||
                  "not specified"
                }
                total={totalAmount}
              />
            }
            fileName={`${
              CustomerState.data.find((dt) => dt._id === UserId)?.name ||
              "ItemSummary"
            }`}
          >
            <button
              className="text-white bg-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[raleway] font-[700] rounded-[5px] border-[2px] border-[white] border-[solid] hover:rounded-2xl hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem] text-3xl"
              onClick={(e) => {
                resetStates();
              }}
            >
              Download Bill
            </button>
          </PDFDownloadLink>
        </div>
      </div>
    </>
  );
};

export default ItemSummary;
