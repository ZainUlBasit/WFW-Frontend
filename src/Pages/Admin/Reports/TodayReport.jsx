import React, { useState } from "react";
import BranchPurSaleCard from "../../../Components/Cards/BranchPurSaleCard";
import Navbar from "../../../Components/NavBar/NavBar";
import TodayInfoComp from "../../../Components/TodayInfo/TodayInfoComp";
import ModalAddExpense from "./AddNewExpenseModal";
import ReportNav from "./ReportNav";
import {
  StyledTodayInfo,
  StyledTodayInfoBody,
  StyledTodayInfoHeader,
  StyledTodayInfoInner,
} from "./Styling/StyledTodayInfo";
import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import DataLoader from "../../../Components/Loader/DataLoader";
import expenseServices from "../../../Services/expense.services";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import customerTransactionsServices from "../../../Services/customerTransactions.services";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import { fetchSaleDetails } from "../../../store/SaleDetailSlice";
import AddingLoader from "../../../Components/Loader/AddingLoader";

const TodayReport = () => {
  const [AddExpenseModal, setAddExpenseModal] = useState(false);
  //shop1
  const [TotalPurchase1, setTotalPurchase1] = useState(0);
  const [TotalSale1, setTotalSale1] = useState(0);
  const [TotalQty1, setTotalQty1] = useState(0);
  // shop 2
  const [TotalPurchase2, setTotalPurchase2] = useState(0);
  const [TotalSale2, setTotalSale2] = useState(0);
  const [TotalQty2, setTotalQty2] = useState(0);
  // shop 3
  const [TotalPurchase3, setTotalPurchase3] = useState(0);
  const [TotalSale3, setTotalSale3] = useState(0);
  const [TotalQty3, setTotalQty3] = useState(0);
  // Expense
  const [TodayExpense, setTodayExpense] = useState([]);
  const [Loading, setLoading] = useState(false);
  const uData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const [Shops, setShops] = useState([]);
  const [ShopLoading, setShopLoading] = useState(false);
  const [AllShopSale, setAllShopSale] = useState([]);
  const [AllShopPurchase, setAllShopPurchase] = useState([]);
  const [AllShopQty, setAllShopQty] = useState([]);
  const [TotalSale, setTotalSale] = useState(0);
  const [TotalPurchase, setTotalPurchase] = useState(0);
  const [TotalQty, setTotalQty] = useState(0);
  const [FromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [ToDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const dispatch = useDispatch();
  const Sales = useSelector((state) => state.SalesDetails);
  useEffect(() => {
    dispatch(
      fetchSaleDetails({
        role: uData.role,
        branch: uData.branch_number,
        from: FromDate,
        to: ToDate,
      })
    );
    console.log(Sales);
  }, []);

  return (
    <>
      <Navbar />
      <ReportNav setAddExpenseModal={setAddExpenseModal} />
      {Loading ? (
        <div className="flex justify-center items-center h-[90vh] w-[100vw]">
          <DataLoader />
        </div>
      ) : (
        <StyledTodayInfo>
          <StyledTodayInfoInner>
            <StyledTodayInfoHeader className="select-none">
              <div className="flex justify-between items-center px-5 w-full flex-wrap gap-y-3">
                <div className="font-bold text-3xl">Sales Detail</div>
                <div className="flex gap-x-4 items-center justify-center flex-wrap gap-y-3">
                  <input
                    type="date"
                    className="text-black rounded-lg font-medium text-xl py-2 px-2"
                    name="from"
                    id="from"
                    value={FromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />

                  <MultipleStopIcon className="!text-white !text-3xl" />

                  <input
                    type="date"
                    className="text-black rounded-lg font-medium text-xl py-2 px-2"
                    name="to"
                    id="to"
                    value={ToDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                  <button
                    className="bg-white hover:text-[gray] hover:rounded-[10px] transition-all duration-700 text-[#5a4ae3] py-2 px-3"
                    onClick={() => {
                      dispatch(
                        fetchSaleDetails({
                          role: uData.role,
                          branch: uData.branch_number,
                          from: FromDate,
                          to: ToDate,
                        })
                      );
                      console.log({
                        branch: uData.branch_number,
                        from: FromDate,
                        to: ToDate,
                      });
                      console.log(Sales);
                    }}
                  >
                    Show Details
                  </button>
                </div>
              </div>
            </StyledTodayInfoHeader>
            <StyledTodayInfoBody>
              {/* shopsinfo */}
              <div className="shopsinfo flex flex-wrap justify-center h-[100%] w-full items-center select-none">
                {Sales.loading ? (
                  <AddingLoader />
                ) : (
                  <BranchPurSaleCard State={Sales?.data} />
                )}
              </div>
              {uData.role === 1 && (
                <div className="todayInfo flex flex-wrap justify-center items-center mx-[5px] my-[15px] select-none">
                  <TodayInfoComp
                    title={"Today's Sale"}
                    payload={TotalSale}
                    shopDetail={false}
                  />
                  <TodayInfoComp
                    title={"Today's Sold Quantity"}
                    payload={TotalQty}
                    shopDetail={false}
                  />
                  <TodayInfoComp
                    title={"Today's Expense"}
                    payload={TodayExpense}
                    shopDetail={false}
                  />
                  <TodayInfoComp
                    title={"Total Profit"}
                    payload={
                      Number(TotalSale) -
                      Number(TotalPurchase) -
                      Number(TodayExpense)
                    }
                    shopDetail={false}
                  />
                </div>
              )}
            </StyledTodayInfoBody>
          </StyledTodayInfoInner>
        </StyledTodayInfo>
      )}

      {AddExpenseModal ? (
        <ModalAddExpense
          AddExpenseModal={AddExpenseModal}
          setAddExpenseModal={setAddExpenseModal}
        />
      ) : null}
    </>
  );
};

export default TodayReport;
