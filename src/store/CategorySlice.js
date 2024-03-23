import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllCategory, GetBranchCategory } from "../Https";

export const fetchCategories = createAsyncThunk(
  "fetch/category",
  async (data) => {
    try {
      let response;
      if (data.role === 1) {
        response = await GetAllCategory();
      } else if (data.role === 2) {
        response = await GetBranchCategory({ branch: data.branch_number });
      }
      if (!response.data?.success) {
        showErrorToast(response.data.error.msg);
      } else if (response.data?.success) {
        return response.data.data.payload;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const CategorySlice = createSlice({
  name: "category-data",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isError = true;
      console.log("Error: ", action.error);
    });
  },
});

export default CategorySlice.reducer;
