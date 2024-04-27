import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerReturnCard from "../../../Components/Cards/CustomerReturnCard";
import Navbar from "../../../Components/NavBar/NavBar";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import ModalItemReturn from "../../../Components/Modals/ItemReturnModal";
import LedgerTable from "../../../Components/Tables/LegderDetailTable";
import easyinvoice from "easyinvoice";
import moment from "moment";
import { fetchCustomers } from "../../../store/CustomerSlice";
import DataLoader from "../../../Components/Loader/DataLoader";
import ConnectionLost from "../../../Components/Error/ConnectionLost";
import { toast } from "react-toastify";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import customerTransactionsServices from "../../../Services/customerTransactions.services";
import customerServices from "../../../Services/customer.services";
import customerReturnsServices from "../../../Services/customerReturns.services";
import itemServices from "../../../Services/item.services";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AddNewBillReport from "../../../Components/Reports/AddNewBillReport";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../utils/TaostMessages";
import { CreateTransaction } from "../../../Https";
import { fetchItems } from "../../../store/ItemSlice";

const AddNewBill = () => {
  // ======================================
  // States
  // ======================================
  const [NewItems, setNewItems] = useState([]);
  const [ReturnItem, setReturnItem] = useState({});
  const [Total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [open, setOpen] = useState(false);
  const [SelectCustomer, setSelectCustomer] = useState({
    name: "",
    found: false,
  });

  const [Uploaded, setUploaded] = useState(false);
  const [FormatedItems, setFormatedItems] = useState(null);
  const [CustomerID, setCustomerID] = useState("");
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerAddress, setCustomerAddress] = useState("");
  const [curDate, setCurDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  // =========================================
  // Redux Toolkit
  // =========================================
  const customers = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const isError = useSelector((state) => state.CustomerSliceReducer.isError);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [AllBillNo, setAllBillNo] = useState([]);
  const [CurrentBillNo, setCurrentBillNo] = useState("");
  const [DefaultBillNo, setDefaultBillNo] = useState(0);
  const [FetchingLoading, setFetchingLoading] = useState(false);

  // =========================================
  // Use Effects Hook
  // =========================================
  useEffect(() => {
    dispatch(fetchCustomers(uData));
  }, []);

  const lenghtOfList = () => {
    return NewItems.length > 0;
  };

  // ============================================
  // method for format data for invoice
  // ============================================
  const setData = () => {
    const taxRate = -((discount / Total) * 100);
    return NewItems.map((item) => {
      const Quantity = item.itemQuantity;
      const Description = item.itemName;
      const Price = item.itemPrice;
      return {
        quantity: Quantity,
        description: Description,
        "tax-rate": taxRate,
        price: Price,
      };
    });
  };

  // ============================================
  // method for printing invoice
  // ============================================
  const PrintInvoice = () => {
    // =================================
    // format data for invoice
    // =================================
    const formatedData = setData();
    // =================================
    // getting customer info
    // =================================
    let cName, cAddress, cId;
    customers.map((cus) => {
      if (cus._id === SelectCustomer.name) {
        cName = cus.name;
        cAddress = cus.address;
        cId = cus._id;
      }
    });
    // ==================================
    // Generating Invoice
    // ==================================
    let data = {
      customize: {},
      // images: {},
      // Company data
      sender: {
        company: "Irshad Carton Dealer",
        zip: "Swat",
        city: "KPK",
        country: "Pakistan",
      },
      // Your recipient
      client: {
        company: cName,
        zip: cAddress,
        city: "Pakistan",
      },
      information: {
        // Invoice number
        number: CurrentBillNo,
        // Invoice data
        date: moment(new Date(curDate)).format("DD/MM/YYYY"),
        // Invoice due date
        "due-date": "--/--/----",
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: formatedData,
      // The message you would like to display on the bottom of your invoice
      "bottom-notice": `Developed By: XEE Tech, Email: zainulbasit486@gmail.com`,
      // Settings to customize your invoice
      settings: {},
      translate: {
        subtotal: "Current Total", // Defaults to 'Subtotal'
        products: "Items", // Defaults to 'Products'
        total: "Grand Total", // Defaults to 'Total'
        vat: "Discount", // Defaults to 'vat'
      },
    };
    // ==========================================
    // Call for generating Invoice
    // ==========================================
    easyinvoice.createInvoice(data, function (result) {
      easyinvoice.download("invoice.pdf");
    });
  };

  // ============================================
  // Method for Send data data to database
  // ============================================
  const addToDatabase = async () => {
    try {
      const response = await CreateTransaction({
        customerId: SelectCustomer.name,
        date: curDate,
        items: NewItems,
        discount: discount,
      });
      console.log("transaction: ", response);
      if (!response.data?.success) showErrorToast(response.data?.error?.msg);
      else {
        setCurrentBillNo(response.data.data.payload.invoice_no);
        showSuccessToast(response.data?.data?.msg);
        resetStates();
        setUploaded(true);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.error?.msg || err.message);
    }
  };

  // ============================================
  // On Submit method
  // ============================================
  const onSubmit = async (e) => {
    e.preventDefault();
    addToDatabase();
  };

  const resetStates = () => {
    setTimeout(() => {
      setNewItems([]);
      setReturnItem({});
      setTotal(0);
      setDiscount(0);
      setOpen(false);
      setSelectCustomer({
        name: "",
        found: false,
      });
      setUploaded(false);
      setFormatedItems(null);
      setCustomerID("");
      setCustomerName("");
      setCustomerAddress("");
      setCurDate(new Date().toISOString().substr(0, 10));
      setCurrentBillNo("");
      setAllBillNo([]);
      setDefaultBillNo(0);
      setFetchingLoading(false);
    }, 4000);
  };

  useEffect(() => {
    if (SelectCustomer.found !== "") {
      customers
        .filter((cu) => cu._id === SelectCustomer.name)
        .map((cust) => {
          setCustomerName(cust.name);
          setCustomerAddress(cust.address);
        });
    }
  }, [SelectCustomer]);

  const ItemsData = useSelector((state) => state.ItemSliceReducer);

  useEffect(() => {
    dispatch(fetchItems(uData));
  }, []);

  return (
    <div className="transition-all">
      <Navbar />
      <CustomerNav setOpen={setOpen} />
      {FetchingLoading ? (
        <DataLoader />
      ) : isError ? (
        <ConnectionLost />
      ) : customers ? (
        <div>
          <CustomerReturnCard
            title={"Add New Bill"}
            setSelect={setSelectCustomer}
            Select={SelectCustomer}
            setOpen={setOpen}
            data={customers}
            NewItems={NewItems}
            setNewItems={setNewItems}
          />
          {open ? (
            <ModalItemReturn
              open={open}
              setOpen={setOpen}
              setNewItems={setNewItems}
              ReturnItem={ReturnItem}
              NewItems={NewItems}
              title={"Add New Item"}
              Data={ItemsData}
            />
          ) : null}

          {lenghtOfList && SelectCustomer.found ? (
            <div className="Wrapper w-full flex justify-center border-t-[2px] border-t-white">
              <div className="w-[90%]">
                <LedgerTable
                  setTotal={setTotal}
                  rows={NewItems}
                  setRows={setNewItems}
                  Bill={true}
                />
              </div>
            </div>
          ) : null}
          {/* Button Panel */}
          {SelectCustomer.found ? (
            <div className="wrapper w-[100%] flex justify-center items-center">
              <div className="py-[10px] w-[90%] flex justify-between items-center bg-[#5a4ae3] text-white">
                <div className="h-full flex flex-col gap-y-2 justify-center items-center ml-[15px]">
                  <button
                    className="bg-white text-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[raleway] font-[700] rounded-[5px] border-[2px] border-[white] border-[solid] hover:bg-[#5a4ae3] hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem]"
                    onClick={onSubmit}
                  >
                    Add Bill
                  </button>
                  <PDFDownloadLink
                    document={
                      <AddNewBillReport
                        Data={NewItems}
                        cTotal={Total.toFixed(2)}
                        cDiscount={discount}
                        cGrand={(Number(Total) - Number(discount)).toFixed(2)}
                        bBillNo={CurrentBillNo}
                        bDate={curDate}
                        cName={CustomerName}
                        cAddress={CustomerAddress}
                      />
                    }
                    fileName={`${CustomerName}`}
                  >
                    <button
                      className="bg-white text-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[raleway] font-[700] rounded-[5px] border-[2px] border-[white] border-[solid] hover:bg-[#5a4ae3] hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem]"
                      onClick={(e) => {
                        setTimeout(() => {
                          resetStates();
                          onSubmit(e);
                        }, 4000);
                      }}
                    >
                      Add & Print
                    </button>
                  </PDFDownloadLink>
                </div>
                <div className="w-[210px] justify-end flex flex-col items-center">
                  <div className="flex w-[100%] justify-end my-[10px] mr-[10px] text-[1.1rem]">
                    {/* <input
                      className="px-[8px] text-[#5a4ae3] outline-none rounded-r-[7px] font-[raleway]  font-[700] w-[170px] py-[5px]"
                      type="number"
                      name="billno"
                      id="billno"
                      value={CurrentBillNo}
                      onChange={(e) => setCurrentBillNo(e.target.value)}
                      onBlur={(e) => {
                        const enterBill = e.target.value;
                        if (AllBillNo.includes(Number(enterBill))) {
                          toast.warn("Bill No Already Taken...", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                          setCurrentBillNo(DefaultBillNo);
                        }
                      }}
                    /> */}
                  </div>
                  <div className="flex w-[100%] justify-end my-[10px] mr-[10px] text-[1.1rem]">
                    <input
                      className="px-[8px] text-[#5a4ae3] outline-none rounded-r-[7px] font-[raleway]  font-[700] w-[170px] py-[5px]"
                      type="date"
                      name="date"
                      id="date"
                      value={curDate}
                      onChange={(e) => setCurDate(e.target.value)}
                    />
                  </div>
                  <div className="flex pr-[10px] text-[1.1rem] mb-[5px] font-[raleway] font-[700]">
                    <div className="w-[110px] text-right mr-[15px]">Total:</div>
                    <div className="w-[100px]">{Number(Total)} /-</div>
                  </div>
                  <div className="flex mt-[0px] mr-[10px] text-[1.1rem]">
                    <div className="w-[110px] mr-[15px] font-[raleway] font-[700] text-right">
                      Discount:
                    </div>
                    <input
                      className="pl-[4px] text-[#5a4ae3] outline-none rounded-r-[7px] font-[raleway]  font-[700] w-[100px]"
                      type="number"
                      name="discountAmount"
                      id="discountAmount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>
                  <div className="flex pr-[10px] text-[1.1rem] mt-[5px] font-[raleway] font-[700]">
                    <div className="w-[110px] text-right mr-[15px]">
                      Grand Total:
                    </div>
                    <div className="w-[100px]">
                      {Number(Total) - Number(discount)} /-
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <DataLoader />
      )}
    </div>
  );
};

export default AddNewBill;
