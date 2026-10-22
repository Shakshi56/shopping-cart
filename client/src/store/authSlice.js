import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("auth") || "null");

const authSlice = createSlice({
  name: "auth",
  initialState: { user: saved?.user || null, token: saved?.token || null },
  reducers: {
    setAuth(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
