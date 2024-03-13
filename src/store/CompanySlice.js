import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CompanyDataServices from "../Services/company.services";
import { showErrorToast } from "../utils/TaostMessages";
import { GetBranchCompany, GetCompany } from "../Https";

export const fetchCompanies = createAsyncThunk(
  "fetchCompanies",
  async (CurrentUser) => {
    console.log(CurrentUser);
    try {
      let response;
      const reqBody = { branch: CurrentUser.branch_number };
      console.log(reqBody);
      if (CurrentUser.role === 1) {
        response = await GetCompany();
      } else if (CurrentUser.role === 2) {
        response = await GetBranchCompany(reqBody);
      }
      if (!response.data?.success) {
        showErrorToast(response.data.error.msg);
      } else if (response.data?.success) {
        return response.data.data.payload;
      }
    } catch (err) {
      showErrorToast(err.response.data.error.msg);
    }
    return [];
  }
);

const CompanySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCompanies.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CompanySlice.reducer;
