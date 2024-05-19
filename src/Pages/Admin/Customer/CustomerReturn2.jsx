import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerReturnCard from "../../../Components/Cards/CustomerReturnCard";
import Navbar from "../../../Components/NavBar/NavBar";
import CustomerNav from "../../../Components/NavBar/AdminNavbars/CustomerNav";
import ModalItemReturn from "../../../Components/Modals/ItemReturnModal";
import LedgerTable from "../../../Components/Tables/LegderDetailTable";
import { fetchCustomers } from "../../../store/CustomerSlice";
import moment from "moment";
import easyinvoice from "easyinvoice";
import customerReturnsServices from "../../../Services/customerReturns.services";
import customerTransactionsServices from "../../../Services/customerTransactions.services";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import DataLoader from "../../../Components/Loader/DataLoader";

const CustomerReturn = () => {
  const [CustomerID, setCustomerID] = useState("");
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerAddress, setCustomerAddress] = useState("");

  const [ReturnItems, setReturnItems] = useState([]);
  const [ReturnItem, setReturnItem] = useState({});
  const [FormatedItems, setFormatedItems] = useState(null);

  const [Total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [open, setOpen] = useState(false);
  const customers = useSelector((state) => state.CustomerSliceReducer.data);
  const loading = useSelector((state) => state.CustomerSliceReducer.loading);
  const isError = useSelector((state) => state.CustomerSliceReducer.isError);
  const dispatch = useDispatch();
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [AllBillNo, setAllBillNo] = useState([]);
  const [CurrentBillNo, setCurrentBillNo] = useState(0);
  const [DefaultBillNo, setDefaultBillNo] = useState(0);
  const [Loading, setLoading] = useState(false);
  const FetchData = async () => {
    setLoading(true);
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
        return Number(dt.billNo);
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
    } else if (data.length === 0 || data1.length === 0) {
      setCurrentBillNo(1);
      setDefaultBillNo(1);
    }
    setAllBillNo([...sortedData, ...sortedData1]);
    setLoading(false);
  };
  useEffect(() => {
    FetchData();
    dispatch(fetchCustomers({ shop: uData.userdata.fullName }));
  }, []);
  const [SelectCompany, setSelectCompany] = useState({
    name: "",
    found: false,
  });

  const lenghtOfList = () => {
    return ReturnItems.length > 0;
  };

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

  const addToDatabase = () => {
    let cName;
    customers.map((cus) => {
      if (cus._id === SelectCompany.name) {
        cName = cus.name;
      }
    });
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    const da = ReturnItems.map((it) => {
      return {
        customerid: SelectCompany.name,
        customer: cName,
        name: it.itemName,
        unitprice: it.itemPrice,
        qty: it.itemQuantity,
        total: it.totalAmount,
        shop: uData.userdata.fullName,
        date: timestamp,
        billNo: CurrentBillNo,
      };
    });
    da.map(async (curItem, index) => {
      await customerReturnsServices.addReturn(curItem);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Calling functions
    // PrintInvoice();
    addToDatabase();
    // Reset Data
    FetchData();
    setReturnItems([]);
    setDiscount(0);
  };

  const PrintInvoice = () => {
    const formatedData = setData();
    let cName, cAddress, cId;
    customers.map((cus) => {
      if (cus._id === SelectCompany.name) {
        cName = cus.name;
        cAddress = cus.address;
        cId = cus._id;
      }
    });
    let data = {
      customize: {},
      images: {},
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
        date: moment(new Date()).format("DD/MM/YYYY"),
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
    easyinvoice.createInvoice(data, function (result) {
      easyinvoice.download("invoice.pdf");
    });
  };

  return (
    <div className="transition-all">
      <Navbar />
      <CustomerNav setOpen={setOpen} />
      {Loading ? (
        <DataLoader />
      ) : (
        <CustomerReturnCard
          title={"Customer Item Return"}
          setSelect={setSelectCompany}
          Select={SelectCompany}
          setOpen={setOpen}
          data={customers}
        />
      )}
      {open ? (
        <ModalItemReturn
          open={open}
          setOpen={setOpen}
          setReturnItem={setReturnItem}
          setReturnItems={setReturnItems}
          ReturnItem={ReturnItem}
          ReturnItems={ReturnItems}
          title={"Item Return"}
        />
      ) : null}

      {lenghtOfList && SelectCompany.found ? (
        <div className="Wrapper w-full flex justify-center border-t-[2px] border-t-white">
          <div className="w-[90%]">
            <LedgerTable setTotal={setTotal} rows={ReturnItems} />
          </div>
        </div>
      ) : null}
      {SelectCompany.found ? (
        <div className="wrapper w-[100%] flex justify-center items-center">
          <div className=" h-full py-[10px] w-[90%] flex justify-between items-center bg-[#5a4ae3] text-white">
            <div className="h-full flex justify-center items-center ml-[15px]">
              <button
                className="bg-white text-[#5a4ae3] py-[8px] px-[20px] text-[1rem] font-[Roboto] font-[700] rounded-[5px] border-[2px] border-[white] border-[solid] hover:bg-[#5a4ae3] hover:text-white hover:shadow-white hover:shadow-md transition-all duration-700 returnRes2:px-[10px] returnRes2:text-[.8rem] returnRes:text-[.9rem]"
                onClick={onSubmit}
              >
                Add Bill
              </button>
            </div>
            <div>
              <div className="flex pr-[10px] text-[1.3rem] mb-[5px] font-[Roboto] font-[700]">
                <div className="w-[130px] text-right mr-[15px]">Total:</div>
                <div className="w-[100px]">{Number(Total)} /-</div>
              </div>
              <div className="flex mt-[0px] mr-[10px] text-[1.3rem]">
                <div className="w-[130px] mr-[15px] font-[Roboto] font-[700] text-right">
                  Discount:
                </div>
                <input
                  className="pl-[4px] text-[#5a4ae3] outline-none rounded-r-[7px] font-[Roboto]  font-[700] w-[100px]"
                  type="number"
                  name="discountAmount"
                  id="discountAmount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="flex pr-[10px] text-[1.3rem] mt-[5px] font-[Roboto] font-[700]">
                <div className="w-[130px] text-right mr-[15px]">
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

      {/* <div className="flex flex-col items-center w-full">
        <div className="flex w-[50%] justify-between bg-[gray] py-[5px] pl-[8px] text-white font-[700] font-[Roboto] pr-[8px]">
          <h4>Item Name</h4>
          <h4>Item Quantity</h4>
          <h4>Item Price</h4>
          <h4>Total Amount</h4>
        </div>
        {ReturnItems.map((val, i) => {
          return (
            <div className="flex w-[50%] justify-between font-[700] font-[Roboto] pr-[8px]">
              <h4>{val.itemName}</h4>
              <h4>{val.itemQuantity}</h4>
              <h4>{val.itemPrice}</h4>
              <h4>{val.totalAmount}</h4>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default CustomerReturn;
