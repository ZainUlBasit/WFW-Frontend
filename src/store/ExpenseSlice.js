import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import expenseServices from "../Services/expense.services";
import { logRoles } from "@testing-library/react";
import moment from "moment";
import { GetAllReport, GetBranchReport } from "../Https";
import { showErrorToast } from "../utils/TaostMessages";

export const fetchExpenses = createAsyncThunk(
  "fetchExpenses",
  async (CurrentData) => {
    try {
      let response;
      if (CurrentData.user.role === 1) {
        response = await GetAllReport({ toDate: toDate, fromDate: fromDate });
      } else if (CurrentData.user.role === 2) {
        response = await GetBranchReport({
          branch: CurrentData.user.branch_number,
          toDate: CurrentData.toDate,
          fromDate: CurrentData.fromDate,
        });
        console.log(response);
      }
      if (!response.data?.success) {
        showErrorToast(response.data.error.msg);
      } else if (response.data?.success) {
        return response.data.data.payload;
      }
    } catch (err) {
      console.log(err);
      showErrorToast(err.response.data.error.msg);
    }
    return [];
  }
);

const ExpenseSlice = createSlice({
  name: "expense",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      console.log(action);
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default ExpenseSlice.reducer;
