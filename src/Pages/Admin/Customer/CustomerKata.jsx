import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../Components/NavBar/NavBar";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import TableComp from "../../../Components/Tables/TableComponent";
import {
  CustomerKataRows as rows,
  CustomerKataColumns as columns,
} from "../../../DemoData/TempData";
import { fetchCustomers } from "../../../store/CustomerSlice";
import { CircularProgress } from "@mui/material";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";

const CustomerKata = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [open, setOpen] = useState(false);
  const [selID, setSelID] = useState(-1);

  const dispatch = useDispatch();
  const customer = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const isError = useSelector((state) => state.CustomerSliceReducer.isError);
  const data = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    dispatch(fetchCustomers({ shop: data.userdata.fullName }));
  }, []);

  return (
    <>
      <Navbar />
      <CustomerNav setOpen={setOpen} />
      {loading ? (
        <DataLoader />
      ) : isError ? (
        <ConnectionLost />
      ) : customer ? (
        <TableComp
          title={"Customer Kata"}
          rows={customer}
          columns={columns}
          isActive_={isActive_}
          setSelID={setSelID}
        />
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default CustomerKata;
