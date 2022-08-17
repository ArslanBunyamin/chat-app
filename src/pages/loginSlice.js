import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "userHandler",
  initialState: { username: "", password: "", loggedIn: "" },
  reducers: {
    setUsername: (state, name) => {
      state.username = name.payload;
    },
    setPassword: (state, password) => {
      state.password = password.payload;
    },
    setLoggedIn: (state, logged) => {
      state.loggedIn = logged.payload;
    },
  },
});
export const { setUsername, setPassword, setLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;
