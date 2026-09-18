import { configureStore } from "@reduxjs/toolkit";
// import customizationReducer from "@/store/customizationReducer";
import userReducer from "../redux-slice/user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // customization: customizationReducer,
  },
});
