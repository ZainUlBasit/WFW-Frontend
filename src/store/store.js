import { configureStore } from "@reduxjs/toolkit";
import SideMenuReducer from "./SideMenuSlice";
import CPSliceReducer from "./CPSlice";
import CompanySliceReducer from "./CompanySlice";
import ItemSliceReducer from "./ItemSlice";
import CustomerSliceReducer from "./CustomerSlice";
import CategorySliceReducer from "./CategorySlice";
import SubCategorySliceReducer from "./SubCategorySlice";
import ExpenseSliceReducer from "./ExpenseSlice";
import CustomerReturnSliceReducer from "./CustomerReturnSlice";
import CustomerTransactionSliceReducer from "./CustomerTransactionSlice";
import AutoLoginSliceReducer from "./AuthSlice";
import BankReducer from "./BankSlice";

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
    CustomerReturnSliceReducer,
    CustomerTransactionSliceReducer,
    AutoLoginSliceReducer,
    BankReducer,
  },
});
