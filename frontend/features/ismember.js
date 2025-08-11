import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const ismemberSlice = createSlice({
  name: "ismember",
  initialState,
  reducers: {
    setismember: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setismember } = ismemberSlice.actions;

export default ismemberSlice.reducer;
