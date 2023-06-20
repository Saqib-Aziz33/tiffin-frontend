import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import adminSlice from "./features/adminSlice";
import roleSlice from "./features/roleSlice";

const store = configureStore({
  // reducers here
  reducer: {
    user: userSlice,
    admin: adminSlice,
    roles: roleSlice,
  },
});

export default store;
