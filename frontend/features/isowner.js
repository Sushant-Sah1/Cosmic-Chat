import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const isownerSlice = createSlice({
  name: "isowner",
  initialState,
  reducers: {
    setisowner: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setisowner } = isownerSlice.actions;

export default isownerSlice.reducer;
