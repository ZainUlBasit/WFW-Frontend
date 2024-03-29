import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ItemDataServices from "../Services/item.services";
import moment from "moment";
import {
  GetAllSaleDetail,
  GetBranchItems,
  GetBranchSaleDetail,
  GetItems,
} from "../Https";
import { showErrorToast } from "../utils/TaostMessages";

export const fetchSaleDetails = createAsyncThunk(
  "fetch-sales-details",
  async (CurrentData) => {
    try {
      let response;
      console.log(CurrentData);
      const reqBody = {
        branch: CurrentData.branch,
        from: CurrentData.from,
        to: CurrentData.to,
      };
      if (CurrentData.role === 1) {
        response = await GetAllSaleDetail({
          from: CurrentData.from,
          to: CurrentData.to,
        });
      } else if (CurrentData.role === 2) {
        response = await GetBranchSaleDetail({
          branch: CurrentData.branch,
          from: CurrentData.from,
          to: CurrentData.to,
        });
      }
      console.log(response);
      if (!response.data?.success) {
        showErrorToast(response.data?.error?.msg);
      } else if (response.data?.success) {
        return response.data?.data?.payload;
      }
    } catch (err) {
      console.log(err);
      // showErrorToast(err.response.data.error.msg);
    }
    return [];
  }
);

const SaleDetailSlice = createSlice({
  name: "item",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSaleDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSaleDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchSaleDetails.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default SaleDetailSlice.reducer;
