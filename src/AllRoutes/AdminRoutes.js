import { Route, Routes, Navigate } from "react-router-dom";
import CompaniesKata from '../Pages/Admin/Company/CompaniesKata'
import Home from "../Pages/Admin/Home";
import AdminStockStats from "../Pages/Admin/Item/AdminStockStats";

import AdminCompany from '../Pages/Admin/Company/AdminCompany'
import CompaniesKata from '../Pages/Admin/Company/CompaniesKata'

import Cashbook from '../Pages/Admin/Reports/Cashbook'
import Expenses from '../Pages/Admin/Reports/Expenses'

import AdminCustomer from "../Pages/Admin/Customer/AdminCustomer";
import CustomerKata from '../Pages/Admin/Customer/CustomerKata'
import CustomerReturn from '../Pages/Admin/Customer/CustomerReturn'
import CustomerInvoices from '../Pages/Admin/Customer/CustomerInvoices'

import AdminItems from "../Pages/Admin/Item/AdminItems";



const AdminRoutes = () => {
    <Routes>
        <Route path="/" element={<Home/>}/>
        {/* Customer Routes */}
        <Route path="/customers_info" element={<AdminCustomer/>} />
        <Route path="/customers_kata" element={<CustomerKata/>} />
        <Route path="/customers_return" element={<CustomerReturn/>} />
        <Route path="/customers_invoices" element={<CustomerInvoices/>} />
        {/* Companies Routes */}
        <Route path="/company_info" element={<AdminCompany/>} />
        <Route path="/companies_kata" element={<CompaniesKata/>} />
        {/* Items Routes */}
        <Route path="/items_info" element={<AdminItems/>} />
        <Route path="/stock_statistics" element={ <AdminStockStats /> } />
        {/* Reports Routes */}
        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/cashbook" element={<Cashbook/>} />
        {/* Cash Payment Routes */}
        <Route path="/cash_payment" element={<AdminCashPayment/>} />
    </Routes>
}


export default AdminRoutes;