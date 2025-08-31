import { createSlice } from "@reduxjs/toolkit";

const savedAuthData = localStorage.getItem("authData");
const savedLoginType = localStorage.getItem("loginType");
let parsedUser = null;
let parsedLoginType = null;
if (savedAuthData) {
  try {
    parsedUser = JSON.parse(savedAuthData);

    parsedLoginType = savedLoginType;
  } catch (error) {
    console.error("Error parsing authData:", error);
  }
}

const initialState = {
  user: parsedUser || null,
  loginType: savedLoginType || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.loginType = action.payload.loginType;
      // localStorage.setItem(
      //   "authData",
      //   JSON.stringify({ user: action.payload })
      // );
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("authData");
      localStorage.removeItem("token");
      localStorage.clear();
      Object.assign(state, { user: null, loginType: null });
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
