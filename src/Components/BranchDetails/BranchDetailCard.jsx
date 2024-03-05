import React, { useState } from "react";
import ShopCard from "./ShopCard";

const BranchDetailCard = () => {
  const [AcceptReturn, setAcceptReturn] = useState(false);
  const [EditCompanyInvoice, setEditCompanyInvoice] = useState(false);
  const [EditCustomerInvoice, setEditCustomerInvoice] = useState(false);
  const [AcceptReturn1, setAcceptReturn1] = useState(false);
  const [EditCompanyInvoice1, setEditCompanyInvoice1] = useState(false);
  const [EditCustomerInvoice1, setEditCustomerInvoice1] = useState(false);
  const [AcceptReturn2, setAcceptReturn2] = useState(false);
  const [EditCompanyInvoice2, setEditCompanyInvoice2] = useState(false);
  const [EditCustomerInvoice2, setEditCustomerInvoice2] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      {/* header */}
      <h1 className="w-[80%] rounded-t-[5px] bg-[#5a4ae3] text-white text-center font-[raleway] uppercase text-[1.4rem] py-[8px] shadow-2xl mb-[5px] font-[700] mob:w-[99.5%] select-none">
        Shop Permissions
      </h1>
      {/* Shop 1 */}
      <ShopCard
        title="Shop 1"
        AcceptReturn={AcceptReturn}
        setAcceptReturn={setAcceptReturn}
        EditCompanyInvoice={EditCompanyInvoice}
        setEditCompanyInvoice={setEditCompanyInvoice}
        EditCustomerInvoice={EditCustomerInvoice}
        setEditCustomerInvoice={setEditCustomerInvoice}
      />
      {/* Shop 2 */}
      <ShopCard
        title="Shop 2"
        AcceptReturn={AcceptReturn1}
        setAcceptReturn={setAcceptReturn1}
        EditCompanyInvoice={EditCompanyInvoice1}
        setEditCompanyInvoice={setEditCompanyInvoice1}
        EditCustomerInvoice={EditCustomerInvoice1}
        setEditCustomerInvoice={setEditCustomerInvoice1}
      />
      {/* Shop 3 */}
      <ShopCard
        title="Shop 3"
        AcceptReturn={AcceptReturn2}
        setAcceptReturn={setAcceptReturn2}
        EditCompanyInvoice={EditCompanyInvoice2}
        setEditCompanyInvoice={setEditCompanyInvoice2}
        EditCustomerInvoice={EditCustomerInvoice2}
        setEditCustomerInvoice={setEditCustomerInvoice2}
      />
    </div>
  );
};

export default BranchDetailCard;
