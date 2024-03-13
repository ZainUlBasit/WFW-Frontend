import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../Components/NavBar/NavBar";
import { MainWrapperComp } from "../../Styling/MainWrapperComp";
import CustomerInvoice from "./CustomerInvoice";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import ReportWrapper, { ReportStyled } from "../../Styling/ReportWrapper";
// import { CustomerRows } from "../../../DemoData/TempData";
import InputWrapperStyling from "../Styling/InputWrapperStyling";
import ReportBtns from "../../../Components/Buttons/ReportBtns";
import SelectComp from "../../../Components/Select/SearchingComp";
import { useEffect } from "react";
import InvoiceSearch from "../../../Components/Select/InvoiceSearch";
import { fetchCustomers } from "../../../store/CustomerSlice";

const CustomerInvoiceEdit = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const invoiceNumberRef = useRef();
  const [showInvoice, setShowInvoice] = useState(false);

  const [SelectCustomer, setSelectCustomer] = useState({
    name: "",
    found: false,
  });

  const [SelectInvoice, setSelectInvoice] = useState({
    bill: "",
    selected: false,
  });

  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [customerTransaction, setCustomerTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const customer = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const isError = useSelector((state) => state.CustomerSliceReducer.isError);
  const dispatch = useDispatch();

  const [AllInvoices, setAllInvoices] = useState([]);

  useEffect(() => {
    dispatch(fetchCustomers({ shop: uData.userdata.name }));
    const FetchData = async () => {
      // const { data } = await api.get("/get-invoices/" + uData.userdata.name);
      // console.log(data);
    };
    FetchData();
  }, []);

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      // const response = await DeleteCustomerTransaction(
        // Number(SelectInvoice.bill),
        // SelectCustomer.name
      // );
      // if (response.status === 201) {
      //   alert("Successfully deleted");
      //   setSelectCustomer({
      //     name: "",
      //     found: false,
      //   });
      //   setSelectInvoice({
      //     bill: "",
      //     selected: false,
      //   });
      //   setShowInvoice(false);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getTransactions = async () => {
      setIsLoading(true);
      // const { data } = await GetAllCustomerTransaction({
        // sname: uData.userdata.name,
      // });
      setCustomerTransaction([]);
      setIsLoading(false);
    };
    getTransactions();
  }, [SelectCustomer]);
  return (
    <>
      <Navbar />
      <CustomerNav />
      {/* Main Wrapper */}
      <ReportStyled>
        {/* Inner Wrapper */}
        <div className="InnerCont">
          {/* Header / title */}
          <div className="TitleCont select-none">CUSTOMER INVOICES EDIT</div>
          <div className="Line"></div>
          {/* Select Components */}
          {/* Select Customer */}
          <InputWrapperStyling>
            <SelectComp
              DefOption={"Select Customer..."}
              Options={customer}
              setSelect={setSelectCustomer}
            />
          </InputWrapperStyling>
          {/* List of invoice to select */}
          <InputWrapperStyling>
            <InvoiceSearch
              DefOption={"Select Invoice..."}
              Options={customerTransaction.filter(
                (cr) => cr.customerid === SelectCustomer.name
              )}
              setSelect={setSelectInvoice}
            />
          </InputWrapperStyling>
          {/* Button Container */}
          <div className={"ButtonCont"}>
            <ReportBtns
              title={"Show Detail"}
              HandLer={() => setShowInvoice(true)}
            />
          </div>
        </div>
      </ReportStyled>
      {showInvoice && SelectCustomer.found && SelectInvoice.selected ? (
        <div className="flex flex-col w-[100%] justify-center items-center">
          <CustomerInvoice
            data={customerTransaction}
            Filter={SelectInvoice.bill}
          />
          <div className="my-[10px]">
            <button
              className="hover:bg-[red] bg-white text-[red] hover:text-white font-[raleway] font-bold text-[1.2rem] py-[5px] px-[10px] border-[2px] border-[red] hover:rounded-[8px] transition-all duration-500"
              onClick={onDelete}
            >
              Delete Invoice
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomerInvoiceEdit;
