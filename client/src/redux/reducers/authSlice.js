import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  loading: true,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setLoadingAuth: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, setLoadingAuth } = authSlice.actions;

export default authSlice.reducer;
