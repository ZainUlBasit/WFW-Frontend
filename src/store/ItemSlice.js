import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ItemDataServices from "../Services/item.services";
import moment from "moment";
import { GetBranchItems, GetItems } from "../Https";
import { showErrorToast } from "../utils/TaostMessages";

export const fetchItems = createAsyncThunk(
  "fetch-items",
  async (CurrentUser) => {
    try {
      let response;
      const reqBody = { branch: CurrentUser.branch_number };
      if (CurrentUser.role === 1) {
        response = await GetItems();
      } else if (CurrentUser.role === 2) {
        response = await GetBranchItems(reqBody);
      }
      console.log(response);
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

const ItemSlice = createSlice({
  name: "saledetails",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ItemSlice.reducer;
