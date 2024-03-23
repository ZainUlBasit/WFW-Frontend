import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllCategory,
  GetBranchCategory,
  GetTriForSubCatEdit,
} from "../Https";

export const fetchTri = createAsyncThunk("fetch/tri", async (data) => {
  try {
    const response = await GetTriForSubCatEdit({ branch: data.branch_number });
    console.log(response.data.data.payload);
    if (!response.data?.success) {
      showErrorToast(response.data.error.msg);
    } else if (response.data?.success) {
      return response.data.data.payload;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
});

const TriSlice = createSlice({
  name: "tri-data",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTri.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTri.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTri.rejected, (state, action) => {
      state.isError = true;
      console.log("Error: ", action.error);
    });
  },
});

export default TriSlice.reducer;
