import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryServices from "../Services/category.services";

export const fetchCategories = createAsyncThunk("fetch/category", async () => {
  let response = await categoryServices.getCategories();
  response = response.docs.map((doc) => ({
    ...doc.data(),
    _id: doc.id,
  }));
  return response;
});

const CategorySlice = createSlice({
  name: "category",
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
