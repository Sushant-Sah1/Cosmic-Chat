import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userdetailSlice = createSlice({
  name: "userdetail",
  initialState,
  reducers: {
    setuserdetail: (state,action) => {
      state.value = action.payload;
    },
  },
});

export const { setuserdetail } = userdetailSlice.actions;

export default userdetailSlice.reducer;
