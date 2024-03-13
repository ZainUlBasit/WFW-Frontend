import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import subcategoryServices from "../Services/subcategory.services";

export const fetchSubCategories = createAsyncThunk(
  "fetch/category",
  async () => {
    let response = await subcategoryServices.getSubCategories();
    response = response.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    return response;
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
