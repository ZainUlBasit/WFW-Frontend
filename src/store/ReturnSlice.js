import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showErrorToast } from "../utils/TaostMessages";
import { GetAllSaleReturn, GetBranches, GetTransactions } from "../Https";

export const fetchReturns = createAsyncThunk(
  "fetch/branches-returns",
  async (CurrentData) => {
    console.log(CurrentData);
    try {
      const response = await GetAllSaleReturn({ ...CurrentData });
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

const ReturnSlice = createSlice({
  name: "branches-return",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReturns.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReturns.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchReturns.rejected, (state, action) => {
      state.isError = true;
      console.log("Error: ", action.error);
    });
  },
});

export default ReturnSlice.reducer;
