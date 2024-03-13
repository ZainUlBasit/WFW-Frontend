import { Route, Routes, Navigate } from "react-router-dom";
import CompaniesKata from "../Pages/Admin/Company/CompaniesKata";
import AdminStockStats from "../Pages/Admin/Item/AdminStockStats";

import CompaniesInfo from "../Pages/Branch/Company/CompaniesInfo";
import ItemInfo from "../Pages/Customer/Items/ItemInfo";
import ItemStock from "../Pages/Customer/Items/ItemStock";
import MyKata from "../Pages/Customer/MyKata";

const CustomerRoutes = () => {
  <Routes>
    <Route path="/" element={<Admin />} />
    {/* They access only companies list */}
    <Route path="/company" element={<AdminCompany />} />
    {/* they get only items list */}
    <Route path="/items_info" element={<ItemInfo />} />
    <Route path="/items_stock" element={<ItemStock />} />
    {/* My Kata */}
    <Route path="/my_kata" element={<MyKata />} />
    {/* Online Cash Payment */}
    <Route path="/cash_payment" element={<AdminCashPayment />} />
  </Routes>;
};

export default CustomerRoutes;
