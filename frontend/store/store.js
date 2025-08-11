import { configureStore } from "@reduxjs/toolkit";
import userdetailReducer from "../features/userdetails";
import groupdetailReducer from "../features/groupdetails";
import ismemberReducer from "../features/ismember";
import isownerReducer from "../features/isowner";
import isadminReducer from "../features/isadmin";

export const store = configureStore({
  reducer: {
    userdetail: userdetailReducer,
    groupdetail: groupdetailReducer,
    isadmin: isadminReducer,
    ismember: ismemberReducer,
    isowner: isownerReducer,
  },
});
