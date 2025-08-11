import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const isadminSlice = createSlice({
  name: "isadmin",
  initialState,
  reducers: {
    setisadmin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setisadmin } = isadminSlice.actions;

export default isadminSlice.reducer;
