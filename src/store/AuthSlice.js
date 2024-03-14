import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RefreshAuthApi } from "../Https";

export const RefreshAuthSlice = createAsyncThunk("refresh/auth", async () => {
  try {
    const response = await RefreshAuthApi();
    if (response.data?.success) return response.data?.data?.payload;
  } catch (err) {}
  return [];
});

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    loading: true,
    auth: false,
    data: [],
    isError: false,
  },
  reducers: {
    SetAuth: (state, action) => {
      state.auth = true;
      state.loading = false;
      state.data = action.payload;
    },
    SetAuthNotFound: (state, action) => {
      state.auth = false;
      state.loading = false;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RefreshAuthSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RefreshAuthSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload.length === 0 ? false : true;
      state.data = action.payload;
    });
    builder.addCase(RefreshAuthSlice.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      console.log("Error: ", action.error);
    });
  },
});

export const { SetAuth, SetAuthNotFound } = AuthSlice.actions;
export default AuthSlice.reducer;
