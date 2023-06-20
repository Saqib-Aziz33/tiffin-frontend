import { STATUS } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch admin roles and store to redux
export const fetchRoles = createAsyncThunk("admin/roles", async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE}/admin/roles`
    );
    if (data.success) return data.roles;
  } catch (e) {
    return e.response.data;
  }
});

const RoleSlice = createSlice({
  name: "roles",
  initialState: {
    status: STATUS.idle,
    roles: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = STATUS.idle;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = STATUS.success;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = STATUS.idle;
        state.error = action.payload.message;
      });
  },
});

// export const { incremented, decremented } = RoleSlice.actions;

export default RoleSlice.reducer;
