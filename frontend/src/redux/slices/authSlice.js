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
      if (action.payload.userType === "Teacher") {
        let user = {};
        user.email = action.payload.email;
        state.user = user;
      } else {
        state.user = action.payload.cin;
      }
      state.userType = action.payload.userType;
    },
    changePassword() {},
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authActions, authReducer };
