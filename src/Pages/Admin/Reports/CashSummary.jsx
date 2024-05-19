import React, { useEffect, useState } from "react";
import ReportNav from "./ReportNav";
import Navbar from "../../../Components/NavBar/NavBar";
import AddBank from "./AddBank";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanks } from "../../../store/BankSlice";
import TableComp from "../../../Components/Tables/TableComponent";
import { BankColumns } from "../../../DemoData/BankColumns";
import AddAmountModal from "./AddAmountModal";

const CashSummary = () => {
  const [OpenBankModal, setOpenBankModal] = useState(false);
  const [OpenAmountModal, setOpenAmountModal] = useState(false);
  const [Banks, setBanks] = useState([]);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);

  useEffect(() => {
    const FetchData = async () => {
      // let { data } = await GetAllBank();
      // data = data.filter((dt) => dt.shop === uData.userdata.name);
      setBanks([]);
    };
    FetchData();
  }, []);

  const toggleBank = () => {
    if (!OpenBankModal) {
      setOpenBankModal(true);
      setOpenAmountModal(false);
    }
  };
  const toggleAmount = () => {
    if (!OpenAmountModal) {
      setOpenBankModal(false);
      setOpenAmountModal(true);
    }
  };

  const [selID, setSelID] = useState(-1);

  return (
    <>
      <Navbar />
      <ReportNav />
      <div className="flex justify-center items-center">
        <button
          className="bg-[#4a5ae3] text-white border-[#5a4ae3] border-[2px] hover:text-[#5a4ae3] hover:bg-white hover:rounded-[8px] px-[15px] py-[8px] font-[Roboto] font-bold text-[1rem] transition-all duration-500 m-[5px]"
          onClick={toggleBank}
        >
          Add Bank
        </button>
        {OpenBankModal ? (
          <AddBank open={OpenBankModal} setOpen={setOpenBankModal} />
        ) : (
          <></>
        )}
        <button
          className="bg-[#4a5ae3] text-white border-[#5a4ae3] border-[2px] hover:text-[#5a4ae3] hover:bg-white hover:rounded-[8px] px-[15px] py-[8px] font-[Roboto] font-bold text-[1rem] transition-all duration-500 m-[5px]"
          onClick={toggleAmount}
        >
          Add Amount
        </button>
        {OpenAmountModal ? (
          <AddAmountModal open={OpenAmountModal} setOpen={setOpenAmountModal} />
        ) : (
          <></>
        )}
      </div>
      <div className="w-[100%] flex justify-center items-center mt-[20px]">
        <div className="w-[70%] cashtable:w-[90%]">
          <TableComp
            title={"Cash Summary"}
            rows={Banks}
            columns={BankColumns}
            isActive_={false}
            setSelID={setSelID}
          />
        </div>
      </div>
    </>
  );
};

export default CashSummary;
