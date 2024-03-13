import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OpenModal: false,
};

export const CPSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    isOpenModal: (state) => {
      state.OpenModal = !state.OpenModal;
    },
  },
});

export const { isOpenModal } = CPSlice.actions;

export default CPSlice.reducer;
