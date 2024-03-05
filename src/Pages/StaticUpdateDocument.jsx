import React, { useEffect } from "react";
import { UpdateStatic, api } from "../https";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../store/CustomerSlice";

const StaticUpdateDocument = () => {
  const Customers = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  const CallApi = async () => {
    console.log(Customers);
    // for (const customer of Customers) {
    //   const response = await UpdateStatic({ id: customer._id });
    // }
  };
  return (
    <button
      className="m-[20px] p-[10px] bg-[yellow] flex justify-center items-center"
      onClick={CallApi}
    >
      {loading ? "Loading" : "Update"}
    </button>
  );
};

export default StaticUpdateDocument;
