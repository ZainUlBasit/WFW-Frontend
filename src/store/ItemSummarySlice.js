import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import customerServices from "../Services/customer.services";
import { GetItemSummary, GetBranchCustomer } from "../Https";
import { showErrorToast } from "../utils/TaostMessages";

export const fetchItemSummary = createAsyncThunk(
  "fetchItemSummary",
  async (CurrentUser) => {
    try {
      let response;
      response = await GetItemSummary(CurrentUser);

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

const ItemSummarySlice = createSlice({
  name: "Item_Summary_Slice",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {
    ChangePrice: (state, action) => {
      console.log(action.payload);
      const tempArray = [...state.data];
      const tempData = tempArray[action.payload.index];
      tempArray[action.payload.index] = {
        ...tempData,
        price: action.payload.value,
      };
      state.data = tempArray;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemSummary.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchItemSummary.fulfilled, (state, action) => {
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
    builder.addCase(fetchItemSummary.rejected, (state, action) => {
      console.log("Error", action);
      state.isError = true;
    });
  },
});

export const { ChangePrice } = ItemSummarySlice.actions;

export default ItemSummarySlice.reducer;
