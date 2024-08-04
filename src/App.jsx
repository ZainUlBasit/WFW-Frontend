import "./fonts-6/css/all.css";
import Admin from "./Pages/Admin/Admin";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminCustomer from "./Pages/Admin/Customer/AdminCustomer";
import CustomerKata from "./Pages/Admin/Customer/CustomerKata";
import CompanyInfo from "./Pages/Admin/Company/CompanyInfo";
import CompaniesKata from "./Pages/Admin/Company/CompaniesKata";
import AdminItems from "./Pages/Admin/Item/AdminItems";
import CustomerPayment from "./Pages/Admin/CashPayment/CustomerPayment";

import RegistrationPage from "./Pages/RegistrationPage";
import Home from "./Pages/Admin/Home";
import CustomerReturn from "./Pages/Admin/Customer/CustomerReturn";
import CompanyLedger from "./Pages/Admin/Company/CompanyLedger";
import CustomerLedger from "./Pages/Admin/Customer/CustomerLedger";
import StockStatistics from "./Pages/Admin/Item/StockStatistics";
import Expenses from "./Pages/Admin/Reports/Expenses";

import CurrentSaleChart from "./Components/Charts/CurrentSaleChart";
import CustomerInvoiceEdit from "./Pages/Admin/Customer/CustomerInvoiceEdit";
import TodayReport from "./Pages/Admin/Reports/TodayReport";
import CompanyPayment from "./Pages/Admin/CashPayment/CompanyPayment";
import NetProfit from "./Pages/Admin/CashPayment/NetProfit";
import BranchDetails from "./Components/BranchDetails/BranchDetails";
import Profile from "./Components/Profile/Profile";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import AddNewBill from "./Pages/Admin/Customer/AddNewBill";
import LoginComp from "./Components/LoginComponent/LoginComp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshAuthSlice, SetAuth, SetAuthNotFound } from "./store/AuthSlice";
import DataLoader from "./Components/Loader/DataLoader";
import Requests from "./Pages/Admin/Requests";
import PageLoader from "./Components/Loader/PageLoader";
import ProtectedLoginRoute from "./ProtectedLoginRoute";
import ProtectedRoute from "./ProtectedRoute";
import CashSummary from "./Pages/Admin/Reports/CashSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import UserDataServices from "./Services/user.services";
import Logout from "./Components/Logout/Logout";
import ShopsInfo from "./Pages/Admin/ShopsInfo";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ItemSummary from "./Pages/Admin/Customer/ItemSummary";
import CustomerReturnEdit from "./Pages/Admin/Customer/CustomerReturnEdit";
import CompanyItemSummary from "./Pages/Admin/Company/CompanyItemSummary";

function App() {
  const Auth = useSelector((state) => state.AutoLoginSliceReducer.auth);
  const loading = useSelector((state) => state.AutoLoginSliceReducer.loading);
  const userData = useSelector((state) => state.AutoLoginSliceReducer.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  // Methods
  useEffect(() => {
    if (token) {
      dispatch(SetAuth(user));
    } else {
      dispatch(SetAuthNotFound());
    }
  }, []);
  return loading ? (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <PageLoader />
    </div>
  ) : (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash_summary"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CashSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-new-bill"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <AddNewBill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot_password"
          element={
            // <ProtectedRoute isSignedIn={Auth}>
            <ForgotPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <Requests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shops_info"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <ShopsInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <Admin />
            </ProtectedRoute>
          }
        />
        {/* Sign In & Sign Up Routing */}
        <Route
          path="/signup"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/signin" element={<ProtectedRoute isSignedIn={Auth}><LoginPage/>}/>
        </ProtectedRoute> */}
        {/* <Route
          path="/forget_password"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <ForgetPassword />
            </ProtectedRoute>
          }
        /> */}
        {/* Customer Routing */}
        <Route
          path="/customer_info"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <AdminCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer_kata"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CustomerKata />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer_return"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CustomerReturn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer_return_edit"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CustomerReturnEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer_ledger"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CustomerLedger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer_invoices"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CustomerInvoiceEdit />
            </ProtectedRoute>
          }
        />
        {/* Company Routing */}
        <Route
          path="/companies_info"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CompanyInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company_ledger"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CompanyLedger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies_kata"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CompaniesKata />
            </ProtectedRoute>
          }
        />
        {/* Item Routing Routing */}
        <Route
          path="/items"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <AdminItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock_statistics"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <StockStatistics />
            </ProtectedRoute>
          }
        />
        {/* Report Routing Section */}
        <Route
          path="/expense_report"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/today_report"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <TodayReport />
            </ProtectedRoute>
          }
        />

        {/* Cash Payment Routing */}
        <Route
          path="/cash_payment"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CustomerPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sale_chart"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CurrentSaleChart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company_payment"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CompanyPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company_item_summary"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <CompanyItemSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/item-summary"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <ItemSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profit"
          element={
            <ProtectedRoute isSignedIn={Auth}>
              <NetProfit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedLoginRoute isSignedIn={Auth}>
              <LoginComp />
            </ProtectedLoginRoute>
          }
        />
      </Routes>
    </>
  );
}
export default App;
