import moment from "moment";
import React from "react";
import InvoiceTable from "../../../Components/Tables/InvoiceTable";
import { useState } from "react";

const CustomerInvoice = ({ data, Filter }) => {
  const [selID, setSelID] = useState(-1);
  return (
    <>
      <div className="w-[100%] flex  flex-col justify-center items-center">
        <div className="w-[90%]">
          <InvoiceTable
            rows={data.filter((d) => d.billNo.toString() === Filter.toString())}
            setSelID={setSelID}
          />
        </div>
      </div>
      {/* <div>
        {data.map((dt) => {
          // console.log(filter);
          if (dt.billNo.toString() === filter.toString()) {
            return (
              <div className="flex">
                <div>
                  <div>Date:</div>
                  <div>{moment(dt.date).format("DD/MM/YYYY")}</div>
                </div>
                <div>
                  <div>name:</div>
                  <div>{dt.name}</div>
                </div>
                <div>
                  <div>Qty:</div>
                  <div>{dt.qty}</div>
                </div>
                <div>
                  <div>Price:</div>
                  <div>{dt.unitprice}</div>
                </div>
                <div>
                  <div>Amount:</div>
                  <div>{dt.total}</div>
                </div>
              </div>
            );
          }
        })}
      </div> */}
    </>
  );
};

export default CustomerInvoice;
