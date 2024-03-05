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
import { useSelector } from "react-redux";
import DataLoader from "../../../Components/Loader/DataLoader";
import expenseServices from "../../../Services/expense.services";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import customerTransactionsServices from "../../../Services/customerTransactions.services";

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
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let data = await getDocs(collection(db, "users"));
        data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
        data = data.filter((dt) => dt.role === "shop").map((dt) => dt.fullName);
        data.sort(
          (a, b) => a.localeCompare(b) //using String.prototype.localCompare()
        );
        setShops(data);

        const curDate = new Date();
        const newDate = new Date();
        curDate.setDate(curDate.getDate() - 1);
        newDate.setDate(newDate.getDate() + 1);
        let expense = await expenseServices.getExpenses();
        expense = expense.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
        let all_expenses = 0;
        let shop_expense;
        let sum_shop = 0;
        data.map((shop) => {
          shop_expense = expense.filter((exp) => {
            console.log(exp);
            return (
              moment(exp.date.seconds * 1000).format("DD/MM/YYYY") ===
                moment(new Date()).format("DD/MM/YYYY") && exp.shop === shop
            );
          });
          sum_shop = shop_expense.reduce(
            (acc, cur) => acc + Number(cur.expense),
            0
          );
          all_expenses = Number(all_expenses) + Number(sum_shop);
        });
        setTodayExpense(all_expenses);
        // requests....
        let all_transactions =
          await customerTransactionsServices.getAllTransactions();
        all_transactions = all_transactions.docs.map((doc) => ({
          ...doc.data(),
          _id: doc.id,
        }));
        let current_shop;
        let shop_sale;
        let shop_purchase;
        let shop_qty;
        let all_sale = 0;
        let all_purchase = 0;
        let all_qty = 0;
        let all_shop_sale = [];
        let all_shop_purchase = [];
        let all_shop_qty = [];
        data.map((shop) => {
          current_shop = all_transactions.filter(
            (dt) =>
              moment(dt.date.seconds * 1000).format("DD/MM/YYYY") ===
                moment(new Date()).format("DD/MM/YYYY") && dt.shop === shop
          );
          shop_sale = current_shop.reduce(
            (acc, cur) => acc + Number(cur.qty) * Number(cur.unitprice),
            0
          );
          shop_purchase = current_shop.reduce(
            (acc, cur) => acc + Number(cur.qty) * Number(cur.purchase),
            0
          );
          shop_qty = current_shop.reduce(
            (acc, cur) => acc + Number(cur.qty),
            0
          );

          all_shop_sale.push(Number(shop_sale));
          all_shop_purchase.push(Number(shop_purchase));
          all_shop_qty.push(Number(shop_qty));

          all_sale += Number(shop_sale);
          all_purchase += Number(shop_purchase);
          all_qty = Number(all_qty) + Number(shop_qty);
        });
        setAllShopSale(all_shop_sale);
        setAllShopPurchase(all_shop_purchase);
        setAllShopQty(all_shop_qty);
        setTotalSale(all_sale);
        setTotalPurchase(all_purchase);
        setTotalQty(all_qty);
        // =====================================================================
        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        // =====================================================================
      } catch (err) {
        console.log("Error Occured: ", err);
      }
      setLoading(false);
    };
    getData();
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
              Today Sales Detail
            </StyledTodayInfoHeader>
            <StyledTodayInfoBody>
              {/* shopsinfo */}
              <div className="shopsinfo flex flex-wrap justify-center h-[100%] w-full items-center select-none">
                {Shops.map((shop, i) => {
                  console.log(AllShopSale[i]);
                  return (
                    <BranchPurSaleCard
                      ShopNo={i + 1}
                      SaleAmount={AllShopSale[i]}
                      PurchaseAmount={AllShopPurchase[i]}
                    />
                  );
                })}
              </div>
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
