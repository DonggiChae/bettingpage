import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/reducer/auth";

const reducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer,
});

export default store;
