import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ActiveState: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    isactiveMenu: (state) => {
      state.ActiveState = !state.ActiveState
    },
  },
})

export const { isactiveMenu } = counterSlice.actions

export default counterSlice.reducer