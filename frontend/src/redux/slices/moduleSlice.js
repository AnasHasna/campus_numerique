import { createSlice } from "@reduxjs/toolkit";

const moduleSlice = createSlice({
  name: "module",
  initialState: {
    module: null,
  },
  reducers: {
    selectModule(state, action) {},
    selectPub(state, action) {},
  },
});

const moduleReducer = moduleSlice.reducer;
const moduleActions = moduleSlice.actions;
export { moduleReducer, moduleActions };
