import axios from "axios";
import { API_BASE_URL_LOCAL } from "../utils/config";

export const api = axios.create({
  baseURL: API_BASE_URL_LOCAL,
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
export const GetBranches = () => api.get("/auth/branch");
export const DeleteBranch = (data) => api.delete("/auth/branch/" + data.id);
export const UpdateBranchApi = (data) => api.patch("/auth/branch", data);
// Company Requests
export const CreateCompany = (data) => api.post("/company/create", data);
export const GetCompany = () => api.get("/company/all");
export const GetBranchCompany = (payload) =>
  api.post("/company/branch", payload);
export const UpdateCompany = (data) => api.patch("/company/update");
export const DeleteCompany = (data) => api.delete("/company/delete", data);
// items Requests
export const CreateItem = (data) => api.post("/item/create");
export const GetItems = () => api.get("/item/all");
export const GetBranchItems = (data) => api.get("/item/branch");
export const UpdateItem = (data) => api.patch("/item/update");
export const DeleteItem = (data) => api.delete("/item/delete");
// Category Request
export const CreateCategory = (data) => api.post("/category/create", data);
export const GetAllCategory = () => api.get("/category/all");
export const GetBranchCategory = (data) =>
  api.get("/category/branch/" + data.branch);
export const DeleteCategory = (data) => api.delete("/category/delete");
export const UpdateCategory = (data) => api.patch("/category/update");
// Sub Category Request
export const CreateSubCategory = (data) => api.post("/sub-category/create");
export const GetAllSubCategory = () => api.get("/sub-category/all");
export const GetBranchSubCategory = (data) => api.get("/sub-category/branch");
export const DeleteSubCategory = (data) => api.delete("/sub-category/delete");
export const UpdateSubCategory = (data) => api.patch("/sub-category/update");
// Customer Requests
export const CreateCustomer = (data) => api.post("/customer/create");
export const GetAllCustomer = () => api.get("/customer/all");
export const GetBranchCustomer = (data) => api.get("/customer/branch");
export const DeleteCustomer = (data) => api.delete("/customer/delete");
export const UpdateCustomer = (data) => api.patch("/customer/update");
// Add Sales
export const CreateSale = (data) => api.post("/sale/create");
export const GetAllSale = () => api.get("/sale/all");
export const GetBranchSale = (data) => api.get("/sale/branch");
export const DeleteSale = (data) => api.delete("/sale/delete");
export const UpdateSale = (data) => api.patch("/sale/update");
// Add Sales Return
export const CreateSaleReturn = (data) => api.post("/sale-return/create");
export const GetAllSaleReturn = () => api.get("/sale-return/all");
export const GetBranchSaleReturn = (data) => api.get("/sale-return/branch");
export const DeleteSaleReturn = (data) => api.delete("/sale-return/delete");
export const UpdateSaleReturn = (data) => api.patch("/sale-return/update");
// Report Requests
export const CreateReport = (data) => api.post("/report/create");
export const GetAllReport = () => api.get("/report/all");
export const GetBranchReport = (data) => api.get("/report/branch");
export const DeleteReport = (data) => api.delete("/report/delete");
export const UpdateReport = (data) => api.patch("/report/update");
// Add Payment
export const CreatePayment = (data) => api.post("/payment/create");
export const GetAllPayment = () => api.get("/payment/all");
export const GetBranchPayment = (data) => api.get("/payment/branch");
export const DeletePayment = (data) => api.delete("/payment/delete");
export const UpdatePayment = (data) => api.patch("/payment/update");
