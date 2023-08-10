import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registrantInfo: localStorage.getItem("registrantInfo")
    ? JSON.parse(localStorage.getItem("registrantInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("action.payload");
      console.log(action.payload);
      state.registrantInfo = action.payload;
      localStorage.setItem("registrantInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.registrantInfo = null;
      localStorage.removeItem("registrantInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
