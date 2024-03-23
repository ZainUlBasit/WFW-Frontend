import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import subcategoryServices from "../Services/subcategory.services";
import { GetAllSubCategory, GetBranchSubCategory } from "../Https";

export const fetchSubCategories = createAsyncThunk(
  "fetch/category",
  async (data) => {
    try {
      let response;
      if (data.role === 1) {
        response = await GetAllSubCategory();
      } else if (data.role === 2) {
        response = await GetBranchSubCategory({ branch: data.branch_number });
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

const SubCategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSubCategories.rejected, (state, action) => {
      state.isError = true;
      console.log("Error: ", action.error);
    });
  },
});

export default SubCategorySlice.reducer;
