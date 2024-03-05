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

const AddNewBill = () => {
  // ======================================
  // States
  // ======================================
  const [ReturnItems, setReturnItems] = useState([]);
  const [ReturnItem, setReturnItem] = useState({});
  const [Total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [open, setOpen] = useState(false);
  const [SelectCustomer, setSelectCustomer] = useState({
    name: "",
    found: false,
  });
  const [FormatedItems, setFormatedItems] = useState(null);
  const [CustomerID, setCustomerID] = useState("");
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerAddress, setCustomerAddress] = useState("");
  const [curDate, setCurDate] = useState("");
  // =========================================
  // Redux Toolkit
  // =========================================
  const customers = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const isError = useSelector((state) => state.CustomerSliceReducer.isError);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [AllBillNo, setAllBillNo] = useState([]);
  const [CurrentBillNo, setCurrentBillNo] = useState(0);
  const [DefaultBillNo, setDefaultBillNo] = useState(0);
  const [FetchingLoading, setFetchingLoading] = useState(false);

  // =========================================
  // Use Effects Hook
  // =========================================
  useEffect(() => {
    const FetchData = async () => {
      setFetchingLoading(true);
      let data = await customerTransactionsServices.getAllTransactions();
      let data1 = await customerReturnsServices.getAllReturns();
      data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      data1 = data1.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      data = data
        .filter((d) => d.shop === uData.userdata.fullName)
        .map((dt) => {
          return dt.billNo;
        });
      data1 = data1
        .filter((d) => d.shop === uData.userdata.fullName)
        .map((dt) => {
          return dt.billNo;
        });
      const sortedData = [...data].sort((a, b) => a - b);
      const sortedData1 = [...data1].sort((a, b) => a - b);
      if (data.length !== 0 || data1.length !== 0) {
        if (
          Number(sortedData[data.length - 1]) >=
          Number(sortedData1[data1.length - 1])
        ) {
          setCurrentBillNo(Number(sortedData[data.length - 1]) + 1);
          setDefaultBillNo(Number(sortedData[data.length - 1]) + 1);
        } else if (
          Number(sortedData[data.length - 1]) <=
          Number(sortedData1[data1.length - 1])
        ) {
          setCurrentBillNo(Number(sortedData1[data1.length - 1]) + 1);
          setDefaultBillNo(Number(sortedData1[data1.length - 1]) + 1);
        }
      } else if (data.length === 0 && data1.length === 0) {
        setCurrentBillNo(1);
        setDefaultBillNo(1);
      }
      setAllBillNo([...sortedData, ...sortedData1]);
      setFetchingLoading(false);
    };
    FetchData();
    dispatch(fetchCustomers({ shop: uData.userdata.fullName }));
  }, []);

  useEffect(() => {
    if (SelectCustomer.name !== "") {
      customers
        .filter((cu) => cu._id === SelectCustomer.name)
        .map((cust) => {
          setCustomerName(cust.name);
          setCustomerAddress(cust.address);
        });
    }
  }, [SelectCustomer]);

  const lenghtOfList = () => {
    return ReturnItems.length > 0;
  };

  // ============================================
  // method for format data for invoice
  // ============================================
  const setData = () => {
    const taxRate = -((discount / Total) * 100);
    return ReturnItems.map((item) => {
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
    // ======================================
    // to set data for database
    // ======================================
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date(curDate));
    const da = ReturnItems.map((it) => {
      return {
        customerid: SelectCustomer.name,
        name: it.itemName,
        unitprice: it.itemPrice,
        purchase: it.itemPurchase,
        qty: it.itemQuantity,
        total: it.totalAmount,
        shop: uData.userdata.fullName,
        date: timestamp,
        billNo: Number(CurrentBillNo),
      };
    });
    ReturnItems.map(async (it) => {
      await itemServices.updateItemQty(it.itemID, Number(it.itemQuantity) * -1);
      return {
        customerid: SelectCustomer.name,
        name: it.itemName,
        unitprice: it.itemPrice,
        purchase: it.itemPurchase,
        qty: it.itemQuantity,
        total: it.totalAmount,
        shop: uData.userdata.fullName,
        date: timestamp,
        billNo: Number(CurrentBillNo),
      };
    });
    // ======================================
    // Inserting data to database
    // ======================================
    da.map(async (curItem, index) => {
      await customerTransactionsServices.addTransaction(curItem);
    });
    // ======================================
    // Update Customer Account in Database
    // ======================================
    const id = SelectCustomer.name;
    await customerServices.updateCustomerTotal(
      id,
      Number(Total),
      Number(discount)
    );
  };

  // ============================================
  // On Submit method
  // ============================================
  const onSubmit = async (e) => {
    e.preventDefault();

    // Calling functions
    addToDatabase();
    PrintInvoice();
    // update bill no
    toast.success("Successfully Added...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // Reset Data
    setReturnItems([]);
    setDiscount(0);
  };

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
          />
          {open ? (
            <ModalItemReturn
              open={open}
              setOpen={setOpen}
              setReturnItem={setReturnItem}
              setReturnItems={setReturnItems}
              ReturnItem={ReturnItem}
              ReturnItems={ReturnItems}
              title={"Add New Item"}
            />
          ) : null}

          {lenghtOfList && SelectCustomer.found ? (
            <div className="Wrapper w-full flex justify-center border-t-[2px] border-t-white">
              <div className="w-[90%]">
                <LedgerTable setTotal={setTotal} rows={ReturnItems} />
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
                        Data={ReturnItems}
                        cTotal={Total.toFixed(2)}
                        cDiscount={discount}
                        cGrand={(Number(Total) - Number(discount)).toFixed(2)}
                        bBillNo={CurrentBillNo}
                        bDate={curDate}
                        cName={CustomerName}
                        cAddress={CustomerAddress}
                      />
                    }
                    fileName={`${CurrentBillNo}`}
                  >
                    <button
                      className="bg-white text-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[raleway] font-[700] rounded-[5px] border-[2px] border-[white] border-[solid] hover:bg-[#5a4ae3] hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem]"
                      onClick={() => addToDatabase()}
                    >
                      Add & Print
                    </button>
                  </PDFDownloadLink>
                </div>
                <div className="w-[210px] justify-end flex flex-col items-center">
                  <div className="flex w-[100%] justify-end my-[10px] mr-[10px] text-[1.1rem]">
                    <input
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
                    />
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
