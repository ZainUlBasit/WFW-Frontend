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
import { fetchTransactions } from "../../../store/TransactionSlice";
import AuthInputPopOver from "../../../Components/Input/CustomPopover";
import { Popover, Typography } from "@mui/material";
import { DeleteInvoice } from "../../../Https";
import { showErrorToast, showSuccessToast } from "../../../utils/TaostMessages";
import AddingLoader from "../../../Components/Loader/AddingLoader";

const CustomerInvoiceEdit = () => {
  const isActive_ = useSelector((state) => state.SideMenuReducer.ActiveState);
  const [Loading, setLoading] = useState(false);
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
  const customerTransaction = useSelector((state) => state.Transactions.data);
  const [isLoading, setIsLoading] = useState(false);

  const customer = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const isError = useSelector((state) => state.CustomerSliceReducer.isError);
  const dispatch = useDispatch();

  const [AllInvoices, setAllInvoices] = useState([]);

  useEffect(() => {
    dispatch(fetchCustomers(uData));
  }, []);

  const onDelete = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await DeleteInvoice({
        customerId: SelectCustomer?.name,
        invoice_no: SelectInvoice?.bill,
      });
      console.log("delete transaction: ", response);
      if (!response.data?.success) showErrorToast(response.data?.error?.msg);
      else {
        showSuccessToast(response.data?.data?.msg);
        setSelectInvoice({
          bill: "",
          selected: false,
        });
        setSelectCustomer({
          name: "",
          found: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (SelectCustomer?.name)
      dispatch(
        fetchTransactions({
          customerId: SelectCustomer?.name,
          to: new Date(),
          from: new Date(0),
        })
      );
  }, [SelectCustomer]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [SearchText, setSearchText] = useState("");
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
          {/* Select Customer */}
          <InputWrapperStyling>
            <AuthInputPopOver
              placeholder="Select Customer..."
              required={true}
              Value={SelectCustomer?._name || "Select Customer...!"}
              onClick={handleClick}
              Width={"w-[90%]"}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "white",
                  width: "60%",
                  maxHeight: "50vh", // Set maximum height to 70vh
                  // overflow: "hidden",
                  overflowY: "auto", // Make it scrollable vertically
                  boxShadow:
                    "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(0, 0, 0, 0.08) 0px 1px 0px inset",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography
                sx={{
                  p: 2,
                  borderColor: "#5a4ae3",
                  backgroundColor: "#5a4ae3",
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: "25px",
                }}
              >
                <div className="bg-[#5a4ae3] text-white w-full font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                  <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                    <div className="flex w-full">
                      <input
                        type="text"
                        className="w-full px-4 py-2 outline-none rounded-md placeholder:text-gray-500 text-black font-[Roboto] font-bold"
                        placeholder="Search...."
                        value={SearchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                    {customer
                      .filter((cust) => {
                        const searchTextLower = SearchText.toLowerCase();
                        const custLower = cust.name.toLowerCase();
                        if (searchTextLower !== "") {
                          return custLower.includes(searchTextLower);
                        } else return true;
                      })
                      .map((Comp, i) => {
                        return (
                          <div
                            className="flex gap-x-3 items-center cursor-pointer font-bold font-[Roboto] text-xl"
                            onClick={() => {
                              handleClose();
                              setSelectCustomer({
                                name: Comp._id,
                                _name: Comp.name,
                                found: true,
                              });
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={Comp._id === SelectCustomer.name}
                            />
                            <span>{Comp.name}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Typography>
            </Popover>
          </InputWrapperStyling>
          {/* List of invoice to select */}
          <InputWrapperStyling>
            <InvoiceSearch
              DefOption={"Select Invoice..."}
              Options={customerTransaction}
              setSelect={setSelectInvoice}
              Select={SelectInvoice}
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
      {showInvoice && SelectCustomer.found && SelectInvoice.selected && (
        <div className="flex flex-col w-[100%] justify-center items-center">
          <CustomerInvoice
            data={customerTransaction}
            Filter={SelectInvoice.bill}
          />
          <div className="my-[10px]">
            {Loading ? (
              <AddingLoader />
            ) : (
              <button
                className="hover:bg-[red] bg-white text-[red] hover:text-white font-[Roboto] font-bold text-[1.2rem] py-[5px] px-[10px] border-[2px] border-[red] hover:rounded-[8px] transition-all duration-500"
                onClick={onDelete}
              >
                Delete Invoice
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerInvoiceEdit;
