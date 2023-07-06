import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataUser: null,
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    login(state, action) {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
      state.token = action.payload;
    },
    logout(state, action) {
      state.dataUser = null;
    },
    setUser(state, action) {
      state.dataUser = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    updateUserSuccess(state, action) {
      // Update the user data in the store after successful API call
      state.dataUser = action.payload;
    },
  },
});


export const { login, logout, setUser, setIsLoggedIn,updateUserSuccess } = tokenSlice.actions;
export default tokenSlice.reducer;
