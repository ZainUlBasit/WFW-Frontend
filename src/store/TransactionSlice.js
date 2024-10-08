import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showErrorToast } from "../utils/TaostMessages";
import { GetBranches, GetTransactions } from "../Https";

export const fetchTransactions = createAsyncThunk(
  "fetch/branches",
  async (CurrentData) => {
    try {
      const response = await GetTransactions({ ...CurrentData });
      const payload = response.data?.data?.payload;
      // Check if payload is defined and is an array
      if (Array.isArray(payload)) {
        // Calculate the total amount
        const totalAmount = payload.reduce((acc, item) => {
          return acc + (item.amount || 0); // Ensure that amount is defined and use 0 if not
        }, 0);
        console.log("Total Amount:", totalAmount);
      }
      if (!response.data?.success) {
        showErrorToast(response.data?.error?.msg);
      } else {
        const payload = response.data?.data?.payload || [];
        const sortedPayload = payload.sort((a, b) => {
          // Assuming date field is in ISO 8601 format
          return a.date - b.date;
        });
        return sortedPayload;
      }
    } catch (err) {
      showErrorToast(err.response?.data?.error?.msg);
      return [];
    }
  }
);

const TransactionSlice = createSlice({
  name: "branches",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.isError = true;
      console.log("Error: ", action.error);
    });
  },
});

export default TransactionSlice.reducer;
