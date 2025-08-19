import { createSlice } from "@reduxjs/toolkit";

const savedAuthData = localStorage.getItem("authData");
let parsedUser = null;

if (savedAuthData) {
  try {
    const parsedData = JSON.parse(savedAuthData);
    parsedUser = parsedData.user;
  } catch (error) {
    console.error("Error parsing authData:", error);
  }
}

const initialState = {
  user: parsedUser || null ,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(
        "authData",
        JSON.stringify({ user: action.payload })
      );
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("authData");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser , logoutUser } = userSlice.actions;
export default userSlice.reducer;
