import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/NavBar/NavBar";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import { useDispatch, useSelector } from "react-redux";
import CustomerPoperOver from "../../../Components/Popover/CustomPopOver";
import { fetchCustomers } from "../../../store/CustomerSlice";
import TableComp from "../../../Components/Tables/TableComponent";
import ItemSummaryTable from "../../../Components/Tables/ItemSummaryTable";
import { Columns } from "../../../DemoData/ItemSummaryColumns";

const ItemSummary = () => {
  const [open, setOpen] = useState(false);
  const [UserId, setUserId] = useState("");
  const [UserName, setUserName] = useState("");

  const CustomerState = useSelector((state) => state.CustomerSliceReducer);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    dispatch(fetchCustomers(uData));
  }, []);

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
          <ItemSummaryTable rows={[{}]} columns={Columns} isActive_={false} />
        </div>
      </div>
    </>
  );
};

export default ItemSummary;
