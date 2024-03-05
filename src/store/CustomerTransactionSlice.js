import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerTransactionsServices from "../Services/customerTransactions.services";

export const fetchCustomerTransaction = createAsyncThunk(
  "fetchCustomerTransaction",
  async () => {
    let response = await customerTransactionsServices.getAllTransactions();
    response = response.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    return response;
  }
);

const CustomerTransactionSlice = createSlice({
  name: "customerTransaction",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerTransaction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomerTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCustomerTransaction.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default CustomerTransactionSlice.reducer;
