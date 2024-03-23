import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import customerServices from "../Services/customer.services";
import { GetAllCustomer, GetBranchCustomer } from "../Https";
import { showErrorToast } from "../utils/TaostMessages";

export const fetchCustomers = createAsyncThunk(
  "fetchCustomers",
  async (CurrentUser) => {
    try {
      let response;
      const reqBody = { branch: CurrentUser.branch_number };
      if (CurrentUser.role === 1) {
        response = await GetAllCustomer(reqBody);
      } else if (CurrentUser.role === 2) {
        response = await GetBranchCustomer(reqBody);
      }
      if (!response.data?.success) {
        showErrorToast(response.data.error.msg);
      } else if (response.data?.success) {
        return response.data.data.payload;
      }
    } catch (err) {
      showErrorToast(err.response.data.error.msg);
    }
    return [];
  }
);

const CustomerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.data = state.data.map((dt) => {
        return {
          ...dt,
          duedate: moment(dt.duedate).format("DD/MM/YYYY"),
          returndate: moment(dt.returndate).format("DD/MM/YYYY"),
        };
      });
      state.isError = false;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      console.log("Error", action);
      state.isError = true;
    });
  },
});

export default CustomerSlice.reducer;
