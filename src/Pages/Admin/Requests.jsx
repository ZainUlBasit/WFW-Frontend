import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Request from "../../Components/Request/Request";
import { useSelector } from "react-redux";
import LoadingError from "../../Components/Loader/LoadingError";
import DataLoader from "../../Components/Loader/DataLoader";

const Requests = () => {
  const [AllCustomer, setAllCustomer] = useState([]);
  const [Loading, setLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const FetchData = async () => {
    setLoading(true);
    let data = await getDocs(collection(db, "customers"));
    data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    data = data.filter((dt) => dt.verify === false);
    setAllCustomer(data);
    setLoading(false);
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <>
      <Navbar />
      {Loading ? (
        <DataLoader />
      ) : AllCustomer.length === 0 ? (
        <div className="h-screen w-full flex justify-center items-center">
          <LoadingError />
        </div>
      ) : (
        <div className="pt-[12vh] flex justify-center items-center">
          <div className="w-[80%] border-[#5a4ae3] border-[2px] rounded-[10px] overflow-hidden pb-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="py-[10px] text-center uppercase bg-[#5a4ae3] text-white font-[raleway] font-bold text-[1.3rem] mb-[10px]">
              Customer Requests
            </div>
            <div className="px-[10px]">
              {AllCustomer.map((cust) => {
                return <Request customer={cust} RefreshData={FetchData} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Requests;
