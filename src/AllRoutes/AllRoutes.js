import { Route, Routes, Navigate } from "react-router-dom";
import CompaniesKata from '../Pages/Admin/Company/CompaniesKata'
import AdminStockStats from "../Pages/Admin/Item/AdminStockStats";

import CompaniesInfo from '../Pages/Branch/Company/CompaniesInfo'
import CompaniesKata from '../Pages/Branch/Company/CompaniesKata'

export const AdminRoutes = () => {
    <Routes>
        <Route path="/" element={<Admin/>}/>

        <Route path="/customers" element={<AdminCustomer/>} />
        <Route path="/customers_kata" element={<AdminCustomer/>} />
        <Route path="/customers_return" element={<AdminCustomer/>} />
        <Route path="/customers_invoices" element={<AdminCustomer/>} />
        
        
        <Route path="/company" element={<AdminCompany/>} />
        <Route path="/companies_kata" element={<CompaniesKata/>} />
        
        <Route path="/items" element={<AdminItems/>} />
        <Route path="/stock_statistics" element={ <AdminStockStats /> } />
        
        <Route path="/reports" element={<AdminReport/>} />
        
        <Route path="/cash_payment" element={<AdminCashPayment/>} />
    </Routes>
}

export const BranchRoutes = () => {
    <Routes>
        <Route path="/" element={<Admin/>}/>
        {/* They only access to Read , they never perform crudoperation in customer kata */}
        <Route path="/customers_info" element={<CompnayInfo />} />
        <Route path="/customers_kata" element={<AdminCustomer/>} />
        <Route path="/customers_return" element={<AdminCustomer/>} />
        <Route path="/customers_invoices" element={<AdminCustomer/>} />
        {/* Only display the list of companies */}
        <Route path="/companies_info" element={<CompaniesInfo/>} />
        <Route path="/companies_kata" element={ <CompaniesKata />} />
        {/* Only display the list of items */}
        <Route path="/items_info" element={<AdminItems/>} />
        <Route path="/stock_statistics" element={ <AdminStockStats /> } />
        {/* All Reports of app */}
        <Route path="/reports" element={<AdminReport/>} />
        <Route path="/cash_payment" element={<AdminCashPayment/>} />
    </Routes>
}

export const CustomerRoutes = () => {
    <Routes>
        <Route path="/" element={<Admin/>}/>
        {/* They access only companies list */}
        <Route path="/company" element={<AdminCompany/>} />
        {/* they get only items list */}
        <Route path="/items" element={<AdminItems/>} />
        <Route path="/reports" element={<AdminReport/>} />
        <Route path="/cash_payment" element={<AdminCashPayment/>} />
    </Routes>
}