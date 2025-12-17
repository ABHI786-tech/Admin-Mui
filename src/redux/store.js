import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer, 
  },
});

export default store;
