import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    userType: localStorage.getItem("userType")
      ? localStorage.getItem("userType")
      : null,
    isLogin: localStorage.getItem("user") ? true : false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      //
    },
    signUp(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    forgetPassword(state, action) {
      state.user = action.payload.user;
      state.userType = action.payload.userType;
    },
    changePassword() {},
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authActions, authReducer };
