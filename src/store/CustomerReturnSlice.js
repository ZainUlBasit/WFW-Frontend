import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { GetCustomerReturn } from "../https";

export const fetchCustomerReturn = createAsyncThunk(
  "fetchCustomerReturn",
  async () => {
    // const { data } = await GetCustomerReturn();
    // return data;
  }
);

const CustomerReturnSlice = createSlice({
  name: "customerReturn",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerReturn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomerReturn.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCustomerReturn.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default CustomerReturnSlice.reducer;
