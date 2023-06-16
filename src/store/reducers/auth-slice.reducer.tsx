import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authStatusData: false,
    jwtLoginData: {},
    jwtRegisterData: {},
    jwtUpdateAccessTokenData: {},
    jwtLogoutData: {},
  },
  reducers: {
    setAuthStatus(state, action) {
      state.authStatusData = action.payload;
    },
    jwtLogin(state, action) {},
    setJwtLogin(state, action) {
      state.jwtLoginData = action.payload;
    },
    jwtRegister(state, action) {},
    setJwtRegister(state, action) {
      state.jwtRegisterData = action.payload;
    },
    jwtUpdateAccessToken(state, action) {},
    setJwtUpdateAccessToken(state, action) {
      state.jwtUpdateAccessTokenData = action.payload;
    },
    jwtLogout(state, action) {},
    setJwtLogout(state, action) {
      state.jwtLogoutData = action.payload;
    },
  },
});

export const {
  setAuthStatus,
  jwtLogin,
  setJwtLogin,
  jwtRegister,
  setJwtRegister,
  jwtUpdateAccessToken,
  setJwtUpdateAccessToken,
  jwtLogout,
  setJwtLogout,
} = authSlice.actions;

export default authSlice.reducer;
