import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    authError: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    signUp(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    setError(state, action) {
      state.authError = action.payload;
    },
    forgetPassword() {},
    changePassword() {},
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authActions, authReducer };
