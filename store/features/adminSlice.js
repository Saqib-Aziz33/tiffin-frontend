import { local } from "@/lib/constants";
import { toast } from "react-hot-toast";

const { createSlice } = require("@reduxjs/toolkit");

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null,
    token: null,
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem(local.admin, JSON.stringify(action.payload));

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogin = true;
    },
    logout: (state) => {
      toast.success("Good Bye");
      localStorage.removeItem(local.admin);
      state.user = null;
      state.token = null;
      state.isLogin = false;
    },
    // provide updated user object from responce
    updateProfile: (state, action) => {
      localStorage.setItem(
        local.admin,
        JSON.stringify({ token: state.token, user: action.payload })
      );
      state.user = action.payload;
    },
    // load from local stroage
    loadUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogin = true;
    },
  },
});

export const { login, logout, loadUser, updateProfile } = adminSlice.actions;

export default adminSlice.reducer;
