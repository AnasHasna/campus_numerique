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
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("userType", JSON.stringify(action.payload.userType));

      //
    },
    signUp(state, action) {
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userType", JSON.stringify(action.payload.userType));
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
