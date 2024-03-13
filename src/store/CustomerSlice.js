import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import customerServices from "../Services/customer.services";

export const fetchCustomers = createAsyncThunk(
  "fetchCustomers",
  async ({ shop }) => {
    let data = await customerServices.getAllCustomers();
    data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    data = data.filter((dt) => dt.shop === shop && dt.verify === true);
    return data;
  }
);

const CustomerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.data = state.data.map((dt) => {
        return {
          ...dt,
          duedate: moment(dt.duedate).format("DD/MM/YYYY"),
          returndate: moment(dt.returndate).format("DD/MM/YYYY"),
        };
      });
      state.isError = false;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default CustomerSlice.reducer;
