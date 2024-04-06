import React from "react";
import SimpleTableComp from "../Tables/SimpleTableComponent";

const PaymentComponent = ({ title, data, setOpen, type }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="bg-[#5a4ae3] w-[90%] rounded-tl-[10px] rounded-tr-[10px] overflow-hidden shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] border-[2px] border-[#5a4ae3]e">
          <div className="text-white text-[1.5rem] font-bold text-center py-[10px] border-b-[2px] border-b-white">
            {title.toUpperCase()}
          </div>

          <div>
            <div className="Header text-white flex justify-between py-[5px] h-[8vh] px-[10px] border-b-[2px] border-b-white">
              <div className="h-full flex justify-center items-center text-2xl font-[700] font-[raleway] bg-[#5a4ae3] text-white">
                Payments
              </div>
              <button
                onClick={() => setOpen(true)}
                className="Button bg-white text-[1rem] font-[700] text-[#5a4ae3] px-[10px] py-[5px] rounded-[5px] hover:bg-[#5a4ae3] hover:text-white border-white border-[2px] transition-all duration-700 hidden"
                disabled
              >
                Add New Payment
              </button>
            </div>
            <div className="PaymentsDetail border-[2px]  border-b-white">
              <SimpleTableComp rows={data} type={type} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentComponent;
