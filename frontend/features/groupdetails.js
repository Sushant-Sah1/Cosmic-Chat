import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const groupdetailSlice = createSlice({
  name: "groupdetail",
  initialState,
  reducers: {
    setgroupdetail: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setgroupdetail } = groupdetailSlice.actions;

export default groupdetailSlice.reducer;
