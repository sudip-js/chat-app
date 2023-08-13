import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import chatSlice from "./slices/chatSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  chat: chatSlice,
});
