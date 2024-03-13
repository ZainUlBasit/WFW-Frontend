import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import expenseServices from "../Services/expense.services";
import { logRoles } from "@testing-library/react";
import moment from "moment";

export const fetchExpenses = createAsyncThunk(
  "fetchExpenses",
  async ({ shop, toDate, fromDate }) => {
    let data = await expenseServices.getExpenses();
    data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    console.log(data);
    data = data.filter((dt) => {
      if (shop === "Admin") return dt;
      else return dt.shop === shop;
    });
    data = data.sort((a, b) => {
      const date1 = new Date(a.date.seconds * 1000);
      const date2 = new Date(b.date.seconds * 1000);
      return date1 - date2;
    });
    data = data.filter(
      (dt) =>
        new Date(dt.date.seconds * 1000) >= new Date(fromDate) &&
        new Date(dt.date.seconds * 1000) <= new Date(toDate)
    );
    console.log(data);
    data = data.map((dt) => {
      return {
        ...dt,
        date: moment(dt.date.seconds * 1000).format("DD/MM/YYYY"),
      };
    });
    console.log(data);
    return data;
  }
);

const ExpenseSlice = createSlice({
  name: "expense",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default ExpenseSlice.reducer;
