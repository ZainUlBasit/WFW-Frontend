import { configureStore } from "@reduxjs/toolkit";
import SideMenuReducer from "./SideMenuSlice";
import CPSliceReducer from "./CPSlice";
import CompanySliceReducer from "./CompanySlice";
import ItemSliceReducer from "./ItemSlice";
import CustomerSliceReducer from "./CustomerSlice";
import CategorySliceReducer from "./CategorySlice";
import SubCategorySliceReducer from "./SubCategorySlice";
import ExpenseSliceReducer from "./ExpenseSlice";
import CustomerReturnSlice from "./ReturnSlice";
import CustomerTransactionSliceReducer from "./CustomerTransactionSlice";
import AutoLoginSliceReducer from "./AuthSlice";
import BankReducer from "./BankSlice";
import BranchReducer from "./BranchSlice";
import TriGetSlice from "./TriGetSlice";
import StockReducer from "./StockSlice";
import TransactionSlice from "./TransactionSlice";
import SaleDetailSlice from "./SaleDetailSlice";
import PaymentSlice from "./PaymentSlice";
import ItemSummarySlice from "./ItemSummarySlice";

export const store = configureStore({
  reducer: {
    SideMenuReducer,
    CPSliceReducer,
    CompanySliceReducer,
    ItemSliceReducer,
    CustomerSliceReducer,
    CategorySliceReducer,
    SubCategorySliceReducer,
    ExpenseSliceReducer,
    ReturnState: CustomerReturnSlice,
    CustomerTransactionSliceReducer,
    AutoLoginSliceReducer,
    BankReducer,
    branches: BranchReducer,
    TriGet: TriGetSlice,
    StockState: StockReducer,
    Transactions: TransactionSlice,
    SalesDetails: SaleDetailSlice,
    PaymentState: PaymentSlice,
    ItemSummaryState: ItemSummarySlice,
  },
});
