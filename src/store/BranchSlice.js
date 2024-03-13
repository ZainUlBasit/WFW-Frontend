import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showErrorToast } from "../utils/TaostMessages";
import { GetBranches } from "../Https";

export const fetchBranches = createAsyncThunk("fetch/branches", async () => {
  try {
    const response = await GetBranches();
    if (!response.data?.success) {
      showErrorToast(response.data?.error?.msg);
      return [];
    } else return response.data?.data?.payload;
  } catch (err) {
    showErrorToast(err.response?.data?.error?.msg);
    return [];
  }
});

const BranchSlice = createSlice({
  name: "branches",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBranches.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBranches.rejected, (state, action) => {
      state.isError = true;
      console.log("Error: ", action.error);
    });
  },
});

export default BranchSlice.reducer;
