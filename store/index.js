import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";

const store = configureStore({
  // reducers here
  reducer: {
    user: userSlice,
  },
});

export default store;
