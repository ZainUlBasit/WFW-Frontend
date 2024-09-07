import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ItemDataServices from "../Services/item.services";
import moment from "moment";
import {
  GetAllPayment,
  GetAllStock,
  GetBranchItems,
  GetBranchPayment,
  GetBranchStock,
  GetItems,
} from "../Https";
import { showErrorToast } from "../utils/TaostMessages";

export const fetchPayments = createAsyncThunk(
  "fetch-payments",
  async (CurrentUser) => {
    console.log(CurrentUser);
    const reqBody = {
      user_Id: CurrentUser.user_Id,
      branch: CurrentUser.branch_number,
      startDate: CurrentUser.startDate,
      endDate: CurrentUser.endDate,
    };
    console.log(reqBody);
    try {
      let response;
      if (CurrentUser.role === 1) {
        response = await GetAllPayment(reqBody);
      } else if (CurrentUser.role === 2) {
        response = await GetBranchPayment(reqBody);
      }
      console.log(response);
      if (!response.data?.success) {
        showErrorToast(response.data.error.msg);
      } else if (response.data?.success) {
        const totalAmount = response.data.data.payload.reduce((acc, item) => {
          return acc + (item.amount || 0); // Ensure that amount is defined and use 0 if not
        }, 0);
        console.log("Total Amount:", totalAmount);
        return response.data.data.payload.sort((a, b) =>
          moment(a.date).diff(moment(b.date))
        );
      }
    } catch (err) {
      showErrorToast(err.response.data.error.msg);
    }
    return [];
  }
);

const PaymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPayments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchPayments.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default PaymentSlice.reducer;
