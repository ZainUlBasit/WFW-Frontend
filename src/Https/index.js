import axios from "axios";
import { API_BASE_URL, API_BASE_URL_LOCAL } from "../utils/config";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// Auth Requests
export const LoginApi = (data) => api.post("/auth/login", data);
export const LogoutApi = () => api.post("/auth/logout");
export const RegisterApi = (data) => api.post("/auth/register", data);
export const RefreshAuthApi = () => api.get("/auth/refresh");
// create new branch
export const GetBranches = (data) => api.get("/auth/branch", data);
export const DeleteBranch = (data) => api.delete("/auth/branch/" + data.id);
export const UpdateBranchApi = (data) => api.patch("/auth/branch", data);
// Company Requests
export const CreateCompany = (data) => api.post("/company/create", data);
export const GetCompany = () => api.get("/company/all");
export const GetBranchCompany = (payload) =>
  api.post("/company/branch", payload);
export const UpdateCompanyApi = (data) => api.patch("/company/update", data);
export const DeleteCompany = (data) => api.delete("/company/delete/" + data);
// items Requests
export const CreateItem = (data) => api.post("/item/create", data);
export const GetItems = () => api.get("/item/all");
export const GetBranchItems = (data) => api.post("/item/branch", data);
export const UpdateItem = (payload) => api.patch("/item/update", payload);
export const DeleteItem = (id) => api.delete("/item/delete/" + id);
// Category Request
export const CreateCategory = (data) => api.post("/category/create", data);
export const GetAllCategory = () => api.get("/category/all");
export const GetBranchCategory = (data) =>
  api.get("/category/branch/" + data.branch);
export const DeleteCategory = (data) => api.delete("/category/delete/" + data);
export const UpdateCategory = (data) => api.patch("/category/update", data);
// Sub Category Request
export const CreateSubCategory = (data) =>
  api.post("/sub-category/create", data);
export const GetAllSubCategory = () => api.get("/sub-category/all");
export const GetBranchSubCategory = (data) =>
  api.get("/sub-category/branch", data);
export const DeleteSubCategory = (id) =>
  api.delete("/sub-category/delete/" + id);
export const UpdateSubCategory = (data) =>
  api.patch("/sub-category/update", data);
export const GetTriForSubCatEdit = (data) =>
  api.post("/sub-category/edit-sub-cat", data);
// Customer Requests
export const CreateCustomer = (data) => api.post("/customer/create", data);
export const GetAllCustomer = (data) => api.post("/customer/all", data);
export const GetBranchCustomer = (data) => api.post("/customer/branch", data);
export const DeleteCustomer = (data) => api.delete("/customer/delete");
export const UpdateCustomer = (data) => api.patch("/customer/update");
// Add Sales
export const CreateSale = (data) => api.post("/sale/create");
export const GetAllSale = () => api.get("/sale/all");
export const GetBranchSale = (data) => api.get("/sale/branch");
export const DeleteSale = (data) => api.delete("/sale/delete");
export const UpdateSale = (data) => api.patch("/sale/update");
export const CreateTransaction = (data) =>
  api.post("/transaction/create", data);
export const GetTransactions = (data) => api.post("/transaction/all", data);
export const GetItemSummary = (data) => api.post("/transaction/summary", data);
export const DeleteInvoice = (data) => api.post("/transaction/delete", data);
// Add Sales Return
export const CreateSaleReturn = (data) => api.post("/sale-return/create", data);
export const GetAllSaleReturn = () => api.get("/sale-return/all");
export const GetBranchSaleReturn = (data) => api.get("/sale-return/branch");
export const DeleteSaleReturn = (data) => api.delete("/sale-return/delete");
export const UpdateSaleReturn = (data) => api.patch("/sale-return/update");
// Report Requests // expenses
export const CreateReport = (data) => api.post("/report/create", data);
export const GetAllReport = () => api.post("/report/all", data);
export const GetBranchReport = (data) => api.post("/report/branch", data);
export const DeleteReport = (data) => api.delete("/report/delete");
export const UpdateReport = (data) => api.patch("/report/update");
// Sale Details
export const GetBranchSaleDetail = (data) =>
  api.post("/report/sale-detail-branch", data);
export const GetAllSaleDetail = (data) =>
  api.post("/report/sale-detail-all", data);

// Add Payment
export const CreatePayment = (data) => api.post("/payment/create", data);
export const GetAllPayment = (data) => api.post("/payment/all", data);
export const GetBranchPayment = (data) => api.post("/payment/branch", data);
export const DeletePayment = (id) => api.delete("/payment/delete/" + id);
export const UpdatePayment = (data) => api.patch("/payment/update", data);

// Stock Request
export const AddStock = (data) => api.post("/stock/add", data);
export const GetAllStock = (data) => api.post("/stock/all", data);
export const GetBranchStock = (data) => api.post("/stock/branch", data);
