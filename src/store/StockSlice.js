import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ItemDataServices from "../Services/item.services";
import moment from "moment";
import {
  GetAllStock,
  GetBranchItems,
  GetBranchStock,
  GetItems,
} from "../Https";
import { showErrorToast } from "../utils/TaostMessages";

export const fetchStocks = createAsyncThunk(
  "fetch-stocks",
  async (CurrentUser) => {
    console.log(CurrentUser);
    const reqBody = {
      branch: CurrentUser.branch_number,
      startDate: CurrentUser.fromDate,
      endDate: CurrentUser.toDate,
    };
    console.log(reqBody);
    try {
      let response;
      if (CurrentUser.role === 1) {
        response = await GetAllStock(reqBody);
      } else if (CurrentUser.role === 2) {
        response = await GetBranchStock(reqBody);
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

const StockSlice = createSlice({
  name: "stock",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStocks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStocks.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchStocks.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default StockSlice.reducer;
