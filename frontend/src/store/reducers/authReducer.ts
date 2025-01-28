import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  loading: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  name: window.localStorage.getItem('name') || "",
  email: window.localStorage.getItem('email') || "",
  role: window.localStorage.getItem('role') || "",
  accessToken: window.localStorage.getItem('accessToken') || "",
  refreshToken: window.localStorage.getItem('refreshToken') || "",
  isAuthenticated: window.localStorage.getItem('isAuthenticated') === 'true' || false,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      console.log("action.paload: ", action.payload)
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    resetTokens: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
    },
    login: (
      state,
      action: PayloadAction<{name: string, email: string, role: string, accessToken: string; refreshToken: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.role = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setLoading, setTokens, resetTokens, login, logout } = authSlice.actions;

export default authSlice.reducer;
