import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBanks = createAsyncThunk("fetch/banks", async (info) => {
  // const { data } = await GetAllBank(info);
  return [];
});

const BankSlice = createSlice({
  name: "bank",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBanks.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBanks.rejected, (state, action) => {
      state.isError = true;
      console.log("Error: ", action.error);
    });
  },
});

export default BankSlice.reducer;
